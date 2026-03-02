package com.prostaff.controller;

import com.prostaff.dto.ContactRequest;
import com.prostaff.dto.ContactResponse;
import com.prostaff.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<ContactResponse> submitEnquiry(@Valid @RequestBody ContactRequest request) {
        log.info("New contact enquiry from {} ({})", request.getEmail(), request.getProfileType());
        emailService.sendContactEmails(request);
        return ResponseEntity.ok(
            new ContactResponse(true, "Your enquiry has been received. We'll be in touch within 24 hours.")
        );
    }

    // Returns 400 with field errors for validation failures
    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(
            org.springframework.web.bind.MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
            .forEach(err -> errors.put(err.getField(), err.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }
}
