// db.js
// db init function, connection pool

import mysql from "mysql2/promise";
import fs from "fs";

const DB_NAME = "clubsdb";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ahj@2004",
  // don't set database yet – we create it first if not exists
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

export async function initDb() {
  let conn;
  try {

    conn = await pool.getConnection();
    console.log("Connected to MySQL server");

    // Create clubsdb database if not exists
    await conn.query("CREATE DATABASE IF NOT EXISTS clubsdb");
    console.log("Database 'clubsdb' is ready");

    // Switch to clubsdb database
    await conn.changeUser({ database: "clubsdb" });
    console.log("Now using database 'clubsdb'");

    // Execute CREATE TABLE statements
    const createTableSQL = fs.readFileSync("./createTables.sql", "utf8");
    await conn.query(createTableSQL);
    console.log("createTables.sql executed successfully!");

    // Execute INSERT statements
    const insertDataSQL = fs.readFileSync("./insertData.sql", "utf8");
    await conn.query(insertDataSQL);
    console.log("insertData.sql executed successfully!");

    // Execute INDEX statements
    if (fs.existsSync("./indexes.sql")) {
      const indexSQL = fs.readFileSync("./indexes.sql", "utf8");
      await conn.query(indexSQL);
      console.log("indexes.sql executed successfully!");
    } else {
      console.log("No indexes.sql file found — skipping index creation.");
    }

  } catch (err) {
    console.error("DB init error:", err);
    process.exit(1);
  } finally {
    if (conn) await conn.release();
  }
}
