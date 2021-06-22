'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city:{
      allowNull: false,
      type: DataTypes.STRING,
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    latitude:{
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    longitude: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.Photo, {foreignKey: 'locationId'})

  };
  return Location;
};
