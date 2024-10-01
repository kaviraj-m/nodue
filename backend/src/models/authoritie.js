const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const NodueAuthoritie = sequelize.define(
  "NodueAuthoritie",
  {
    esim_id: {
      type: DataTypes.STRING, // VARCHAR(255) for esim_id
      allowNull: false,
      primaryKey: true,
    },
    authoritie_name: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: true, // Allow NULL if this field is optional
    },
    email: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: true, // Allow NULL if this field is optional
    },
    role: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: true, // Allow NULL if this field is optional
    },
    department_id: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: true, // Allow NULL if this field is optional
    },
    subject_name: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: true, // Allow NULL if this field is optional
    },
  },
  {
    tableName: "nodue_authoritie", // Table name in the database
    timestamps: false, // Disable timestamps if not used
  }
);

module.exports = NodueAuthoritie;
