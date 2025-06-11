const express = require('express');
const router = express.Router();
const Emedia = require('../models/Emedia');

// Create or Update Emedia
router.post('/', async (req, res) => {
    try {
        const { id, agencyId, name, contact, address, stateId, gstNo } = req.body;
        const emedia = new Emedia();

        // Assign values
        emedia.id = id || 0;
        emedia.agencyId = agencyId || null;
        emedia.name = name;
        emedia.contact = contact;
        emedia.address = address;
        emedia.stateId = stateId;
        emedia.gstNo = gstNo;

        const result = await emedia.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update Emedia" });
    }
});

// Get all Emedia records
router.get('/', async (req, res) => {
    try {
        const emedia = new Emedia();
        const result = await emedia.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Emedia records" });
    }
});

// Get Emedia by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const emedia = new Emedia();
        const result = await emedia.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Emedia not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Emedia" });
    }
});

// Delete Emedia by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const emedia = new Emedia();
        const result = await emedia.deleteById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Emedia" });
    }
});

module.exports = router;
