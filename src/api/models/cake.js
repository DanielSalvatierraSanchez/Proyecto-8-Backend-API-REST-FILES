const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ["Baja", "Media", "Alta"] },
    ingredients: [{ type: mongoose.Types.ObjectId, ref: "ingredients"}],
    firstImg: { type: String, required: true },
    secondImg: { type: String, required: false },
    thirdImg: { type: String, required: false },
}, {
    collection: "cakes",
});

const Cake = mongoose.model("cakes", cakeSchema, "cakes");

module.exports = Cake;