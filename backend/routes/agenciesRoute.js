const express = require('express');
const router = express.Router();
const Agency = require('../models/Agency');
const User = require('../models/User');

// Create or Update Agency
router.post('/', async (req, res) => {
    try {
        const { id, name, address, city, district, stateId, ownername, contact, email } = req.body;
        const agency = new Agency();

        //Check if agency already exists

        // Assign values
        agency.id = id || 0;
        agency.name = name;
        agency.address = address;
        agency.city = city;
        agency.district = district;
        agency.stateId = stateId;
        agency.ownername = ownername;
        agency.contact = contact;
        agency.email = email;
        agency.logopath = "";
        agency.signaturepath = "";
        agency.stamppath = "";
        const result = await agency.saveOrUpdate();
        if(result.status == "success"){
            //Create one user
            const user = new User();
            user.id = 0;
            user.agencyId = result.result.insertId;
            user.email = email;
            user.password = "123456";
            user.name = ownername;
            user.createdOn = new Date();
            user.roleId = 1;
            await user.saveOrUpdate();
            res.status(200).json(result);
        }else{
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update agency" });
    }
});

// Get all agencies
router.get('/', async (req, res) => {
    try {
        const agency = new Agency();
        const result = await agency.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch agencies" });
    }
});

// Get agency by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const agency = new Agency();
        const result = await agency.getById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Agency not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch agency" });
    }
});

// Delete agency by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const agency = new Agency();
        const result = await agency.deleteById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete agency" });
    }
});

module.exports = router;
