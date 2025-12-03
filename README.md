# ClubNav
## Change Log
- Yuwen - Sunday, 11/23/25: Added navigation + routing; Created events page
- Anusri - Thursday, 11/27/25: Created clubs list page (clubsData.json, Clubs.css, Clubs.jsx, imports folder)
- Simi - Saturday, 11/29/25: Started backend framework (server.js, db.js), established database connection.
- Yuwen - Saturday, 11/29/25: Created individual events page + added photos to events, refactored project structure for readability
- Simi - Sunday, 11/30/25: Created sign up + login pages (authentication, local storage, page ui)
- Yuwen - Sunday, 11/30/25: Created individual clubs page + added photos to clubs list, connected frontend pages to backend
- Yuwen - Monday, 12/01/25: Merged auth_pages to main, added input validation to sign up + login fields, added sign in/log out buttons
- Yuwen - Tuesday, 12/02/25: Connected sign up + login to backend, added route mounting for readability
- Simi  - Wednesday, 12/03/25: Improved project startup documentation with detailed setup frontend/backend steps for MacOS users.

### **Prerequisites**
1. Clone the repository:
   ```bash
   git clone <repo-link>
2. Go to backend -> db.js -> change password field to your MYSQL password

## Getting Started
<b>Backend</b>
1. Run the following to start the MySQLserver

Windows: (use path to your mysql.exe)
```bash
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```
  
MacOS: 
  ```bash
  mysql -u root -p
  ```
  
2. Install dependencies
```bash
npm install express cors mysql2
```

3. Run express server
```bash
cd backend
node server.js
```

Windows Only:

4. Go to
```bash
http://localhost:5000/
```
MacOS:
1. Open a new terminal window
2. Go into the cloned folder

<b>Frontend</b>
1. Install dependencies
```bash
npm install
```

2. Run application
```bash
npm run dev
```
3. Copy the localhost link and paste into browser

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
