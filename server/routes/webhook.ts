import { Router } from 'express';
import { WebhookController } from '../controllers/webhookController';

const router = Router();
const webhookController = new WebhookController();

// WhatsApp webhooks
router.post('/whatsapp', webhookController.handleWhatsAppWebhook);
router.get('/whatsapp/verify', webhookController.verifyWhatsAppWebhook);

// Stripe webhooks
router.post('/stripe', webhookController.handleStripeWebhook);

// Google Business Profile webhooks (if available)
router.post('/google', webhookController.handleGoogleWebhook);

export default router;
