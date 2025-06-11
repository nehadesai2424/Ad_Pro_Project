const express = require('express');
const router = express.Router();
const Pmedia = require('../models/Pmedia');

// Create or Update Pmedia
router.post('/', async (req, res) => {
    try {
        const { id, agencyId, name, contact, address, stateId, gstNo } = req.body;
        const pmedia = new Pmedia();

        // Assign values
        pmedia.id = id || 0;
        pmedia.agencyId = agencyId || null;
        pmedia.name = name;
        pmedia.contact = contact;
        pmedia.address = address;
        pmedia.stateId = stateId;
        pmedia.gstNo = gstNo;

        const result = await pmedia.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update Pmedia" });
    }
});

// Get all Pmedia records
router.get('/', async (req, res) => {
    try {
        const pmedia = new Pmedia();
        const result = await pmedia.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Pmedia records" });
    }
});

// Get Pmedia by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pmedia = new Pmedia();
        const result = await pmedia.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Pmedia not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Pmedia" });
    }
});

// Delete Pmedia by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pmedia = new Pmedia();
        const result = await pmedia.deleteById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Pmedia" });
    }
});

module.exports = router;
