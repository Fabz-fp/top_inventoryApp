const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/new", categoriesController.categoryCreateGet);
categoriesRouter.post("/new", categoriesController.categoryCreatePost);

categoriesRouter.get(
  "/:categoryId",
  categoriesController.categoryGet
);

module.exports = categoriesRouter;