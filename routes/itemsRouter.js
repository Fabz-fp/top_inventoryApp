const { Router } = require("express");
const itemsController = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/:itemId", itemsController.itemGet);

module.exports = itemsRouter;