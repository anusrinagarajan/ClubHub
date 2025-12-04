// routes/eventsRoutes.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// helper to normalize ISO datetimes into "YYYY-MM-DD HH:MM:SS"
function normalizeDateTime(value) {
  if (!value) return null;
  if (value.includes(" ") && !value.includes("T")) {
    return value;
  }
  let v = value;
  if (v.includes(".")) {
    v = v.split(".")[0];
  }
  v = v.replace("T", " ");
  v = v.replace("Z", "");
  return v;
}

// ------------------------------------------------------------
// GET /api/events        - get data for all events
// GET /api/events?eid=id - retrieve data for individual event
// GET /api/events?cid=id - retrieve data for club's events
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

  if (eid) {
    sql += ` AND ce.eid = ?`;
    params.push(eid);
  }

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

// ------------------------------------------------------------
// GET /api/events/tags/all - list all event tags
// ------------------------------------------------------------
router.get("/tags/all", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT tag_name FROM Club_EventTags ORDER BY tag_name ASC"
    );
    res.json(rows);
    console.log("/api/events/tags/all ran successfully!");
  } catch (err) {
    console.error("DB GET /api/events/tags/all error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------------------------
// POST /api/events - create a new event for a club
// Body: {
//   cid,
//   event_name,
//   description,
//   start_time,
//   end_time,
//   flyer_url,
//   location,
//   event_tags: [tag_name, ...]
// }
// ------------------------------------------------------------
router.post("/", async (req, res) => {
  const {
    cid,
    event_name,
    description,
    start_time,
    end_time,
    flyer_url,
    location,
    event_tags,
  } = req.body;

  console.log("POST /api/events called with:", {
    cid,
    event_name,
    description,
    start_time,
    end_time,
    flyer_url,
    location,
    event_tags,
  });

  const tags = Array.isArray(event_tags) ? event_tags : [];

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // 1) new lid for Event_Location
    const [lidRows] = await conn.query(
      "SELECT COALESCE(MAX(lid), 0) + 1 AS newLid FROM Event_Location"
    );
    const newLid = lidRows[0].newLid;

    await conn.query(
      `
        INSERT INTO Event_Location (lid, virtual_link, location, room_number)
        VALUES (?, ?, ?, ?)
      `,
      [newLid, null, location || "", null]
    );

    // 2) new eid for Club_Event
    const [eidRows] = await conn.query(
      "SELECT COALESCE(MAX(eid), 0) + 1 AS newEid FROM Club_Event"
    );
    const newEid = eidRows[0].newEid;

    const normStart = normalizeDateTime(start_time);
    const normEnd = normalizeDateTime(end_time);

    await conn.query(
      `
        INSERT INTO Club_Event (eid, lid, flyer_url, description, start_time, end_time, event_name)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        newEid,
        newLid,
        flyer_url || "",
        description || "",
        normStart,
        normEnd,
        event_name || "",
      ]
    );

    // 3) link club ↔ event
    await conn.query(
      `
        INSERT INTO Club_to_ClubEvent (cid, eid)
        VALUES (?, ?)
      `,
      [cid, newEid]
    );

    // 4) tags
    if (tags.length > 0) {
      const [tagRows] = await conn.query(
        `
          SELECT tid, tag_name
          FROM Club_EventTags
          WHERE tag_name IN (?)
        `,
        [tags]
      );

      const tidByName = new Map(
        tagRows.map((row) => [row.tag_name, row.tid])
      );

      const values = tags
        .map((name) => {
          const tid = tidByName.get(name);
          if (!tid) return null;
          return [newEid, tid];
        })
        .filter(Boolean);

      if (values.length > 0) {
        await conn.query(
          `
            INSERT INTO Club_Event_to_Club_EventTags (eid, tid)
            VALUES ?
          `,
          [values]
        );
      }
    }

    // 5) fetch full event row in same shape as GET /api/events
    const [events] = await conn.query(
      `
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
        WHERE ce.eid = ?
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
      `,
      [newEid]
    );

    await conn.commit();
    res.json(events[0]);
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("DB POST /api/events error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) await conn.release();
  }
});

// ------------------------------------------------------------
// PUT /api/events/:eid - update event + location + tags
// Body: {
//   event_name, description, start_time, end_time,
//   flyer_url, location, event_tags: [tag_name, ...]
// }
// ------------------------------------------------------------
router.put("/:eid", async (req, res) => {
  const { eid } = req.params;
  const {
    event_name,
    description,
    start_time,
    end_time,
    flyer_url,
    location,
    event_tags,
  } = req.body;

  console.log("PUT /api/events/:eid called with:", {
    eid,
    event_name,
    description,
    start_time,
    end_time,
    flyer_url,
    location,
    event_tags,
  });

  const tags = Array.isArray(event_tags) ? event_tags : [];

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [rows] = await conn.query(
      "SELECT lid FROM Club_Event WHERE eid = ?",
      [eid]
    );

    if (rows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ error: "Event not found" });
    }

    const lid = rows[0].lid;

    const normStart = normalizeDateTime(start_time);
    const normEnd = normalizeDateTime(end_time);

    await conn.query(
      `
        UPDATE Club_Event
        SET event_name = ?, description = ?, start_time = ?, end_time = ?, flyer_url = ?
        WHERE eid = ?
      `,
      [event_name, description, normStart, normEnd, flyer_url, eid]
    );

    await conn.query(
      `
        UPDATE Event_Location
        SET location = ?
        WHERE lid = ?
      `,
      [location, lid]
    );

    // reset tags for this event
    await conn.query(
      `DELETE FROM Club_Event_to_Club_EventTags WHERE eid = ?`,
      [eid]
    );

    if (tags.length > 0) {
      const [tagRows] = await conn.query(
        `
          SELECT tid, tag_name
          FROM Club_EventTags
          WHERE tag_name IN (?)
        `,
        [tags]
      );

      const tidByName = new Map(
        tagRows.map((row) => [row.tag_name, row.tid])
      );

      const values = tags
        .map((name) => {
          const tid = tidByName.get(name);
          if (!tid) return null;
          return [eid, tid];
        })
        .filter(Boolean);

      if (values.length > 0) {
        await conn.query(
          `
            INSERT INTO Club_Event_to_Club_EventTags (eid, tid)
            VALUES ?
          `,
          [values]
        );
      }
    }

    await conn.commit();
    res.json({ message: "Event updated" });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("DB PUT /api/events/:eid error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) await conn.release();
  }
});

// ------------------------------------------------------------
// DELETE /api/events/:eid - delete one event
// ------------------------------------------------------------
router.delete("/:eid", async (req, res) => {
  const { eid } = req.params;

  console.log("DELETE /api/events/:eid called with:", { eid });

  try {
    const [results] = await pool.query(
      `DELETE FROM Club_Event WHERE eid = ?`,
      [eid]
    );
    res.json(results);
  } catch (err) {
    console.error("DB DELETE /api/events/:eid error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
