const cakeRoutes = require("express").Router();
const uploadFolders = require("../../middleware/file");
// const upload = require("../../middleware/file");
const { getCakeByName, getAllCakes, updateCake, deleteCake, createCake, deleteIngredientOfCake } = require("../controllers/cake");

// cakeRoutes.post("/register", upload.fields([{ name: "firstImg" }, { name: "secondImg" }, { name: "thirdImg" }]), createCake);
cakeRoutes.post("/register", uploadFolders("Cakes").fields([{ name: "firstImg" }, { name: "secondImg" }, { name: "thirdImg" }]), createCake);
cakeRoutes.get("/getBy/:name", getCakeByName);
cakeRoutes.get("/", getAllCakes);
// cakeRoutes.put("/update/:id", upload.fields([{ name: "firstImg" }, { name: "secondImg" }, { name: "thirdImg" }]), updateCake);
cakeRoutes.put("/update/:id", uploadFolders("Cakes").fields([{ name: "firstImg" }, { name: "secondImg" }, { name: "thirdImg" }]), updateCake);
cakeRoutes.delete("/deleteIngredient/:id", deleteIngredientOfCake);
cakeRoutes.delete("/delete/:id", deleteCake);

module.exports = cakeRoutes;
