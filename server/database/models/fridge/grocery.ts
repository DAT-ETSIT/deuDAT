import {
    DataTypes,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";

import sequelize from "../index.ts";

export class Grocery extends Model<
    InferAttributes<Grocery>,
    InferCreationAttributes<Grocery>
> {
    declare id: CreationOptional<number>;
    declare productId: number;
    declare units: number;
    declare totalCost: number;
    declare providerId: number;
    declare note: string | null;
    declare createdAt: CreationOptional<Date>;
}
Grocery.init(
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
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                min: 1,
            },
        },
        totalCost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        providerId: {
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
        tableName: "groceries",
        timestamps: true,
        updatedAt: false,
    },
);
