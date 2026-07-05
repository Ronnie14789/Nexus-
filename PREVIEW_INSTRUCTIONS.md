# Preview Instructions — Nexus Field Systems Edition

## View the design without installing anything

Open the `preview` folder:

- `desktop-hero.png` — desktop homepage preview.
- `mobile-hero.png` — mobile homepage preview.
- `static-preview.html` — self-contained offline visual preview of the website.

For the HTML preview, download or extract the file and open it with Microsoft Edge or Google Chrome. It is intended for visual review; server-dependent features are disabled.

## Run the real interactive full-stack website on Windows

1. Install Node.js 20 LTS or newer.
2. Extract the project ZIP completely.
3. Double-click `START_PORTFOLIO.bat`.
4. Keep the terminal window open while using the website.
5. The browser opens automatically at `http://localhost:3001`.
6. Press `Ctrl+C` in the terminal to stop the server.

The first run takes longer because it installs packages and performs a clean production build.

## Run on macOS or Linux

```bash
chmod +x start-portfolio.sh
./start-portfolio.sh
```

## Contact form during local preview

No Formspree account is used.

MongoDB and SMTP are not required merely to test the website. With MongoDB unconfigured, valid messages are written to:

```text
backend/data/contact-submissions.json
```

Email notifications begin only after valid SMTP credentials are added to `backend/.env`.

## Development mode

```bash
npm install
npm run setup
npm run dev
```

Open `http://localhost:5173` for the frontend and `http://localhost:3001/api/health` for the API.
