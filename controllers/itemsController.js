const db = require("../db/queries");

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
  itemGet,
};