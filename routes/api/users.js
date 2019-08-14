// @login & register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');
const passport = require('passport');

const User = require('../../models/User.js');

// $route GET api/users/test
// @desc  返回请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({msg: "justtest"})
})

// $route POST api/users/register
// @desc  返回请求的json数据
// @access public
router.post('/register', (req, res) => {
  // console.log(req.body);
  // 查询数据库中是否拥有邮箱
  User.findOne({email:req.body.email})
    .then((user) => {
      if (user) {
        res.status(400).json("邮箱已被注册!");
      } else {
        const newUser = new User({
          name:req.body.name,
          email: req.body.email,
          password: req.body.password,
          identity: req.body.identity
        })
        // 密码加密后保存到数据库
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err)) 
          });
        });
      }
    })
})


// $route POST api/users/login
// @desc  返回token jwt passport
// @access public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({email})
    .then((user) => {
      if (!user) {
        res.status(404).json("用户不存在!")
      } 
      // 密码匹配
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const rule = {
              id: user.id, 
              name: user.name,
              identity: user.identity
            };
            // 规则 加密名字 过期时间 箭头函数
            jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
              if(err) throw err;
              res.json({
                success: true,
                token: "bearer " + token
              })
            })
          } else {
            res.status(400).json("密码错误!");
          }
        })
    })
})

// $route GET api/users/current
// @desc  return current user
// @access Private
router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
  // console.log(req.user.identity);
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity,
  });
})

module.exports = router;