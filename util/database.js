const Sequelize = require("sequelize");

// const sequelize = new Sequelize("psycho", "root", "psycho", {
// 	dialect: "mysql",
// 	host: "localhost",
// });
const sequelize = new Sequelize(
	"sql12742662",
	"sql12742662",
	"8sw1yrenDa",
	{
		dialect: "mysql",
		host: "sql12.freesqldatabase.com",
		port: 3306,
	}
);

module.exports = sequelize;
