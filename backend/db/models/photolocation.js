'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoLocation = sequelize.define('PhotoLocation', {
    photoId:  {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    locationId:  {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});

  PhotoLocation.associate = function(models) {
    const columnmapping = {
      
    }
    PhotoLocation.belongsTo(models.Photo, {foreignKey: 'photoId'})
  };
  return PhotoLocation;
};
