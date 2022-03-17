"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lodgings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lodgings.belongsTo(models.Vacations, {
        foreignKey: "vacationId",
        onDelete: "CASCADE",
      });
    }
  }
  Lodgings.init(
    {
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      rating: DataTypes.STRING,
      price: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      vacationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Lodgings",
    }
  );
  return Lodgings;
};
