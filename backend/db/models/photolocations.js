'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoLocations = sequelize.define('PhotoLocations', {
    photoId:  {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    locationId:  {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  PhotoLocations.associate = function(models) {
    // associations can be defined here
  };
  return PhotoLocations;
};
