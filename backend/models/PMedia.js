const Database = require('../config/DBClass');

class Pmedia {
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

    // Save or Update Pmedia
    async saveOrUpdate() {
        try {
            if (this.id && this.id > 0) {
                // Update existing record
                const query = `
                    UPDATE pmedias 
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
                return { message: "Pmedia updated successfully", result };
            } else {
                // Check if gstNo already exists before inserting
                const checkQuery = "SELECT id FROM pmedias WHERE gstNo = ?";
                const existing = await this.db.execute(checkQuery, [this.gstNo]);

                if (existing.length > 0) {
                    throw new Error("GST Number already exists.");
                }

                // Insert new record
                const query = `
                    INSERT INTO pmedias (agencyId, name, contact, address, stateId, gstNo) 
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
                return { message: "Pmedia added successfully", result };
            }
        } catch (error) {
            console.error("Error saving/updating Pmedia:", error);
            throw error;
        }
    }

    // Get all Pmedia records
    async list() {
        const query = "SELECT P.*, S.name AS stateName FROM Pmedias AS P, states AS S WHERE S.id = P.stateid ORDER BY S.name"
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching Pmedia records:", error);
            throw error;
        }
    }

    // Get Pmedia by ID
    async getById(id) {
        const query = "SELECT * FROM pmedias WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching Pmedia by ID:", error);
            throw error;
        }
    }

    // Delete Pmedia by ID
    async deleteById(id) {
        const query = "DELETE FROM pmedias WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return { message: "Pmedia deleted successfully", result };
        } catch (error) {
            console.error("Error deleting Pmedia by ID:", error);
            throw error;
        }
    }
}

module.exports = Pmedia;
