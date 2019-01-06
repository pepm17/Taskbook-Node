'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const TeamSchema = new Schema({
    name: String,
    description: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    }]
});

module.exports = mongoose.model('Team', TeamSchema);