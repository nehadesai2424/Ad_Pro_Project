const express = require('express');
const router = express.Router();
const WorkSchedule = require('../models/WorkSchedule');

// Create or Update WorkSchedule
router.post('/', async (req, res) => {
    try {
        const { id, agencyId, userId, title, description, workDate, status } = req.body;
        const workSchedule = new WorkSchedule();

        // Assign values
        workSchedule.id = id || 0; // Default to 0 if not provided
        workSchedule.agencyId = agencyId;
        workSchedule.userId = userId;
        workSchedule.title = title;
        workSchedule.description = description;
        workSchedule.workDate = workDate;
        workSchedule.status = status || "Not Done"; // Default to  if not provided

        const result = await workSchedule.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update WorkSchedule" });
    }
});

// Get all WorkSchedules
router.get('/', async (req, res) => {
    try {
        const workSchedule = new WorkSchedule();
        const result = await workSchedule.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch WorkSchedules" });
    }
});

// Get WorkSchedule by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workSchedule = new WorkSchedule();
        const result = await workSchedule.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "WorkSchedule not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch WorkSchedule" });
    }
});

// Delete WorkSchedule by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workSchedule = new WorkSchedule();
        const result = await workSchedule.deleteById(id);
        res.status(200).json({ message: "WorkSchedule deleted successfully", result });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete WorkSchedule" });
    }
});



module.exports = router;


