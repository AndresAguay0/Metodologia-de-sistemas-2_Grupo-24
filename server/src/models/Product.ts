import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { HardwareStore } from "./HardwareStore.js"

export class Product extends Model<
InferAttributes<Product>,
InferCreationAttributes<Product>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: CreationOptional<string>;
    declare price: number;
    declare stock: CreationOptional<number>;
    declare minStock: CreationOptional<number>;
    declare category: string;
    declare hardwareStoreId: number;
}

Product.init(
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
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        minStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hardwareStoreId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "products",
    }
);

// Relación. Una Ferretería tiene muchos Productos
HardwareStore.hasMany(Product, { foreignKey: "hardwareStoreId", as: "products" });
Product.belongsTo(HardwareStore, { foreignKey: "hardwareStoreId", as: "hardwareStore" });