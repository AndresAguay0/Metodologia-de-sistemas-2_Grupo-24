import { Request, Response, NextFunction } from "express";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role, hardwareStoreId } = req.body;
    const errors: string[] = [];

    // Si es creación (POST), exigimos los campos obligatorios
    if (req.method === "POST") {
        if (!email) errors.push("El campo 'email' es obligatorio");
        if (!password) errors.push("El campo 'password' es obligatorio");
    }

    // Validaciones de tipo
    if (email !== undefined && (typeof email !== "string" || email.trim() === "")) errors.push("Valor inválido para 'email'");
    if (password !== undefined && (typeof password !== "string" || password.trim() === "")) errors.push("Valor inválido para 'password'");
    if (role !== undefined && !["dueño", "gerente", "empleado"].includes(role)) errors.push("Valor inválido para 'role'");
    if (hardwareStoreId !== undefined && (!Number.isInteger(hardwareStoreId) || hardwareStoreId <= 0)) errors.push("Valor inválido para 'hardwareStoreId'");

    if (errors.length > 0) {
        return res.status(400).json({ msg: "Datos de petición inválidos", errors });
    }

    next();
};

export { validateUser };