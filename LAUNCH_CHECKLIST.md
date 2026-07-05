# Final Launch Checklist

## Identity and content

- [x] Use **Electrical & Automotive Systems Engineer** as the primary professional title.
- [x] Use the blue Tata Motors SkillPro portrait as the homepage image.
- [x] Present the Uganda–India engineering journey.
- [x] Add Tata Uganda, China Machines, and Tetra Technical Services experience.
- [x] Add verified education, training, languages, contact details, and LinkedIn profile.
- [ ] Add the final CV PDF when it is completed.
- [ ] Upload certificate scans after confirming the final versions.
- [ ] Add real GitHub and live project links when available.
- [ ] Obtain permission before publishing group photographs containing colleagues.
- [ ] Add only genuine, approved testimonials.

## Server and security

- [x] Replace Formspree with the included Express contact API.
- [x] Add validation, sanitisation, rate limiting, consent capture, honeypot protection, and timing checks.
- [x] Store a hash of the visitor IP rather than the raw IP address.
- [x] Save messages before attempting email delivery.
- [x] Support MongoDB plus a local JSON fallback.
- [x] Add protected admin contact routes.
- [ ] Create a production MongoDB database.
- [ ] Set `DATABASE_REQUIRED=true` in production.
- [ ] Generate unique `JWT_SECRET` and `IP_HASH_SALT` values.
- [ ] Configure SMTP and send a real end-to-end contact test.
- [ ] Create the first admin account with `npm run admin:create`.
- [ ] Restrict `ALLOWED_ORIGINS` to the final HTTPS domain.
- [ ] Confirm the host provides persistent storage and backups.

## Domain and deployment

- [ ] Purchase or confirm the final domain.
- [ ] Add the final canonical URL and convert social-sharing image URLs to the final absolute HTTPS domain.
- [ ] Configure DNS and HTTPS.
- [ ] Add the final domain to `FRONTEND_URL` and `ALLOWED_ORIGINS`.
- [ ] Confirm `/api/health`, `/admin/login`, and the public contact form on the deployed website.
- [ ] Test on Chrome, Edge, Firefox, Android, and iPhone.
- [ ] Test at 320 px, 375 px, 768 px, 1024 px, and wide desktop widths.
- [ ] Test keyboard navigation, reduced-motion mode, and both themes.

## Verification completed in this package

- [x] Frontend TypeScript check.
- [x] Backend ESLint check.
- [x] Frontend production build.
- [x] Backend production build.
- [x] Integrated server runtime test.
- [x] Direct React route fallback test.
- [x] Valid, invalid, and spam-filtered contact-form tests.
- [x] Frontend and backend package audits with no known vulnerabilities at the time of packaging.
