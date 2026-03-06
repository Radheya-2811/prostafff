package com.prostaff.service;

import com.prostaff.dto.ContactRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final WebClient webClient = WebClient.create("https://api.resend.com");

    @Value("${RESEND_API_KEY}")
    private String apiKey;

    @Value("${prostaff.mail.admin-email}")
    private String adminEmail;

    @Value("${prostaff.mail.from-email}")
    private String fromEmail;

    @Value("${prostaff.mail.from-name}")
    private String fromName;

    /**
     * Sends notification email to admin and auto-reply to the enquirer.
     */
    public void sendContactEmails(ContactRequest req) {
        sendAdminNotification(req);
        sendAutoReply(req);
    }

    // ── Admin notification ──────────────────────────────────────────────────
    private void sendAdminNotification(ContactRequest req) {
        try {

            String html = buildAdminHtml(req);

            webClient.post()
                    .uri("/emails")
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue("""
                    {
                      "from": "%s <%s>",
                      "to": ["%s"],
                      "subject": "New Enquiry from %s %s",
                      "html": %s
                    }
                    """.formatted(
                            fromName,
                            fromEmail,
                            adminEmail,
                            req.getFirstName(),
                            req.getLastName(),
                            "\"" + html.replace("\"", "\\\"") + "\""
                    ))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            log.info("Admin notification sent via Resend");
        } catch (Exception e) {
            log.error("Failed to send admin notification: {}", e.getMessage());
        }
    }

    // ── Auto-reply to enquirer ───────────────────────────────────────────────
    private void sendAutoReply(ContactRequest req) {
        try {
            String html = buildAutoReplyHtml(req);

            webClient.post()
                    .uri("/emails")
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue("""
                    {
                      "from": "%s <%s>",
                      "to": ["%s"],
                      "subject": "Thank you for reaching out — Prostaff Solution",
                      "html": %s
                    }
                    """.formatted(
                            fromName,
                            fromEmail,
                            req.getEmail(),
                            "\"" + html.replace("\"", "\\\"") + "\""
                    ))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            log.info("Auto reply sent via Resend");
        } catch (Exception e) {
            log.error("Failed to send auto-reply: {}", e.getMessage());
        }
    }

    // ── HTML templates ───────────────────────────────────────────────────────
    private String buildAdminHtml(ContactRequest req) {
        String profileLabel = switch (req.getProfileType()) {
            case "employer"    -> "Employer / Brand";
            case "candidate"   -> "Job Seeker / Candidate";
            case "partnership" -> "Partnership Enquiry";
            default            -> "Other";
        };
        return """
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; background: #0f0f0f; color: #f0ebe0; margin: 0; padding: 0; }
                .wrapper { max-width: 600px; margin: 0 auto; background: #1a1a1a; }
                .header { background: #111; padding: 32px 40px; border-bottom: 2px solid #C9A84C; }
                .header h1 { font-size: 22px; color: #C9A84C; margin: 0; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; }
                .header p { margin: 4px 0 0; font-size: 12px; color: #888; letter-spacing: 1px; }
                .body { padding: 36px 40px; }
                .field { margin-bottom: 20px; }
                .field label { font-size: 10px; letter-spacing: 2px; color: #C9A84C; text-transform: uppercase; display: block; margin-bottom: 4px; }
                .field span { font-size: 15px; color: #f0ebe0; }
                .message-box { background: #111; border-left: 2px solid #C9A84C; padding: 20px; margin-top: 24px; }
                .message-box p { font-size: 14px; line-height: 1.7; color: #ccc; margin: 0; white-space: pre-wrap; }
                .footer { padding: 20px 40px; border-top: 1px solid #2a2a2a; text-align: center; }
                .footer p { font-size: 11px; color: #555; letter-spacing: 1px; }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="header">
                  <h1>Prostaff Solution</h1>
                  <p>New Enquiry Received</p>
                </div>
                <div class="body">
                  <div class="field"><label>Full Name</label><span>%s %s</span></div>
                  <div class="field"><label>Email</label><span>%s</span></div>
                  <div class="field"><label>Phone</label><span>%s</span></div>
                  <div class="field"><label>Profile Type</label><span>%s</span></div>
                  <div class="message-box">
                    <label style="font-size:10px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;display:block;margin-bottom:10px;">Message</label>
                    <p>%s</p>
                  </div>
                </div>
                <div class="footer"><p>Prostaff Solution Private Limited · Confidential</p></div>
              </div>
            </body>
            </html>
            """.formatted(
                req.getFirstName(), req.getLastName(),
                req.getEmail(),
                req.getPhone() != null && !req.getPhone().isBlank() ? req.getPhone() : "Not provided",
                profileLabel,
                req.getMessage()
            );
    }

    private String buildAutoReplyHtml(ContactRequest req) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; background: #0f0f0f; color: #f0ebe0; margin: 0; padding: 0; }
                .wrapper { max-width: 600px; margin: 0 auto; background: #1a1a1a; }
                .header { background: #111; padding: 40px; border-bottom: 2px solid #C9A84C; text-align: center; }
                .header h1 { font-size: 24px; color: #C9A84C; margin: 0 0 8px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; }
                .header p { margin: 0; font-size: 12px; color: #888; letter-spacing: 2px; text-transform: uppercase; }
                .body { padding: 48px 40px; text-align: center; }
                .greeting { font-size: 28px; font-weight: 300; color: #f0ebe0; margin-bottom: 20px; font-style: italic; }
                .greeting em { color: #C9A84C; }
                .text { font-size: 14px; line-height: 1.8; color: rgba(240,235,224,0.7); max-width: 440px; margin: 0 auto 32px; }
                .divider { width: 40px; height: 1px; background: #C9A84C; margin: 0 auto 32px; }
                .detail { font-size: 12px; color: #888; letter-spacing: 1px; }
                .footer { padding: 24px 40px; border-top: 1px solid #2a2a2a; text-align: center; }
                .footer p { font-size: 11px; color: #555; letter-spacing: 1px; }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="header">
                  <h1>Prostaff Solution</h1>
                  <p>Private Limited</p>
                </div>
                <div class="body">
                  <div class="greeting">Dear <em>%s</em>,</div>
                  <p class="text">
                    Thank you for reaching out to Prostaff Solution. We have received your enquiry and a member of our team will be in touch with you within <strong style="color:#C9A84C;">24 hours</strong>.
                  </p>
                  <div class="divider"></div>
                  <p class="detail">We look forward to connecting with you.</p>
                </div>
                <div class="footer">
                  <p>Prostaff Solution Private Limited · info@prostaffsolution.com</p>
                  <p style="margin-top:6px;">Monday – Saturday, 9am – 6pm IST</p>
                </div>
              </div>
            </body>
            </html>
            """.formatted(req.getFirstName());
    }
}
