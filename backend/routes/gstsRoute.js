const express = require('express');
const router = express.Router();
const Gst = require('../models/Gst');

// Create or Update GST
router.post('/', async (req, res) => {
    try {
        const { id, agencyId, title, cgstPercent, sgstPercent, igstPercent, gstCode } = req.body;
        const gst = new Gst();

        // Assign values
        gst.id = id || 0;
        gst.agencyId = agencyId|| null;
        gst.title = title;
        gst.cgstPercent = cgstPercent;
        gst.sgstPercent = sgstPercent;
        gst.igstPercent = igstPercent;
        gst.gstCode = gstCode;

        const result = await gst.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update GST" });
    }
});

// Get all GST records
router.get('/', async (req, res) => {
    try {
        const gst = new Gst();
        const result = await gst.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch GST records" });
    }
});

// Get GST by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const gst = new Gst();
        const result = await gst.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "GST record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch GST" });
    }
});

// Delete GST by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const gst = new Gst();
        const result = await gst.deleteById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete GST" });
    }
});

module.exports = router;
