const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

async function validateRecipeId(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid id format" });
    }

    try {
        const recipe = await Recipe.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        req.recipe = recipe;

        next();
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = validateRecipeId;