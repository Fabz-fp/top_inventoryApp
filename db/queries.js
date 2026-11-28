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

async function createCategory(name, description) {
  const { rows } = await pool.query(
    `INSERT INTO categories (name, description)
    VALUES ($1, $2)
    RETURNING *`,
    [name, description || null]
  );

  return rows[0];
}

async function updateCategory(id, name, description) {
  const { rows } = await pool.query(
    `UPDATE categories
    SET name = $1, description = $2
    WHERE id = $3
    RETURNING *`,
    [name, description || null, id]
  );

  return rows[0];
}

async function deleteCategory(id) {
  const { rows } = await pool.query(
    `DELETE FROM categories
    WHERE id = $1
    RETURNING *`,
    [id]
  );

  return rows[0];
}

// ITEMS
async function getItemsByCategory(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = $1 ORDER BY name ASC",
    [categoryId]
  );

  return rows;
}

async function createItem(
  name,
  description,
  brand,
  model,
  sku,
  price,
  stockQuantity,
  imageUrl,
  specifications,
  categoryId
) {
  const { rows } = await pool.query(
    `INSERT INTO items (
      name,
      description,
      brand,
      model,
      sku,
      price,
      stock_quantity,
      image_url,
      specifications,
      category_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,
    [
      name,
      description || null,
      brand || null,
      model || null,
      sku,
      price,
      stockQuantity,
      imageUrl || null,
      specifications || null,
      categoryId,
    ]
  );

  return rows[0];
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
  createCategory,
  updateCategory,
  deleteCategory,
  getItemsByCategory,
  createItem,
  getItemById,
};
