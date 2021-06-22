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
    // associations can be defined here
  };
  return Album;
};
