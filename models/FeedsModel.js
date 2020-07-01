// Import mongoose
const mongoose = require('mongoose');

//Schema 
const FeedsSchema = new mongoose.Schema (
    {
        text: {
            type: String,
            required: true
        }, 
        username: {
            type: String, // mongoose.Schema.Type.ObjectId
            required: true
        },
        hashtags: {
            type: Array,
        },
        image: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        }, 
        likes: {
            type: Array,
            required: true
        }
    }
);

// Model
const FeedsModel = mongoose.model('feeds', FeedsSchema);
module.exports = FeedsModel; 