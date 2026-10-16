import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

export class UserHardwareStore extends Model {}

UserHardwareStore.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        hardwareStoreId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        sequelize,
        tableName: "user_hardware_stores",
        timestamps: false,
    },
);