const Sequelize = require("sequelize");

const sequelize = new Sequelize("psycho", "root", "psycho", {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;
