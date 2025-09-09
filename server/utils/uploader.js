import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (_req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

export const upload1MB = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});
export const upload2MB = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});
