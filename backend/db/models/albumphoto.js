'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumPhoto = sequelize.define('AlbumPhoto', {
    albumId:{
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    photoId:{
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  AlbumPhoto.associate = function(models) {
    // associations can be defined here
  };
  return AlbumPhoto;
};
