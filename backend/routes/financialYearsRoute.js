const express = require('express');
const router = express.Router();
const FinancialYear = require('../models/FinancialYear');

// Create or Update Financial Year
router.post('/', async (req, res) => {
    try {
        const { id, name, startDate, endDate } = req.body;
        const financialYear = new FinancialYear();

        // Assign values
        financialYear.id = id || 0;
        financialYear.name = name;
        financialYear.startDate = startDate;
        financialYear.endDate = endDate;

        const result = await financialYear.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update financial year" });
    }
});

// Get all financial years
router.get('/', async (req, res) => {
    try {
        const financialYear = new FinancialYear();
        const result = await financialYear.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch financial years" });
    }
});

// Get financial year by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const financialYear = new FinancialYear();
        const result = await financialYear.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Financial Year not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch financial year" });
    }
});

// Delete financial year by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const financialYear = new FinancialYear();
        const result = await financialYear.deleteById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete financial year" });
    }
});

module.exports = router;
