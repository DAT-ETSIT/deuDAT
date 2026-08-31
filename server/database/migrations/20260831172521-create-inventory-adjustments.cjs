'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inventory_adjustments", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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

      units: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      adminId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      note: {
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
      "inventory_adjustments",
      ["productId"],
      {
        name: "inventory_adjustments_product_id",
      },
    );

    await queryInterface.addIndex(
      "inventory_adjustments",
      ["adminId"],
      {
        name: "inventory_adjustments_admin_id",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("inventory_adjustments");
  },
};