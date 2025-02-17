import { Request, Response } from "express";
import { registerUser, loginUser, sendResetPasswordEmail, googleAuth } from "../services/Auth.Service";

export const register = async (req: Request, res: Response): Promise<any> => {
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

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password)
    if (user) {
      res.status(200).json({ message: "login success", user })
    }


  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}

export const resetPassword = () => {

}

export const forgetpassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body
    console.log(email)
    const reset = await sendResetPasswordEmail(email)
    res.status(200).json({ message: "send success" })
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}


