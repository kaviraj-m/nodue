const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const NoDueRequestForm = sequelize.define(
  "NoDueRequestForm",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reg_num: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stu_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
    submit_Date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ap_re_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reason:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "nodue_requestform",
    timestamps: false,
  }
);

module.exports = NoDueRequestForm;
