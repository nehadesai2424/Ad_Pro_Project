const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// Post method to save or update role
router.post('/', async (req, res) => {
    try {
        const { id, name } = req.body;
        const role = new Role();
        role.id = id || 0; // Default to 0 if id is not provided
        role.name = name;
        const result = await role.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update role" });
    }
});

// Get all roles
router.get('/', async (req, res) => {
    try {
        const role = new Role();
        const roles = await role.list();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch roles" });
    }
});

// Get role by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const role = new Role();
        const result = await role.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Role not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch role" });
    }
});

// Delete role by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const role = new Role();
        await role.deleteById(id);
        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete role" });
    }
});

module.exports = router;
