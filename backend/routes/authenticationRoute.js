const express = require('express');
const router = express.Router();
const Agency = require('../models/Agency');
const User = require('../models/User');

// Agency registration
router.post('/register', async (req, res) => {
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
            //Send email or whatsapp as account created and share email password for login
            res.status(200).json(result);
        }else{
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to save or update agency" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = new User();
        const result = await user.login(email, password);
        if(result == null){            
            res.status(200).json({status:"failure", message:"Invalid credentials", data:null});
        }else{
            res.status(200).json({status:"success", message:"", data:result});
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
