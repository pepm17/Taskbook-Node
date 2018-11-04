'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {type: String, lowercase: true, unique: true},
  displayName: String,
  avatar: String,
  password: {type: String, select: false},
  singnupDate: {type: Date, default: Date.now()},
  lastLogin: Date
});

module.exports = mongoose.model('User',userSchema);