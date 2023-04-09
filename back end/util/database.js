const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-app', 'root', 'Gtr@vels123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
