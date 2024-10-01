const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    useremail: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: DataTypes.STRING,
    usertype: DataTypes.STRING,
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

module.exports = User;
