import {
    DataTypes,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";

import sequelize from "../index.ts";

export class PersonalPurchase extends Model<
    InferAttributes<PersonalPurchase>,
    InferCreationAttributes<PersonalPurchase>
> {
    declare id: CreationOptional<number>;
    declare units: number;
    declare unitPriceId: number;
    declare buyerId: number;
    declare createdAt: CreationOptional<Date>;
}
PersonalPurchase.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        units: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        unitPriceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "prices",
                key: "id",
            },
        },
        buyerId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
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
        tableName: "personal_purchases",
        timestamps: true,
        updatedAt: false,
    },
);
