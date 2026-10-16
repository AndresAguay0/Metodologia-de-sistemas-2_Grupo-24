import { Request, Response, NextFunction } from "express";

const validateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, stock, minStock, category, hardwareStoreId } = req.body;
    const errors: string[] = [];

    // Si es creación (POST), exigimos los campos obligatorios
    if (req.method === "POST") {
        if (!name) errors.push("El campo 'name' es obligatorio");

        if (price === undefined) errors.push("El campo 'price' es obligatorio");

        if (!category) errors.push("El campo 'category' es obligatorio");

        if (!hardwareStoreId) errors.push("El campo 'hardwareStoreId' es obligatorio");
    }

    // Validaciones de tipo (aplican tanto para POST como PUT si vienen definidos)
    if (name !== undefined && typeof name !== "string") errors.push("Valor inválido para 'name'");

    if (description !== undefined && typeof description !== "string") errors.push("Valor inválido para 'description'");

    if (price !== undefined && typeof price !== "number") errors.push("Valor inválido para 'price'");

    if (stock !== undefined && !Number.isInteger(stock)) errors.push("Valor inválido para 'stock'");

    if (minStock !== undefined && !Number.isInteger(minStock)) errors.push("Valor inválido para 'minStock'");

    if (category !== undefined && typeof category !== "string") errors.push("Valor inválido para 'category'");
    
    if (hardwareStoreId !== undefined && !Number.isInteger(hardwareStoreId)) errors.push("Valor inválido para 'hardwareStoreId'");

    if (errors.length > 0) {
        return res.status(400).json({ msg: "Datos de petición inválidos", errors });
    }

    next();
};

export { validateProduct };