const express = require('express');
const router = express.Router();
const RoleModule = require("../models/RoleModule");

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        let roleModule = new RoleModule();
        roleModule.moduleId = data.moduleId;
        roleModule.roleId = data.roleId;

        const result = await roleModule.save();
        res.json({ status: "success", data: result });
    } catch (err) {
        res.status(500).json({ status: "error", data: err.message });
    }
});

module.exports = router;
