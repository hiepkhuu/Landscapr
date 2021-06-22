'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
      {
     userId: 1,
     locationId: null,
     imageUrl: 'https://images.unsplash.com/photo-1513311068348-19c8fbdc0bb6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
     title: 'Title for Photo',
     description: 'This is photo description',
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      userId: 1,
      locationId: null,
      imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      title: 'Title for Photo',
      description: 'This is photo description',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      locationId: null,
      imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      title: 'Title for Photo',
      description: 'This is photo description',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      locationId: null,
      imageUrl: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FtcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      title: 'Title for Photo',
      description: 'This is photo description',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      locationId: null,
      imageUrl: 'https://images.unsplash.com/photo-1606465526165-fc3c670ab7f8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNhbXBlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      title: 'Title for Photo',
      description: 'This is photo description',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      locationId: null,
      imageUrl: 'https://images.unsplash.com/photo-1597891829363-0e246f08cd34?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      title: 'Title for Photo',
      description: 'This is photo description',
      createdAt: new Date(),
      updatedAt: new Date(),
     },

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
