# Ecatu Ronald — Nexus Field Systems Edition

A full-stack professional portfolio for **Ecatu Ronald, Electrical & Automotive Systems Engineer** in Kampala, Uganda.

The platform presents electrical field work, commercial-vehicle diagnostics, warranty operations, technical reporting, Tata Motors SkillPro training in Jamshedpur, and digital engineering as one connected professional system.

This package is not a static template. It includes the React website, Express API, first-party contact server, MongoDB integration, secure local persistence fallback, SMTP email support, protected administration routes, deployment files, launch scripts and an offline visual preview.

## Design direction

The Nexus edition is built around one idea:

> **Evidence becomes engineering.**

The visual system combines a cinematic engineering grid with an editorial presentation of real field evidence.

- Main identity: **Electrical & Automotive Systems Engineer**.
- Three connected disciplines: **Power, Motion and Intelligence**.
- Field route: **Uganda → India → Uganda**.
- Engineering method: **Observe → Measure → Isolate → Verify → Document**.
- Hero photography centred on the selected Tata Motors SkillPro portrait.
- Technical interface details balanced with large editorial typography.
- A restrained palette of midnight navy, cobalt, cyan, warm white and signal green.
- Purpose-built desktop and mobile compositions.
- Accessible keyboard navigation, visible focus states, reduced-motion support and dark/light themes.

## Main public sections

1. **Nexus Hero** — professional positioning, route, diagnostic loop and direct actions.
2. **Engineering Profile** — professional purpose, operating principles and career direction.
3. **Systems Atlas** — interactive Power, Motion and Intelligence capability model.
4. **Field Record** — verified work history across automotive and electrical environments.
5. **Training & Education** — formal education and Tata Motors SkillPro development.
6. **Uganda–India–Uganda Journey** — foundation, international expansion and application.
7. **Engineering Casebook** — projects structured around problem, method and outcome.
8. **International Gallery** — SkillPro, Cummins and industrial-exposure evidence.
9. **Leadership Direction** — integrity, management and consultancy ambition.
10. **First-party Contact System** — secure contact form connected to the included server.

## First-party contact server

The public contact form sends directly to the included API:

```text
POST /api/contact
```

The server provides:

- Server-side validation and sanitisation.
- Honeypot and form-timing spam protection.
- Request rate limiting and security headers.
- Consent capture.
- Hashed IP metadata instead of raw IP storage.
- MongoDB persistence when configured.
- Automatic local JSON fallback storage during local preview.
- Administrator notifications and visitor acknowledgements through SMTP.
- Protected administration routes for message management.

Without MongoDB, valid messages are saved to:

```text
backend/data/contact-submissions.json
```

Without SMTP, messages remain stored but email notifications are not delivered.

## Technology

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- Framer Motion
- Axios
- Responsive custom design system

### Backend

- Node.js and Express
- TypeScript
- MongoDB and Mongoose
- Nodemailer and Handlebars templates
- JWT authentication
- Helmet, CORS, rate limiting, validation and structured logging
- Optional Redis and Sentry integrations

## Preview the design immediately

Open the `preview` folder:

- `desktop-hero.png` — desktop opening experience.
- `mobile-hero.png` — mobile opening experience.
- `static-preview.html` — self-contained offline visual preview.

The static preview is for design review. The real contact form, database, email delivery and administration tools require the full project server.

## Run the complete portfolio on Windows

1. Extract the ZIP completely.
2. Open the extracted project folder.
3. Double-click `START_PORTFOLIO.bat`.
4. The first run installs packages and builds both applications.
5. The browser opens at `http://localhost:3001`.
6. Keep the server window open while using the website.

Node.js 20 LTS or newer is recommended.

## Run on macOS or Linux

```bash
chmod +x start-portfolio.sh
./start-portfolio.sh
```

## Development

```bash
npm install
npm run setup
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend/API: `http://localhost:3001`
- API health: `http://localhost:3001/api/health`

The health response includes `contactStorage` plus a `database` object so you can quickly confirm whether MongoDB is connected, merely configured, or currently falling back to local file storage.

Build and serve the production-style application:

```bash
npm run preview:full
```

## Server configuration

Copy the example environment file:

```bash
cp backend/.env.example backend/.env
```

On Windows:

```bat
copy backend\.env.example backend\.env
```

For local use without MongoDB:

```env
DATABASE_REQUIRED=false
CONTACT_FALLBACK_FILE=./data/contact-submissions.json
```

For production MongoDB:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.SUBDOMAIN.mongodb.net/ecatu_portfolio?retryWrites=true&w=majority&appName=AppName
DATABASE_REQUIRED=true
```

If `backend/.env` is missing or `MONGODB_URI` is unset, the backend logs a startup warning and `/api/health` reports that contact storage has fallen back to the local file.

For email delivery:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
ADMIN_EMAIL=ronaldecatu@gmail.com
EMAIL_FROM_NAME=Ecatu Ronald Portfolio
```

Never place credentials in frontend files or commit the real `.env` file.

## Administrator setup

Add secure administrator values to `backend/.env`, then run:

```bash
npm run admin:create
```

Administrator login:

```text
http://localhost:3001/admin/login
```

## Quality verification

```bash
npm run verify
```

This runs backend linting, frontend linting and TypeScript validation, then production builds for both applications.

## Main editing locations

```text
frontend/src/data/portfolio.ts              Biography, jobs, education, skills, projects and gallery
frontend/src/components/nexus/              Nexus public experience components
frontend/src/components/Header.tsx          Main navigation and mobile menu
frontend/src/components/Contact.tsx         First-party contact interface
frontend/src/nexus.css                      Nexus design system and responsive rules
frontend/src/index.css                      Shared and administration styles
frontend/public/images/                     Optimised photographs and social artwork
backend/src/routes/contact.ts               Contact validation and routing
backend/src/controllers/                    API behaviour
backend/src/services/contactStore.ts        Database and file persistence
backend/src/services/emailService.ts        Email delivery
backend/src/templates/                      Email templates
```

## Owner-supplied items still required before public launch

- Final CV PDF.
- Certificate scans.
- Public GitHub profile and project repository links.
- Final domain.
- Production MongoDB credentials.
- SMTP credentials.
- Permission to publish each group photograph.
- Verified testimonials.

See `NEXUS_UPGRADE_REPORT.md`, `BUILD_REPORT.md`, `SERVER_SETUP.md`, `PREVIEW_INSTRUCTIONS.md` and `LAUNCH_CHECKLIST.md`.
