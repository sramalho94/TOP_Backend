"use strict";
const { Model } = require("sequelize");
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
			userId: DataTypes.STRING,
			result: DataTypes.BOOLEAN,
			ZIP: {
				type: DataTypes.STRING,
				get() {
					const rawValue = this.getDataValue("ZIP");
					return decrypt(rawValue);
				},
				set(val) {
					this.setDataValue("ZIP", encrypt(val));
				},
			},
			gender: {
				type: DataTypes.STRING,
				get() {
					const rawValue = this.getDataValue("gender");
					return decrypt(rawValue);
				},
				set(val) {
					this.setDataValue("gender", encrypt(val));
				},
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

			ethnicity: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Test",
			tableName: "tests",
		}
	);
	return Test;
};
