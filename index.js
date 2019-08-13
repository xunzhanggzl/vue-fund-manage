const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 引入 users.js
const users = require('./routes/api/users.js');

// DB config
const db = require('./config/keys.js').mongoURI;
// Connect to mongodb
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log(`MongoDB connected`))
  .catch(err => console.log(err))
  

app.get('/', (req, res) => {
  res.send('Hello World');
})

// 使用 routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`127.0.0.1:5000`);
})