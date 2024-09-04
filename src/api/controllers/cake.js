const { deleteFile } = require("../../utils/deleteFile");
const Cake = require("../models/cake");

const createCake = async (req, res, next) => {
    try {
        const { name, difficulty } = req.body;
        if (!name && !difficulty) {
            return res.status(400).json({ message: 'NO HAS INTRODUCIDO NI UN P... DATO!!! JAJAJA' })
        }
        if (!name) {
            return res.status(400).json({ message: 'No ha sido introducido el nombre de la tarta.' })
        };
        if (difficulty !== "Baja" && difficulty !== "Media" && difficulty !== "Alta") {
            return res.status(400).json({ message: 'La dificultad no ha sido introducida o ha sido mal introducida. Introduce: Baja, Media o Alta' })
        };

        const cakeDuplicated = await Cake.findOne({ name });
        if (cakeDuplicated) {
            return res.status(400).json({ message: `La tarta ${name} ya ha sido creada anteriormente.` })
        };

        const newCake = new Cake(req.body);
        if (req.files) {
            if (req.files.firstImg) {
                newCake.firstImg = req.files.firstImg[0].path;
            } else {
                return res.status(400).json({ message: 'No ha sido introducida ninguna imagen.' })
            };
            if (req.files.secondImg) {
                newCake.secondImg = req.files.secondImg[0].path;
                if (req.files.thirdImg) {
                    newCake.thirdImg = req.files.thirdImg[0].path;
                };
            } else {
                deleteFile(req.files.thirdImg[0].path);
            }
        };

        const cakeSaved = await newCake.save()
        return res.status(201).json({ message: `Nueva tarta creada: ${name}.`, cakeSaved })
    } catch (error) {
        return res.status(400).json(`❌ Fallo en createCake: ${error.message}`)
    }
};

const getAllCakes = async (req, res, next) => {
    try {
        const allCakes = await Cake.find();
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
        const findCakeByName = await Cake.find({ name: new RegExp(name, 'i') });
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
        const restParams = { ...rest };
        const oldCake = await Cake.findById(id);
        // if(oldCake.img) { deleteFile(oldCake.img) }
        const cakeModify = new Cake(req.body);
        cakeModify._id = id;

        if (cakeModify.difficulty !== "Baja" && cakeModify.difficulty !== "Media" && cakeModify.difficulty !== "Alta" && cakeModify.difficulty !== undefined) {
            return res.status(400).json({ message: 'La dificultad ha sido mal introducida. Introduce: Baja, Media o Alta' })
        };

        if (ingredients) {
        oldCake.$addToSet = { ingredients }
        };

        const cakeUpdated = await Cake.findByIdAndUpdate(id, cakeModify, { new: true });
        if (!cakeUpdated){
            return res.status(400).json({ message: 'No existe esta tarta.' });
        }
        
        return res.status(200).json({ message: 'Tarta actualizada correctamente', cakeUpdated });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en updateCake: ${error.message}`)
    }
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
            if (cakeDeleted.img1) {
                deleteFile(cakeDeleted.img1);
            }
            if (cakeDeleted.img2) {
                deleteFile(cakeDeleted.img2);
            }
            if (cakeDeleted.img3) {
                deleteFile(cakeDeleted.img3);
            }
        }
        return res.status(200).json({ message: `Tarta eliminada de nuestro stock.`, cakeDeleted });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en deleteCake: ${error.message}`)
    }
};

module.exports = { createCake, getAllCakes, getCakeByName, updateCake, deleteCake };