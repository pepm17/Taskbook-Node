'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    title: String,
    description: String,
    _dad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }],
    response: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Response'
    }]
});

module.exports = mongoose.model('Activity', ActivitySchema);