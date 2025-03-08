import { stripe } from '../config/Stripe';
import Order from '../models/Order.Model';


export const createOrder = async (body: any) => {
    try {
        const { userId, products, totalAmount } = body;

        // Create a Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Convert to cents
            currency: 'inr',
            metadata: { userId }
        });

        // Save order with status "pending"
        const newOrder = await Order.create({
            userId,
            totalAmount,
            paymentStatus: 'pending',
            paymentIntentId: paymentIntent.id,
            products
        });

        return ({ clientSecret: paymentIntent.client_secret, orderId: newOrder.id });
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getOrderHistory = async (userId: string) => {
    try {
        const orders = await Order.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
        return (orders);
    } catch (error: any) {
        throw new Error(error);
    }
};
