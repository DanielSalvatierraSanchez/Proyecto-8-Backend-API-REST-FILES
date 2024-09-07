const { deleteFile, deleteImageUploaded } = require("../../utils/deleteFile&Image");
const Cake = require("../models/cake");
const Ingredient = require("../models/ingredient");

const createCake = async (req, res, next) => {
    try {
        const { name, difficulty } = req.body;
        if (!name && !difficulty) {
            deleteImageUploaded(req.files);
            return res.status(400).json({ message: 'NO HAS INTRODUCIDO NI UN P... DATO!!! JAJAJA' })
        }
        if (!name) {
            deleteImageUploaded(req.files);
            return res.status(400).json({ message: 'No ha sido introducido el nombre de la tarta.' })
        };
        if (difficulty !== "Baja" && difficulty !== "Media" && difficulty !== "Alta") {
            deleteImageUploaded(req.files);
            return res.status(400).json({ message: 'La dificultad no ha sido introducida o ha sido mal introducida. Introduce: Baja, Media o Alta' })
        };

        const cakeDuplicated = await Cake.findOne({ name });
        if (cakeDuplicated) {
            deleteImageUploaded(req.files);
            return res.status(400).json({ message: `La tarta ${name} ya ha sido creada anteriormente.` })
        };

        const newCake = new Cake(req.body);
        if (req.files) {
            if (!req.files.firstImg){
                if (req.files.secondImg){
                    deleteFile(req.files.secondImg[0].path);
                }
                if (req.files.thirdImg) {
                    deleteFile(req.files.thirdImg[0].path);
                }
                return res.status(400).json({ message: 'No ha sido introducida ninguna imagen.' })
            } else {
                newCake.firstImg = req.files.firstImg[0].path;
                if (req.files.secondImg) {
                    newCake.secondImg = req.files.secondImg[0].path;
                }
                if (req.files.thirdImg) {
                    if (req.files.secondImg) {
                        newCake.thirdImg = req.files.thirdImg[0].path;
                    } else {
                        deleteFile(req.files.firstImg[0].path);
                        deleteFile(req.files.thirdImg[0].path);
                        return res.status(400).json({ message: 'No ha sido introducida la 2ª imagen.' })
                    }
                }
            }
        };

        const cakeSaved = await newCake.save()
        return res.status(201).json({ message: `Nueva tarta creada: ${name}.`, cakeSaved })
    } catch (error) {
        deleteImageUploaded(req.files);
        return res.status(400).json(`❌ Fallo en createCake: ${error.message}`)
    }
};

const getAllCakes = async (req, res, next) => {
    try {
        const allCakes = await Cake.find().populate('ingredients');
        if (!allCakes.length) {
            return res.status(400).json({ message: "No tenemos ninguna tarta en nuestro stock." });
        }
        return res.status(200).json({ message: "Estas son las tartas que tenemos en stock:", allCakes })
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getAllCakes: ${error.message}`)
    }
};

const getCakeByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const findCakeByName = await Cake.find({ name: new RegExp(name, 'i') }).populate('ingredients');
        if (!findCakeByName.length) {
            return res.status(400).json({ message: `No existe ninguna tarta en nuestro stock que contenga '${name}'` });
        }
        return res.status(200).json({ message: `Con la letra ${name} tenemos las siguientes tartas:`, findCakeByName })
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getCakeByName: ${error.message}`)
    }
};

const updateCake = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ingredients, ...rest } = req.body;
        const allParams = { ...rest };

        const oldCake = await Cake.findById(id);
        if (!oldCake){
            return res.status(400).json({ message: 'No se ha encontrado esa tarta.' });
        }
        // if (oldCake.firstImg) { deleteFile(oldCake.firstImg) }
        //const cakeModify = new Cake(req.body);
        const cakeModify = { ...allParams };
        cakeModify._id = id;

        if (cakeModify.difficulty !== "Baja" && cakeModify.difficulty !== "Media" && cakeModify.difficulty !== "Alta" && cakeModify.difficulty !== undefined) {
            return res.status(400).json({ message: 'La dificultad ha sido mal introducida. Introduce: Baja, Media o Alta' })
        };

        if (ingredients) {
        cakeModify.$addToSet = { ingredients }
        };

        if (req.files) {
            if (req.files.firstImg) {
                cakeModify.firstImg = req.files.firstImg[0].path;
                if (oldCake.firstImg) {
                    deleteFile(oldCake.firstImg)
                };
            };
            if (req.files.secondImg) {
                cakeModify.secondImg = req.files.secondImg[0].path;
                if (oldCake.secondImg) {
                    deleteFile(oldCake.secondImg)
                };
            };
            if (req.files.thirdImg) {
                cakeModify.thirdImg = req.files.thirdImg[0].path;
                if (oldCake.thirdImg) {
                    deleteFile(oldCake.thirdImg)
                };
            };
        };

        const cakeUpdated = await Cake.findByIdAndUpdate(id, cakeModify, { new: true });
        if (!cakeUpdated){
            return res.status(400).json({ message: 'No existe esta tarta.' });
        };

        return res.status(200).json({ message: 'Tarta actualizada correctamente', cakeUpdated });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en updateCake: ${error.message}`)
    };
};

const deleteCake = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cakeDeleted = await Cake.findByIdAndDelete(id);
        if (!cakeDeleted) {
            return res.status(400).json({ message: "Esta tarta ya no existe en nuestro stock." });
        }
        // deleteFile(cakeDeleted.img);
        if (cakeDeleted) {
            if (cakeDeleted.firstImg) {
                deleteFile(cakeDeleted.firstImg);
            }
            if (cakeDeleted.secondImg) {
                deleteFile(cakeDeleted.secondImg);
            }
            if (cakeDeleted.thirdImg) {
                deleteFile(cakeDeleted.thirdImg);
            }
        }
        return res.status(200).json({ message: `Tarta eliminada de nuestro stock.`, cakeDeleted });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en deleteCake: ${error.message}`)
    }
};

const deleteIngredientOfCake = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const searchIngredient = await Ingredient.findOne({ name });
        if (!searchIngredient) {
            return res.status(400).json({ message: `La tarta mencionada no tiene ${name}.` });
        }

        const ingredientDeleted = await Ingredient.findOneAndDelete(id, { name }, {new: true});
        return res.status(200).json({ message: `Se ha eliminado correctamente el ingrediente ${name}.`, ingredientDeleted });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en deleteIngredientOfCake: ${error.message}`)
    }
};

module.exports = { createCake, getAllCakes, getCakeByName, updateCake, deleteCake, deleteIngredientOfCake };