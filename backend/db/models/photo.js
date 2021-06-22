'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId:  {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});

  Photo.associate = function(models) {
    const columnMapping = {
      through: 'AlbumPhoto',
      otherKey: 'albumId',
      foriegnKey: 'photoId'
    }
    Photo.belongsToMany(models.Album, columnMapping)
    Photo.belongsTo(models.User, {foreignKey: 'userId'})
    Photo.belongsTo(models.Location, {foreignKey: 'locationId'})
    Photo.hasOne(models.PhotoLocation, {foreignKey: 'photoId'})
    Photo.hasMany(models.Favorite, {foreignKey: 'photoId'})
    Photo.hasMany(models.Comment, {foreignKey: 'photoId'})
    Photo.hasMany(models.AlbumPhoto, {foreignKey: 'photoId'})

  };
  return Photo;
};
