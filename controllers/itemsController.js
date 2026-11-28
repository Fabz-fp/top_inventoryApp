const db = require("../db/queries");

// GET NEW
async function itemCreateGet(req, res, next) {
  try {
    const categories = await db.getAllCategories();

    res.render("items/new", {
      title: "Add Product",
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
}

// POST NEW
async function itemCreatePost(req, res, next) {
  const name = (req.body.name || "").trim();
  const description = (req.body.description || "").trim();
  const brand = (req.body.brand || "").trim();
  const model = (req.body.model || "").trim();
  const sku = (req.body.sku || "").trim();
  const price = req.body.price;
  const stockQuantity = req.body.stock_quantity;
  const imageUrl = (req.body.image_url || "").trim();
  const specifications = (req.body.specifications || "").trim();
  const categoryId = req.body.category_id;

  const errors = [];

  if (!name) {
    errors.push("Product name is required.");
  }

  if (name.length > 150) {
    errors.push("Product name must be 150 characters or fewer.");
  }

  if (!sku) {
    errors.push("SKU is required.");
  }

  if (sku.length > 50) {
    errors.push("SKU must be 50 characters or fewer.");
  }

  if (brand.length > 100) {
    errors.push("Brand must be 100 characters or fewer.");
  }

  if (model.length > 100) {
    errors.push("Model must be 100 characters or fewer.");
  }

  if (price === "" || !Number.isFinite(Number(price))) {
    errors.push("A valid price is required.");
  } else if (Number(price) < 0 || Number(price) > 99999999.99) {
    errors.push("Price must be between 0 and 99,999,999.99.");
  } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
    errors.push("Price can have a maximum of two decimal places.");
  }

  if (
    stockQuantity === "" ||
    !/^\d+$/.test(stockQuantity) ||
    Number(stockQuantity) > 2147483647
  ) {
    errors.push(
      "Stock quantity must be a whole number between 0 and 2,147,483,647."
    );
  }

  if (!Number.isInteger(Number(categoryId)) || Number(categoryId) <= 0) {
    errors.push("Please select a valid category.");
  }

  if (errors.length > 0) {
    try {
      const categories = await db.getAllCategories();

      return res.status(400).render("items/new", {
        title: "Add Product",
        categories,
        errors,
        item: {
          name,
          description,
          brand,
          model,
          sku,
          price,
          stock_quantity: stockQuantity,
          image_url: imageUrl,
          specifications,
          category_id: categoryId,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  try {
    await db.createItem(
      name,
      description,
      brand,
      model,
      sku,
      Number(price),
      Number(stockQuantity),
      imageUrl,
      specifications,
      Number(categoryId)
    );

    res.redirect("/");
  } catch (error) {
    if (error.code === "23505" || error.code === "23503") {
      const categories = await db.getAllCategories();

      return res.status(400).render("items/new", {
        title: "Add Product",
        categories,
        errors: [
          error.code === "23505"
            ? "A product with this SKU already exists."
            : "Please select an existing category.",
        ],
        item: {
          name,
          description,
          brand,
          model,
          sku,
          price,
          stock_quantity: stockQuantity,
          image_url: imageUrl,
          specifications,
          category_id: categoryId,
        },
      });
    }

    next(error);
  }
}

// GET
async function itemGet(req, res, next) {
  try {
    const itemId = req.params.itemId;

    const item = await db.getItemById(itemId);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.render("items/item", {
      title: item.name,
      item: item,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  itemCreateGet,
  itemCreatePost,
  itemGet,
};
