import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const prisma = new PrismaClient();

class WhatsAppController {
  getAccounts = async (req: AuthRequest, res: Response) => {
    try {
      // Mock for Phase 4 UI Integration
      res.json([
        {
          id: 'mock-wa-1',
          phoneNumberId: '1234567890',
          phoneNumber: '+1234567890',
          metaBusinessId: 'meta-biz-1',
          metaBusinessName: 'Sharma Dental Clinic WA',
          verificationStatus: 'VERIFIED',
          webhookVerified: true,
          isActive: true,
          isEnabled: true,
          createdAt: new Date()
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch WhatsApp accounts' });
    }
  };

  connectAccount = async (req: AuthRequest, res: Response) => {
    try {
      const { phoneNumberId, accessToken, metaBusinessId, metaBusinessName } = req.body;
      // Mock for Phase 4 UI Integration
      res.json({
        id: 'mock-wa-new',
        userId: req.user!.id,
        phoneNumberId,
        phoneNumber: phoneNumberId,
        metaBusinessId,
        metaBusinessName,
        metaAccessToken: accessToken,
        verificationStatus: 'PENDING',
        isActive: true,
        isEnabled: true
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect WhatsApp account' });
    }
  };

  disconnectAccount = async (req: AuthRequest, res: Response) => {
    try {
      // Mock for Phase 4 UI Integration
      res.json({ message: 'Account disconnected successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to disconnect account' });
    }
  };

  enableAccount = async (req: AuthRequest, res: Response) => {
    try {
      res.json({ message: 'Account enabled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to enable account' });
    }
  };

  disableAccount = async (req: AuthRequest, res: Response) => {
    try {
      res.json({ message: 'Account disabled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to disable account' });
    }
  };

  verifyWebhook = async (req: AuthRequest, res: Response) => {
    try {
      res.json({ message: 'Webhook verified successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to verify webhook' });
    }
  };

  getConversations = async (req: AuthRequest, res: Response) => {
    try {
      // Mock for Phase 4 UI Integration
      res.json([
        {
          id: 'conv-1',
          whatsappAccountId: 'mock-wa-1',
          customerPhone: '+1987654321',
          businessPhone: '+1234567890',
          status: 'ACTIVE',
          lastMessageAt: new Date().toISOString(),
          assignedTo: null,
          contact: { id: 'contact-1', name: 'John Smith', phone: '+1987654321' },
          messages: [
            { id: 'msg-old-1', direction: 'INCOMING', content: 'Hi, I need an appointment.', sentAt: new Date(Date.now() - 7200000).toISOString(), status: 'RECEIVED' },
            { id: 'msg-old-2', direction: 'OUTGOING', content: 'Sure, what time works for you?', sentAt: new Date(Date.now() - 3600000).toISOString(), status: 'READ' },
            { id: 'msg-1', direction: 'INCOMING', content: 'Do you offer teeth whitening?', sentAt: new Date().toISOString(), status: 'RECEIVED' }
          ]
        },
        {
          id: 'conv-2',
          whatsappAccountId: 'mock-wa-1',
          customerPhone: '+1122334455',
          businessPhone: '+1234567890',
          status: 'ACTIVE',
          lastMessageAt: new Date(Date.now() - 3600000).toISOString(), // 1 hr ago
          assignedTo: null,
          contact: { id: 'contact-2', name: 'Alice Johnson', phone: '+1122334455' },
          messages: [
            { id: 'msg-old-3', direction: 'INCOMING', content: 'Where are you located?', sentAt: new Date(Date.now() - 7200000).toISOString(), status: 'RECEIVED' },
            { id: 'msg-2', direction: 'OUTGOING', content: 'We are located at 123 Dental Way.', sentAt: new Date(Date.now() - 3600000).toISOString(), status: 'SENT' }
          ]
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch conversations' });
    }
  };

  getConversation = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      // Mock for Phase 4 UI Integration
      res.json({
        id,
        whatsappAccountId: 'mock-wa-1',
        customerPhone: '+1987654321',
        businessPhone: '+1234567890',
        status: 'ACTIVE',
        lastMessageAt: new Date().toISOString(),
        contact: { id: 'contact-1', name: 'John Smith', phone: '+1987654321' },
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch conversation' });
    }
  };

  sendMessage = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { content, messageType, mediaUrl, templateId, templateVariables } = req.body;

      // Mock for Phase 4 UI Integration
      res.json({
        id: `msg-new-${Date.now()}`,
        conversationId: id,
        direction: 'OUTGOING',
        messageType: messageType || 'TEXT',
        content,
        mediaUrl,
        templateId,
        templateVariables,
        sentAt: new Date().toISOString(),
        status: 'SENT'
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  };

  assignAgent = async (req: AuthRequest, res: Response) => {
    try {
      res.json({ message: 'Agent assigned successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to assign agent' });
    }
  };

  updateLabels = async (req: AuthRequest, res: Response) => {
    try {
      res.json({ message: 'Labels updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update labels' });
    }
  };

  updateNotes = async (req: AuthRequest, res: Response) => {
    try {
      res.json({ message: 'Notes updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update notes' });
    }
  };

  getMessages = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      // Mock for Phase 4 UI Integration
      res.json([
        { id: 'msg-old-1', direction: 'INCOMING', content: 'Hi, I need an appointment.', sentAt: new Date(Date.now() - 7200000).toISOString(), status: 'RECEIVED' },
        { id: 'msg-old-2', direction: 'OUTGOING', content: 'Sure, what time works for you?', sentAt: new Date(Date.now() - 3600000).toISOString(), status: 'READ' },
        { id: 'msg-1', direction: 'INCOMING', content: 'Do you offer teeth whitening?', sentAt: new Date().toISOString(), status: 'RECEIVED' }
      ]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };
}

export { WhatsAppController };
