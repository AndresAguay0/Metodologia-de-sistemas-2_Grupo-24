import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";

// Modelos
import "./models/Product.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.json({ message: "API de Sistema de Gestión de Stock Para Ferretería funcionando."});
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos SQLite establecida con éxito");

        await sequelize.sync();
        console.log("Modelos sincronizados correctamente.")

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    };
};

startServer();