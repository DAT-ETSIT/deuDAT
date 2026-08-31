import {
    DataTypes,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";

import sequelize from "../index.ts";

export class WishlistEntry extends Model<
    InferAttributes<WishlistEntry>,
    InferCreationAttributes<WishlistEntry>
> {
    declare id: CreationOptional<number>;
    declare periodId: number;
    declare productId: number;
    declare userId: number;
    declare amount: "small" | "large";
    declare createdAt: CreationOptional<Date>;
}

WishlistEntry.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        periodId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "wishlistPeriods",
                key: "id",
            },
        },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "products",
                key: "id",
            },
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        amount: {
            type: DataTypes.ENUM("small", "large"),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "wishlist_entries",
        timestamps: true,
        updatedAt: false,
        indexes: [
            {
                unique: true,
                fields: ["periodId", "productId", "userId"],
            },
        ],
    },
);