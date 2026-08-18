import { Router } from 'express';
import { WhatsAppController } from '../controllers/whatsappController';

const router = Router();
const whatsappController = new WhatsAppController();

// Account management
router.get('/accounts', whatsappController.getAccounts);
router.post('/accounts', whatsappController.connectAccount);
router.delete('/accounts/:id', whatsappController.disconnectAccount);
router.post('/accounts/:id/enable', whatsappController.enableAccount);
router.post('/accounts/:id/disable', whatsappController.disableAccount);
router.post('/accounts/:id/verify', whatsappController.verifyWebhook);

// Conversations
router.get('/conversations', whatsappController.getConversations);
router.get('/conversations/:id', whatsappController.getConversation);
router.post('/conversations/:id/messages', whatsappController.sendMessage);
router.put('/conversations/:id/assign', whatsappController.assignAgent);
router.put('/conversations/:id/labels', whatsappController.updateLabels);
router.put('/conversations/:id/notes', whatsappController.updateNotes);

// Messages
router.get('/conversations/:id/messages', whatsappController.getMessages);

export default router;
