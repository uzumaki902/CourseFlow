import express from "express";
import dotenv from "dotenv";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import paymentRoute from "./routes/payment.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);
app.use(cookieParser());

const port = process.env.PORT || 4000;
const DB_URI = process.env.MONGO_URI;

try {
  await mongoose.connect(DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}
app.use(
  cors({
    origin: ["http://localhost:5175", "https://course-flow-alpha.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/course", courseRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/payment", paymentRoute);

// Health check endpoint for debugging
app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
  res.json({
    status: "ok",
    database: states[dbState] || "unknown",
    env: {
      MONGO_URI: process.env.MONGO_URI ? "set" : "NOT SET",
      JWT_USER_PASSWORD: process.env.JWT_USER_PASSWORD ? "set" : "NOT SET",
      JWT_ADMIN_PASSWORD: process.env.JWT_ADMIN_PASSWORD ? "set" : "NOT SET",
      NODE_ENV: process.env.NODE_ENV || "NOT SET",
    },
  });
});

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
