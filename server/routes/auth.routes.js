import express from "express";
import * as auth from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { upload1MB } from "../utils/uploader.js";

const router = express.Router();

router.post("/register", upload1MB.single("avatar"), auth.register);
router.post("/login", auth.login);
router.get("/user", auth.user);
router.delete("/logout", authMiddleware, auth.logout);

export default router;
