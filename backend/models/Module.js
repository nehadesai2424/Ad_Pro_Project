const Database = require('../config/DBClass');

class Module {
    constructor() {
        this.id = 0;
        this.name = "";
        this.db = new Database();
    }

    // Save or update module
    async saveOrUpdate() {
        if (this.id && this.id > 0) {
            // Update existing module
            const query = "UPDATE modules SET name = ? WHERE id = ?";
            try {
                const result = await this.db.execute(query, [this.name, this.id]);
                return { message: "Module updated successfully", result };
            } catch (error) {
                console.error("Error updating module:", error);
                throw error;
            }
        } else {
            // Insert new module
            const query = "INSERT INTO modules (name) VALUES (?)";
            try {
                const result = await this.db.execute(query, [this.name]);
                return { message: "Module added successfully", result };
            } catch (error) {
                console.error("Error inserting module:", error);
                throw error;
            }
        }
    }

    // Get all modules
    async list() {
        const query = "SELECT * FROM modules";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching modules:", error);
            throw error;
        }
    }

    // Get module by ID
    async getById(id) {
        const query = "SELECT * FROM modules WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching module by ID:", error);
            throw error;
        }
    }

    // Delete module by ID
    async deleteById(id) {
        const query = "DELETE FROM modules WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result;
        } catch (error) {
            console.error("Error deleting module by ID:", error);
            throw error;
        }
    }
}

module.exports = Module;
