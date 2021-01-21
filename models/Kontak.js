const Sequelize = require('sequelize');
const db = require('../config/db');

const Kontak = db.define(
	'kontak',
	{
		nama: { type: Sequelize.STRING },
		hp: { type: Sequelize.STRING },
		alamat: { type: Sequelize.STRING }
	},
	{
		freezeTableName: true
	}
);

module.exports = Kontak;
