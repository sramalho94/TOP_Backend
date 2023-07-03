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
      Test.belongsTo(models.User, { foreignKey: "userId" });
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
          return decrypt(rawValue)
        },
        set(val) {
          this.setDataValue('ZIP', encrypt(val))
        }

      },
      gender: {
        type: DataTypes.STRING,
        get() {

          const rawValue = this.getDataValue('gender')
          return decrypt(rawValue)
        },
        set(val) {
          this.setDataValue('gender', encrypt(val))
        }

      },
      race: {
        type: DataTypes.STRING,
        get() {

          const rawValue = this.getDataValue("race");
          return decrypt(rawValue);
        },
        set(val) {
          this.setDataValue("race", encrypt(val));
        },
      },
      ethnicity: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("ethnicity");
          return decrypt(rawValue);
        },
        set(val) {
          this.setDataValue("ethnicity", encrypt(val));
        },
      },
    },
    {
      sequelize,
      modelName: "Test",
      tableName: "tests",
    }
  );
  return Test;
};

