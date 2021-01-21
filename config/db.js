const { Sequelize } = require('sequelize');
const db = new Sequelize('restapinodetest', 'root', '', {
	dialect: 'mysql'
});

db.sync({});

module.exports = db;
