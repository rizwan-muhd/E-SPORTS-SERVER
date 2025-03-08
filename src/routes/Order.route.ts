import express from 'express';
import { createOrderController, getOrderHistoryController } from '../controllers/Order.Controller';
// import { handleStripeWebhook } from '../controllers/WebhookController';

const router = express.Router();

router.post('/order/create', createOrderController);
// router.post('/orders/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);
router.get('/orders/history/:userId', getOrderHistoryController);

export default router;