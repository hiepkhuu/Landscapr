'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        photoId: 5,
        comment: 'This photo is amazing!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        photoId: 4,
        comment: 'Love it!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        photoId: 6,
        comment: 'Beautiful, can just imagine myself there already',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        photoId: 3,
        comment: 'This photo is amazing!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
        {
        userId: 5,
        photoId: 1,
        comment: 'Very colorful',
        createdAt: new Date(),
        updatedAt: new Date(),
        },
        {
        userId: 6,
        photoId: 7,
        comment: 'Beautiful, can just imagine myself there already',
        createdAt: new Date(),
        updatedAt: new Date(),
        },
        {
          userId: 7,
          photoId: 1,
          comment: 'lovely view',
          createdAt: new Date(),
          updatedAt: new Date(),
          },
          {
          userId: 1,
          photoId: 2,
          comment: 'Love it!',
          createdAt: new Date(),
          updatedAt: new Date(),
          },
          {
          userId: 2,
          photoId: 3,
          comment: 'Very colorful',
          createdAt: new Date(),
          updatedAt: new Date(),
          },
          {
            userId: 3,
            photoId: 4,
            comment: 'This photo is amazing!',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
          userId: 4,
          photoId: 5,
          comment: 'Love it!',
          createdAt: new Date(),
          updatedAt: new Date(),
          },
          {
          userId: 6,
          photoId: 8,
          comment: 'lovely view',
          createdAt: new Date(),
          updatedAt: new Date(),
          },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
