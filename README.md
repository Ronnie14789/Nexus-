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

## Main public experience

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
