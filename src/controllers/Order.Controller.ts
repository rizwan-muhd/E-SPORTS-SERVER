import { Request, Response } from "express";
import { createOrder, getOrderHistory } from "../services/Order.Service";

export const createOrderController = async (req: Request, res: Response): Promise<any> => {
    try {
        const orders = await createOrder(req.body)
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching order history', error });
    }
};

export const getOrderHistoryController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.params;
        const orders = await getOrderHistory(userId)
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching order history', error });
    }
};
