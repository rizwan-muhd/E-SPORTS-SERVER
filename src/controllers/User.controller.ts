import { Request, Response } from 'express';
import { getUsers, deleteUser, updateUser } from '../services/User.Service';

export const getUsersController = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await getUsers();
        res.status(201).json({ message: "success", user: users })
    } catch (error: any) {
        return res.status(400).json({ messege: error.message })
    }
}

export const deleteUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.query.id as string;
        await deleteUser(id)
        res.status(200).json({ message: "deleted" })
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}

export const updateUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = req.body
        const user = await updateUser(data)
        res.status(200).json({ message: "updated", user })
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}

