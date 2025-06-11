const Database = require('../config/DBClass');

class Agency {
    constructor() {
        this.id = 0;
        this.name = "";
        this.address = "";
        this.city = "";
        this.district = "";
        this.stateId = "";
        this.ownername = "";
        this.contact = "";
        this.email = "";
        this.logopath = "";
        this.signaturepath = "";
        this.stamppath = "";
        this.db = new Database();
    }

    // Save or Update Agency
    async saveOrUpdate() {
        try {
            if (this.id && this.id > 0) {
                // Update existing agency record
                const query = `
                    UPDATE agencies 
                    SET name = ?, address = ?, city = ?, district = ?, stateId = ?, 
                        ownername = ?, contact = ?, email = ?, logopath = ?, 
                        signaturepath = ?, stamppath = ?
                    WHERE id = ?
                `;
                const values = [
                    this.name, this.address, this.city, this.district, this.stateId,
                    this.ownername, this.contact, this.email, this.logopath,
                    this.signaturepath, this.stamppath, this.id
                ];
                const result = await this.db.execute(query, values);
                return { message: "Agency updated successfully", result };
            } else {
                // Insert new agency record
                const query = `
                    INSERT INTO agencies (name, address, city, district, stateId, ownername, 
                                          contact, email, logopath, signaturepath, stamppath) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const values = [
                    this.name, this.address, this.city, this.district, this.stateId,
                    this.ownername, this.contact, this.email, this.logopath,
                    this.signaturepath, this.stamppath
                ];
                const result = await this.db.execute(query, values);
                return { status: "success", message: "Agency added successfully", result };
            }
        } catch (error) {
            return { status: "failure", message: "Account with email id already exists" };
            // console.error("Error saving/updating agency:", error);            
        }
    }

    // Get all agencies
    async list() {
        const query = "SELECT * FROM agencies ";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching agencies:", error);
            throw error;
        }
    }

    // Get agency by ID
    async getById(id) {
        const query = "SELECT * FROM agencies WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching agency by ID:", error);
            throw error;
        }
    }

    // Check if agency exists by email
    async exists() {
        const query = "SELECT * FROM agencies WHERE email = ?";
        try {
            const result = await this.db.execute(query, [this.email]);
            return result.length > 0;
        } catch (error) {
            console.error("Error checking agency existence:", error);
            throw error;
        }
    }

    // Delete agency by ID
    async deleteById(id) {
        const query = "DELETE FROM agencies WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return { message: "Agency deleted successfully", result };
        } catch (error) {
            console.error("Error deleting agency by ID:", error);
            throw error;
        }
    }
}

module.exports = Agency;
