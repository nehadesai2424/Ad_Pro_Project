const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Create or Update Client
router.post('/', async (req, res) => {
    try {
        const { id, agencyId, name, contact, address, stateId, gstNo } = req.body;
        const client = new Client();

        // Assign values
        client.id = id || 0;
        client.agencyId = agencyId ||null;
        client.name = name;
        client.contact = contact;
        client.address = address;
        client.stateId = stateId;
        client.gstNo = gstNo;

        const result = await client.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message || "Failed to save or update client" });
    }
});

// Get all Clients
router.get('/', async (req, res) => {
    try {
        const client = new Client();
        const result = await client.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch clients" });
    }
});

// Get Client by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = new Client();
        const result = await client.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Client not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch client" });
    }
});

// Delete Client by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = new Client();
        const result = await client.deleteById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete client" });
    }
});

module.exports = router;
