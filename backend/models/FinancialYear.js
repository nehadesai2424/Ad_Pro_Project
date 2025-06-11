const Database = require('../config/DBClass');

class FinancialYear {
    constructor() {
        this.id = 0;
        this.name = "";
        this.startDate = "";
        this.endDate = "";
        this.db = new Database();
    }

    // Save or Update Financial Year
    async saveOrUpdate() {
        try {
            if (this.id && this.id > 0) {
                // Update existing financial year
                const query = `
                    UPDATE financialyears 
                    SET name = ?, startDate = ?, endDate = ? 
                    WHERE id = ?
                `;
                const values = [this.name, this.startDate, this.endDate, this.id];
                const result = await this.db.execute(query, values);
                return { message: "Financial Year updated successfully", result };
            } else {
                // Insert new financial year
                const query = `
                    INSERT INTO financialyears (name, startDate, endDate) 
                    VALUES (?, ?, ?)
                `;
                const values = [this.name, this.startDate, this.endDate];
                const result = await this.db.execute(query, values);
                return { message: "Financial Year added successfully", result };
            }
        } catch (error) {
            console.error("Error saving/updating Financial Year:", error);
            throw error;
        }
    }

    // Get all financial years
    async list() {
        const query = "SELECT * FROM financialyears";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching financial years:", error);
            throw error;
        }
    }

    // Get financial year by ID
    async getById(id) {
        const query = "SELECT * FROM financialyears WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching financial year by ID:", error);
            throw error;
        }
    }

    // Delete financial year by ID
    async deleteById(id) {
        const query = "DELETE FROM financialyears WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return { message: "Financial Year deleted successfully", result };
        } catch (error) {
            console.error("Error deleting financial year:", error);
            throw error;
        }
    }
}

module.exports = FinancialYear;
