🪙 Gold Tracker API & Web Interface
A professional, mobile-responsive gold price tracking application. This project uses Google Apps Script as a backend API to fetch live data from razak.com.my and displays it via a clean, zero-scroll interface on GitHub Pages.

🚀 Features
Live Scraping: Fetches real-time gold prices using Google's UrlFetchApp.

Custom API: Serves data as JSON via ContentService to bypass CORS restrictions.

Mobile Optimized: Uses specialized viewport meta tags to prevent "zoom-out" issues on mobile devices.

Zero-Scroll UI: A "fixed-frame" design that fits perfectly on any screen size.

🛠️ Technical Architecture
The application is split into two parts to ensure maximum performance and bypass browser security limitations:

1. Backend (Google Apps Script)
Role: Acts as the data engine.

Key Method: doGet(e) returns a JSON payload.

Permission: Deployed with XFrameOptionsMode.ALLOWALL to permit embedding on external domains.

2. Frontend (GitHub Pages)
Role: The user interface.

Mechanism: Uses an <iframe> to host the Google Web App.

Styling: Implements position: fixed and -webkit-scrollbar: none to provide a native app-like experience without browser scrollbars.

📦 Deployment Instructions
To replicate this setup:

Google Apps Script:

Update Code.gs with setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).

Deploy as a Web App set to "Execute as: Me" and "Who has access: Anyone".

Copy the provided /exec URL.

GitHub:

Paste your Web App URL into the src attribute of the iframe in index.html.

Ensure the <meta name="viewport"> tag is present in the <head> to maintain proper scaling on mobile Chrome and Safari.

📄 License
This project is for educational/personal use. Data is sourced from Razak Gold.

🔧 Maintenance Note
Every time the logic in Code.gs is modified, a New Deployment Version must be created in the Google Script editor to reflect changes in the GitHub iframe.
