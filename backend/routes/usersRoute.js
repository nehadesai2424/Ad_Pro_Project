const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Post method to save or update user
router.post('/', async (req, res) => {
    try {
        const { id, agencyId, email, password, name, roleId } = req.body;
        const user = new User();
        user.id = id || 0; // Default to 0 if id is not provided
        user.agencyId = agencyId || null; // Default to 0 if agencyId is not provided
        user.email = email;
        user.password = password;
        user.name = name;
        user.roleId = roleId;
        const result = await user.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update user" });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const user = new User();
        const users = await user.list();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = new User();
        const result = await user.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = new User();
        await user.deleteById(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

module.exports = router;
