import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { HardwareStore } from "./HardwareStore.js";
import { UserHardwareStore } from "./UserHardwareStore.js";

export class User extends Model<
InferAttributes<User>,
InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare passwordHash: string;
    declare role: CreationOptional<"dueño" | "gerente" | "empleado">;
    declare hardwareStoreId?: CreationOptional<number | null>;

    // Metodos para asociaciones
    declare setManagedStores: (stores: number[] | HardwareStore[]) => Promise<void>;
    declare getManagedStores: () => Promise<HardwareStore[]>;
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
            defaultValue: "empleado",
        },
        hardwareStoreId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    { 
        sequelize,
        tableName: "users"
    }
);

// Relación. Una Ferretería tiene muchos Usuarios (Empleados)
HardwareStore.hasMany(User, { foreignKey: "hardwareStoreId", as: "users" });
User.belongsTo(HardwareStore, { foreignKey: "hardwareStoreId", as: "hardwareStore" });

// Relación. Dueños y Gerentes pueden gestionar múltiples locales
User.belongsToMany(HardwareStore, {
    through: UserHardwareStore,
    foreignKey: "userId",
    as: "managedStores",
});
HardwareStore.belongsToMany(User, {
    through: UserHardwareStore,
    foreignKey: "hardwareStoreId",
    as: "managersAndOwners",
});