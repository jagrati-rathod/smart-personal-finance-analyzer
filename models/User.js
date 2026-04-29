const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        budget: {
            type: Number,
            default: 0,
        },
        categoryLimits: {
            type: Map,
            of: Number,
            default: {},
        },
        healthProfile: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
