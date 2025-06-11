const Database = require('../config/DBClass');

class PmediaRo {
    constructor() {
        this.id = 0;
        this.agencyId = 0;
        this.financialYear = "";
        this.roNo = "";
        this.roDate = "";
        this.clientId = 0;
        this.pmediaId = 0;
        this.centers = "";
        this.language = "";
        this.caption = "";
        this.noOfRecords = 0;
        this.paidDays = 0;
        this.freeDays = 0;
        this.totalCharges = 0.0;
        this.comissionPercent = 0.0;
        this.comissionAmount = 0.0;
        this.chequeNo = "";
        this.chequeDate = "";
        this.bankName = "";
        this.roBillAmount = 0.0;
        this.instructions = "";
        this.gstId = 0;
        this.cgstPercent = 0.0;
        this.cgstAmount = 0.0;
        this.sgstPercent = 0.0;
        this.sgstAmount = 0.0;
        this.igstPercent = 0.0;
        this.igstAmount = 0.0;
        this.ccPercent = 0.0;
        this.ccAmount = 0.0;
        this.status = "";
        this.db = new Database();
    }

    async saveOrUpdate() {
        if (this.id && this.id > 0) {
            // Update
            const query = `
                UPDATE pmediaros SET 
                agencyId=?, financialYear=?, roNo=?, roDate=?, clientId=?, pmediaId=?, centers=?, language=?, caption=?, 
                noOfRecords=?, paidDays=?, freeDays=?, totalCharges=?, comissionPercent=?, comissionAmount=?, 
                chequeNo=?, chequeDate=?, bankName=?, roBillAmount=?, instructions=?, gstId=?, 
                cgstPercent=?, cgstAmount=?, sgstPercent=?, sgstAmount=?, igstPercent=?, igstAmount=?, 
                ccPercent=?, ccAmount=?, status=? WHERE id=?
            `;
            const params = [
                this.agencyId, this.financialYear, this.roNo, this.roDate, this.clientId, this.pmediaId, this.centers, this.language, this.caption,
                this.noOfRecords, this.paidDays, this.freeDays, this.totalCharges, this.comissionPercent, this.comissionAmount,
                this.chequeNo, this.chequeDate, this.bankName, this.roBillAmount, this.instructions, this.gstId,
                this.cgstPercent, this.cgstAmount, this.sgstPercent, this.sgstAmount, this.igstPercent, this.igstAmount,
                this.ccPercent, this.ccAmount, this.status,
                this.id
            ];
            try {
                const result = await this.db.execute(query, params);
                return { message: "PmediaRo updated successfully", result };
            } catch (error) {
                console.error("Error updating pmediaros:", error);
                throw error;
            }
        } else {
            // Insert
            const query = `
                INSERT INTO pmediaros (
                    agencyId, financialYear, roNo, roDate, clientId, pmediaId, centers, language, caption, 
                    noOfRecords, paidDays, freeDays, totalCharges, comissionPercent, comissionAmount, 
                    chequeNo, chequeDate, bankName, roBillAmount, instructions, gstId, 
                    cgstPercent, cgstAmount, sgstPercent, sgstAmount, igstPercent, igstAmount, 
                    ccPercent, ccAmount, status
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `;
            const params = [
                this.agencyId, this.financialYear, this.roNo, this.roDate, this.clientId, this.pmediaId, this.centers, this.language, this.caption,
                this.noOfRecords, this.paidDays, this.freeDays, this.totalCharges, this.comissionPercent, this.comissionAmount,
                this.chequeNo, this.chequeDate, this.bankName, this.roBillAmount, this.instructions, this.gstId,
                this.cgstPercent, this.cgstAmount, this.sgstPercent, this.sgstAmount, this.igstPercent, this.igstAmount,
                this.ccPercent, this.ccAmount, this.status
            ];
            try {
                const result = await this.db.execute(query, params);
                return { message: "PmediaRo added successfully", result };
            } catch (error) {
                console.error("Error inserting pmediaros:", error);
                throw error;
            }
        }
    }

    async list() {
        const query = "SELECT * FROM pmediaros";
        try {
            const result = await this.db.execute(query);
            return result;
        } catch (error) {
            console.error("Error fetching pmediaros list:", error);
            throw error;
        }
    }

    async getById(id) {
        const query = "SELECT * FROM pmediaros WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error fetching pmediaros by ID:", error);
            throw error;
        }
    }

    async deleteById(id) {
        const query = "DELETE FROM pmediaros WHERE id = ?";
        try {
            const result = await this.db.execute(query, [id]);
            return result;
        } catch (error) {
            console.error("Error deleting pmediaros:", error);
            throw error;
        }
    }
}

module.exports = PmediaRo;
