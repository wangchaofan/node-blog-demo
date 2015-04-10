var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var Post = require('../models/post');

function initUser(req) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body['password']).digest('base64');
    return new User({
        username: req.body['username'],
        password: password
    });
}
/* GET home page. */
router.get('/', function(req, res) {
    if(req.session.user) {
        Post.find({ _creator: req.session.user._id }).populate('_creator').exec(function (err, result) {
            if(err) {
                throw  err;
            }
            res.render('index', { title: '首页', posts: result });
        });
    } else {
        Post.find().populate('_creator').exec(function (err, result) {
            if(err) {
                throw  err;
            }
            res.render('index', { title: '首页', posts: result });
        });
    }
});
router.route('/reg')
  .get(function (req, res) {
     res.render('reg', { title: '用户注册' });
  })
  .post(function (req, res) {
     var newUser = initUser(req);
     newUser.findByUserName(function (err, result) {
         if(err) {
             throw err;
         } else {
            if(result.length > 0) {
                req.session.message = "用户名已存在";
                res.redirect('/reg');
            } else {
                newUser.save(function (err) {
                    if(err) {
                        throw err;
                    }
                    req.session.success = "注册成功";
                    req.session.user = newUser;
                    res.redirect('/');
                });
            }
         }
     });
  });
router.post('/post', function (req, res) {
    var user = req.session.user;
    if(user) {
        var newPost = new Post();
        newPost._creator = user._id;
        newPost.post = req.body['post'];
        newPost.save(function (err) {
            if(err) {
                throw err;
            }
            res.send(newPost);
        });
    }
});
router.route('/login')
    .get(function (req, res) {
        res.render('login', {title: '登录'});
    })
    .post(function (req, res) {
        var newUser = initUser(req);
        newUser.findByUserName(function (err, result) {
            if(err) {
                throw err;
            }
            if(result.length === 0) {
                req.session.message = "用户名不存在";
                res.redirect('/login');
            }  else if (result[0]._doc.password !== newUser.password){
                req.session.message = "密码错误";
                res.redirect('/login');
            } else {
                req.session.user = result[0];
                res.redirect('/');
            }
    });
});
router.get('/logout', function (req, res) {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;
