const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Student = require("./student");
const { v4: uuidv4 } = require("uuid");

const RequestForm = sequelize.define("RequestForm", {
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
  reg_num: DataTypes.STRING,
  status: DataTypes.BOOLEAN,
  submit_Date: DataTypes.DATE,
  ap_re_date: DataTypes.DATE,
  comment: DataTypes.TEXT,
});

module.exports = RequestForm;
