'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const TeamSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    description: String,
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Team', TeamSchema);