const Database = require('../config/DBClass');

class EmediaRO {
    constructor() {
        this.id = 0;
        this.agencyId = 0;
        this.financialYear = '';
        this.roNo = '';
        this.roDate = '';
        this.clientId = 0;
        this.emediaId = 0;
        this.centers = '';
        this.language = '';
        this.caption = '';
        this.noOfRecords = 0;
        this.totalSpots = 0;
        this.totalCharges = 0;
        this.comissionPercent = 0;
        this.comissionAmount = 0;
        this.chequeNo = '';
        this.chequeDate = '';
        this.bankName = '';
        this.roBillAmount = 0;
        this.instructions = '';
        this.gstId = 0;
        this.cgstPercent = 0;
        this.cgstAmount = 0;
        this.sgstPercent = 0;
        this.sgstAmount = 0;
        this.igstPercent = 0;
        this.igstAmount = 0;
        this.ccPercent = 0;
        this.ccAmount = 0;
        this.status = '';
        this.db = new Database();
    }

    async saveOrUpdate() {
        if (this.id && this.id > 0) {
            const query = `UPDATE emediaros SET
                agencyId = ?, financialYear = ?, roNo = ?, roDate = ?, clientId = ?, emediaId = ?, centers = ?, language = ?,
                caption = ?, noOfRecords = ?, totalSpots = ?, totalCharges = ?, comissionPercent = ?, comissionAmount = ?,
                chequeNo = ?, chequeDate = ?, bankName = ?, roBillAmount = ?, instructions = ?, gstId = ?, cgstPercent = ?,
                cgstAmount = ?, sgstPercent = ?, sgstAmount = ?, igstPercent = ?, igstAmount = ?, ccPercent = ?, ccAmount = ?, status = ?
                WHERE id = ?`;
            const values = [
                this.agencyId, this.financialYear, this.roNo, this.roDate, this.clientId, this.emediaId, this.centers, this.language,
                this.caption, this.noOfRecords, this.totalSpots, this.totalCharges, this.comissionPercent, this.comissionAmount,
                this.chequeNo, this.chequeDate, this.bankName, this.roBillAmount, this.instructions, this.gstId, this.cgstPercent,
                this.cgstAmount, this.sgstPercent, this.sgstAmount, this.igstPercent, this.igstAmount, this.ccPercent, this.ccAmount, this.status,
                this.id
            ];
            try {
                const result = await this.db.execute(query, values);
                return { message: "Emedia RO updated successfully", result };
            } catch (error) {
                console.error("Error updating Emedia RO:", error);
                throw error;
            }
        } else {
            const query = `INSERT INTO emediaros (
                agencyId, financialYear, roNo, roDate, clientId, emediaId, centers, language, caption, noOfRecords,
                totalSpots, totalCharges, comissionPercent, comissionAmount, chequeNo, chequeDate, bankName, roBillAmount,
                instructions, gstId, cgstPercent, cgstAmount, sgstPercent, sgstAmount, igstPercent, igstAmount, ccPercent,
                ccAmount, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [
                this.agencyId, this.financialYear, this.roNo, this.roDate, this.clientId, this.emediaId, this.centers, this.language,
                this.caption, this.noOfRecords, this.totalSpots, this.totalCharges, this.comissionPercent, this.comissionAmount,
                this.chequeNo, this.chequeDate, this.bankName, this.roBillAmount, this.instructions, this.gstId, this.cgstPercent,
                this.cgstAmount, this.sgstPercent, this.sgstAmount, this.igstPercent, this.igstAmount, this.ccPercent,
                this.ccAmount, this.status
            ];
            try {
                const result = await this.db.execute(query, values);
                return { message: "Emedia RO added successfully", result };
            } catch (error) {
                console.error("Error inserting Emedia RO:", error);
                throw error;
            }
        }
    }

    async list() {
        const query = "SELECT * FROM emediaros";
        try {
            return await this.db.execute(query);
        } catch (error) {
            console.error("Error fetching Emedia ROs:", error);
            throw error;
        }
    }

    async getById(id) {
        const query = "SELECT * FROM emediaros WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching Emedia RO by ID:", error);
            throw error;
        }
    }

    async deleteById(id) {
        const query = "DELETE FROM emediaros WHERE id = ?";
        try {
            return await this.db.execute(query, [id]);
        } catch (error) {
            console.error("Error deleting Emedia RO by ID:", error);
            throw error;
        }
    }
}

module.exports = EmediaRO;
