import {
    DataTypes,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";

import sequelize from "../index.ts";

export class WishlistPeriod extends Model<
    InferAttributes<WishlistPeriod>,
    InferCreationAttributes<WishlistPeriod>
> {
    declare id: CreationOptional<number>;
    declare closedAt: Date | null;
    declare closedById: number | null;
    declare reason: string | null;
    declare createdAt: CreationOptional<Date>;
}

WishlistPeriod.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        closedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        closedById: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: "users",
                key: "id",
            },
        },
        reason: {
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
        tableName: "wishlist_periods",
        timestamps: true,
        updatedAt: false,
    },
);