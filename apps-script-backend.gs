// ============================================================
// Story Club – Seattle Chapter  |  Google Apps Script Backend
// ============================================================
//
// SETUP STEPS:
//
// 1. Open your Google Sheet (or create a new one).
//    Name the first sheet tab: "Signups"
//    Add these headers in row 1:
//      A1: Timestamp   B1: First Name   C1: Last Name   D1: Email
//
// 2. In the sheet, go to: Extensions → Apps Script
//
// 3. Delete any existing code and paste THIS entire file.
//
// 4. Click "Save" (floppy disk icon).
//
// 5. Click "Deploy" → "New deployment"
//    - Type: Web app
//    - Description: Story Club signup v1
//    - Execute as: Me
//    - Who has access: Anyone          ← important!
//    Click "Deploy", authorize when prompted.
//
// 6. Copy the Web app URL (looks like:
//    https://script.google.com/macros/s/ABC.../exec)
//
// 7. Open index.html and replace PASTE_YOUR_APPS_SCRIPT_URL_HERE
//    with that URL.
//
// ============================================================

const SHEET_NAME = "Signups";

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    // Parse incoming JSON
    const data = JSON.parse(e.postData.contents);

    // Basic server-side validation
    const email = (data.email || "").trim().toLowerCase();
    const firstName = (data.firstName || "").trim().slice(0, 100);
    const lastName  = (data.lastName  || "").trim().slice(0, 100);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ status: "error", message: "Invalid email" });
    }

    // Deduplicate: check if email already exists
    const emails = sheet.getRange(2, 4, Math.max(sheet.getLastRow() - 1, 1), 1).getValues().flat();
    if (emails.includes(email)) {
      // Return success silently — no need to alarm the user
      return jsonResponse({ status: "ok", message: "Already registered" });
    }

    // Append the row
    sheet.appendRow([
      new Date(),   // Timestamp
      firstName,
      lastName,
      email,
    ]);

    return jsonResponse({ status: "ok" });

  } catch (err) {
    console.error(err);
    return jsonResponse({ status: "error", message: err.toString() });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Convenience: lets you test by visiting the URL directly in a browser
function doGet(e) {
  return ContentService
    .createTextOutput("Story Club signup endpoint is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}
