import { Request, Response, NextFunction } from "express";

const validateUser = (req : Request, res : Response, next : NextFunction) => {
    const { email, password, role } = req.body;
    const errors = [];

    if (email !== undefined && typeof email !== "string") {
        errors.push("No se ingresó un valor válido para 'email'");
    }

    if (password !== undefined && typeof password !== "string") {
        errors.push("No se ingresó un valor válido para 'password'");
    }

    if (role !== undefined && typeof role !== "string") {
        errors.push("No se ingresó un valor válido para 'role'");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            msg: "Datos de petición inválidos",
            errors
        });
    }

    next();
};

export { validateUser };