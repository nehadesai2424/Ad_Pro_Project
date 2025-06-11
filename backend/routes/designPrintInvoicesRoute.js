const express = require('express');
const router = express.Router();
const Invoice = require('../models/DesignPrintInvoices');

// POST method to save or update an invoice
router.post('/', async (req, res) => {
    try {
        const invoice = new Invoice();

        // Assign request body values to invoice object
        Object.assign(invoice, req.body);
        invoice.id = invoice.id || 0; // Default to 0 if id not provided

        const result = await invoice.saveOrUpdate();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error saving/updating invoice:", error);
        res.status(500).json({ error: "Failed to save or update invoice" });
    }
});

// GET all invoices
router.get('/', async (req, res) => {
    try {
        const invoice = new Invoice();
        const invoices = await invoice.list();
        res.status(200).json(invoices);
    } catch (error) {
        console.error("Error fetching invoices:", error);
        res.status(500).json({ error: "Failed to fetch invoices" });
    }
});

// GET invoice by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = new Invoice();
        const result = await invoice.getById(id);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Invoice not found" });
        }
    } catch (error) {
        console.error("Error fetching invoice by ID:", error);
        res.status(500).json({ error: "Failed to fetch invoice" });
    }
});

// DELETE invoice by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = new Invoice();
        await invoice.deleteById(id);
        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        console.error("Error deleting invoice:", error);
        res.status(500).json({ error: "Failed to delete invoice" });
    }
});

module.exports = router;
