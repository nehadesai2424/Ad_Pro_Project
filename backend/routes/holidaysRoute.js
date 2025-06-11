const express = require('express');
const router = express.Router();
const Holiday = require('../models/Holiday');

// Create or Update Holiday
router.post('/', async (req, res) => {
    try {
        const { id, agencyId, holidayDate, reason, every_year } = req.body;
        const holiday = new Holiday();

        // Assign values
        holiday.id = id || 0;
        holiday.agencyId = agencyId;
        holiday.holidayDate = holidayDate;
        holiday.reason = reason;
        holiday.every_year = every_year;

        const result = await holiday.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update holiday" });
    }
});

// Get all holidays
router.get('/', async (req, res) => {
    try {
        const holiday = new Holiday();
        const result = await holiday.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch holidays" });
    }
});

// Get holiday by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const holiday = new Holiday();
        const result = await holiday.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Holiday not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch holiday" });
    }
});

// Delete holiday by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const holiday = new Holiday();
        const result = await holiday.deleteById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete holiday" });
    }
});

module.exports = router;
