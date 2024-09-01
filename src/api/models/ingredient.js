const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1, trim: true },
    units: { type: String, required: true, enum: ["Gramos", "Mililitros", "Unidad", "Unidades"] },
    img: { type: String, required: true, default: "Foto del ingrediente." },
},{
    collection: "ingredients",
})

const Ingredient = mongoose.model("ingredients", ingredientSchema, "ingredients");

module.exports = Ingredient;