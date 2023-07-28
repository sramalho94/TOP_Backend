"use strict";
const { Model } = require("sequelize");
const { encrypt, decrypt } = require("../middleware/cryptoUtils");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Test, { foreignKey: "userId" });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DOB: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("DOB");
          return rawValue ? decrypt(rawValue) : rawValue;
        },
        set(val) {
          this.setDataValue("DOB", encrypt(val));
        },
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("email");
          return rawValue ? decrypt(rawValue) : rawValue;
        },
        set(val) {
          this.setDataValue("email", encrypt(val));
        },
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("state");
          return rawValue ? decrypt(rawValue) : rawValue;
        },
        set(val) {
          this.setDataValue("state", encrypt(val));
        },
        allowNull: false,
      },
      ZIP: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("ZIP");
          return rawValue ? decrypt(rawValue) : rawValue;
        },
        set(val) {
          this.setDataValue("ZIP", encrypt(val));
        },
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("firstName");
          return rawValue ? decrypt(rawValue) : rawValue;
        },
        set(val) {
          this.setDataValue("firstName", encrypt(val));
        },
      },
      gender: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("gender");
          return rawValue ? decrypt(rawValue) : rawValue;
        },
        set(val) {
          this.setDataValue("gender", encrypt(val));
        },
      },
      ethnicity: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("ethnicity");
          return rawValue ? decrypt(rawValue) : rawValue;
        },
        set(val) {
          this.setDataValue("ethnicity", encrypt(val));
        },
      },
      race: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("race");
          return rawValue ? decrypt(rawValue) : rawValue;
        },
        set(val) {
          this.setDataValue("race", encrypt(val));
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};
