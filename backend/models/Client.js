const Database = require('../config/DBClass');

class Client {
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

    // Save or Update Client
    async saveOrUpdate() {
        try {
            if (this.id && this.id > 0) {
                // Update existing client
                const query = `
                    UPDATE clients 
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
                return { message: "Client updated successfully", result };
            } else {
                // Check if GST Number already exists
                const checkQuery = "SELECT id FROM clients WHERE gstNo = ?";
                const existing = await this.db.execute(checkQuery, [this.gstNo]);

                if (existing.length > 0) {
                    throw new Error("GST Number already exists.");
                }

                // Insert new client if GST No is unique
                const query = `
                    INSERT INTO clients (agencyId, name, contact, address, stateId, gstNo) 
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
                return { message: "Client added successfully", result };
            }
        } catch (error) {
            console.error("Error saving/updating client:", error);
            throw error;
        }
    }

    // Get all Clients
    async list() {
        const query = "SELECT C.*, S.name AS statename FROM Clients AS C, states AS S WHERE S.id = C.stateid ORDER BY S.name";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching clients:", error);
            throw error;
        }
    }

    // Get Client by ID
    async getById(id) {
        const query = "SELECT * FROM clients WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching client by ID:", error);
            throw error;
        }
    }

    // Delete Client by ID
    async deleteById(id) {
        const query = "DELETE FROM clients WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return { message: "Client deleted successfully", result };
        } catch (error) {
            console.error("Error deleting client by ID:", error);
            throw error;
        }
    }
}

module.exports = Client;
