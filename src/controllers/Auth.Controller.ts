import { Request, Response } from "express";
import { registerUser } from "../services/Auth.Service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await registerUser(name, email, password);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

