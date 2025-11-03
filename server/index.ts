import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // DigiLocker OAuth endpoints (server-side helpers)
  try {
    const { initDigilocker, digilockerCallback } = await import("./routes/digilocker");
    app.get("/api/auth/digilocker/init", initDigilocker);
    app.get("/api/auth/digilocker/callback", digilockerCallback);
  } catch (e) {
    // If the file is missing, ignore. This keeps dev server stable.
    console.warn("Digilocker routes not available:", e);
  }

  return app;
}
