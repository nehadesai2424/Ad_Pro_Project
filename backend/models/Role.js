const Database = require('../config/DBClass');

class Role {
    constructor() {
        this.id = 0;
        this.name = "";
        this.db = new Database();
    }

    // Save or update role
    async saveOrUpdate() {
        if (this.id && this.id > 0) {
            // Update existing role
            const query = "UPDATE roles SET name = ? WHERE id = ?";
            try {
                const result = await this.db.execute(query, [this.name, this.id]);
                return { message: "Role updated successfully", result };
            } catch (error) {
                console.error("Error updating role:", error);
                throw error;
            }
        } else {
            // Insert new role
            const query = "INSERT INTO roles (name) VALUES (?)";
            try {
                const result = await this.db.execute(query, [this.name]);
                return { message: "Role added successfully", result };
            } catch (error) {
                console.error("Error inserting role:", error);
                throw error;
            }
        }
    }

    // Get all roles
    async list() {
        const query = "SELECT * FROM roles";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching roles:", error);
            throw error;
        }
    }

    // Get role by ID
    async getById(id) {
        const query = "SELECT * FROM roles WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching role by ID:", error);
            throw error;
        }
    }

    // Delete role by ID
    async deleteById(id) {
        const query = "DELETE FROM roles WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result;
        } catch (error) {
            console.error("Error deleting role by ID:", error);
            throw error;
        }
    }
}

module.exports = Role;
