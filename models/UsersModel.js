// Import mongoose
const mongoose = require('mongoose');

//Schema
const UsersSchema = new mongoose.Schema (
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }, 
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
    }
);

// Model
const UsersModel = mongoose.model('users', UsersSchema);
module.exports = UsersModel; 