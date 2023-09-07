'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('peppers', [
        {
      name: 'Bell Pepper',
      description: 'Relatively large in size, the bell-shaped pepper in its immature state is green with a slightly bitter flavor. As it matures, it turns bright red and becomes sweeter. You can also find yellow, orange, white, pink, and even purple varieties. With their high water content, bell peppers will add moisture to any dish. They are also great for adding color.',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
        {
      name: 'test',
      description: 'test',
      heat: 'test',
      origin: 'test',
      colors: 'test'

     },
    
    
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
