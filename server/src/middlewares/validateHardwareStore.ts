import { Request, Response, NextFunction } from "express";

const validateHardwareStore = (req : Request, res : Response, next : NextFunction) => {

    const { name, address } = req.body;
    const errors = [];

    if (name !== undefined && typeof name !== "string") {
        errors.push("No se ingresó un valor válido para 'name'");
    }

    if (address !== undefined && typeof address !== "string") {
        errors.push("No se ingresó un valor válido para 'address'");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            msg: "Datos de petición inválidos",
            errors
        });
    }

    next();
};

export { validateHardwareStore };