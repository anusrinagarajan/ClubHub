# ClubNav
## Change Log
- Y - Sunday, 11/23/25: Added navigation + routing; Created events page
- A - Thursday, 11/27/25: Created clubs list page (clubsData.json, Clubs.css, Clubs.jsx, imports folder)
- Y - Saturday, 11/30/25: Created individual events page + added photos to events, refactored project structure for readability
- Y - Sunday, 12/1/25: Created individual clubs page + added photos to clubs list
  - Refactored backend with database/table/data initialization + connection cool + async/await for readability
  - Connected frontend pages to backend

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

## Acknowledgements
- lucide-react icons
- react-router-dom
- Google Fonts (Hanken+Grotesk)
