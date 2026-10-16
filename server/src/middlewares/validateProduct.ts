import { Request, Response, NextFunction } from "express";

const validateProduct = (req : Request, res : Response, next: NextFunction) => {
    const { name, description, price, stock, minStock, category } = req.body;
    const errors = [];

    if (name !== undefined && typeof name !== "string") {
        errors.push("No se ingresó un valor válido para 'name'");
    }

    if (description !== undefined && typeof description !== "string") {
        errors.push("No se ingresó un valor válido para 'description'");
    }

    if (price !== undefined && typeof price !== "number") {
        errors.push("No se ingresó un valor válido para 'price'");
    }

    if (stock !== undefined && !Number.isInteger(stock)) {
        errors.push("No se ingresó un valor válido para 'stock'");
    }

    if (minStock !== undefined && !Number.isInteger(minStock)) {
        errors.push("No se ingresó un valor válido para 'minStock'");
    }

    if (category !== undefined && typeof category !== "string") {
        errors.push("No se ingresó un valor válido para 'category'");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            msg: "Datos de petición inválidos",
            errors
        });
    }

    next();
};

export { validateProduct };