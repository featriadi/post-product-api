'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('posts')
  }
};
