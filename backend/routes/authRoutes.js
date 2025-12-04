// routes/authRoutes.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// -----------------------------------------------------------------------------------
// GET /api/auth/check-exists?username=user - returns all users w/ matching username
// GET /api/auth/check-exists?email=email   - returns all users w/ matching email
// -----------------------------------------------------------------------------------
router.get("/check-exists", async (req, res) => {
  const username = req.query.username;
  const email = req.query.email;

  let sql = `
    SELECT *
    FROM User u
    WHERE 1 = 1
  `;

  const params = [];

  if (username) {
    sql += ` AND BINARY u.username = ?`; //binary - forces case-sensitive comparison
    params.push(username);
  }
  if (email) {
    sql += ` AND BINARY u.email = ?`;
    params.push(email);
  }

  try {
    const [results] = await pool.query(sql, params);
    res.json(results);
    console.log("/api/auth/checkExists ran successfully!");
  } catch (err) {
    console.error("DB /api/checkExists error:", err);
    res.status(500).json(err);
  }
});

// ------------------------------------------------------------
// POST /api/auth/signup - inserts new user account
// ------------------------------------------------------------
router.post("/signup", async (req, res) => {
  const { first_name, last_name, college_year, email, username, password, is_Club_Officer, is_Admin } = req.body;

  const sql = `
    INSERT IGNORE INTO User 
    (first_name, last_name, college_year, email, username, password, is_Club_Officer, is_Admin)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [first_name, last_name, college_year, email, username, password, is_Club_Officer, is_Admin];

  try {
    const [results] = await pool.query(sql, params);
    res.json(results);
    console.log("/api/auth/signup ran successfully! - inserted new user");
  } catch (err) {
    console.error("DB /api/auth/signup error:", err);
    res.status(500).json(err);
  }
});


// ------------------------------------------------------------
// POST /api/auth/login
// ------------------------------------------------------------
router.post("/login", async (req, res) => {
  const { usernameOrEmail } = req.body;

  const sql = `
    SELECT uid, first_name, last_name, college_year, email, username, password, is_Club_Officer, is_Admin
    FROM User u
    WHERE BINARY u.username = ? OR u.email = ?
  `;

  console.log("searching for user w/: " + usernameOrEmail);
  const params = [usernameOrEmail, usernameOrEmail];

  try {
    const [results] = await pool.query(sql, params);
    res.json(results);
    console.log("/api/auth/login ran successfully!");
  } catch (err) {
    console.error("DB /api/auth/login error:", err);
    res.status(500).json(err);
  }
});

export default router;
