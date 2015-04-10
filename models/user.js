/**
 * Created by Administrator on 2015/3/31.
 */
"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    username: { type: String, unique: true, index: true },
    password: { type: String }
});

userSchema.methods.findByUserName = function (callback) {
    this.model('User').find({ username: this.username }, callback);
};
userSchema.static.findByUserName = function (username, callback) {
    this.find({ username: username }, callback);
};

var userModel = mongoose.model('User', userSchema);
module.exports = userModel;


