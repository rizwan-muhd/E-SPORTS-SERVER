import Stripe from 'stripe';
import { Request, Response } from 'express';
import Order from '../models/Order.Model';
import { stripe } from '../config/Stripe';  // Ensure correct Stripe instance import

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export const handleStripeWebhook = async (rawBody: Buffer | string, sig: string | string[] | undefined) => {
    try {
        if (!sig) {
            throw new Error("Missing Stripe signature");
        }

        // ✅ Ensure rawBody is a Buffer, otherwise convert string to Buffer
        const bodyBuffer = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody);

        // ✅ Verify webhook signature using the raw buffer
        const event = stripe.webhooks.constructEvent(bodyBuffer, sig, process.env.STRIPE_WEBHOOK_SECRET!);

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            await Order.update(
                { paymentStatus: 'completed' },
                { where: { paymentIntentId: paymentIntent.id } }
            );
        } else if (event.type === 'payment_intent.payment_failed') {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            await Order.update(
                { paymentStatus: 'failed' },
                { where: { paymentIntentId: paymentIntent.id } }
            );
        }

        console.log('✅ Webhook processed successfully:', event.type);
    } catch (error) {
        console.error('❌ Webhook signature verification failed:', error);
        throw new Error('Webhook processing error');
    }
};
