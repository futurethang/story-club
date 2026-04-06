# Story Club – Deployment Guide
*Get the site live in ~15 minutes, no coding required*

---

## What you're deploying

| Piece | What it does | Cost |
|---|---|---|
| **GitHub Pages** | Hosts your HTML page publicly at a free URL | Free |
| **Google Apps Script** | Receives form submissions → writes to your Google Sheet | Free |
| **Google Sheet** | Your list of signups | Free |

---

## Part 1 — Set up the Google Sheet + Apps Script (10 min)

### 1a. Create your Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Rename the tab at the bottom from "Sheet1" to **Signups**.
3. Add these headers in row 1:

   | A | B | C | D |
   |---|---|---|---|
   | Timestamp | First Name | Last Name | Email |

### 1b. Add the Apps Script

1. In the sheet, click **Extensions → Apps Script**.
2. Delete all the default code in the editor.
3. Paste the entire contents of **`apps-script-backend.gs`** (included in this folder).
4. Click **Save** (the floppy disk icon). Name the project anything you like.

### 1c. Deploy it as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Type" and choose **Web app**.
3. Fill in:
   - **Description:** Story Club v1
   - **Execute as:** Me *(your Google account)*
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Click **Authorize access** and follow the prompts (this is safe — it's your own script).
6. **Copy the Web app URL** — it looks like:
   `https://script.google.com/macros/s/LONG_STRING/exec`
   
   > ⚠️ Keep this URL somewhat private — don't post it publicly. Anyone with it could submit to your sheet, though the script deduplicates emails and validates input.

### 1d. Wire the URL into index.html

Open `index.html` in any text editor and find this line near the bottom:

```js
const SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';
```

Replace `PASTE_YOUR_APPS_SCRIPT_URL_HERE` with your Web app URL. Save the file.

---

## Part 2 — Host on GitHub Pages (5 min)

GitHub Pages is free and gives you a permanent public URL. No account needed beyond a free GitHub login.

### 2a. Create a GitHub account (if needed)
Go to [github.com](https://github.com) and sign up. It's free.

### 2b. Create a repository

1. Click the **+** in the top right → **New repository**.
2. Name it: `story-club` (or anything you like — this becomes part of your URL).
3. Set it to **Public**.
4. Check **"Add a README file"**.
5. Click **Create repository**.

### 2c. Upload your HTML file

1. In your new repo, click **Add file → Upload files**.
2. Drag and drop your updated `index.html`.
3. Click **Commit changes**.

### 2d. Enable GitHub Pages

1. Go to your repo's **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under "Branch", select **main** and **/ (root)**. Click **Save**.
4. After ~1 minute, your site will be live at:

   `https://YOUR-USERNAME.github.io/story-club`

   (GitHub will show you the exact URL on the Pages settings page.)

---

## Part 3 — Update the QR Code

The QR code in this folder currently points to a placeholder URL. Once your site is live:

1. Note your real GitHub Pages URL (e.g. `https://jane-doe.github.io/story-club`).
2. Go to any free QR generator — [qr-code-generator.com](https://www.qr-code-generator.com) works well.
3. Generate a new QR code pointing to your URL.
4. Download as PNG at high resolution (300 DPI if the option exists).
5. Use the included `story-club-qr.png` as a size/layout reference for your sign.

---

## Security notes

The setup here is appropriate for a small, friendly community signup. Here's what's protected:

| Threat | Protection |
|---|---|
| Bot spam | Honeypot hidden field in the form |
| Double-submitting from same browser | Session flag blocks resubmission |
| Duplicate emails in sheet | Apps Script checks before appending |
| Malformed data | Server-side validation in Apps Script |
| Malicious input | Field length caps + email regex on server |

This is **not** meant for sensitive data — it's a literary fiction email list. The protections above are proportionate.

---

## Making updates later

If you want to change the page copy, just edit `index.html` and re-upload it to GitHub. Changes go live in under a minute.

To see all your signups, just open your Google Sheet any time.

---

*Happy reading!*
