'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Activity = require('./Activity');

const TaskSchema = new Schema({
    description: String,
    state: boolean,
    limit_date: Date,
    users = [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    activity = {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    }
});

module.exports = mongoose.model('Task', TaskSchema);