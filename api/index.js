// src/app.ts
import express3 from "express";
import cors from "cors";

// src/modules/auth/auth.route.ts
import { Router } from "express";

// src/modules/auth/auth.service.ts
import bcrypt from "bcrypt";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nmodel User {\n  id              String           @id @default(uuid())\n  name            String\n  email           String           @unique\n  password        String\n  role            Role\n  isActive        Boolean          @default(true)\n  createdAt       DateTime         @default(now())\n  updatedAt       DateTime         @updatedAt\n  providerProfile ProviderProfile?\n  orders          Order[]\n  reviews         Review[]\n}\n\nmodel ProviderProfile {\n  id         String   @id @default(uuid())\n  userId     String   @unique\n  restaurant String\n  address    String\n  phone      String\n  createdAt  DateTime @default(now())\n  user       User     @relation(fields: [userId], references: [id])\n  meals      Meal[]\n}\n\nmodel Category {\n  id    String @id @default(uuid())\n  name  String @unique\n  meals Meal[]\n}\n\nmodel Meal {\n  id          String          @id @default(uuid())\n  name        String\n  description String\n  price       Float\n  image       String\n  providerId  String\n  categoryId  String\n  createdAt   DateTime        @default(now())\n  provider    ProviderProfile @relation(fields: [providerId], references: [id])\n  category    Category        @relation(fields: [categoryId], references: [id])\n  reviews     Review[]\n  orderItems  OrderItem[]\n}\n\nmodel Order {\n  id         String      @id @default(uuid())\n  customerId String\n  status     OrderStatus @default(PLACED)\n  address    String\n  createdAt  DateTime    @default(now())\n  customer   User        @relation(fields: [customerId], references: [id])\n  items      OrderItem[]\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  orderId  String\n  mealId   String\n  quantity Int\n  order    Order  @relation(fields: [orderId], references: [id])\n  meal     Meal   @relation(fields: [mealId], references: [id])\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  rating    Int\n  comment   String\n  userId    String\n  mealId    String\n  createdAt DateTime @default(now())\n  user      User     @relation(fields: [userId], references: [id])\n  meal      Meal     @relation(fields: [mealId], references: [id])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":null},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"restaurant","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"address","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });
var prisma_default = prisma;

// src/modules/auth/auth.service.ts
import jwt from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET;
var registerUser = async (payload) => {
  const { name, email, password, role } = payload;
  const existingUser = await prisma_default.user.findUnique({
    where: { email }
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma_default.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role
    }
  });
  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};
var loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await prisma_default.user.findUnique({
    where: { email },
    include: {
      providerProfile: true
    }
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }
  if (!user.isActive) {
    throw new Error("Account is suspended");
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      providerProfile: user.providerProfile
    },
    token
  };
};

// src/modules/auth/auth.validation.ts
var validateRegister = (payload) => {
  const { name, email, password, role } = payload;
  if (!name || !email || !password || !role) {
    throw new Error("All fields are required");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  if (!["CUSTOMER", "PROVIDER"].includes(role)) {
    throw new Error("Invalid role selection");
  }
};
var validateLogin = (payload) => {
  const { email, password } = payload;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
};

// src/modules/auth/auth.controller.ts
var register = async (req, res) => {
  try {
    validateRegister(req.body);
    const result = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var login = async (req, res) => {
  try {
    validateLogin(req.body);
    const result = await loginUser(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma_default.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};

// src/middlewares/auth.middleware.ts
import jwt2 from "jsonwebtoken";
var authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt2.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
var auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt2.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};
var providerOnly = (req, res, next) => {
  if (req.user.role !== "PROVIDER") {
    return res.status(403).json({
      message: "Only provider can add meals"
    });
  }
  next();
};
var adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin access only"
    });
  }
  next();
};

// src/modules/auth/auth.route.ts
var router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
var auth_route_default = router;

// src/modules/provider/provider.route.ts
import { Router as Router2 } from "express";

