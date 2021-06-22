'use strict';
module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('Locations', {
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
  Locations.associate = function(models) {
    // associations can be defined here
  };
  return Locations;
};
