// routes/eventsRoutes.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// ------------------------------------------------------------
// GET /api/events        - get data for all events
// GET /api/events?eid=id - retrieve data for individual event
// GET /api/events?cid=id - retrieve events for a specific club
// ------------------------------------------------------------
router.get("/", async (req, res) => {
  const eid = req.query.eid;
  const cid = req.query.cid;

  let sql = `
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
    WHERE 1 = 1
  `;

  const params = [];

  // Get event data for specific event
  if (eid) {
    sql += ` AND ce.eid = ?`;
    params.push(eid);
  }

  // Get event data for specific club
  if (cid) {
    sql += ` AND c.cid = ?`;
    params.push(cid);
  }

  sql += `
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
    ORDER BY ce.start_time ASC
  `;

  try {
    const [results] = await pool.query(sql, params);
    res.json(results);
    console.log("/api/events ran successfully!");
  } catch (err) {
    console.error("DB /api/events error:", err);
    res.status(500).json("an error occurred: " + err);
  }
});

export default router;
