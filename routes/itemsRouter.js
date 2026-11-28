const { Router } = require("express");
const itemsController = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/new", itemsController.itemCreateGet);
itemsRouter.post("/new", itemsController.itemCreatePost);

itemsRouter.get("/:itemId", itemsController.itemGet);

module.exports = itemsRouter;
