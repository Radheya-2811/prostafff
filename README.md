# Prostaff Solution — Full Stack Website

**Frontend:** Vite 5 + React 18 (Single-Page, smooth-scroll)  
**Backend:** Spring Boot 3 + JavaMail

---

## Project Structure

```
prostaff/
├── frontend/
│   ├── src/
│   │   ├── sections/      ← Hero, About, Services, Contact
│   │   ├── components/    ← Navbar (scroll-based), Footer
│   │   ├── styles/        ← global.css
│   │   ├── App.jsx        ← All sections on one page
│   │   └── main.jsx
│   ├── vite.config.js     ← Proxies /api → localhost:8080
│   └── package.json
│
└── backend/
    └── src/main/java/com/prostaff/
        ├── controller/    ← POST /api/contact
        ├── service/       ← EmailService (admin + auto-reply)
        ├── dto/           ← ContactRequest, ContactResponse
        └── config/        ← CorsConfig
```

---

## How Navigation Works

All sections (Home, About, Services, Contact) live on **one scrollable page**.  
Clicking any nav link smooth-scrolls to that section.  
The active nav link highlights automatically as you scroll.

---

## Setup

### 1. Configure Email

Edit `backend/src/main/resources/application.properties`:

```properties
spring.mail.username=YOUR_GMAIL@gmail.com
spring.mail.password=YOUR_APP_PASSWORD
prostaff.mail.admin-email=info@prostaffsolution.com
prostaff.mail.from-email=YOUR_GMAIL@gmail.com
```

> **Gmail App Password:** Google Account → Security → 2-Step Verification → App Passwords

### 2. Run Backend (Java 17+ required)

```bash
cd backend
./mvnw spring-boot:run
# Runs on http://localhost:8080
```

### 3. Run Frontend (Node 18+ required)

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Vite proxies all `/api/*` requests to Spring Boot automatically.

---

## API — POST /api/contact

```json
{
  "firstName":   "Priya",
  "lastName":    "Sharma",
  "email":       "priya@example.com",
  "phone":       "+91 98765 43210",
  "profileType": "employer",
  "message":     "We are looking for senior retail managers..."
}
```

On submit → two branded HTML emails are sent:
1. **Admin notification** with full enquiry details
2. **Auto-reply** to the enquirer confirming receipt

---

## Production Build

```bash
cd frontend && npm run build          # outputs to frontend/dist/
cp -r frontend/dist/* backend/src/main/resources/static/
cd backend && ./mvnw package
java -jar target/prostaff-backend-1.0.0.jar
# Single JAR serves frontend + API on port 8080
```
