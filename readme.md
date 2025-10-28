# OpenCampus – Student Safety Web App

An open-source tool to make campus life safer.

## Features

- One-click SOS with live location
- Anonymous report submission
- Awareness section with emergency contacts
- Embedded Google Map with safe spots and nearby police stations

## Built With

- HTML
- CSS
- JavaScript (Google Maps JavaScript API)

## Setup

1. Replace the Google Maps API key in `index .html` (search for `REPLACE_WITH_YOUR_API_KEY` or the key string) with your Maps JavaScript API key.
2. In Google Cloud Console: enable `Maps JavaScript API` and enable billing for the project.
3. If the key is restricted by HTTP referrers, add your local origins (for development):

   - `http://localhost:3000/*`
   - `http://127.0.0.1:3000/*`

4. Run a local static server to test (file:// will not work):

   - Python 3: `python -m http.server 3000`
   - Node (http-server): `npx http-server -p 3000`

## Deploy to GitHub Pages

1. Initialize git and commit the project (if not already):

```bash
git init
git add .
git commit -m "Initial commit - OpenCampus"
```

2. Create a repository on GitHub and add it as a remote, then push:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

3. In the GitHub repo: Settings → Pages → Source → select `main` branch and `/ (root)` → Save. Your site will be published at `https://<your-username>.github.io/<repo-name>/`.

## Deploy to Netlify (drag & drop)

1. Zip the project folder or open Netlify and drag the project folder to Sites → Drag & drop
2. Netlify will host the site and give you a URL. (Optional: connect to GitHub for continuous deploy.)

## Notes

- Keep your API key private. For production, restrict the key by domain referrers.
- If Google Maps shows an error on load, open DevTools Console and check the Maps error message (MissingKeyMapError, BillingNotEnabled, RefererNotAllowedMapError, etc.) and follow the instructions in the console.

**Tip:** avoid committing secret API keys. For local development you can keep the key in a separate file or environment variable and exclude it via `.gitignore` (see `.env.example`).

## Author

Animesh Jha

---

Ready for deployment — follow the steps above to publish the app. Replace placeholders with your GitHub repo and API key where indicated.
