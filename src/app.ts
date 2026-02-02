// import express from "express";
// import authRoutes from "./modules/auth/auth.route";
// import providerRoutes from "../src/modules/provider/provider.route";
// import providerPublicRoutes from "./modules/providerPublic/providerPublic.route";
// import adminPoutes from "./modules/admin/admin.route"
// import mealRoutes from "./modules/meal/meal.route";
// import categoryRoutes from "./modules/category/category.route";
// import reviewRoutes from "./modules/review/review.route";
// import orderRoutes from "./modules/order/order.route";
// import userRoutes from "./modules/user/user.route";
// import cors from "cors";

// const app = express();
// app.use(cors({origin: "http://localhost:3000",credentials: true,}));
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/provider", providerRoutes);
// app.use("/api/meals", mealRoutes);
// app.use("/api/providers", providerPublicRoutes);
// app.use("/api/admin", adminPoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/users", userRoutes);

// export default app;


import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.route";
import providerRoutes from "./modules/provider/provider.route";
import providerPublicRoutes from "./modules/providerPublic/providerPublic.route";
import adminRoutes from "./modules/admin/admin.route";
import mealRoutes from "./modules/meal/meal.route";
import categoryRoutes from "./modules/category/category.route";
import reviewRoutes from "./modules/review/review.route";
import orderRoutes from "./modules/order/order.route";
import userRoutes from "./modules/user/user.route";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend.vercel.app", // production
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/providers", providerPublicRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

export default app;
