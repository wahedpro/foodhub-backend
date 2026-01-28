
import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import {
  validateRegister,
  validateLogin,
} from "./auth.validation";

export const register = async (req: Request, res: Response) => {
  try {
    validateRegister(req.body);

    const result = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    validateLogin(req.body);

    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
