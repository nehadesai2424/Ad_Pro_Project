const Database = require('../config/DBClass');

class Invoice {
    constructor() {
        this.id = 0;
        this.agencyId = 0;
        this.financialYear = '';
        this.invoiceNo = '';
        this.invoiceDate = '';
        this.clientId = 0;
        this.itemCount = 0;
        this.amount = 0;
        this.discount = 0;
        this.taxableAmount = 0;
        this.gstId = 0;
        this.cgstPercent = 0;
        this.cgstAmount = 0;
        this.sgstPercent = 0;
        this.sgstAmount = 0;
        this.igstPercent = 0;
        this.igstAmount = 0;
        this.billAmount = 0;

        this.db = new Database();
    }

    // Save or update invoice
    async saveOrUpdate() {
        if (this.id && this.id > 0) {
            const query = `
                UPDATE invoices SET
                    agencyId = ?, financialYear = ?, invoiceNo = ?, invoiceDate = ?,
                    clientId = ?, itemCount = ?, amount = ?, discount = ?, taxableAmount = ?,
                    gstId = ?, cgstPercent = ?, cgstAmount = ?, sgstPercent = ?, sgstAmount = ?,
                    igstPercent = ?, igstAmount = ?, billAmount = ?
                WHERE id = ?`;
            const values = [
                this.agencyId, this.financialYear, this.invoiceNo, this.invoiceDate,
                this.clientId, this.itemCount, this.amount, this.discount, this.taxableAmount,
                this.gstId, this.cgstPercent, this.cgstAmount, this.sgstPercent, this.sgstAmount,
                this.igstPercent, this.igstAmount, this.billAmount, this.id
            ];
            try {
                const result = await this.db.execute(query, values);
                return { message: "Invoice updated successfully", result };
            } catch (error) {
                console.error("Error updating invoice:", error);
                throw error;
            }
        } else {
            const query = `
                INSERT INTO invoices (
                    agencyId, financialYear, invoiceNo, invoiceDate,
                    clientId, itemCount, amount, discount, taxableAmount,
                    gstId, cgstPercent, cgstAmount, sgstPercent, sgstAmount,
                    igstPercent, igstAmount, billAmount
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [
                this.agencyId, this.financialYear, this.invoiceNo, this.invoiceDate,
                this.clientId, this.itemCount, this.amount, this.discount, this.taxableAmount,
                this.gstId, this.cgstPercent, this.cgstAmount, this.sgstPercent, this.sgstAmount,
                this.igstPercent, this.igstAmount, this.billAmount
            ];
            try {
                const result = await this.db.execute(query, values);
                return { message: "Invoice added successfully", result };
            } catch (error) {
                console.error("Error inserting invoice:", error);
                throw error;
            }
        }
    }

    // Get all invoices
    async list() {
        const query = "SELECT * FROM invoices";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching invoices:", error);
            throw error;
        }
    }

    // Get invoice by ID
    async getById(id) {
        const query = "SELECT * FROM invoices WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching invoice by ID:", error);
            throw error;
        }
    }

    // Delete invoice by ID
    async deleteById(id) {
        const query = "DELETE FROM invoices WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result;
        } catch (error) {
            console.error("Error deleting invoice by ID:", error);
            throw error;
        }
    }
}

module.exports = Invoice;
