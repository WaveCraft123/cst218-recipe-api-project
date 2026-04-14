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
    return res.status(200).json({ 
        message: "Recipe found", 
        recipe: req.recipe
    });
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
    const allowedFields = ["name", "description", "ingredients", "instructions", "tags"];
    const updateData = {};
    
    for (const key of allowedFields) {
        if (key in req.body) {
            updateData[key] = req.body[key];
        }
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No valid fields to update" });
    }

    Object.assign(req.recipe, updateData);
    await req.recipe.save();

    return res.status(200).json({ 
        message: "Recipe updated", 
        updated: req.recipe
    });
}

async function deleteRecipe(req, res) {
    await req.recipe.deleteOne();

    return res.status(200).json({
        message: "Recipe deleted",
        id: req.recipe._id
    });
}

module.exports = {
    getAllRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
};
