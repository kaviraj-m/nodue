const Sequelize = require("sequelize");
const sequelize = require("../config/db.js"); // Adjust the path as needed

// Import models
const User = require("./user");
const NoDueRequestForm = require("./nodueRequestForm");

// Initialize models
User.init(sequelize);
NoDueRequestForm.init(sequelize);

// Define associations if any (e.g., foreign key relationships)
// NoDueRequestForm.belongsTo(User, { foreignKey: 'stu_id' }); // Example association

// Export models
module.exports = {
  sequelize,
  Sequelize,
  User,
  NoDueRequestForm,
};

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.MYSQL_DATABASE,
//   process.env.MYSQL_USER,
//   process.env.MYSQL_PASSWORD,
//   {
//     host: process.env.MYSQL_HOST,
//     dialect: "mysql",
//   }
// );

// module.exports = sequelize;