const Database = require('../config/DBClass');

class Menu {
    constructor() {
        this.id = 0;
        this.title = "";
        this.link = "";
        this.isParent = false;
        this.parentId = null;
        this.srNo = 0;
        this.db = new Database();
    }

    // Save or update menu
    async saveOrUpdate() {
        if (this.id && this.id > 0) {
            // Update existing menu
            const query = "UPDATE menus SET title = ?, link = ?, isParent = ?, parentId = ?, srNo = ? WHERE id = ?";
            try {
                const result = await this.db.execute(query, [this.title, this.link, this.isParent, this.parentId, this.srNo, this.id]);
                return { message: "Menu updated successfully", result };
            } catch (error) {
                console.error("Error updating menu:", error);
                throw error;
            }
        } else {
            // Insert new menu
            const query = "INSERT INTO menus (title, link, isParent, parentId, srNo) VALUES (?, ?, ?, ?, ?)";
            try {
                const result = await this.db.execute(query, [this.title, this.link, this.isParent, this.parentId, this.srNo]);
                return { message: "Menu added successfully", result };
            } catch (error) {
                console.error("Error inserting menu:", error);
                throw error;
            }
        }
    }

    // Get all menus
    async list() {
        const query = "SELECT * FROM menus";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching menus:", error);
            throw error;
        }
    }

    // Get menu by ID
    async getById(id) {
        const query = "SELECT * FROM menus WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching menu by ID:", error);
            throw error;
        }
    }

    // Delete menu by ID
    async deleteById(id) {
        const query = "DELETE FROM menus WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result;
        } catch (error) {
            console.error("Error deleting menu by ID:", error);
            throw error;
        }
    }
}

module.exports = Menu;
