import Product from "../models/Product.Model";

export const addProduct = async (body: any) => {
    try {
        const product = await Product.create(body)
        return product
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getProducts = async () => {
    try {
        const products = await Product.findAll()
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export const updateProducts = async () => {
    try {
        const products = await Product.update({ lastName: 'Doe' },
            {
                where: {
                    lastName: null,
                },
            },)
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export const deleteProducts = async (id: string) => {
    try {
        const products = await Product.destroy({ where: { id: id } })
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export const getMyProduct = async () => {
    try {
        const products = await Product.findAll()
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const addToWishlist = async () => {
    try {
        const products = await Product.findAll()
    } catch (error: any) {
        throw new Error(error.message)
    }
}