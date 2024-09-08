require('dotenv').config();
const mongoose = require('mongoose');
const Ingredient = require('../../api/models/ingredient');
const Cake = require('../../api/models/cake');
const ingredientsSeed = require('../../data/ingredientsSeed');

const seed = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        await Ingredient.collection.drop();
        await Cake.collection.drop();
        await Ingredient.insertMany(ingredientsSeed);
        // await Cake.insertMany(cakesSeed);
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
    }
};
seed();