const express = require('express');
const router = express.Router();
const Module = require('../models/Module');

// Post method to save or update module
router.post('/', async (req, res) => {
    try {
        const { id, name } = req.body;
        const module = new Module();
        module.id = id || 0; // Default to 0 if id is not provided
        module.name = name;
        const result = await module.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update module" });
    }
});

// Get all modules
router.get('/', async (req, res) => {
    try {
        const module = new Module();
        const modules = await module.list();
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch modules" });
    }
});

// Get module by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const module = new Module();
        const result = await module.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Module not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch module" });
    }
});

// Delete module by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const module = new Module();
        await module.deleteById(id);
        res.status(200).json({ message: "Module deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete module" });
    }
});

module.exports = router;
