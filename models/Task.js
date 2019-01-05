'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Activity = require('./Activity');

const TaskSchema = new Schema({
    description: String,
    state: boolean,
    limit_date: Date,
    _dad = {
        type: mongoose.Types.ObjectId,
        ref: 'Activity'
    },
    users = [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Task', TaskSchema);