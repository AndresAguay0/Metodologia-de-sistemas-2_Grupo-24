import { Request, Response } from "express";
import { User } from "../models/User.js";
import { HardwareStore } from "../models/HardwareStore.js";

// GET usuarios
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            include: [
                { model: HardwareStore, as: "hardwareStore" },
                { model: HardwareStore, as: "managedStores"}
            ]
        });
        return res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
};

// POST usuario
export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, role, hardwareStoreId, managedStoreIds } = req.body;

        // Falta implementar bcrypt
        const newUser = await User.create({
            email,
            passwordHash: password,
            role: role || "empleado",
            hardwareStoreId: role === "empleado" ? hardwareStoreId : null
        });

        //
        if ((role === "dueño" || role === "gerente") && managedStoreIds && Array.isArray(managedStoreIds)) {
            //@ts-ignore
            await newUser.setManagedStores(managedStoreIds);
        }

        return res.status(201).json(newUser);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
};