const Database = require('../config/DBClass');

class RoleModule {
    constructor() {
        this.id = 0;
        this.moduleId = 0;
        this.roleId = 0;
        this.db = new Database();
    }

    async save() {
        const query = `INSERT INTO roleModules (moduleId, roleId) VALUES (?, ?)`;
        try {
            const result = await this.db.execute(query, [this.moduleId, this.roleId]);
            return result;
        } catch (error) {
            console.error("Error inserting role-module relation:", error);
            throw error;
        }
    }
}

module.exports = RoleModule;
