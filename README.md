# Ecatu Ronald — Nexus Field Systems Edition

A full-stack professional portfolio for **Ecatu Ronald, Electrical & Automotive Systems Engineer** in Kampala, Uganda.

The platform presents electrical field work, commercial-vehicle diagnostics, warranty operations, technical reporting, Tata Motors SkillPro training in Jamshedpur, and digital engineering as one connected professional system.

This package is not a static template. It includes the React website, Express API, first-party contact server, MongoDB integration, secure local persistence fallback, SMTP email support, protected administration routes, deployment files, launch scripts and an offline visual preview.

## Design direction

The Nexus edition is built around one idea:

> **Evidence becomes engineering.**

The visual system combines a cinematic engineering grid with an editorial presentation of real field evidence.

- Company identity: **Nexus by Ecatu Ronald**.
- Nexus definition: one core connecting **Power, Motion and Intelligence**.
- Main identity: **Electrical & Automotive Systems Engineer**.
- Three connected disciplines: **Power, Motion and Intelligence**.
- Field route: **Uganda → India → Uganda**.
- Engineering method: **Observe → Measure → Isolate → Verify → Document**.
- Hero photography centred on the selected Tata Motors SkillPro portrait.
- Technical interface details balanced with large editorial typography.
- A restrained palette of midnight navy, cobalt, cyan, warm white and signal green.
- Purpose-built desktop and mobile compositions.
- Accessible keyboard navigation, visible focus states, reduced-motion support and dark/light themes.

### Nexus company direction

Nexus is presented as a future systems-company direction growing from Ronald’s professional foundation. The identity uses an orbital core: three connected nodes represent electrical power, automotive motion and digital intelligence. The current website does not claim that Nexus is already incorporated.

The development path is intentionally separated into three stages:

1. **Professional foundation** — experience, evidence, public work and operating standards.
2. **Product platform** — focused knowledge, diagnostics and workflow products.
3. **Systems company** — a responsible enterprise providing connected engineering, digital and advisory services.

## Main public experience

1. **Nexus Hero** — professional positioning, company mark, route, diagnostic loop and direct actions.
2. **Nexus Company Seed** — definition, domain architecture and honest development roadmap.
3. **Engineering Profile** — professional purpose, operating principles and career direction.
4. **Systems Atlas** — interactive Power, Motion and Intelligence capability model.
5. **Field Record** — verified work history across automotive and electrical environments.
6. **Training & Education** — formal education and Tata Motors SkillPro development.
7. **Uganda–India–Uganda Journey** — foundation, international expansion and application.
8. **Evidence-backed Engineering Casebook** — projects structured around problem, method and outcome, with evidence class, review date, scope boundary, verification rule, public links and the next evidence milestone.
9. **International Gallery** — SkillPro, Cummins and industrial-exposure evidence.
10. **Leadership Direction** — integrity, management and consultancy ambition.
11. **First-party Contact System** — secure contact form connected to the included server.

## Public system routes

- `/about` — detailed professional identity, experience, education and verified public profiles.
- `/electrical-systems` — interactive electrical architecture, diagnostics, tools, safety and reference models.
- `/automotive-systems` — vehicle architecture, diagnostic workflows, field logic, maintenance and safety.
- `/automotive-systems/intelligence` — anonymized automotive service records with evidence and specification boundaries.
- `/automotive-systems/diagnostics` — deterministic, explainable diagnostic decision support.
- `/digital-systems` — software architecture, data, security, delivery and operations references.
- `/executive-intelligence` — real API and route checks separated from strategic planning models.
- `/knowledge-vault` — searchable cross-domain procedures, field cases and evidence classes.

## Content trust model

Every public route includes a visible **Content Trust** disclosure that states:

- what evidence supports the page;
- what the information does and does not claim;
- when the page was last reviewed;
- which public, manufacturer or standards references are relevant.

The Knowledge Vault uses named evidence classes—`verified`, `field-proven`, `reference` and `developing`—instead of unsupported numerical confidence scores. Static educational examples are labelled as reference models. Only the Executive Intelligence API and route checks are described as live runtime readings.

The Engineering Casebook follows the same discipline. Publicly verifiable work links to its live system and source history; professional records are explicitly anonymized; work in development is not presented as production-ready; and unmeasured time or cost savings are not claimed.

Current public references include IEC low-voltage installation and verification publications, Cummins INSITE product information, OWASP ASVS, W3C WCAG, the Nexus source repository and Ronald’s linked professional profiles.

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
- A unified, responsive correspondence design for contact, newsletter and publication emails.
- Plain-text alternatives for every HTML email and visible reference numbers for contact follow-up.
- Protected administration routes for message management.

Without MongoDB, valid messages are saved to:

```text
backend/data/contact-submissions.json
```

Without SMTP, messages remain stored but email notifications are not delivered.

### Email correspondence system

All transactional and publication templates use a restrained professional identity, table-based email layout, inline critical styling, mobile adjustments and descriptive preheader text. Contact messages preserve the enquiry category, subject, submitted content, timestamp and reference number. Administrator notifications include direct reply and contact-record actions, while public confirmations explain what happens next without promising a response time.

Every HTML template has a matching plain-text version. Future template changes should keep both versions aligned and must not remove unsubscribe links from newsletter or publication messages.

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
