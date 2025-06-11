const Database = require('../config/DBClass');

class User {
    constructor() {
        this.id = 0;
        this.agencyId = 0;
        this.email = "";
        this.password = "";
        this.name = "";
        this.createdOn = new Date();
        this.roleId = 0;
        this.db = new Database();
    }

    // Save or Update User
    async saveOrUpdate() {
        try {
            if (this.id && this.id > 0) {
                // Update existing user 
                const query = `
                    UPDATE users 
                    SET agencyId=?, password =?, email = ?, name = ?, roleId = ? 
                    WHERE id = ?
                `;
                const result = await this.db.execute(query, [
                    this.agencyId,
                    this.password, // No password hashing
                    this.email,
                    this.name,
                    this.roleId,
                    this.id
                ]);
                return { message: "User updated successfully", result };
            } else {
                // Insert new user without hashing password
                const query = `
                    INSERT INTO users ( agencyId ,email, password, name, createdOn, roleId) 
                    VALUES (?, ?, ?, ?, ?,?)
                `;
                const result = await this.db.execute(query, [
                    this.agencyId,
                    this.email,
                    this.password, // No password hashing
                    this.name,
                    this.createdOn,
                    this.roleId
                ]);
                return { message: "User added successfully", result };
            }
        } catch (error) {
            console.error("Error saving/updating user:", error);
            throw error;
        }
    }

    // Get all Users
    async list() {
        const query = "SELECT U.*, R.name AS rolename FROM users AS U, roles AS R WHERE R.id = U.roleid ORDER BY U.name";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    // Get User by ID
    async getById(id) {
        const query = "SELECT id, email, password , name, createdOn, roleId FROM users WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    }

     // Get User by ID
     async login(email, password) {        
        let query = "SELECT U.id, U.agencyId, U.email, U.name, U.roleId, R.name AS rolename, A.name AS agencyname ";
        query += "FROM users AS U, roles AS R, agencies AS A WHERE U.roleId = R.id AND A.id = U.agencyId AND U.email = '" + email + "' AND U.password = '" + password + "'";        
        
        try {
            const result = await this.db.execute(query);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    }


    // Find User by Email (For Login)
    async findByEmail(email) {
        const query = "SELECT * FROM users WHERE email = ?";
        try {
            const result = await this.db.execute(query, [email]);
            return result.length ? result[0] : null;
        } catch (error) {
            console.error("Error finding user:", error);
            throw error;
        }
    }

    // Delete User by ID
    async deleteById(id) {
        const query = "DELETE FROM users WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return { message: "User deleted successfully", result };
        } catch (error) {
            console.error("Error deleting user by ID:", error);
            throw error;
        }
    }
}

module.exports = User;
