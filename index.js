const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

// 引入 users.js
const users = require('./routes/api/users.js');

// 数据库部分
// DB config
const db = require('./config/keys.js').mongoURI;
// Connect to mongodb
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log(`MongoDB connected`))
  .catch(err => console.log(err))
  
// 使用 body-parser 中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// passport初始化
app.use(passport.initialize());
require('./config/passport.js')(passport);

// 使用 routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`127.0.0.1:5000`);
})