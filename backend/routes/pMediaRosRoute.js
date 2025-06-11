const express = require('express');
const router = express.Router();
const PmediaRo = require('../models/PmediaRo');

// Save or update pmediaros
router.post('/', async (req, res) => {
    try {
        const pmediaRo = new PmediaRo();
        Object.assign(pmediaRo, req.body); // Assign fields from request
        const result = await pmediaRo.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update pmediaros" });
    }
});

// List all pmediaros
router.get('/', async (req, res) => {
    try {
        const pmediaRo = new PmediaRo();
        const result = await pmediaRo.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch pmediaros" });
    }
});

// Get single pmediaro by ID
router.get('/:id', async (req, res) => {
    try {
        const pmediaRo = new PmediaRo();
        const result = await pmediaRo.getById(req.params.id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "PmediaRo not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch pmediaro" });
    }
});

// Delete pmediaro by ID
router.delete('/:id', async (req, res) => {
    try {
        const pmediaRo = new PmediaRo();
        await pmediaRo.deleteById(req.params.id);
        res.status(200).json({ message: "PmediaRo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete pmediaro" });
    }
});

module.exports = router;
