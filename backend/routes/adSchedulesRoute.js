const express = require('express');
const router = express.Router();
const AdSchedule = require('../models/AdSchedule');

// Create or Update Ad Schedule
router.post('/', async (req, res) => {
    try {
        const { id, agencyId, clientId, pmediaId, adDate, description, pmediaRoId, 
                beforeClientMessage, beforeAgencyMessage, onDateClientMessage, onDateAgencyMessage } = req.body;

        const adSchedule = new AdSchedule();

        // Assign values
        adSchedule.id = id || 0;
        adSchedule.agencyId = agencyId;
        adSchedule.clientId = clientId;
        adSchedule.pmediaId = pmediaId;
        adSchedule.adDate = adDate;
        adSchedule.description = description;
        adSchedule.pmediaRoId = pmediaRoId;
        adSchedule.beforeClientMessage = beforeClientMessage;
        adSchedule.beforeAgencyMessage = beforeAgencyMessage;
        adSchedule.onDateClientMessage = onDateClientMessage;
        adSchedule.onDateAgencyMessage = onDateAgencyMessage;

        const result = await adSchedule.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update ad schedule" });
    }
});

// Get all ad schedules
router.get('/', async (req, res) => {
    try {
        const adSchedule = new AdSchedule();
        const result = await adSchedule.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch ad schedules" });
    }
});

// Get ad schedule by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const adSchedule = new AdSchedule();
        const result = await adSchedule.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Ad Schedule not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch ad schedule" });
    }
});

// Delete ad schedule by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const adSchedule = new AdSchedule();
        const result = await adSchedule.deleteById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete ad schedule" });
    }
});

module.exports = router;
