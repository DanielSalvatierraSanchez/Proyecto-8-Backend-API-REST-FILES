const createIngredient = async (req, res, next) => {
    try {
        const { name, quantity, units } = req.body;
        const ingredientDuplicated = await Ingredient.findOne({ name } && { quantity });

        if (units !== "Gramos" && units !== "Miligramos" && units !== "Unidades") {
            return res.status(400).json({ message: 'Unidad de medida mal introducida. Introduce: Gramos, Miligramos o Unidades' })
        };
        if (ingredientDuplicated) {
            return res.status(400).json({ message: `El ingrediente ${name} ya lo tenemos con esa misma cantidad de ${quantity} ${units}.` })
        };
        
        const newIngredient = new Ingredient(req.body);
        if (req.files) {
            newIngredient.img = req.files.img[0].path;
            newIngredient.img2 = req.files.img2[0].path;
            newIngredient.img3 = req.files.img3[0].path;
        }

        const ingredientSaved = await newIngredient.save()
        return res.status(201).json({ message: `Se acaba de añadir a nuestro stock: ${quantity} ${units} de ${name}.`, ingredientSaved })
    } catch (error) {
        return res.status(400).json(`❌ Fallo en createIngredient: ${error.message}`)
    }
};