var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '首页'});
});
router.route('/reg')
  .get(function (req, res) {
     res.render('reg', { title: '用户注册' });
  })
  .post(function (req, res) {
        //检验用户两次输入的口令是否一致
     if (req.body['password-repeat'] != req.body['password']) {
         res.locals.error = ' 两次输入的口令不一致';
        return res.redirect('/reg');
     }
     var newUser = new User({
        name: 'chaofan',
        password: '111'
     });

     newUser.save(function (err) {
        if(err) {
            console.log(err);
        }
        res.redirect('/');
     });
    //检验用户两次输入的口令是否一致
    /*if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', ' 两次输入的口令不一致');
        return res.redirect('/reg');
    }
    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var newUser = new User({
        name: req.body.username,
        password: password
    });
    //检查用户名是否已经存在
    *//*User.get(newUser.name, function(err, user) {
      if (user)
         err = 'Username already exists.';
      if (err) {
         req.flash('error', err);
         return res.redirect('/reg');
      }*//*
      //如果不存在则新增用户
      newUser.save( function(err) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/reg');
        }
        req.session.user = newUser;
        req.flash('success', ' 注册成功');
        res.redirect('/');
    });*/
  });
router.post('/post', function (req, res) {
  res.redirect('/');
});
router.get('/login', function (req, res) {

});
router.post('/login', function (req, res) {

});
router.get('logout', function (req, res) {

});
router.get('/hello', function (req, res) {
  res.render('hello', {time:new Date().toString()});
});

module.exports = router;
