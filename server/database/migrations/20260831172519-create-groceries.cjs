'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("groceries", {
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
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },

      totalCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      providerId: {
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

    await queryInterface.addIndex("groceries", ["productId"], {
      name: "groceries_product_id",
    });

    await queryInterface.addIndex("groceries", ["providerId"], {
      name: "groceries_provider_id",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("groceries");
  },
};