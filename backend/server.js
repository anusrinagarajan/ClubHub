import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
}));

app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ahj@2004",
  database: "clubsdb"
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// ------------------------------------------------------------
// GET /api/events
// ------------------------------------------------------------
app.get("/api/events", (req, res) => {
  const sql = `
    SELECT 
      ce.eid AS id,
      ce.event_name AS name,
      ce.description AS description,
      ce.start_time AS date,
      el.location AS location,
      JSON_ARRAYAGG(cet.tag_name) AS categories
    FROM Club_Event ce
    JOIN Event_Location el ON ce.lid = el.lid
    LEFT JOIN Club_Event_to_Club_EventTags ce2t ON ce.eid = ce2t.eid
    LEFT JOIN Club_EventTags cet ON ce2t.tid = cet.tid
    GROUP BY ce.eid
    ORDER BY ce.start_time ASC;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    const formatted = results.map(ev => ({
      ...ev,
      categories: JSON.parse(ev.categories || "[]")
    }));

    res.json(formatted);
  });
});

// ------------------------------------------------------------
// GET /api/clubs
// ------------------------------------------------------------
app.get("/api/clubs", (req, res) => {
  const sql = `
    SELECT 
      c.cid AS id,
      c.club_name AS name,
      c.description AS description,
      JSON_ARRAYAGG(cat.cat_name) AS categories
    FROM Club c
    LEFT JOIN Club_to_Category c2c ON c.cid = c2c.cid
    LEFT JOIN Category cat ON c2c.cat_id = cat.cat_id
    GROUP BY c.cid;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    const formatted = results.map(club => ({
      ...club,
      categories: JSON.parse(club.categories || "[]")
    }));

    res.json(formatted);
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
