function validateRecipe(req, res, next) {
    const { name, description, ingredients, instructions } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "A name is required" });
    }

    if (!description || description.trim() === "") {
        return res.status(400).json({ error: "A description is required" });
    }

    if (!ingredients || ingredients === "") {
        return res.status(400).json({ error: "Ingredients are required" });
    }

    if (!instructions || instructions.trim() === "") {
        return res.status(400).json({ error: "Instructions are required" });
    }

    next();
}

module.exports = validateRecipe;
