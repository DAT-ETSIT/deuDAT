'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("personal_purchases", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      units: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },

      unitPriceId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "prices",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      buyerId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex(
      "personal_purchases",
      ["unitPriceId"],
      {
        name: "personal_purchases_price_per_unit_id",
      },
    );

    await queryInterface.addIndex(
      "personal_purchases",
      ["buyerId"],
      {
        name: "personal_purchases_buyer_id",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("personal_purchases");
  },
};