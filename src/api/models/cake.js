const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ["Baja", "Media", "Alta"] },
    ingredients: [{ type: mongoose.Types.ObjectId, ref: "ingredients"}],
    img: [{ type: String, required: false, default: "Foto de la tarta" }],
    img2: { type: String, required: false },
    img3: { type: String, required: false },
}, {
    collection: "cakes",
});

const Cake = mongoose.model("cakes", cakeSchema, "cakes");

module.exports = Cake;