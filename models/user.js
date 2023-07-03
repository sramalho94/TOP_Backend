'use strict'
const { Model } = require('sequelize')
const { encrypt, decrypt } = require('../middleware/cryptoUtils')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Test, { foreignKey: 'userId' })
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('username')
          return decrypt(rawValue)
        },
        set(val) {
          this.setDataValue('username', encrypt(val))
        }, 
        allowNull: false,      
      },
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DOB: {
        type: DataTypes.DATE,
        get() {
          const rawValue = this.getDataValue('DOB')
          return decrypt(rawValue)
        },
        set(val) {
          this.setDataValue('DOB', encrypt(val))
        },
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('state')
          return decrypt(rawValue)
        },
        set(val) {
          this.setDataValue('state', encrypt(val))
        },
        allowNull: false,
      },
      ZIP: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('ZIP')
          return decrypt(rawValue)
        },
        set(val) {
          this.setDataValue('ZIP', encrypt(val))
        },
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('firstName')
          return decrypt(rawValue)
        },
        set(val) {
          this.setDataValue('firstName', encrypt(val))
        },
      },
      gender: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('gender')
          return decrypt(rawValue)
        },
        set(val) {
          this.setDataValue('gender', encrypt(val))
        },
      },
      ethnicity: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('ethnicity')
          return decrypt(rawValue)
        },
        set(val) {
          this.setDataValue('ethnicity', encrypt(val))
        },
      },
      race: { 
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('race')
          return decrypt(rawValue)
        },
        set(val) {
          this.setDataValue('race', encrypt(val))
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
