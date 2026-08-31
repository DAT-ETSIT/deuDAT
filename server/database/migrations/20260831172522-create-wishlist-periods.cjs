'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wishlist_periods", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      closedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      closedById: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      reason: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex(
      "wishlist_periods",
      ["closedAt"],
      {
        name: "wishlist_periods_closed_at",
      },
    );

    await queryInterface.addIndex(
      "wishlist_periods",
      ["closedById"],
      {
        name: "wishlist_periods_closed_by_id",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("wishlist_periods");
  },
};