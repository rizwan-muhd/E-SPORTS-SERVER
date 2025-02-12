import bcrypt from "bcryptjs";
import User from "../models/User.Model";

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    return newUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
