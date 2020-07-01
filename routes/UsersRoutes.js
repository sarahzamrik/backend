// Importing express inside your server
const express = require('express');
//Invoke the router() within express
const router = express.Router();
// Import encryption package
const bcrypt = require('bcrypt');
// Generate webtoken
const jwt = require ('jsonwebtoken');
// Create secret
const secret = "Srts3%$#Qtq";
// Import the FeedsModel
const UsersModel = require('../models/UsersModel');

// /register
router.post(
    '/register',
    (req, res) => {
        const formData = {
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email, 
            password: req.body.password
        };
        // Password Encyption Steps
        // Step 1) Generate a salt
        bcrypt.genSalt(
            (err, salt) => {
        
                // Step 2) Generate a hash
                bcrypt.hash(
                    formData.password, // first ingredient
                    salt, // second ingredient
                        (err, hashedPassword) => {
                            const newUsersModel = new UsersModel(formData);
                        
                            // Step 3) Replace the original password with hash
                            newUsersModel.password = hashedPassword;
                        
                                // Step 4) Save user data to database (with encrypted password)
                                newUsersModel.save(
                                    (err, dbResult) => {
                                        // If something goes wrong, send error
                                        if(err) {
                                            res.send (err);
                                        } 
                                        //Otherwise, send success message
                                        else {
                                        res.send ('User has been saved')
                                        }
                                    }
                                )
                        }
                )
            }
        );
    }
);

// /login
router.post(
    '/login',
    (req, res) => {

        // npm packages to install: passport, passportjwt, jsonwebtoken

        // Step 1. Capture formData (email & password)
        const formData = {
            email: req.body.email, 
            password: req.body.password
        }
        // Step 2a. In database, find account that matches email
        UsersModel.findOne(
            {email: formData.email},
            (err, document) => {
                
            // Step 2b. If email DOES NOT match, reject the login request
                if (!document) {
                    res.send("Please check email or password");
                }
            // Step 3. If there's matching email, examine the document's password
                else {
                    
                // Step 4. Compare the encypted password in DB with incoming password
                    bcrypt.compare(formData.password, document.password)
                    .then (
                        (isMatch) => {
                            // Step 5a. If the password matches, generate web token (JWT)
                            if(isMatch === true) {
                            // Step 6. Send the JWT to the client
                                const payload = {
                                    id: document.id,
                                    email: document.email
                                };
                            
                                jwt.sign(
                                    payload,
                                    secret,
                                    (err, jsonwebtoken)  => {
                                        res.send(
                                            {
                                            msg: 'Login sucessful',
                                            jsonwebtoken: jsonwebtoken
                                            }
                                        )
                                    }
                                )
                            }
                            // Step 5b. If password DOES NOT match, reject login request
                            else {
                            res.send ("Please check email or password");
                            }
                        }
                    )
                }
            }
            )
    }
);



module.exports = router;
