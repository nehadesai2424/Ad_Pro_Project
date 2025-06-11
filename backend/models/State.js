const Database = require('../config/DBClass');

class State {
    constructor() {
        this.id = 0;
        this.name = "";
        this.db = new Database();
    }

    //saveOrUpdate method for saving or updating state
    async saveOrUpdate() {
        if (this.id && this.id > 0) {
            // Update existing state
            const query = "UPDATE states SET name = ? WHERE id = ?";
            try {
                const result = await this.db.execute(query, [this.name, this.id]);
                return { message: "State updated successfully", result };
            } catch (error) {
                console.error("Error updating state:", error);
                throw error;
            }
        } else {
            // Insert new state
            const query = "INSERT INTO states (name) VALUES (?)";
            try {
                const result = await this.db.execute(query, [this.name]);
                return { message: "State added successfully", result };
            } catch (error) {
                console.error("Error inserting state:", error);
                throw error;
            }
        }
    }


    async list() {
        const query = "SELECT * FROM states";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching states:", error);
            throw error;
        }
    }

    async getById(id) {
        const query = "SELECT * FROM states WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching state by ID:", error);
            throw error;
        }
    }

    async deleteById(id) {
        const query = "DELETE FROM states WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result;
        } catch (error) {
            console.error("Error deleting state by ID:", error);
            throw error;
        }
    }
}

module.exports = State;
