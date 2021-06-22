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
    // associations can be defined here
  };
  return Photo;
};
