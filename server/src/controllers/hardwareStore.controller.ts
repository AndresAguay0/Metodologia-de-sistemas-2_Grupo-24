import { Request, Response } from "express";
import { HardwareStore } from "../models/HardwareStore.js";

// GET stores
export const getStore = async (req: Request, res: Response) => {
    try {
        const stores = await HardwareStore.findAll();
        return res.json(stores);
    } catch (error) {
        console.error("Error al obtener ferreterías:", error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
};

// POST store
export const createStore = async (req: Request, res: Response) => {
    try {
        const { name, address } = req.body;
        if (!name || !address) {
            return res.status(400).json({ msg: "Nombre y dirección son obligatorios" });
        }

        const newStore = await HardwareStore.create({ name, address });
        return res.status(201).json(newStore);
    } catch (error) {
        console.error("Error al crear ferretería:", error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
};