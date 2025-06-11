const Database = require('../config/DBClass');

class Holiday {
    constructor() {
        this.id = 0;
        this.agencyId = 0;
        this.holidayDate = "";
        this.reason = "";
        this.every_year = "No";
        this.db = new Database();
    }

    // Save or Update Holiday
    async saveOrUpdate() {
        try {
            if (this.id && this.id > 0) {
                // Update existing holiday
                const query = `
                    UPDATE holidays 
                    SET agencyId = ?, holidayDate = ?, reason = ?, every_year = ? 
                    WHERE id = ?
                `;
                const values = [this.agencyId, this.holidayDate, this.reason, this.every_year, this.id];
                const result = await this.db.execute(query, values);
                return { message: "Holiday updated successfully", result };
            } else {
                // Insert new holiday
                const query = `
                    INSERT INTO holidays (agencyId, holidayDate, reason, every_year) 
                    VALUES (?, ?, ?, ?)
                `;
                const values = [this.agencyId, this.holidayDate, this.reason, this.every_year];
                const result = await this.db.execute(query, values);
                return { message: "Holiday added successfully", result };
            }
        } catch (error) {
            console.error("Error saving/updating Holiday:", error);
            throw error;
        }
    }

    // Get all holidays
    async list() {
        const query = "SELECT * FROM holidays";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching holidays:", error);
            throw error;
        }
    }

    // Get holiday by ID
    async getById(id) {
        const query = "SELECT * FROM holidays WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching holiday by ID:", error);
            throw error;
        }
    }

    // Delete holiday by ID
    async deleteById(id) {
        const query = "DELETE FROM holidays WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return { message: "Holiday deleted successfully", result };
        } catch (error) {
            console.error("Error deleting holiday:", error);
            throw error;
        }
    }
}

module.exports = Holiday;
