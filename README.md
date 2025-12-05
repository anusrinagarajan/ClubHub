# ClubNav
## Overview
A centralized platform that connects users to SJSU clubs and the corresponding club events. 

Users (verified students) can: Create & log into account (authenticated for SJSU Students only); Browse contents of platform (view clubs, club information, and club events); Filter clubs by category, favorites, & search; Filter club events by categories (event tags), location, search, & order by date/name

Admins can: Has all capabilities of Users; Create & remove club events for only the clubs they manage; Assign tags to club events for only the clubs they manage; Update club information and club events for only the clubs they manage

Club Officers can: Has all capabilities of Users; Create & remove all club events; Assign tags to all club events; Assign categories to all clubs; Update all club information & event information

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

## Testing Key Features 
Email requires @sjsu.edu

Year must be integers 1-4

Login/sign up input fields are required

Only Admin can assign categories to clubs

You (SJSU Student) can only create a user account. You cannot create a Club Officer or Admin account, but you can test the different functionalities of these accounts using the preassigned credentials.

If you favorite a club, it appears in the favorited clubs card. 

## Division of Work
Smriti Jha - Front-end interface, Authentication, Backend, Indexing, Validation 

Yuwen Zhang - ER Diagram, Schema, SQL Implementation, Front-end interface, Backend, Normalization 

Anusri Nagarajan - Schema, SQL Implementation, Front-end interface, Backend, Normalization

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
