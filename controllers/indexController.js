const db = require("../db/queries");

async function indexGet(req, res, next) {
  try {
    const categories = await db.getAllCategories();

    res.render("index", {
      title: "SoundBurrow",
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  indexGet,
};