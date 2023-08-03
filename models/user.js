'use strict'
const { Model } = require('sequelize')
const { encrypt, decrypt } = require('../middleware/cryptoUtils')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Test, { foreignKey: 'userId' })
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false
      },
      DOB: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('DOB')
          return rawValue ? decrypt(rawValue) : rawValue
        },
        set(val) {
          this.setDataValue('DOB', val ? encrypt(val) : null)
        },
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('email')
          return rawValue ? decrypt(rawValue) : rawValue
        },
        set(val) {
          this.setDataValue('email', val ? encrypt(val) : null)
        },
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('state')
          return rawValue ? decrypt(rawValue) : rawValue
        },
        set(val) {
          this.setDataValue('state', val ? encrypt(val) : null)
        },
        allowNull: false
      },
      ZIP: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('ZIP')
          return rawValue ? decrypt(rawValue) : rawValue
        },
        set(val) {
          this.setDataValue('ZIP', val ? encrypt(val) : null)
        },
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('firstName')
          return rawValue ? decrypt(rawValue) : rawValue
        },
        set(val) {
          this.setDataValue('firstName', val ? encrypt(val) : null)
        }
      },
      gender: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('gender')
          return rawValue ? decrypt(rawValue) : rawValue
        },
        set(val) {
          this.setDataValue('gender', val ? encrypt(val) : null)
        }
      },
      ethnicity: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('ethnicity')
          return rawValue ? decrypt(rawValue) : rawValue
        },
        set(val) {
          this.setDataValue('ethnicity', val ? encrypt(val) : null)
        }
      },
      race: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('race')
          return rawValue ? decrypt(rawValue) : rawValue
        },
        set(val) {
          this.setDataValue('race', val ? encrypt(val) : null)
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )

  return User
}
