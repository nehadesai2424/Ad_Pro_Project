const express = require('express');
const router = express.Router();
const EmediaRO = require('../models/EmediaRO');

// POST to save or update an Emedia RO
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const ro = new EmediaRO();

        // Assign values from request body to the model instance
        Object.assign(ro, data);
        ro.id = data.id || 0;

        const result = await ro.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in POST /emediaros:", error);
        res.status(500).json({ error: "Failed to save or update Emedia RO" });
    }
});

// GET all Emedia ROs
router.get('/', async (req, res) => {
    try {
        const ro = new EmediaRO();
        const result = await ro.list();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in GET /emediaros:", error);
        res.status(500).json({ error: "Failed to fetch Emedia ROs" });
    }
});

// GET Emedia RO by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ro = new EmediaRO();
        const result = await ro.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Emedia RO not found" });
        }
    } catch (error) {
        console.error("Error in GET /emediaros/:id:", error);
        res.status(500).json({ error: "Failed to fetch Emedia RO" });
    }
});

// DELETE Emedia RO by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ro = new EmediaRO();
        await ro.deleteById(id);
        res.status(200).json({ message: "Emedia RO deleted successfully" });
    } catch (error) {
        console.error("Error in DELETE /emediaros/:id:", error);
        res.status(500).json({ error: "Failed to delete Emedia RO" });
    }
});

module.exports = router;
