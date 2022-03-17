"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vacations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vacations.hasMany(models.Lodgings, {
        foreignKey: "vacationId",
      });
      Vacations.hasMany(models.Restaurants, {
        foreignKey: "vacationId",
      });
      Vacations.hasMany(models.Excursions, {
        foreignKey: "vacationId",
      });
    }
  }
  Vacations.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vacations",
    }
  );
  return Vacations;
};
