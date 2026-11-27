const db = require("../db/queries");

// GET NEW
function categoryCreateGet(req, res) {
  res.render("categories/new", {
    title: "Create Category",
  });
}

// GET EDIT
async function categoryUpdateGet(req, res, next) {
  try {
    const categoryId = req.params.categoryId;

    const category = await db.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("categories/edit", {
      title: "Edit Category",
      category: category,
    });
  } catch (error) {
    next(error);
  }
}

// POST EDIT
async function categoryUpdatePost(req, res, next) {
  const categoryId = req.params.categoryId;
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
    return res.status(400).render("categories/edit", {
      title: "Edit Category",
      errors,
      category: { id: categoryId, name, description },
    });
  }

  try {
    const updatedCategory = await db.updateCategory(
      categoryId,
      name,
      description
    );

    if (!updatedCategory) {
      return res.status(404).send("Category not found");
    }

    res.redirect(`/categories/${categoryId}`);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).render("categories/edit", {
        title: "Edit Category",
        errors: ["A category with this name already exists."],
        category: { id: categoryId, name, description },
      });
    }

    next(error);
  }
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
  categoryUpdateGet,
  categoryUpdatePost,
  categoryGet,
};
