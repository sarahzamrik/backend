// Importing express inside your server
const express = require('express');
//Invoke the router() within express
const router = express.Router();
// Import the FeedsModel
const FeedsModel = require('../models/FeedsModel');

// A POST route for saving data into the 'feeds' collection
router.post(
    '/',
    (req, res) => {

        //Read the 'Body' within POST request
        const formData = {
            text: req.body.text, 
            username: req.body.username,
            hashtags: req.body.hashtags,
            image: req.body.image,
        };
        console.log(
            'From the user', formData
        );
            // Save the data to database (feeds collection)
            const newFeedModel = new FeedsModel (formData);
            newFeedModel.save();

        res.send('Your POST has been received.');
    }
);

// A GET route for fetching data from the 'feeds' collection
router.get(
    '/',
    (req, res)=>{
        // (1) Fetch all the documents using .find()
        FeedsModel
        .find()
        // (2) Once the results are ready, use .json() to send the results
        .then(
            (results) => {
                // res.json = res.send () + converts to JSON
                res.json(results)
            }
        )
        .catch(
            (e)=> {
                console.log('error occured', e)
            }
        );
    }
);

// Export the router
module.exports = router;
