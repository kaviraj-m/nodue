const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const NoDueAutomationRequest = sequelize.define(
  "NoDueAutomationRequest",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    formRequestId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staffid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "nodue_automationrequest",
    timestamps: false,
  }
);


module.exports = NoDueAutomationRequest;