// src/modules/provider/provider.service.ts
var createProviderProfile = async (user, payload) => {
  if (user.role !== "PROVIDER") {
    throw new Error("Only provider can create profile");
  }
  const existingProfile = await prisma_default.providerProfile.findUnique({
    where: { userId: user.id }
  });
  if (existingProfile) {
    throw new Error("Provider profile already exists");
  }
  return prisma_default.providerProfile.create({
    data: {
      userId: user.id,
      restaurant: payload.restaurant,
      address: payload.address,
      phone: payload.phone
    }
  });
};
var addMeal = async (user, payload) => {
  const providerProfile = await prisma_default.providerProfile.findUnique({
    where: { userId: user.id }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  return prisma_default.meal.create({
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image: payload.image,
      categoryId: payload.categoryId,
      providerId: providerProfile.id
    }
  });
};
var updateMeal = async (user, mealId, payload) => {
  const providerProfile = await prisma_default.providerProfile.findUnique({
    where: { userId: user.id }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  const meal = await prisma_default.meal.findUnique({
    where: { id: mealId }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  if (meal.providerId !== providerProfile.id) {
    throw new Error("You are not allowed to update this meal");
  }
  return prisma_default.meal.update({
    where: { id: mealId },
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image: payload.image,
      categoryId: payload.categoryId
    }
  });
};
var deleteMeal = async (user, mealId) => {
  const providerProfile = await prisma_default.providerProfile.findUnique({
    where: { userId: user.id }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  const meal = await prisma_default.meal.findUnique({
    where: { id: mealId }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  if (meal.providerId !== providerProfile.id) {
    throw new Error("You are not allowed to delete this meal");
  }
  return prisma_default.meal.delete({
    where: { id: mealId }
  });
};
var getIncomingOrders = async (userId) => {
  const provider = await prisma_default.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  return prisma_default.order.findMany({
    where: {
      items: {
        some: {
          meal: {
            providerId: provider.id
          }
        }
      }
    },
    include: {
      customer: {
        select: { name: true, email: true }
      },
      items: {
        include: {
          meal: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateOrderStatus = async (userId, orderId, status) => {
  const provider = await prisma_default.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) throw new Error("Provider profile not found");
  const order = await prisma_default.order.findFirst({
    where: {
      id: orderId,
      items: {
        some: {
          meal: {
            providerId: provider.id
          }
        }
      }
    }
  });
  if (!order) throw new Error("Order not found");
  return prisma_default.order.update({
    where: { id: orderId },
    data: { status }
  });
};
var getDashboardStats = async (userId) => {
  const provider = await prisma_default.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  const totalMeals = await prisma_default.meal.count({
    where: { providerId: provider.id }
  });
  const pendingOrders = await prisma_default.order.count({
    where: {
      status: { in: ["PLACED", "PREPARING"] },
      items: {
        some: {
          meal: {
            providerId: provider.id
          }
        }
      }
    }
  });
  const completedOrders = await prisma_default.order.count({
    where: {
      status: "DELIVERED",
      items: {
        some: {
          meal: {
            providerId: provider.id
          }
        }
      }
    }
  });
  return {
    totalMeals,
    pendingOrders,
    completedOrders
  };
};

// src/modules/provider/provider.controller.ts
var createProviderProfile2 = async (req, res) => {
  const result = await createProviderProfile(
    req.user,
    req.body
  );
  res.status(201).json({
    success: true,
    message: "Provider profile created successfully",
    data: result
  });
};
var addMeal2 = async (req, res) => {
  const result = await addMeal(req.user, req.body);
  res.status(201).json({
    success: true,
    message: "Meal added successfully",
    data: result
  });
};
var updateMeal2 = async (req, res) => {
  const result = await updateMeal(
    req.user,
    req.params.id,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Meal updated successfully",
    data: result
  });
};
var deleteMeal2 = async (req, res) => {
  await deleteMeal(req.user, req.params.id);
  res.status(200).json({
    success: true,
    message: "Meal deleted successfully"
  });
};
var getIncomingOrders2 = async (req, res) => {
  const orders = await getIncomingOrders(req.user.id);
  res.json({
    success: true,
    data: orders
  });
};
var updateOrderStatus2 = async (req, res) => {
  const { status } = req.body;
  const order = await updateOrderStatus(
    req.user.id,
    req.params.id,
    status
  );
  res.json({
    success: true,
    message: "Order status updated",
    data: order
  });
};
var getDashboardStats2 = async (req, res) => {
  const stats = await getDashboardStats(req.user.id);
  res.json({
    success: true,
    data: stats
  });
};

// src/modules/provider/provider.route.ts
var router2 = Router2();
router2.post(
  "/profile",
  auth,
  providerOnly,
  createProviderProfile2
);
router2.post(
  "/meals",
  auth,
  providerOnly,
  addMeal2
);
router2.put(
  "/meals/:id",
  auth,
  providerOnly,
  updateMeal2
);
router2.delete(
  "/meals/:id",
  auth,
  providerOnly,
  deleteMeal2
);
router2.get(
  "/orders",
  auth,
  providerOnly,
  getIncomingOrders2
);
router2.patch(
  "/orders/:id/status",
  auth,
  providerOnly,
  updateOrderStatus2
);
router2.get(
  "/dashboard-stats",
  auth,
  providerOnly,
  getDashboardStats2
);
var provider_route_default = router2;

// src/modules/providerPublic/providerPublic.route.ts
import { Router as Router3 } from "express";

// src/modules/providerPublic/providerPublic.service.ts
var getAllProviders = async () => {
  return prisma_default.providerProfile.findMany({
    select: {
      id: true,
      restaurant: true,
      address: true,
      phone: true,
      _count: {
        select: {
          meals: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getProviderById = async (id) => {
  const provider = await prisma_default.providerProfile.findUnique({
    where: { id },
    include: {
      meals: {
        include: {
          category: true
        },
        orderBy: {
          createdAt: "desc"
        }
      },
      user: {
        select: {
          name: true
        }
      }
    }
  });
  if (!provider) {
    throw new Error("Provider not found");
  }
  return provider;
};

// src/modules/providerPublic/providerPublic.controller.ts
var getAllProviders2 = async (req, res) => {
  const providers = await getAllProviders();
  res.status(200).json({
    success: true,
    data: providers
  });
};
var getProviderById2 = async (req, res) => {
  const provider = await getProviderById(req.params.id);
  res.status(200).json({
    success: true,
    data: provider
  });
};

// src/modules/providerPublic/providerPublic.route.ts
var router3 = Router3();
router3.get("/", getAllProviders2);
router3.get("/:id", getProviderById2);
var providerPublic_route_default = router3;

// src/modules/admin/admin.route.ts
import { Router as Router4 } from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  return prisma_default.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var updateUserStatus = async (userId, isActive) => {
  return prisma_default.user.update({
    where: { id: userId },
    data: { isActive }
  });
};
var getAllOrders = async () => {
  return prisma_default.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      customer: {
        select: {
          name: true,
          email: true
        }
      },
      items: {
        include: {
          meal: {
            include: {
              provider: {
                select: {
                  restaurant: true
                }
              }
            }
          }
        }
      }
    }
  });
};

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json({
    success: true,
    data: users
  });
};
var updateUserStatus2 = async (req, res) => {
  const result = await updateUserStatus(
    req.params.id,
    req.body.isActive
  );
  res.status(200).json({
    success: true,
    message: "User status updated",
    data: result
  });
};
var getAllOrders2 = async (req, res) => {
  const orders = await getAllOrders();
  res.json({
    success: true,
    data: orders
  });
};

// src/modules/admin/admin.route.ts
var router4 = Router4();
router4.get(
  "/users",
  auth,
  adminOnly,
  getAllUsers2
);
router4.patch(
  "/users/:id",
  auth,
  adminOnly,
  updateUserStatus2
);
router4.get(
  "/orders",
  auth,
  adminOnly,
  getAllOrders2
);
var admin_route_default = router4;

// src/modules/meal/meal.route.ts
import { Router as Router5 } from "express";

// src/modules/meal/meal.service.ts
var getAllMeals = async (query) => {
  const { search, categoryId, minPrice, maxPrice } = query;
  return prisma_default.meal.findMany({
    where: {
      AND: [
        search ? {
          name: {
            contains: search,
            mode: "insensitive"
          }
        } : {},
        categoryId ? { categoryId } : {},
        minPrice ? { price: { gte: Number(minPrice) } } : {},
        maxPrice ? { price: { lte: Number(maxPrice) } } : {}
      ]
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          userId: true,
          restaurant: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getMealById = async (id) => {
  const meal = await prisma_default.meal.findUnique({
    where: { id },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          restaurant: true,
          address: true,
          phone: true
        }
      },
      reviews: true
    }
  });
  return meal;
};

// src/modules/meal/meal.controller.ts
var getAllMeals2 = async (req, res) => {
  const meals = await getAllMeals(req.query);
  res.status(200).json({
    success: true,
    data: meals
  });
};
var getMealById2 = async (req, res) => {
  try {
    const meal = await getMealById(req.params.id);
    res.status(200).json({
      success: true,
      data: meal
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Meal not found"
    });
  }
};

// src/modules/meal/meal.route.ts
var router5 = Router5();
router5.get("/", getAllMeals2);
router5.get("/:id", getMealById2);
var meal_route_default = router5;

// src/modules/category/category.route.ts
import { Router as Router6 } from "express";

// src/modules/category/category.service.ts
var createCategory = async (payload) => {
  return prisma_default.category.create({
    data: {
      name: payload.name
    }
  });
};
var getAllCategories = async () => {
  return prisma_default.category.findMany({
    orderBy: {
      name: "asc"
    }
  });
};
var updateCategory = async (id, payload) => {
  return prisma_default.category.update({
    where: { id },
    data: payload
  });
};
var deleteCategory = async (id) => {
  return prisma_default.category.delete({
    where: { id }
  });
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res) => {
  const result = await createCategory(req.body);
  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: result
  });
};
var getAllCategories2 = async (_req, res) => {
  const categories = await getAllCategories();
  res.status(200).json({
    success: true,
    data: categories
  });
};
var updateCategory2 = async (req, res) => {
  const result = await updateCategory(
    req.params.id,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: result
  });
};
var deleteCategory2 = async (req, res) => {
  await deleteCategory(req.params.id);
  res.status(200).json({
    success: true,
    message: "Category deleted successfully"
  });
};

// src/modules/category/category.route.ts
var router6 = Router6();
router6.post("/", auth, adminOnly, createCategory2);
router6.get("/", getAllCategories2);
router6.patch("/:id", auth, adminOnly, updateCategory2);
router6.delete("/:id", auth, adminOnly, deleteCategory2);
var category_route_default = router6;

// src/modules/review/review.route.ts
import express from "express";

// src/modules/review/review.service.ts
var createReviewService = async ({
  userId,
  mealId,
  rating,
  comment
}) => {
  const deliveredOrder = await prisma_default.orderItem.findFirst({
    where: {
      mealId,
      order: {
        customerId: userId,
        status: "DELIVERED"
      }
    }
  });
  if (!deliveredOrder) {
    throw new Error(
      "You can review this meal only after it is delivered"
    );
  }
  const existingReview = await prisma_default.review.findFirst({
    where: {
      userId,
      mealId
    }
  });
  if (existingReview) {
    throw new Error("You have already reviewed this meal");
  }
  const review = await prisma_default.review.create({
    data: {
      userId,
      mealId,
      rating,
      comment
    }
  });
  return review;
};

// src/modules/review/review.controller.ts
var createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mealId, rating, comment } = req.body;
    if (!mealId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "mealId, rating and comment are required"
      });
    }
    const review = await createReviewService({
      userId,
      mealId,
      rating,
      comment
    });
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// src/modules/review/review.route.ts
var router7 = express.Router();
router7.post("/", auth, createReview);
var review_route_default = router7;

// src/modules/order/order.route.ts
import { Router as Router7 } from "express";

// src/modules/order/order.service.ts
var createOrder = async (user, payload) => {
  const { items, address } = payload;
  if (!items || items.length === 0) {
    throw new Error("Order items are required");
  }
  const meals = await prisma_default.meal.findMany({
    where: {
      id: {
        in: items.map((i) => i.mealId)
      }
    }
  });
  if (meals.length !== items.length) {
    throw new Error("Invalid meal found in order");
  }
  let totalPrice = 0;
  items.forEach((item) => {
    const meal = meals.find((m) => m.id === item.mealId);
    if (!meal) return;
    totalPrice += meal.price * item.quantity;
  });
  const order = await prisma_default.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        customerId: user.id,
        address
      }
    });
    const orderItemsData = items.map((item) => ({
      orderId: createdOrder.id,
      mealId: item.mealId,
      quantity: item.quantity
    }));
    await tx.orderItem.createMany({
      data: orderItemsData
    });
    return createdOrder;
  });
  return order;
};
var getMyOrders = async (user) => {
  return prisma_default.order.findMany({
    where: {
      customerId: user.id
    },
    include: {
      items: {
        include: {
          meal: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
              providerId: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getOrderById = async (user, orderId) => {
  const order = await prisma_default.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          meal: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
              providerId: true
            }
          }
        }
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.customerId !== user.id) {
    throw new Error("You are not allowed to view this order");
  }
  return order;
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res) => {
  const result = await createOrder(req.user, req.body);
  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: result
  });
};
var getMyOrders2 = async (req, res) => {
  const orders = await getMyOrders(req.user);
  res.status(200).json({
    success: true,
    data: orders
  });
};
var getOrderById2 = async (req, res) => {
  const order = await getOrderById(req.user, req.params.id);
  res.status(200).json({
    success: true,
    data: order
  });
};

// src/modules/order/order.route.ts
var router8 = Router7();
router8.post("/", auth, createOrder2);
router8.get("/", auth, getMyOrders2);
router8.get("/:id", auth, getOrderById2);
var order_route_default = router8;

// src/modules/user/user.route.ts
import express2 from "express";

// src/modules/user/user.controller.ts
var updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    const user = await prisma_default.user.update({
      where: { id: userId },
      data: { name },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    res.json({
      success: true,
      data: user
    });
  } catch {
    res.status(400).json({
      success: false,
      message: "Profile update failed"
    });
  }
};

// src/modules/user/user.route.ts
var router9 = express2.Router();
router9.patch("/me", auth, updateProfile);
var user_route_default = router9;

// src/app.ts
var app = express3();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend.vercel.app"
      // production
    ],
    credentials: true
  })
);
app.use(express3.json());
app.use("/api/auth", auth_route_default);
app.use("/api/provider", provider_route_default);
app.use("/api/providers", providerPublic_route_default);
app.use("/api/admin", admin_route_default);
app.use("/api/meals", meal_route_default);
app.use("/api/orders", order_route_default);
app.use("/api/categories", category_route_default);
app.use("/api/reviews", review_route_default);
app.use("/api/users", user_route_default);
var app_default = app;

// src/server.ts
import dotenv from "dotenv";
dotenv.config();
var PORT = process.env.PORT || 4e3;
async function startServer() {
  try {
    await prisma_default.$connect();
    console.log("\u2705 Database connected");
    app_default.get("/", (_req, res) => {
      res.send("FoodHub backend running \u{1F680}");
    });
    app_default.listen(PORT, () => {
      console.log(`\u{1F680} Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("\u274C Failed to start server:", error);
    process.exit(1);
  }
}
startServer();
