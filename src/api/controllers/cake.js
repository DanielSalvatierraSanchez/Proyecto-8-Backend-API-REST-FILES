const Cake = require("../models/cake");

const createCake = async (req, res, next) => {
    try {
        const { name, difficulty } = req.body;
        const cakeDuplicated = await Cake.findOne({ name });
        if (cakeDuplicated) {
            return res.status(400).json({ message: `La tarta ${name} ya ha sido creada.` })
        };
        
        const newCake = new Cake(req.body);
        if (req.files) {
            newCake.img = req.files.img[0].path;
            newCake.img2 = req.files.img2[0].path;
            newCake.img3 = req.files.img3[0].path;
        }

        const ingredientSaved = await newIngredient.save()
        return res.status(201).json({ message: `Se acaba de añadir a nuestro stock: ${quantity} ${units} de ${name}.`, ingredientSaved })
    } catch (error) {
        return res.status(400).json(`❌ Fallo en createIngredient: ${error.message}`)
    }
};

const getAllIngredients = async (req, res, next) => {
    try {
        const allIngredients = await Ingredient.find();
        if (!allIngredients.length) {
            return res.status(400).json({ message: "No tenemos ingredientes en nuestro stock." });
        }
        return res.status(200).json({ message: "Estos son los ingredientes que tenemos en stock:", allIngredients })
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getAllIngredients: ${error.message}`)
    }
};

const getIngredientByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const findIngredientByName = await Ingredient.find({ name: new RegExp(name, 'i') });
        if (!findIngredientByName.length) {
            return res.status(400).json({ message: `No existe ningún ingrediente en nuestro stock que contenga '${name}'` });
        }
        return res.status(200).json({ message: "Ingrediente encontrado:", findIngredientByName })
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getIngredientByName: ${error.message}`)
    }
};

const updateIngredient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ingredientModify = new Ingredient(req.body)
        ingredientModify._id = id;
        if (req.file) {
            ingredientModify.img = req.file.path
            const oldIngredient = await Ingredient.findById(id);
            deleteFile(oldIngredient.img);
        }

        const ingredientUpdated = await Ingredient.findByIdAndUpdate(id, ingredientModify, { new: true });
        if (!ingredientUpdated){
            return res.status(400).json({ message: 'No existe ese producto.' });
        }
        return res.status(200).json({ message: 'Producto actualizado correctamente', ingredientUpdated });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en updateIngredient: ${error.message}`)
    }
};

const deleteIngredient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ingredientDeleted = await Ingredient.findByIdAndDelete(id);
        if (!ingredientDeleted) {
            return res.status(400).json({ message: "Ese ingrediente ya no existe en nuestro stock." });
        }
        deleteFile(ingredientDeleted.img);
        return res.status(200).json({ message: "Ingrediente eliminado de nuestro stock.", ingredientDeleted });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en deleteIngredient: ${error.message}`)
    }
};
