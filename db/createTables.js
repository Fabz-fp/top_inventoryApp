require("dotenv").config();

const fs = require("node:fs/promises");
const path = require("node:path");
const pool = require("./pool");

async function createTables() {
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const sql = await fs.readFile(schemaPath, "utf8");

    await pool.query(sql);

    console.log("Database tables created successfully!");
  } catch (error) {
    console.error("Error creating database tables:", error.message);
  } finally {
    await pool.end();
  }
}

createTables();