import express from "express";
import { signUp } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

export default router;
