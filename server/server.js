import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import { connectDB } from "./config/db.js";
import adsRouter from "./routes/ads.js";
import authRouter from "./routes/auth.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const {
  PORT = 8000,
  MONGO_URI,
  SESSION_SECRET,
  NODE_ENV = "development",
  CLIENT_URL,
} = process.env;

const isProd = NODE_ENV === "production";

await connectDB(MONGO_URI).catch((e) => {
  console.error("Mongo connection error:", e);
  process.exit(1);
});

const allowedOrigins = [
  CLIENT_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
].filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (isProd) app.set("trust proxy", 1);

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      maxAge: 1000 * 60 * 60 * 12,
    },
  })
);

app.use("/api/ads", adsRouter);
app.use("/auth", authRouter);

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const clientBuild = path.join(__dirname, "../client/build");
if (fs.existsSync(clientBuild)) {
  app.use(express.static(clientBuild));

  app.get(/^\/(?!api\/|auth\/).*/, (_req, res) => {
    res.sendFile(path.join(clientBuild, "index.html"));
  });
}

app.get("/healthz", (_req, res) => res.json({ ok: true, env: NODE_ENV }));

app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
