# Portfolio Server Setup

## Architecture

```text
Visitor's browser
       │
       ├── React portfolio pages
       │
       └── POST /api/contact
                │
                ▼
       Express portfolio server
          ├── validation and sanitisation
          ├── rate limiting and anti-spam checks
          ├── MongoDB storage
          ├── JSON-file fallback
          ├── email acknowledgement to visitor
          └── email notification to Ecatu
```

Formspree is not used.

## Storage modes

### MongoDB mode — recommended for production

Set:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@HOST/ecatu_portfolio
DATABASE_REQUIRED=true
```

The health endpoint reports:

```json
{"contactStorage":"mongodb"}
```

### Local server-file mode — useful for preview and small private deployments

Set:

```env
MONGODB_URI=
DATABASE_REQUIRED=false
CONTACT_FALLBACK_FILE=./data/contact-submissions.json
```

The health endpoint reports:

```json
{"contactStorage":"file"}
```

File fallback keeps the form operational, but a production host must use persistent storage. Ephemeral hosting filesystems may erase locally stored messages during redeployment.

## SMTP provider configuration

### Gmail

Use a Google App Password rather than the normal Gmail password:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-address
SMTP_PASS=your-google-app-password
```

### Brevo or Resend

Use the SMTP host, port, login, and generated SMTP key shown in the provider dashboard. Keep `SMTP_SECURE=false` for port 587 or set it to `true` when the provider requires port 465.

The portfolio sends two emails per valid contact message:

1. An acknowledgement to the visitor.
2. A notification to `ADMIN_EMAIL`, with the visitor's address set as `Reply-To`.

A message is saved before email delivery starts. An SMTP failure therefore does not destroy the contact submission.

## Security variables

Generate unique values for:

```env
JWT_SECRET=at-least-32-random-characters
IP_HASH_SALT=another-long-random-value
ADMIN_PASSWORD=a-long-unique-password
```

Do not reuse passwords and do not publish `backend/.env`.

## CORS and website URL

For a one-container deployment:

```env
FRONTEND_URL=https://your-domain.example
ALLOWED_ORIGINS=https://your-domain.example
```

For local development:

```env
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3001
```

Multiple origins are comma-separated without spaces.

## Admin account

After MongoDB is connected:

```bash
npm run admin:create
```

Open:

```text
/admin/login
```

The public navigation intentionally does not advertise the admin route.

## Health check

```text
GET /api/health
```

A healthy response includes the timestamp, version, and active contact-storage mode.

## Contact API contract

```text
POST /api/contact
Content-Type: application/json
```

Required fields:

```json
{
  "name": "Visitor name",
  "email": "visitor@example.com",
  "phone": "+256...",
  "enquiryType": "Professional collaboration",
  "subject": "Project discussion",
  "message": "A meaningful message with at least twenty characters.",
  "consent": true,
  "companyWebsite": "",
  "startedAt": 1760000000000
}
```

`companyWebsite` is a hidden honeypot. `startedAt` is generated in the browser and used to reject unrealistically fast automated submissions.

## Backups

For MongoDB Atlas, enable scheduled backups on an eligible plan or export the database regularly. For local MongoDB, use `mongodump`. For JSON fallback, back up `backend/data/contact-submissions.json` and ensure the hosting volume is persistent.
