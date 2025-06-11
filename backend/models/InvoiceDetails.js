const Database = require('../config/DBClass');

class InvoiceDetails {
    constructor() {
        this.id = 0;
        this.invoiceId = 0;
        this.srNo = 0;
        this.name = "";
        this.description = "";
        this.quantity = 0;
        this.rate = 0;
        this.amount = 0;
        this.db = new Database();
    }

    // Save or update invoice detail
    async saveOrUpdate() {
        if (this.id && this.id > 0) {
            const query = `
                UPDATE invoiceDetails 
                SET invoiceId = ?, srNo = ?, name = ?, description = ?, quantity = ?, rate = ?, amount = ? 
                WHERE id = ?`;
            try {
                const result = await this.db.execute(query, [
                    this.invoiceId,
                    this.srNo,
                    this.name,
                    this.description,
                    this.quantity,
                    this.rate,
                    this.amount,
                    this.id
                ]);
                return { message: "Invoice detail updated successfully", result };
            } catch (error) {
                console.error("Error updating invoice detail:", error);
                throw error;
            }
        } else {
            const query = `
                INSERT INTO invoiceDetails (invoiceId, srNo, name, description, quantity, rate, amount) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
            try {
                const result = await this.db.execute(query, [
                    this.invoiceId,
                    this.srNo,
                    this.name,
                    this.description,
                    this.quantity,
                    this.rate,
                    this.amount
                ]);
                return { message: "Invoice detail added successfully", result };
            } catch (error) {
                console.error("Error inserting invoice detail:", error);
                throw error;
            }
        }
    }

    async list() {
        const query = "SELECT * FROM invoiceDetails";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching invoice details:", error);
            throw error;
        }
    }

    async getById(id) {
        const query = "SELECT * FROM invoiceDetails WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching invoice detail by ID:", error);
            throw error;
        }
    }

    async deleteById(id) {
        const query = "DELETE FROM invoiceDetails WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result;
        } catch (error) {
            console.error("Error deleting invoice detail:", error);
            throw error;
        }
    }
}

module.exports = InvoiceDetails;
