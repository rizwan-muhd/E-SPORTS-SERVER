import { Request, Response, NextFunction } from 'express';
import { handleStripeWebhook } from '../services/Stripe.Service';

export const handleWebhookRequest = async (req: Request, res: Response, next: NextFunction) => {
    const sig = req.headers['stripe-signature'] as string | undefined;

    try {
        // ✅ Pass the raw body (which is Buffer) instead of the parsed JSON
        await handleStripeWebhook(req.body, sig);
        res.status(200).send({ received: true });
    } catch (error) {
        console.error('❌ Error handling webhook:', error);
        res.status(400).send('Webhook Error');
    }
};
