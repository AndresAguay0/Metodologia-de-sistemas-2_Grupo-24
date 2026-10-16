import { Router } from "express";
import { getStore, createStore } from "../controllers/hardwareStore.controller.js";

const router = Router();

router.get("/", getStore);
router.post("/", createStore);

export default router;