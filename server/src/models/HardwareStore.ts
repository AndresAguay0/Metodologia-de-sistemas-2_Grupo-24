import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

export class HardwareStore extends Model {
    public id!: number;
    public name!: string;
    public address!: string;
}

HardwareStore.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "hardware_stores",
    }
);