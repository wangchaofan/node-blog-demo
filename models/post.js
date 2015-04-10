/**
 * Created by Administrator on 2015/4/9.
 */
/**
 * Created by Administrator on 2015/3/31.
 */
"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;


function dataFormat (date) {
    return new Date(date.valueOf() - (8 * 60 * 60 * 1000)).Format('yyyy-MM-dd hh:mm:ss');
}
var postSchema = new Schema({
    _creator: { type: ObjectId, ref: 'User', required: true },
    post: String ,
    createDate: { type: Date, default: new Date(Date.now() + (8 * 60 * 60 * 1000)), get: dataFormat }
});


var postModel = mongoose.model('Post', postSchema);
module.exports = postModel;
