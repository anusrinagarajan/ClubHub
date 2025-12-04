// routes/clubRoutes.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// ------------------------------------------------------------
// GET /api/clubs               - get data for all clubs, favorited defaults to 0
// GET /api/clubs?uid=id        - get data for all clubs
// GET /api/clubs?cid=id&uid=id - retrieve data for individual club
// ------------------------------------------------------------
router.get("/", async (req, res) => {
  const cid = req.query.cid;
  const uid = req.query.uid;

  let sql = `
    SELECT 
      c.cid AS id,
      c.club_name AS club_name,
      c.description AS description,
      JSON_ARRAYAGG(cat.cat_name) AS categories,
      JSON_ARRAYAGG(JSON_OBJECT(s.platform, s.link)) AS socials,
      c.image AS image,
  `;

  const params = [];
  if(uid) {
      sql += `
      EXISTS (
        SELECT *
        FROM Favorite f
        WHERE f.cid=c.cid AND f.uid = ?
      ) AS favorited
      `;
      params.push(uid);
      console.log("uid supplied successfully")
  }
  else {
    // Returns all clubs as unfavorited by default when not logged in
    sql += `
      0 AS favorited
      `;
    console.log("Normal - User not logged in OR uid not supplied")
  } 

  sql += `
    FROM Club c
    JOIN Socials s ON s.cid = c.cid
    LEFT JOIN Club_to_Category c2c ON c.cid = c2c.cid
    LEFT JOIN Category cat ON c2c.cat_id = cat.cat_id
    WHERE 1 = 1
  `

  // Retrieves data for specific club only
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

// ------------------------------------------------------------
// GET /api/clubs/officer/:uid  - clubs managed by a given officer
// ------------------------------------------------------------
router.get("/officer/:uid", async (req, res) => {
  const { uid } = req.params;

  const sql = `
    SELECT 
      c.cid AS id,
      c.club_name AS club_name,
      c.description AS description,
      JSON_ARRAYAGG(cat.cat_name) AS categories,
      JSON_ARRAYAGG(JSON_OBJECT(s.platform, s.link)) AS socials,
      c.image AS image
    FROM Club c
    JOIN Club_to_Club_Officer co ON co.cid = c.cid
    JOIN Socials s ON s.cid = c.cid
    LEFT JOIN Club_to_Category c2c ON c.cid = c2c.cid
    LEFT JOIN Category cat ON c2c.cat_id = cat.cat_id
    WHERE co.uid = ?
    GROUP BY
      c.cid,
      c.club_name,
      c.description,
      c.image
  `;

  const params = [uid];

  try {
    const [results] = await pool.query(sql, params);
    res.json(results);
    console.log(`/api/clubs/officer/${uid} ran successfully!`);
  } catch (err) {
    console.error("DB /api/clubs/officer error:", err);
    res.status(500).json(err);
  }
});

// ------------------------------------------------------------
// PUT /api/clubs/:cid - update basic club info
// Body: { club_name, description, image }
// ------------------------------------------------------------
// ------------------------------------------------------------
// PUT /api/clubs/:cid - update basic club info + categories
// Body: { club_name, description, image, categories: [cat_name, ...] }
// ------------------------------------------------------------
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { club_name, description, image, categories } = req.body;

  console.log("PUT /api/clubs/:cid called with:", {
    cid,
    club_name,
    description,
    image,
    categories,
  });

  const catNames = Array.isArray(categories) ? categories : [];

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // update base club info
    await conn.query(
      `
        UPDATE Club
        SET club_name = ?, description = ?, image = ?
        WHERE cid = ?
      `,
      [club_name, description, image, cid]
    );

    // now reset categories for this club
    await conn.query(
      `DELETE FROM Club_to_Category WHERE cid = ?`,
      [cid]
    );

    if (catNames.length > 0) {
      const [rows] = await conn.query(
        `
          SELECT cat_id, cat_name
          FROM Category
          WHERE cat_name IN (?)
        `,
        [catNames]
      );

      const catIdByName = new Map(
        rows.map((row) => [row.cat_name, row.cat_id])
      );

      const values = catNames
        .map((name) => {
          const cat_id = catIdByName.get(name);
          if (!cat_id) return null;
          return [cat_id, cid];
        })
        .filter(Boolean);

      if (values.length > 0) {
        await conn.query(
          `
            INSERT INTO Club_to_Category (cat_id, cid)
            VALUES ?
          `,
          [values]
        );
      }
    }

    await conn.commit();
    res.json({ message: "Club updated" });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("DB PUT /api/clubs/:cid error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) await conn.release();
  }
});

// ------------------------------------------------------------
// GET /api/clubs/categories/all - list all club categories
// ------------------------------------------------------------
router.get("/categories/all", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT cat_name FROM Category ORDER BY cat_name ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error("DB GET /api/clubs/categories/all error:", err);
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------------------------------------------------------
// GET /api/clubs/add-favorite - adds a club to favorites for the logged in user
// Body: { cid, uid }
// -----------------------------------------------------------------------------
router.post("/add-favorite", async (req, res) => {
  const { cid, uid } = req.body;

  const sql = `
    INSERT IGNORE INTO Favorite 
    (cid, uid)
    VALUES (?, ?)
  `;

  const params = [cid, uid];

  try {
    const [results] = await pool.query(sql, params);
    res.status(201).send('Favorite inserted successfully!');
    console.log("/api/club/add-favorite ran successfully! - inserted new favorite");
  } catch (err) {
    console.error("DB /api/club/add-favorite error:", err);
    res.status(500).json(err);
  }
});

// -----------------------------------------------------------------------------------
// GET /api/clubs/remove-favorite - removes a club to favorites for the logged in user
// Body: { cid, uid }
// -----------------------------------------------------------------------------------
router.post("/remove-favorite", async (req, res) => {
  const { cid, uid } = req.body;

  const sql = `
    DELETE FROM Favorite 
    WHERE cid = ? AND uid = ?
  `;

  const params = [cid, uid];

  try {
    const [results] = await pool.query(sql, params);
    res.status(201).send('Favorite removedd successfully!');
    console.log("/api/club/remove-favorite ran successfully! - removed favorite");
  } catch (err) {
    console.error("DB /api/club/remove-favorite error:", err);
    res.status(500).json(err);
  }
});

export default router;
