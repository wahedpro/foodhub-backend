import express from "express";
import authRoutes from "./modules/auth/auth.route";
import providerRoutes from "../src/modules/provider/provider.route";
import cors from "cors";

const app = express();
app.use(cors({origin: "http://localhost:3000",credentials: true,}));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/v1/provider", providerRoutes);

export default app;
