'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    photoId:{
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    comment:{
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};
