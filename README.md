# Story Club — Seattle Chapter

Public signup page for a Seattle-area literary fiction community group.

## Stack

- **Frontend:** Single `index.html` — no build step, no dependencies
- **Backend:** Google Apps Script web app → Google Sheets
- **Hosting:** GitHub Pages

## Quick deploy

1. Follow `DEPLOYMENT-GUIDE.md` to set up the Google Apps Script and Sheet
2. In `index.html`, replace `PASTE_YOUR_APPS_SCRIPT_URL_HERE` with your deployed script URL
3. Enable GitHub Pages on this repo (Settings → Pages → Branch: main / root)
4. Site is live at `https://YOUR-USERNAME.github.io/story-club`

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire site — edit copy here |
| `apps-script-backend.gs` | Paste into Google Apps Script editor |
| `story-club-qr.png` | Placeholder QR — regenerate after deploy |
| `DEPLOYMENT-GUIDE.md` | Full step-by-step setup instructions |
