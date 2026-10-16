import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { HardwareStore } from "./HardwareStore.js"

export class Product extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public stock!: number;
    public minStock!: number;
    public category!: string;
    public hardwareStoreId!: number;
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
    },
    {
        sequelize,
        tableName: "products",
    }
);

// Relación. Una Ferretería tiene muchos Productos
HardwareStore.hasMany(Product, { foreignKey: "hardwareStoreId", as: "products" });
Product.belongsTo(HardwareStore, { foreignKey: "hardwareStoreId", as: "hardwareStore" });