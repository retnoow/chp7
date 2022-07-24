'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pvp_rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      p1_id: {
        type: Sequelize.INTEGER
      },
      p2_id: {
        type: Sequelize.INTEGER
      },
      p1_firstHand: {
        type: Sequelize.STRING
      },
      p1_secondHand: {
        type: Sequelize.STRING
      },
      p1_thirdHand: {
        type: Sequelize.STRING
      },
      p2_firstHand: {
        type: Sequelize.STRING
      },
      p2_secondHand: {
        type: Sequelize.STRING
      },
      p3_thirdHand: {
        type: Sequelize.STRING
      },
      winner_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pvp_rooms');
  }
};