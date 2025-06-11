const Database = require('../config/DBClass');

class AdSchedule {
    constructor() {
        this.id = 0;
        this.agencyId = 0;
        this.clientId = 0;
        this.pmediaId = 0;
        this.adDate = "";
        this.description = "";
        this.pmediaRoId = 0;
        this.beforeClientMessage = "";
        this.beforeAgencyMessage = "";
        this.onDateClientMessage = "";
        this.onDateAgencyMessage = "";
        this.db = new Database();
    }

    // Save or Update Ad Schedule
    async saveOrUpdate() {
        try {
            if (this.id && this.id > 0) {
                // Update existing ad schedule
                const query = `
                    UPDATE adschedules 
                    SET agencyId = ?, clientId = ?, pmediaId = ?, adDate = ?, description = ?, pmediaRoId = ?, 
                        beforeClientMessage = ?, beforeAgencyMessage = ?, onDateClientMessage = ?, onDateAgencyMessage = ?
                    WHERE id = ?
                `;
                const values = [
                    this.agencyId, this.clientId, this.pmediaId, this.adDate, this.description, this.pmediaRoId,
                    this.beforeClientMessage, this.beforeAgencyMessage, this.onDateClientMessage, this.onDateAgencyMessage,
                    this.id
                ];
                const result = await this.db.execute(query, values);
                return { message: "Ad Schedule updated successfully", result };
            } else {
                // Insert new ad schedule
                const query = `
                    INSERT INTO adschedules 
                    (agencyId, clientId, pmediaId, adDate, description, pmediaRoId, 
                    beforeClientMessage, beforeAgencyMessage, onDateClientMessage, onDateAgencyMessage) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const values = [
                    this.agencyId, this.clientId, this.pmediaId, this.adDate, this.description, this.pmediaRoId,
                    this.beforeClientMessage, this.beforeAgencyMessage, this.onDateClientMessage, this.onDateAgencyMessage
                ];
                const result = await this.db.execute(query, values);
                return { message: "Ad Schedule added successfully", result };
            }
        } catch (error) {
            console.error("Error saving/updating Ad Schedule:", error);
            throw error;
        }
    }

    // Get all ad schedules
    async list() {
        // const query = "SELECT * FROM adschedules";
        const query = `SELECT A.*, C.name AS clientname FROM adschedules AS A , clients AS C WHERE C.id = A.clientid ORDER BY C.name`;
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching ad schedules:", error);
            throw error;
        }
    }

    // Get ad schedule by ID
    async getById(id) {
        const query = "SELECT * FROM adschedules WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching ad schedule by ID:", error);
            throw error;
        }
    }

    // Delete ad schedule by ID
    async deleteById(id) {
        const query = "DELETE FROM adschedules WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return { message: "Ad Schedule deleted successfully", result };
        } catch (error) {
            console.error("Error deleting ad schedule:", error);
            throw error;
        }
    }
}

module.exports = AdSchedule;
