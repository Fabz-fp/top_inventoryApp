const db = require("../db/queries");

async function categoryGet(req, res, next) {
  try {
    const categoryId = req.params.categoryId;

    const category = await db.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    const items = await db.getItemsByCategory(categoryId);

    res.render("categories/category", {
      title: category.name,
      category: category,
      items: items,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  categoryGet,
};