import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import fs from "fs";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
}));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  // don't set database yet – we create it first if not exists
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

async function initDb() {
  let conn;
  try {
    conn = await pool.getConnection();

    console.log("Connected to MySQL server");

    // Create clubsdb database if not exists
    await conn.query("CREATE DATABASE IF NOT EXISTS clubsdb");
    console.log("Database 'clubsdb' is ready");

    // Switch to clubsdb database for this connection
    await conn.changeUser({ database: "clubsdb" });
    console.log("Now using database 'clubsdb'");

    // Execute CREATE TABLE statements
    const createTableSQL = fs.readFileSync("./createTables.sql", "utf8");
    await conn.query(createTableSQL);
    console.log("createTables.sql executed successfully!");

    // Execute INSERT INTO statements
    const insertDataSQL = fs.readFileSync("./insertData.sql", "utf8");
    await conn.query(insertDataSQL);
    console.log("insertData.sql executed successfully!");

  } catch (err) {
    console.error("DB init error:", err);
    process.exit(1); // optional: crash if init fails
  } finally {
    if (conn) conn.release();
  }
}

// Run db init at startup
initDb();

// ------------------------------------------------------------
// GET /api/events
// ------------------------------------------------------------
app.get("/api/events", async (req, res) => {
  const sql = `
    SELECT 
      ce.eid AS eid,
      ce.event_name AS event_name,
      ce.start_time AS start_time,
      c.cid AS cid,
      c.club_name AS club_name,
      ce.end_time AS end_time,
      ce.flyer_url AS flyer_url,
      el.location AS location,
      JSON_ARRAYAGG(cet.tag_name) AS event_tags,
      ce.description AS description
    FROM Club_Event ce
    JOIN Event_Location el ON ce.lid = el.lid
    JOIN Club_to_ClubEvent c2ce ON c2ce.eid = ce.eid
    JOIN Club c ON c.cid = c2ce.cid
    LEFT JOIN Club_Event_to_Club_EventTags ce2t ON ce.eid = ce2t.eid
    LEFT JOIN Club_EventTags cet ON ce2t.tid = cet.tid
    GROUP BY 
      ce.eid,
      ce.event_name,
      ce.start_time,
      c.cid,
      c.club_name,
      ce.end_time,
      ce.flyer_url,
      el.location,
      ce.description
    ORDER BY ce.start_time ASC;
  `;

  try {
    const [results] = await pool.query(sql);
    res.json(results);
    console.log("/api/events ran successfully!")
  } catch (err) {
    console.error("DB /api/events error:", err);
    res.status(500).json("an error occurred: " + err);
  }
});

// ------------------------------------------------------------
// GET /api/clubs
// ------------------------------------------------------------
app.get("/api/clubs", async (req, res) => {
  const sql = `
    SELECT 
      c.cid AS id,
      c.club_name AS club_name,
      c.description AS description,
      JSON_ARRAYAGG(cat.cat_name) AS categories,
      JSON_ARRAYAGG(JSON_OBJECT(s.platform, s.link)) AS socials,
      c.image AS image
    FROM Club c
    JOIN Socials s ON s.cid = c.cid
    LEFT JOIN Club_to_Category c2c ON c.cid = c2c.cid
    LEFT JOIN Category cat ON c2c.cat_id = cat.cat_id
    GROUP BY
      c.cid,
      c.club_name,
      c.description,
      c.image;
  `;

  try {
    const [results] = await pool.query(sql);
    res.json(results);
    console.log("/api/clubs ran successfully!")
  } catch (err) {
    console.error("DB /api/clubs error:", err);
    res.status(500).json(err);
  }
});

// ------------------------------------------------------------
// GET /api/individual-event
// ------------------------------------------------------------
app.get("/api/individual-event", async (req, res) => {
  const eid = req.query.eid
  const sql = `
    SELECT 
      ce.eid AS eid,
      ce.event_name AS event_name,
      ce.start_time AS start_time,
      c.cid AS cid,
      c.club_name AS club_name,
      ce.end_time AS end_time,
      ce.flyer_url AS flyer_url,
      el.location AS location,
      JSON_ARRAYAGG(cet.tag_name) AS event_tags,
      ce.description AS description
    FROM Club_Event ce
    JOIN Event_Location el ON ce.lid = el.lid
    JOIN Club_to_ClubEvent c2ce ON c2ce.eid = ce.eid
    JOIN Club c ON c.cid = c2ce.cid
    LEFT JOIN Club_Event_to_Club_EventTags ce2t ON ce.eid = ce2t.eid
    LEFT JOIN Club_EventTags cet ON ce2t.tid = cet.tid
    WHERE ce.eid = ${eid}
    GROUP BY 
      ce.eid,
      ce.event_name,
      ce.start_time,
      c.cid,
      c.club_name,
      ce.end_time,
      ce.flyer_url,
      el.location,
      ce.description
    ORDER BY ce.start_time ASC;
  `;

  try {
    const [results] = await pool.query(sql);
    res.json(results);
    console.log("/api/individual-event ran successfully!")
  } catch (err) {
    console.error("DB /api/events error:", err);
    res.status(500).json("an error occurred: " + err);
  }
});

// ------------------------------------------------------------
// GET /api/individual-club
// ------------------------------------------------------------
app.get("/api/individual-club", async (req, res) => {
  const cid = req.query.cid;
  const sql = `
    SELECT 
      c.cid AS id,
      c.club_name AS club_name,
      c.description AS description,
      JSON_ARRAYAGG(cat.cat_name) AS categories,
      JSON_ARRAYAGG(JSON_OBJECT(s.platform, s.link)) AS socials,
      c.image AS image
    FROM Club c
    JOIN Socials s ON s.cid = c.cid
    LEFT JOIN Club_to_Category c2c ON c.cid = c2c.cid
    LEFT JOIN Category cat ON c2c.cat_id = cat.cat_id
    WHERE c.cid = ${cid}
    GROUP BY
      c.cid,
      c.club_name,
      c.description,
      c.image;
  `;

  try {
    const [results] = await pool.query(sql);
    res.json(results);
    console.log("/api/clubs ran successfully!")
  } catch (err) {
    console.error("DB /api/clubs error:", err);
    res.status(500).json(err);
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
