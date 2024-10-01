const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const RequestForm = require("./requestForm");
const Authoritie = require("./authoritie");

const RequestAuthorities = sequelize.define("RequestAuthorities", {
  request_id: {
    type: DataTypes.STRING,
    references: {
      model: RequestForm,
      key: "id",
    },
    primaryKey: true,
  },
  authority_id: {
    type: DataTypes.STRING,
    references: {
      model: Authoritie,
      key: "esim_id",
    },
    primaryKey: true,
  },
  status: DataTypes.BOOLEAN,
  comment: DataTypes.TEXT,
  action_date: DataTypes.DATE,
});

module.exports = RequestAuthorities;
