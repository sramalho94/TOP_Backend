'use strict'
const { Model } = require('sequelize')
const { encrypt, decrypt } = require('../middleware/cryptoUtils')
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Test.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Test.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },

      result: DataTypes.BOOLEAN,
      ZIP: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('ZIP')
          return rawValue ? decrypt(rawValue) : rawValue
        },
        set(val) {
          this.setDataValue('ZIP', val ? encrypt(val) : null)
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
      race: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('race')
          return rawValue ? decrypt(rawValue) : rawValue
        },
        set(val) {
          this.setDataValue('race', val ? encrypt(val) : null)
        }
      },
      state: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('state')
          return rawValue ? decrypt(rawValue) : rawValue
        },
        set(val) {
          this.setDataValue('state', val ? encrypt(val) : null)
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
      }
    },
    {
      sequelize,
      modelName: 'Test',
      tableName: 'tests'
    }
  )
  return Test
}
