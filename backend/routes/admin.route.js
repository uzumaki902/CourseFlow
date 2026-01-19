import express from "express";
import { signUp } from "../controllers/admin.controller.js";
import { login } from "../controllers/admin.controller.js";
import { logout } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

export default router;
