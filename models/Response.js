'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Activity = require('./Activity');

const ResponseSchema = new Schema({
    content: String,
    date: {
        type: Date,
        default: Date.now()
    },
    _dad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Response', ResponseSchema);