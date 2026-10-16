import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/database.js";

export class HardwareStore extends Model<
InferAttributes<HardwareStore>,
InferCreationAttributes<HardwareStore>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare address: string;
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