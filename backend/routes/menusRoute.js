const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Post method to save or update menu
router.post('/', async (req, res) => {
    try {
        const { id, title, link, isParent, parentId, srNo } = req.body;
        const menu = new Menu();
        menu.id = id || 0; // Default to 0 if id is not provided
        menu.title = title;
        menu.link = link;
        menu.isParent = isParent;
        menu.parentId = parentId;
        menu.srNo = srNo;
        const result = await menu.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update menu" });
    }
});

// Get all menus
router.get('/', async (req, res) => {
    try {
        const menu = new Menu();
        const menus = await menu.list();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch menus" });
    }
});

// Get menu by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const menu = new Menu();
        const result = await menu.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Menu not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch menu" });
    }
});

// Delete menu by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const menu = new Menu();
        await menu.deleteById(id);
        res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete menu" });
    }
});

module.exports = router;
