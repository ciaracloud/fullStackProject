"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Excursions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Excursions.belongsTo(models.Vacations, {
        foreignKey: "vacationId",
        onDelete: "CASCADE",
      });
    }
  }
  Excursions.init(
    {
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      rating: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      vacationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Excursions",
    }
  );
  return Excursions;
};
