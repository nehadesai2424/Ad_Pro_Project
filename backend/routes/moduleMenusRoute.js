const express = require('express');
const router = express.Router();
const ModuleMenu = require("../models/ModuleMenu");

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        let moduleMenu = new ModuleMenu();
        moduleMenu.moduleId = data.moduleId;
        moduleMenu.menuId = data.menuId;

        const result = await moduleMenu.save();
        res.json({ status: "success", data: result });
    } catch (err) {
        res.status(500).json({ status: "error", data: err.message });
    }
});

module.exports = router;
