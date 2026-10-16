import { Router } from "express";
import { getUsers, createUser } from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = Router();

router.get("/", getUsers);
router.post("/", validateUser, createUser);

export default router;