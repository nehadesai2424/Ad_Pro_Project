const express = require('express');
const router = express.Router();
const InvoiceDetails = require('../models/InvoiceDetails');

// Save or update invoice detail
router.post('/', async (req, res) => {
    try {
        const {
            id, invoiceId, srNo, name, description, quantity, rate, amount
        } = req.body;

        const detail = new InvoiceDetails();
        detail.id = id || 0;
        detail.invoiceId = invoiceId;
        detail.srNo = srNo;
        detail.name = name;
        detail.description = description;
        detail.quantity = quantity;
        detail.rate = rate;
        detail.amount = amount;

        const result = await detail.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update invoice detail" });
    }
});

// Get all invoice details
router.get('/', async (req, res) => {
    try {
        const detail = new InvoiceDetails();
        const result = await detail.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch invoice details" });
    }
});

// Get invoice detail by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const detail = new InvoiceDetails();
        const result = await detail.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Invoice detail not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch invoice detail" });
    }
});

// Delete invoice detail by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const detail = new InvoiceDetails();
        await detail.deleteById(id);
        res.status(200).json({ message: "Invoice detail deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete invoice detail" });
    }
});

module.exports = router;
