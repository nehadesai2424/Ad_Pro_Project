const express = require('express');
const router = express.Router();
const State = require('../models/State');

//Post method to save or update state
router.post('/', async (req, res) => {
    try {
        const { id, name } = req.body;
        const state = new State();
        state.id = id || 0; // Default to 0 if id is not provided
        state.name = name;
        const result = await state.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update state" });
    }
});

router.get('/', async (req, res) => {
    try {
        const state = new State();
        const states = await state.list();
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch states" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const state = new State();
        const result = await state.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "State not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch state" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const state = new State();
        await state.deleteById(id);
        res.status(200).json({ message: "State deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete state" });
    }
});

module.exports = router;
