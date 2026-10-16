import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { HardwareStore } from "./HardwareStore.js";

export class User extends Model {
    public id!: number;
    public email!: string;
    public passwordHash!: string;
    public role!: "dueño" | "gerente" | "empleado";
    public hardwareStoreId!: number;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("dueño", "gerente", "empleado"),
            allowNull: false,
            defaultValue: "empleado"
        },
    },
    { 
        sequelize,
        tableName: "users"
    }
);

// Relación. Una Ferretería tiene muchos Usuarios (Empleados/Gerentes)
HardwareStore.hasMany(User, { foreignKey: "hardwareStoreId", as: "users" });
User.belongsTo(HardwareStore, { foreignKey: "hardwareStoreId", as: "hardwareStore" });