const uploadFolders = require("../../middleware/file");
// const upload = require("../../middleware/file");
const { createIngredient, getIngredientByName, getAllIngredients, updateIngredient, deleteIngredient } = require("../controllers/ingredient");
const ingredientRoutes = require("express").Router();

// ingredientRoutes.post('/register', upload.single("img"), createIngredient)
ingredientRoutes.post("/register", uploadFolders("Ingredients").single("img"), createIngredient);
ingredientRoutes.get("/getBy/:name", getIngredientByName);
ingredientRoutes.get("/", getAllIngredients);
// ingredientRoutes.put('/update/:id', upload.single("img"), updateIngredient)
ingredientRoutes.put("/update/:id", uploadFolders("Ingredients").single("img"), updateIngredient);
ingredientRoutes.delete("/delete/:id", deleteIngredient);

module.exports = ingredientRoutes;
