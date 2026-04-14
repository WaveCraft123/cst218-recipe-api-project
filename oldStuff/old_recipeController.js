const Recipe = require("../models/Recipe");

async function getAllRecipes(req, res) {
    try {
        const recipes = await Recipe.find({ userId: req.userId }).sort({ createdAt: -1 });

        return res.status(200).json({ 
            message: "Your recipes", 
            recipes
        });
    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err.message });
    }
}

async function getRecipe(req, res) {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, userId: req.userId });
  
        if (!recipe) {
            // This covers both "doesn't exist" and "exists but not yours"
            return res.status(404).json({ error: "Recipe not found" });
        }
  
        return res.status(200).json({ 
            message: "Recipe found", 
            recipe
        });
    } catch (err) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
}

async function createRecipe(req, res) {
    try {
        const { name, description, ingredients, instructions, tags } = req.body;

        const recipe = await Recipe.create({
            userId: req.userId,
            name,
            description,
            ingredients,
            instructions,
            tags: tags || []
        });

        return res.status(201).json({ 
            message: "Recipe created", 
            data: recipe 
        });
    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err.message });
    }
}

async function updateRecipe(req, res) {
    try {
        const updated = await Recipe.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        return res.status(200).json({ 
            message: "Recipe updated", 
            updated
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

async function deleteRecipe(req, res) {
    try {
        const deleted = await Recipe.findOneAndDelete({ _id: req.params.id, userId: req.userId });

        if (!deleted) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        return res.status(200).json({ 
            message: "Recipe deleted", 
            id: deleted._id 
        });
    } catch (err) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
}

module.exports = {
    getAllRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
};
