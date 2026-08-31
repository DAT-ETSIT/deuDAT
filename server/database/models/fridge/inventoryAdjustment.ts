import {
    DataTypes,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";

import sequelize from "../index.ts";

export class InventoryAdjustment extends Model<
    InferAttributes<InventoryAdjustment>,
    InferCreationAttributes<InventoryAdjustment>
> {
    declare id: CreationOptional<number>;
    declare productId: number;
    declare units: number;
    declare adminId: number;
    declare note: string | null;
    declare createdAt: CreationOptional<Date>;
}
InventoryAdjustment.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "products",
                key: "id",
            },
        },
        units: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notZero(value: number) {
                    if (value === 0) {
                        throw new Error("Inventory adjustment cannot be zero.");
                    }
                },
            },
        },
        adminId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "inventory_adjustments",
        timestamps: true,
        updatedAt: false,
    },
);
