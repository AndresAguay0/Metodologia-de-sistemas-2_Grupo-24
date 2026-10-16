import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";

// Modelos
import "./models/HardwareStore.js";
import "./models/User.js";
import "./models/UserHardwareStore.js";
import "./models/Product.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({ message: "API de Sistema de Gestión de Stock Para Ferretería funcionando."});
});

// Ruta de productos
app.use("/api/productos", productRoutes);

// Sincronización de base de datos y levante del server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos SQLite establecida con éxito");

        await sequelize.sync({ alter: true });
        console.log("Modelos sincronizados correctamente.")

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    };
};

startServer();