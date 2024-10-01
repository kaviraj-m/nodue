// src/models/student.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const NoDueStudentTable = sequelize.define(
  "NoDueStudentTable",
  {
    esim_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, // Ensure this matches your table's primary key
    },
    student_name: {
      type: DataTypes.TEXT,
      allowNull: true, // Adjust based on your schema requirements
    },
    mail_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true, // Adjust based on your schema requirements
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true, // Adjust based on your schema requirements
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: true, // Adjust based on your schema requirements
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true, // Adjust based on your schema requirements
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: true, // Adjust based on your schema requirements
    },
    year: {
      type: DataTypes.STRING,
      allowNull: true, // Adjust based on your schema requirements
    },
    formEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default value if needed
    },
    mentor: {
      type: DataTypes.STRING,
      allowNull: true, // This column can be null
    },
  },
  {
    tableName: "nodue_studenttable",
    timestamps: false,
  }
);

module.exports = NoDueStudentTable;
