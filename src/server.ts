// import app from "./app";
// import prisma from "./lib/prisma";

// const PORT = process.env.PORT || 4000;

// async function startServer() {
//   try {
//     await prisma.$connect();
//     console.log("Database connected successfully");

//     app.get("/", (_req, res) => {
//       res.send("FoodHub backend running on Vercel 🚀");
//     });

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     } );
//   } catch (error) {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   }
// }

// startServer();


import app from "./app";
import prisma from "./lib/prisma";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");

    app.get("/", (_req, res) => {
      res.send("FoodHub backend running 🚀");
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
