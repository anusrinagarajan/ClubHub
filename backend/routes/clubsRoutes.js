// routes/clubRoutes.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// ------------------------------------------------------------
// GET /api/clubs        - get data for all clubs
// GET /api/clubs?cid=id - retrieve data for individual club
// ------------------------------------------------------------
router.get("/", async (req, res) => {
  const cid = req.query.cid;

  let sql = `
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
    WHERE 1 = 1
  `;

  const params = [];

  
  // Get club data for specific club
  if (cid) {
    sql += ` AND c.cid = ?`;
    params.push(cid);
  }

  sql += `
    GROUP BY
      c.cid,
      c.club_name,
      c.description,
      c.image
  `;

  try {
    const [results] = await pool.query(sql, params);
    res.json(results);
    console.log("/api/clubs ran successfully!");
  } catch (err) {
    console.error("DB /api/clubs error:", err);
    res.status(500).json(err);
  }
});

export default router;
