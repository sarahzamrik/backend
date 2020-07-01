// Importing express inside your server
const express = require('express');
//Invoke the router() within express
const router = express.Router();
// Import the ProductsModel
const ProductsModel = require('../models/ProductsModel');

// A POST route for saving data into the 'products' collection
router.post(
    '/',
    (req, res) => {

        //Read the 'Body' within POST request
        const formData = {
            brand: req.body.brand, 
            model: req.body.model,
            price: req.body.price,
            quantity: req.body.quantity
        };
        console.log(
            'From the user', formData
        );
            // Save the data to database (products collection)
            const newProductsModel = new ProductsModel (formData);
            newProductsModel.save();

        res.send('Your Product has been saved!');
    }
);

// Export the router
module.exports = router;
