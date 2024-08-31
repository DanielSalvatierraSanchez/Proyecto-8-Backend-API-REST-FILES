const { deleteFile } = require("../../utils/deleteFile");
const Cake = require("../models/cake");

const createCake = async (req, res, next) => {
    try {
        const { name, difficulty } = req.body;
        if (difficulty !== "Baja" && difficulty !== "Media" && difficulty !== "Alta") {
            return res.status(400).json({ message: 'La dificultad ha sido mal introducida. Introduce: Baja, Media o Alta' })
        };
        const cakeDuplicated = await Cake.findOne({ name });
        if (cakeDuplicated) {
            return res.status(400).json({ message: `La tarta ${name} ya ha sido creada.` })
        };
        
        const newCake = new Cake(req.body);
        if (req.files) {
            if (req.files.img) {
                newCake.img = req.files.img[0].path;
            }
            if (req.files.img2) {
                newCake.img2 = req.files.img2[0].path;
            }
            if (req.files.img3) {
                newCake.img3 = req.files.img3[0].path;
            }
        }
        // if (req.files) {
        //     newCake.img = req.files.img[0].path;
        //     newCake.img2 = req.files.img2[0].path;
        //     newCake.img3 = req.files.img3[0].path;
        // }

        const cakeSaved = await newCake.save()
        return res.status(201).json({ message: `Nuevo postre creado: ${name}.`, cakeSaved })
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
        return res.status(200).json({ message: "Tarta encontrada:", findCakeByName })
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getCakeByName: ${error.message}`)
    }
};

const updateCake = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cakeModify = new Cake(req.body)
        cakeModify._id = id;
        if (req.files) {
            cakeModify.img = req.files.path
            const oldCake = await Cake.findById(id);
            deleteFile(oldCake.img);
        }

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
        deleteFile(cakeDeleted.img);
        return res.status(200).json({ message: `Tarta eliminada de nuestro stock.`, cakeDeleted });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en deleteCake: ${error.message}`)
    }
};

module.exports = { createCake, getAllCakes, getCakeByName, updateCake, deleteCake };