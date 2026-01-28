
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (payload: any) => {
  const { name, email, password, role } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
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
      role: user.role,
    },
    token,
  };
};

export const loginUser = async (payload: any) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
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
    },
    token,
  };
};
