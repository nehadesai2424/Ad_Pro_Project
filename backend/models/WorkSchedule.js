const Database = require('../config/DBClass');

class WorkSchedule {
    constructor() {
        this.id = 0;
        this.agencyId = 0;
        this.userId = 0;
        this.title = "";
        this.description = "";
        this.workDate = "";
        this.status = "Not Done"; // default status
        //this.status= newStatus,

        this.db = new Database();
    }

    // Save or Update WorkSchedule
    async saveOrUpdate() {
        if (this.id && this.id > 0) {
            // Update existing WorkSchedule
            const query = `
                UPDATE workschedules 
                SET agencyId = ?, userId = ?, title = ?, description = ?, workDate = ?, status = ? 
                WHERE id = ?
            `;
            try {
                const result = await this.db.execute(query, [
                    this.agencyId,
                    this.userId,
                    this.title,
                    this.description,
                    this.workDate,
                    this.status,
                    this.id
                ]);
                return { message: "WorkSchedule updated successfully", result };
            } catch (error) {
                console.error("Error updating WorkSchedule:", error);
                throw error;
            }
        } else {
            // Insert new WorkSchedule
            const query = `
                INSERT INTO workschedules 
                (agencyId, userId, title, description, workDate, status) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            try {
                const result = await this.db.execute(query, [
                    this.agencyId,
                    this.userId,
                    this.title,
                    this.description,
                    this.workDate,
                    this.status
                ]);
                return { message: "WorkSchedule added successfully", result };
            } catch (error) {
                console.error("Error inserting WorkSchedule:", error);
                throw error;
            }
        }
    }

    // // Get all WorkSchedules
    async list() {
        const query = " SELECT WS.*, U.name AS username FROM workschedules AS WS, users AS U WHERE U.id = WS.userId ORDER BY U.name";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching WorkSchedules:", error);
            throw error;
        }
    }


    // Get WorkSchedule by ID
    async getById(id) {
        const query = "SELECT * FROM workschedules WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching WorkSchedule by ID:", error);
            throw error;
        }
    }

    // Delete WorkSchedule by ID
    async deleteById(id) {
        const query = "DELETE FROM workschedules WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result;
        } catch (error) {
            console.error("Error deleting WorkSchedule by ID:", error);
            throw error;
        }
    }
}

module.exports = WorkSchedule;


