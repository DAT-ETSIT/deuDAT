import {
    DataTypes,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";

import sequelize from "../index.ts";

export class Transfer extends Model<
    InferAttributes<Transfer>,
    InferCreationAttributes<Transfer>
> {
    declare id: CreationOptional<number>;

    declare fromUserId: number;
    declare toUserId: number;

    declare amount: number;
    declare note: string | null;

    declare createdAt: CreationOptional<Date>;
}

Transfer.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        fromUserId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },

        toUserId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },

        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0.01,
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
        tableName: "transfers",
        timestamps: true,
        updatedAt: false,
    },
);