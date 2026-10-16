import { Request, Response } from "express";
import { Product } from "../models/Product.js";
import { HardwareStore } from "../models/HardwareStore.js";

const obtenerId = (valor: string | string[]): number | null => {
    if (typeof valor !== "string") {
        return null;
    }

    const id = Number(valor);

    return Number.isInteger(id) && id > 0 ? id : null;
};

const esNumeroNoNegativo = (valor: unknown): boolean =>
    typeof valor === "number" &&
    Number.isFinite(valor) &&
    valor >= 0;

const validarProducto = (
    body: Record<string, unknown>,
    parcial = false
): string | null => {
    const requeridos = parcial
        ? []
        : ["name", "price", "category", "hardwareStoreId"];

    for (const campo of requeridos) {
        if (!(campo in body)) {
            return `El campo ${campo} es obligatorio`;
        }
    }

    if (
        "name" in body &&
        (typeof body.name !== "string" || !body.name.trim())
    ) {
        return "El nombre debe ser un texto no vacío";
    }

    if (
        "category" in body &&
        (typeof body.category !== "string" || !body.category.trim())
    ) {
        return "La categoría debe ser un texto no vacío";
    }

    if (
        "description" in body &&
        body.description !== null &&
        typeof body.description !== "string"
    ) {
        return "La descripción debe ser un texto o null";
    }

    if ("price" in body && !esNumeroNoNegativo(body.price)) {
        return "El precio debe ser un número mayor o igual a cero";
    }

    for (const campo of ["stock", "minStock"]) {
        if (
            campo in body &&
            (
                !esNumeroNoNegativo(body[campo]) ||
                !Number.isInteger(body[campo])
            )
        ) {
            return `${campo} debe ser un entero mayor o igual a cero`;
        }
    }

    if (
        "hardwareStoreId" in body &&
        (
            typeof body.hardwareStoreId !== "number" ||
            !Number.isInteger(body.hardwareStoreId) ||
            body.hardwareStoreId <= 0
        )
    ) {
        return "hardwareStoreId debe ser un entero positivo";
    }

    return null;
};

// GET /api/productos
export const obtenerProductos = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const productos = await Product.findAll();
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// GET /api/productos/:id
export const obtenerProductoPorId = async (
    req: Request,
    res: Response
): Promise<void> => {
    const id = obtenerId(req.params.id);

    if (id === null) {
        res.status(400).json({ error: "El ID debe ser un entero positivo" });
        return;
    }

    try {
        const producto = await Product.findByPk(id);

        if (!producto) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }

        res.status(200).json(producto);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// POST /api/productos
export const crearProducto = async (
    req: Request,
    res: Response
): Promise<void> => {
    const body = req.body as Record<string, unknown>;
    const errorValidacion = validarProducto(body);

    if (errorValidacion) {
        res.status(400).json({ error: errorValidacion });
        return;
    }

    try {
        const ferreteria = await HardwareStore.findByPk(
            body.hardwareStoreId as number
        );

        if (!ferreteria) {
            res.status(404).json({ error: "Ferretería no encontrada" });
            return;
        }

        const producto = await Product.create(body);
        res.status(201).json(producto);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// PUT /api/productos/:id
export const actualizarProducto = async (
    req: Request,
    res: Response
): Promise<void> => {
    const id = obtenerId(req.params.id);

    if (id === null) {
        res.status(400).json({ error: "El ID debe ser un entero positivo" });
        return;
    }

    const body = req.body as Record<string, unknown>;
    const errorValidacion = validarProducto(body, true);

    if (errorValidacion) {
        res.status(400).json({ error: errorValidacion });
        return;
    }

    try {
        const producto = await Product.findByPk(id);

        if (!producto) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }

        if ("hardwareStoreId" in body) {
            const ferreteria = await HardwareStore.findByPk(
                body.hardwareStoreId as number
            );

            if (!ferreteria) {
                res.status(404).json({ error: "Ferretería no encontrada" });
                return;
            }
        }

        await producto.update(body);
        res.status(200).json(producto);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// DELETE /api/productos/:id
export const eliminarProducto = async (
    req: Request,
    res: Response
): Promise<void> => {
    const id = obtenerId(req.params.id);

    if (id === null) {
        res.status(400).json({ error: "El ID debe ser un entero positivo" });
        return;
    }

    try {
        const producto = await Product.findByPk(id);

        if (!producto) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }

        await producto.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};