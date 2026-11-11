require("dotenv").config();

const express = require("express");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Welcome to the inventory app");
});

app.listen(PORT, () => {
  console.log(`Inventory app running on port ${PORT}`);
});