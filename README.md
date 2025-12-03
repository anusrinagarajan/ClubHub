# ClubNav
## Change Log
- Yuwen - Sunday, 11/23/25: Added navigation + routing; Created events page
- Anusri - Thursday, 11/27/25: Created clubs list page (clubsData.json, Clubs.css, Clubs.jsx, imports folder)
- Simi - Saturday, 11/29/25: Started backend framework (server.js, db.js), established database connection.
- Yuwen - Saturday, 11/29/25: Created individual events page + added photos to events, refactored project structure for readability
- Simi - Sunday, 11/30/25: Created sign up + login pages (authentication, local storage, page ui)
- Yuwen - Sunday, 11/30/25: Created individual clubs page + added photos to clubs list, connected frontend pages to backend
- Yuwen - Monday, 12/1/25: Merged auth_pages to main, added input validation to sign up + login fields, added sign in/log out buttons
- Yuwen - Tuesday, 12/2/25: Connected sign up + login to backend, added route mounting for readability

## Getting Started
<b>Backend</b>
1. Run the following to start the MySQLserver (use path to your mysql.exe)
```bash
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```

3. Install dependencies
```bash
npm install express cors mysql2
```

4. Run express server
```bash
cd backend
node server.js
```

5. Go to
```bash
http://localhost:5000/
```


<b>Frontend</b>
1. Install dependencies
```bash
npm install
```

3. Run application
```bash
npm run dev
```

## Existing accounts:
Club Officer Account
```bash
Username: janed
Password: pw
```

Admin Account
```bash
Username: johns
Password: pw
```

## Acknowledgements
- lucide-react icons
- react-router-dom
- Google Fonts (Hanken+Grotesk)
