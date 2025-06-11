const Database = require('../config/DBClass');

class Emedia {
    constructor() {
        this.id = 0;
        this.agencyId = 0;
        this.name = "";
        this.contact = "";
        this.address = "";
        this.stateId = 0;
        this.gstNo = "";
        this.db = new Database();
    }

    // Save or Update Emedia
    async saveOrUpdate() {
        try {
            if (this.id && this.id > 0) {
                // Update existing record
                const query = `
                    UPDATE emedias 
                    SET agencyId = ?, name = ?, contact = ?, address = ?, stateId = ?, gstNo = ? 
                    WHERE id = ?
                `;
                const result = await this.db.execute(query, [
                    this.agencyId,
                    this.name,
                    this.contact,
                    this.address,
                    this.stateId,
                    this.gstNo,
                    this.id
                ]);
                return { message: "Emedia updated successfully", result };
            } else {
                // Check if gstNo already exists before inserting
                const checkQuery = "SELECT id FROM emedias WHERE gstNo = ?";
                const existing = await this.db.execute(checkQuery, [this.gstNo]);

                if (existing.length > 0) {
                    throw new Error("GST Number already exists.");
                }

                // Insert new record
                const query = `
                    INSERT INTO emedias (agencyId, name, contact, address, stateId, gstNo) 
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                const result = await this.db.execute(query, [
                    this.agencyId,
                    this.name,
                    this.contact,
                    this.address,
                    this.stateId,
                    this.gstNo
                ]);
                return { message: "Emedia added successfully", result };
            }
        } catch (error) {
            console.error("Error saving/updating Emedia:", error);
            throw error;
        }
    }

    // Get all Emedia records
    async list() {
        const query = "SELECT E.*, S.name AS stateName FROM Emedias AS E, states AS S WHERE S.id = E.stateid ORDER BY S.name";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching Emedia records:", error);
            throw error;
        }
    }

    // Get Emedia by ID
    async getById(id) {
        const query = "SELECT * FROM emedias WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching Emedia by ID:", error);
            throw error;
        }
    }

    // Delete Emedia by ID
    async deleteById(id) {
        const query = "DELETE FROM emedias WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return { message: "Emedia deleted successfully", result };
        } catch (error) {
            console.error("Error deleting Emedia by ID:", error);
            throw error;
        }
    }
}

module.exports = Emedia;
