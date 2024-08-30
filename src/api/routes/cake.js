

//ingredientRoutes.post('/register', upload.single("img"), createIngredient)
ingredientRoutes.post('/register', uploadCakes.fields([{ name: "img"}, { name: "img2" }, { name: "img3" }]), createIngredient)
