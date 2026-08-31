'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wishlist_entries", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      periodId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "wishlist_periods",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      productId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      amount: {
        type: Sequelize.ENUM("small", "large"),
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex(
      "wishlist_entries",
      ["periodId", "productId", "userId"],
      {
        unique: true,
        name: "wishlist_entries_period_product_user_unique",
      },
    );

    await queryInterface.addIndex(
      "wishlist_entries",
      ["productId"],
      {
        name: "wishlist_entries_product_id",
      },
    );

    await queryInterface.addIndex(
      "wishlist_entries",
      ["userId"],
      {
        name: "wishlist_entries_user_id",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("wishlist_entries");
  },
};