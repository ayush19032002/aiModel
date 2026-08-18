import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';

const prisma = new PrismaClient();

class WhatsAppController {
  getAccounts = async (req: AuthRequest, res: Response) => {
    try {
      const accounts = await prisma.whatsAppAccount.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: 'desc' }
      });

      res.json(accounts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch WhatsApp accounts' });
    }
  };

  connectAccount = async (req: AuthRequest, res: Response) => {
    try {
      const { phoneNumberId, accessToken, metaBusinessId, metaBusinessName } = req.body;

      const account = await prisma.whatsAppAccount.create({
        data: {
          userId: req.user!.id,
          phoneNumberId,
          phoneNumber: phoneNumberId,
          metaBusinessId,
          metaBusinessName,
          metaAccessToken: accessToken,
          verificationStatus: 'PENDING',
          isActive: true,
          isEnabled: true
        }
      });

      res.json(account);
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect WhatsApp account' });
    }
  };

  disconnectAccount = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.whatsAppAccount.update({
        where: { id, userId: req.user!.id },
        data: { isActive: false }
      });

      res.json({ message: 'Account disconnected successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to disconnect account' });
    }
  };

  enableAccount = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.whatsAppAccount.update({
        where: { id, userId: req.user!.id },
        data: { isEnabled: true }
      });

      res.json({ message: 'Account enabled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to enable account' });
    }
  };

  disableAccount = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.whatsAppAccount.update({
        where: { id, userId: req.user!.id },
        data: { isEnabled: false }
      });

      res.json({ message: 'Account disabled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to disable account' });
    }
  };

  verifyWebhook = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { webhookUrl } = req.body;

      // This would verify the webhook with Meta
      // For now, just update the record
      await prisma.whatsAppAccount.update({
        where: { id, userId: req.user!.id },
        data: {
          webhookUrl,
          webhookVerified: true
        }
      });

      res.json({ message: 'Webhook verified successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to verify webhook' });
    }
  };

  getConversations = async (req: AuthRequest, res: Response) => {
    try {
      const { accountId, status, assignedTo } = req.query;

      const where: any = {
        whatsappAccount: { userId: req.user!.id }
      };

      if (accountId) {
        where.whatsappAccountId = accountId as string;
      }

      if (status) {
        where.status = status as string;
      }

      if (assignedTo) {
        where.assignedTo = assignedTo as string;
      }

      const conversations = await prisma.conversation.findMany({
        where,
        orderBy: { lastMessageAt: 'desc' },
        include: {
          contact: true,
          messages: {
            take: 1,
            orderBy: { sentAt: 'desc' }
          }
        }
      });

      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch conversations' });
    }
  };

  getConversation = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      const conversation = await prisma.conversation.findUnique({
        where: { id },
        include: {
          contact: true,
          messages: {
            orderBy: { sentAt: 'asc' }
          }
        }
      });

      if (!conversation || conversation.whatsappAccount.userId !== req.user!.id) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch conversation' });
    }
  };

  sendMessage = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { content, messageType, mediaUrl, templateId, templateVariables } = req.body;

      const conversation = await prisma.conversation.findUnique({
        where: { id },
        include: { whatsappAccount: true }
      });

      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      // Send message via WhatsApp API
      // This would make an API call to Meta's WhatsApp API
      // For now, just save the message locally

      const message = await prisma.message.create({
        data: {
          conversationId: conversation.id,
          direction: 'OUTGOING',
          messageType: messageType || 'TEXT',
          content,
          mediaUrl,
          templateId,
          templateVariables,
          sentAt: new Date(),
          status: 'SENT'
        }
      });

      // Update conversation
      await prisma.conversation.update({
        where: { id },
        data: { lastMessageAt: new Date() }
      });

      res.json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  };

  assignAgent = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { assignedTo, assignedTeamMember } = req.body;

      await prisma.conversation.update({
        where: { id },
        data: {
          assignedTo,
          assignedTeamMember
        }
      });

      res.json({ message: 'Agent assigned successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to assign agent' });
    }
  };

  updateLabels = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { labels } = req.body;

      await prisma.conversation.update({
        where: { id },
        data: { labels }
      });

      res.json({ message: 'Labels updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update labels' });
    }
  };

  updateNotes = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { notes } = req.body;

      await prisma.conversation.update({
        where: { id },
        data: { notes }
      });

      res.json({ message: 'Notes updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update notes' });
    }
  };

  getMessages = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { limit = 50, offset = 0 } = req.query;

      const messages = await prisma.message.findMany({
        where: { conversationId: id },
        orderBy: { sentAt: 'desc' },
        take: parseInt(limit as string),
        skip: parseInt(offset as string)
      });

      res.json(messages.reverse());
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };
}

export { WhatsAppController };
