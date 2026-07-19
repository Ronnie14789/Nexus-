# Nexus Field Systems Edition — Build and Verification Report

Final verification was completed on 19 July 2026 after the evidence-first content upgrade, responsive disclosure integration and first-party server checks.

## Passed source checks

- Backend ESLint validation.
- Frontend ESLint and TypeScript validation.
- Backend TypeScript production compilation.
- Frontend Vite production build.
- Root `npm run verify` workflow.
- Evidence disclosure TypeScript integration across all public routes.

## Passed runtime checks

- Integrated public homepage: HTTP 200.
- API health endpoint: HTTP 200.
- Administrator login route: HTTP 200.
- Valid contact submission: HTTP 201.
- Invalid contact validation behaviour retained.
- Local JSON contact persistence verified.
- Test contact record removed after verification.
- All nine canonical public routes returned HTTP 200.
- Sitemap, robots controls and required security headers passed the production smoke test.

## Runtime identity

- Portfolio version: `8.0.0`.
- Production-style local server port: `3001`.
- Contact storage during verification: local file fallback.
- MongoDB remains optional for local preview.
- SMTP remains optional for local preview.

## Dependency checks

- Root production dependency audit: 0 known vulnerabilities.
- Frontend production dependency audit: 0 known vulnerabilities.
- Backend production dependency audit: 0 known vulnerabilities.

## Latest frontend output

- Vite version: `8.1.1`.
- Modules transformed: `974`.
- Shared production CSS: `267.86 kB` before gzip and `52.69 kB` gzip.
- Content Disclosure CSS: `4.92 kB` before gzip and `1.55 kB` gzip.
- Main public Home chunk: `40.28 kB` before gzip and `9.83 kB` gzip.
- Shared Content Disclosure chunk: `9.71 kB` before gzip and `3.24 kB` gzip.
- Production build completed successfully.

## Evidence-first content verification

- Every canonical public route includes evidence basis, scope boundary, review date and provenance links.
- Static electrical, automotive and digital console values are labelled as interactive or illustrative reference models.
- Executive Intelligence retains live API and route checks while planning charts remain explicitly identified as models.
- Knowledge Vault numerical confidence percentages were removed and replaced with named evidence classes and traceability coverage.
- Automotive Service Intelligence exposes its evidence-policy version, library review date and record owner.
- IEC, Cummins, OWASP and W3C references are linked from the applicable public routes.

## Packaging and registry checks

- Root, frontend and backend package locks are retained.
- Public npm registry configuration is included in `.npmrc`.
- Windows and Linux launchers use the public npm registry workflow.
- Private MongoDB, SMTP and administrator credentials are intentionally excluded.
- Self-contained offline visual preview and responsive hero screenshots are included.

## Verified contact behaviour

When MongoDB is not configured, messages are stored in:

```text
backend/data/contact-submissions.json
```

When SMTP is not configured, messages remain stored and the server reports that email delivery is not configured. This is expected local-preview behaviour, not a contact-form failure.
