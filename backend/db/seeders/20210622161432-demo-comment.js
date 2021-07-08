'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        photoId: 1,
        comment: 'This photo is amazing. My comment worked!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      userId: 2,
      photoId: 2,
      comment: 'This photo is amazing. My comment worked!',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  {
    userId: 3,
    photoId: 3,
    comment: 'This photo is amazing. My comment worked!',
    createdAt: new Date(),
    updatedAt: new Date(),
},
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
