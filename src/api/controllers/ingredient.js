const { deleteFile } = require("../../utils/deleteFile");
const Ingredient = require("../models/ingredient");

const createIngredient = async (req, res, next) => {
    try {
        const { name, quantity, units } = req.body;
        const ingredientDuplicated = await Ingredient.findOne({ name, quantity });
        if (ingredientDuplicated) {
            if (req.file) {
                ingredientDuplicated.img = req.file.path
                const oldIngredient = ingredientDuplicated;
                deleteFile(oldIngredient.img);
            }
            return res.status(400).json({ message: `El ingrediente ${name} ya lo tenemos con esa misma cantidad de ${quantity} ${units}.` })
        };

        const newIngredient = new Ingredient(req.body);
        if (req.file) {
            newIngredient.img = req.file.path;
        };

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

module.exports = { createIngredient, getAllIngredients, getIngredientByName, updateIngredient, deleteIngredient };