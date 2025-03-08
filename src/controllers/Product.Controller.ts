import { Request, Response } from 'express'
import { addProduct, getProducts } from '../services/Product.Service'


export const addProductController = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const product = await addProduct(data)
        res.status(200).json({ message: "success", product: product })
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}

export const getProductController = async (req: Request, res: Response) => {
    try {
        const products = await getProducts()
        res.status(200).json({ message: "success", product: products })
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}

