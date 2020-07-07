// Importing express inside your server
const express = require('express');
//Invoke the router() within express
const router = express.Router();
// Import the EmailsModel
const EmailsModel = require('../models/EmailsModel');

// A POST route for saving data into the 'emails' collection
router.post(
    '/register',
    (req, res) => {

        //Read the 'Body' within POST request
        const formData = {
            email: req.body.email, 
        };

            // Save the data to database (emails collection)
            const newEmailsModel = new EmailsModel (formData);
            newEmailsModel.save();

        res.json({message: 'Your Email has been saved!'});
    }
);

// Export the router
module.exports = router;
