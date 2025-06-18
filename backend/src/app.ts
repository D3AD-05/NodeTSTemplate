// import path from "path";
// import dotenv from "dotenv"; //TODO
import express, { Request, Response, Application, NextFunction } from "express";
import apiRouter from "./index";
import { testConnection } from "./config/supabase";
// import cors from "cors";

// dotenv.config({ path: path.resolve(__dirname, "../.env") }); //TODO

// Import after environment variables are loaded
const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string) || 3000;

// Middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

//~ Basic route - Fix: Remove any potential path parameters
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "TypeScript Node.js server is running!",
    timestamp: new Date().toISOString(),
    environment: "development",
  });
});

//* Health check route - Fix: Ensure proper error handling
app.get("/health", async (req: Request, res: Response) => {
  try {
    const dbConnected = await testConnection();
    res.status(200).json({
      status: "OK",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: dbConnected ? "connected" : "disconnected",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      status: "ERROR",
      message: "Health check failed",
      error:
        process.env.NODE_ENV === "development"
          ? errorMessage
          : "Internal server error",
    });
  }
});

//! Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("❌ ~ :53 ~ app.use ~ err.stack:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

//^ 404 handler - Fix: Simplify the path matching
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "⚠️ Route not found",
    path: req.originalUrl,
  });
});

//* Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: "development"}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);

  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      console.warn("⚠️ Warning: Could not connect to Supabase");
    }
  } catch (error) {
    console.error("❌ Error connecting to Supabase:", error);
  }
});

export default app;
