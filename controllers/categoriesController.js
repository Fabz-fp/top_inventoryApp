const db = require("../db/queries");

// GET NEW
function categoryCreateGet(req, res) {
  res.render("categories/new", {
    title: "Create Category",
  });
}

// POST NEW
async function categoryCreatePost(req, res, next) {
  const name = (req.body.name || "").trim();
  const description = (req.body.description || "").trim();

  const errors = [];

  if (!name) {
    errors.push("Category name is required.");
  }

  if (name.length > 100) {
    errors.push("Category name must be 100 characters or fewer.");
  }

  if (errors.length > 0) {
    return res.status(400).render("categories/new", {
      title: "Create Category",
      errors,
      category: { name, description },
    });
  }

  try {
    await db.createCategory(name, description);

    res.redirect("/");
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).render("categories/new", {
        title: "Create Category",
        errors: ["A category with this name already exists."],
        category: { name, description },
      });
    }

    next(error);
  }
}

// GET
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
  categoryCreateGet,
  categoryCreatePost,
  categoryGet,
};