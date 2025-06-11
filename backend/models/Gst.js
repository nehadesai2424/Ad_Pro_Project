const Database = require('../config/DBClass');

class Gst {
    constructor() {
        this.id = 0;
        this.agencyId = "";
        this.title = "";
        this.cgstPercent = 0.0;
        this.sgstPercent = 0.0;
        this.igstPercent = 0.0;
        this.gstCode = "";
        this.db = new Database();
    }

    // Save or Update GST
    async saveOrUpdate() {
        try {
            if (this.id && this.id > 0) {
                // Update existing GST record
                const query = `
                    UPDATE gsts 
                    SET agencyId = ?, title = ?, cgstPercent = ?, sgstPercent = ?, igstPercent = ?, gstCode = ? 
                    WHERE id = ?
                `;
                const result = await this.db.execute(query, [
                    this.agencyId,
                    this.title,
                    this.cgstPercent,
                    this.sgstPercent,
                    this.igstPercent,
                    this.gstCode,
                    this.id
                ]);
                return { message: "GST updated successfully", result };
            } else {
                // Insert new GST record
                const query = `
                    INSERT INTO gsts (agencyId, title, cgstPercent, sgstPercent, igstPercent, gstCode) 
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                const result = await this.db.execute(query, [
                    this.agencyId,
                    this.title,
                    this.cgstPercent,
                    this.sgstPercent,
                    this.igstPercent,
                    this.gstCode
                ]);
                return { message: "GST added successfully", result };
            }
        } catch (error) {
            console.error("Error saving/updating GST:", error);
            throw error;
        }
    }

    // Get all GST records
    async list() {
        const query = "SELECT * FROM gsts";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching GST records:", error);
            throw error;
        }
    }

    // Get GST by ID
    async getById(id) {
        const query = "SELECT * FROM gsts WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching GST by ID:", error);
            throw error;
        }
    }

    // Delete GST by ID
    async deleteById(id) {
        const query = "DELETE FROM gsts WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return { message: "GST deleted successfully", result };
        } catch (error) {
            console.error("Error deleting GST by ID:", error);
            throw error;
        }
    }
}

module.exports = Gst;
