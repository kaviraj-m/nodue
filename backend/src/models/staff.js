const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Staff = sequelize.define(
  "Staff",
  {
    id: {
      type: DataTypes.STRING, // Use STRING to match VARCHAR(255)
      defaultValue: uuidv4,
      primaryKey: true,
    },
    department: {
      type: DataTypes.STRING, // Use STRING to match VARCHAR(100)
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING, // Use STRING to match VARCHAR(10)
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING, // Use STRING to match VARCHAR(4)
      allowNull: false,
    },
    staffId: {
      type: DataTypes.JSON, // Use JSON to match JSON type in table
      allowNull: false,
    },
    classadvi: {
      type: DataTypes.STRING, // Use STRING to match VARCHAR(100)
      allowNull: true,
    },
    hod: {
      type: DataTypes.STRING, // Use STRING to match VARCHAR(100)
      allowNull: true,
    },
    library: {
      // Added
      type: DataTypes.STRING, // Use STRING to match VARCHAR(255)
      allowNull: true,
    },
    accounts: {
      // Added
      type: DataTypes.STRING, // Use STRING to match VARCHAR(255)
      allowNull: true,
    },
  },
  {
    tableName: "staff",
    timestamps: false,
  }
);

module.exports = Staff;
