const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Student = require("./student");
const { v4: uuidv4 } = require("uuid");

const Coe = sequelize.define("Coe", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuidv4,
  },
  stu_id: {
    type: DataTypes.STRING,
    references: {
      model: Student,
      key: "esim_id",
    },
  },
  exam_fee_status: DataTypes.BOOLEAN,
  qr_code: DataTypes.TEXT,
  hall_ticket_issued: DataTypes.BOOLEAN,
});

module.exports = Coe;
