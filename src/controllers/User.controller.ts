import { Request, Response } from 'express';
import { getUsers } from '../services/User.Service';

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.status(201).json({ message: "success", user: users })
    } catch (error: any) {
        return res.status(400).json({ messege: error.message })
    }
}