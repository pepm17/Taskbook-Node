'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const Team = require('./Team');

const UserSchema = new Schema({
    email: {type: String, lowercase: true, unique: true},
    displayName: String,
    avatar: String,
    password: {type: String, select: false},
    singnupDate: {type: Date, default: Date.now()},
    lastLogin: Date,
    teams: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Team'
  }]
});

UserSchema.pre('save', function (next){
  //let user = this
  if(!this.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt)=>{
    if(err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash)=>{
      if(err) return next(err)

      user.password = hash
      next()
    })
  })
});

UserSchema.methods.gravatar = function(){
  if(!this.email) return 'https://gravatar.com/avatar/?s=2005d=retro'

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=2005d=retro`
}

module.exports = mongoose.model('User', UserSchema);