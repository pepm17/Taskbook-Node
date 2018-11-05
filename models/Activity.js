'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    description: String,
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    } 
});

module.exports = mongoose.model('Activity', ActivitySchema);