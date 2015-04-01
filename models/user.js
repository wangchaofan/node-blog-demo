/**
 * Created by Administrator on 2015/3/31.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    name: { type: String, unique: true },
    password: { type: String }
});

var User = mongoose.model('User', userSchema);

module.exports = User;


/*User.prototype.save = function (callback) {
    var user = {
        name: this.name,
        password: this.password
    };
    insertDocuments(mongodb,function () {
        mongodb.close();
    });
    mongodb.open(function (err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('users', function (err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex('name', {unique: true});

            collection.indert(user, {safe: true}, function (err, user) {
                mongodb.close();
                callback(err, user);
            });
        });
    });
};*/
/*User.get = function (username, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        // 读取 users 集合
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 查找 name 属性为  username 的文档
            collection.findOne({name: username}, function(err, doc) {
                mongodb.close();
                if (doc) {
                    // 封装文档为  User 对象
                    var user = new User(doc);
                    callback(err, user);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};*/

