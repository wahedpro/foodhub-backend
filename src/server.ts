import app from "./app";
import prisma from "./lib/prisma";

async function startServer() {
  try {
    await prisma.$connect();

    app.get("/", (_req, res) => {
      res.send("FoodHub backend running on Vercel 🚀");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
