const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./route/admin');
const sequelize = require('./util/database');

const User = require('./model/users');

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(cors());

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(adminRoutes);

sequelize
  .sync()
  .then(result => {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
