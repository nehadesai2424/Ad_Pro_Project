const Database = require('../config/DBClass');

class ModuleMenu {
    constructor() {
        this.id = 0;
        this.moduleId = 0;
        this.menuId = 0;
        this.db = new Database();
    }

    async save() {
        const query = `INSERT INTO moduleMenus (moduleId, menuId) VALUES (?, ?)`;
        try {
            const result = await this.db.execute(query, [this.moduleId, this.menuId]);
            return result;
        } catch (error) {
            console.error("Error inserting module-menu relation:", error);
            throw error;
        }
    }
}

module.exports = ModuleMenu;
