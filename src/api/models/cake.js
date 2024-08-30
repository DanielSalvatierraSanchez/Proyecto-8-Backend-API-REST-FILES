const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ["Baja", "Media", "Alta"] },
    ingredients: [{ type: mongoose.Types.ObjectId, ref: "ingredients", required: true }],
    img: { type: String, required: true, default: "Foto de la tarta" },
    img2: { type: String, required: false, default: "Segunda foto de la tarta" },
    img3: { type: String, required: false, default: "Tercera foto de la tarta" },
}, {
    collection: "cakes",
});

const Cake = mongoose.model("cakes", cakeSchema, "cakes");

module.exports = Cake;