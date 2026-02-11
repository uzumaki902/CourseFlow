import express from "express";
import { processPayment } from "../controllers/payment.controller.js";
import userMiddleware from "../middlewares/user.mid.js";

const router = express.Router();

router.post("/process", userMiddleware, processPayment);

export default router;