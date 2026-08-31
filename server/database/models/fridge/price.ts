import {
    DataTypes,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";

import sequelize from "../index.ts";

export class Price extends Model<
    InferAttributes<Price>,
    InferCreationAttributes<Price>
> {
    declare id: CreationOptional<number>;
    declare productId: number;
    declare price: number;
    declare createdAt: CreationOptional<Date>;
}
Price.init(
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
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "prices",
        timestamps: true,
        updatedAt: false,
        indexes: [
            {
                fields: ["productId", "createdAt"],
            },
        ],
    },
);
