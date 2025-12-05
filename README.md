# ClubNav
## Overview
A centralized platform that connects users to SJSU clubs and the corresponding club events. 
Users (Verified Students) can: create and log into accounts; browse clubs, club info, and events; favorite clubs; filter clubs by category or favorites; filter events by tags, location, date; search clubs and club events by name.

Admins can: create and remove club events; assign event tags; assign categories to clubs; update all club and event information.

Club Officers can: create and remove events for their clubs; assign tags to their clubs’ events; update their club information and events.

## Detailed Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/anusrinagarajan/ClubHub.git
2. Go to backend -> db.js -> change password field to your MYSQL password
### Backend Setup 
1. Open a terminal window
2. Run the following to start the MySQLserver

   Windows: Replace [] with the path to your mysql.exe
   ```bash
   "[C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe]" -u root -p
   ```

   MacOS: 
     ```bash
     mysql -u root -p
     ```
  
3. Install dependencies
```bash
npm install express cors mysql2
```

3. Run express server
```bash
cd backend
node server.js
```
### Frontend Setup
1. Open a different terminal window for the frontend setup (leave the other terminal window with the backend setup running)
2. Install dependencies
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
## Division of Work
Smriti - Front-end interface, Backend, Indexing, Validation 
Yuwen - ER Diagram, Schema, SQL Implementation, Front-end interface, Backend, Normalization 
Anusri - Schema, SQL Implementation, Front-end interface, Backend, Normalization

## Technology Stack
Programming languages: JavaScript, TypeScript, HTML, CSS
Frameworks: 
Libraries:
Tools: 

## System Architecture Diagram 
<img width="820" height="344" alt="Screenshot 2025-12-04 at 4 19 02 PM" src="https://github.com/user-attachments/assets/c20a01fd-6f61-4a02-b71f-a5fcdf4a3e7b" />

## Documentation
[Final Project Report Document](https://docs.google.com/document/d/157LJhj2lRZT_RCylJPwSrP27OL4OFWvBHGSWjuNb7cs/edit?usp=sharing)
[Final Project Presentation Slides](https://docs.google.com/presentation/d/1qHG219gJp5ciYqLMaYe7p8E8uy6OPvMHmxXs7SIiQwo/edit?usp=sharing)

## Acknowledgements
- lucide-react icons
- react-router-dom
- Google Fonts (Hanken+Grotesk)

## Older README 
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
- Anusri - Tuesday, 12/02/25: Admin & Club Officer initial views of ManageClubs.jsx.
- Anusri - Wednesday, 12/03/25: Admin & Club Officer functionalities and views for clubs and events, functionality to add events, inserted more Clubs, Categories, and Socials in insertData.sql.
- Simi - Wednesday, 12/03/25: Completed Indexing.
- Anusri - Wednesday, 12/03/25: 
- Yuwen - Thursday, 12/04/25: Connected favorites to backend on Clubs and Individual Club page.
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
