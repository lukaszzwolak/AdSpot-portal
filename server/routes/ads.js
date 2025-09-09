import express from "express";
import * as ads from "../controllers/ads.controller.js";
import auth from "../middleware/auth.middleware.js";
import { upload2MB } from "../utils/uploader.js";

const router = express.Router();

// PUBLIC
router.get("/", ads.getAll);
router.get("/search/:searchPhrase", ads.search);
router.get("/:id", ads.getOne);

// PROTECTED
router.post("/", auth, upload2MB.single("photo"), ads.create);
router.put("/:id", auth, upload2MB.single("photo"), ads.update);
router.delete("/:id", auth, ads.remove);

export default router;
