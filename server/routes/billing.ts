import { Router } from 'express';
import { BillingController } from '../controllers/billingController';

const router = Router();
const billingController = new BillingController();

// Plans
router.get('/plans', billingController.getPlans);
router.get('/subscription', billingController.getSubscription);
router.post('/subscription', billingController.createSubscription);
router.put('/subscription/cancel', billingController.cancelSubscription);
router.post('/subscription/webhook', billingController.handleStripeWebhook);

// Invoices
router.get('/invoices', billingController.getInvoices);
router.get('/invoices/:id', billingController.getInvoice);

// Coupons
router.post('/coupons/validate', billingController.validateCoupon);

// Usage
router.get('/usage', billingController.getUsage);

export default router;
