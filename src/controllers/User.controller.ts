import { Request, Response } from 'express';
import { stringify } from 'querystring';
import { STRING } from 'sequelize';
import { getUsers, deleteUser } from '../services/User.Service';

export const getUsersController = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await getUsers();
        res.status(201).json({ message: "success", user: users })
    } catch (error: any) {
        return res.status(400).json({ messege: error.message })
    }
}

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        await deleteUser(id)
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}