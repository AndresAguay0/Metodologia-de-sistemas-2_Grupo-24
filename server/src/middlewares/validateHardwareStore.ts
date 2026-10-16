
import { Request, Response, NextFunction } from "express";

const validateHardwareStore = (req: Request, res: Response, next: NextFunction) => {
    const { name, address } = req.body;
    const errors: string[] = [];

    // Si es creación (POST), exigimos los campos obligatorios
    if (req.method === "POST") {
        if (!name || typeof name !== "string" || name.trim() === "") errors.push("El campo 'name' es obligatorio");
        if (!address || typeof address !== "string" || address.trim() === "") errors.push("El campo 'address' es obligatorio");
    }

    // Validaciones de tipo
    if (name !== undefined && (typeof name !== "string" || name.trim() === "")) errors.push("Valor inválido para 'name'");
    if (address !== undefined && (typeof address !== "string" || address.trim() === "")) errors.push("Valor inválido para 'address'");

    if (errors.length > 0) {
        return res.status(400).json({ msg: "Datos de petición inválidos", errors });
    }

    next();
};

export { validateHardwareStore };
