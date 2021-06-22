'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId:{
      allowNull: false,
      type: DataTypes.STRING,
    },
    title:{
      allowNull: false,
      type: DataTypes.STRING,
    },
    caption:{
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {});

  Album.associate = function(models) {
    const columnMapping = {
      through: 'AlbumPhoto',
      otherKey: 'albumId',
      foriegnKey: 'photoId'
    }
    Album.belongsToMany(models.Photo, columnMapping)
    Album.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Album;
};
