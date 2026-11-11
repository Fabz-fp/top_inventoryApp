const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query(
    "SELECT * FROM categories ORDER BY name ASC"
  );

  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE id = $1",
    [id]
  );

  return rows[0];
}

async function getItemsByCategory(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = $1 ORDER BY name ASC",
    [categoryId]
  );

  return rows;
}

async function getItemById(id) {
  const { rows } = await pool.query(
    `SELECT items.*, categories.name AS category_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    WHERE items.id = $1`,
    [id]
  );

  return rows[0];
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getItemsByCategory,
  getItemById,
};