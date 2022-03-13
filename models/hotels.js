"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotels.belongsTo(models.Vacations, {
        foreignKey: "vacationId",
        onDelete: "CASCADE",
      });
    }
  }
  Hotels.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      starRating: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      amenities: DataTypes.STRING,
      hotelImageUrl: DataTypes.STRING,
      room1ImageUrl: DataTypes.STRING,
      rooom2ImageUrl: DataTypes.STRING,
      address: DataTypes.STRING,
      vacationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Hotels",
    }
  );
  return Hotels;
};
