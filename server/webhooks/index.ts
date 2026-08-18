import { Request, Response } from 'express';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';

const prisma = new PrismaClient();

class WebhookController {
  handleWhatsAppWebhook = async (req: Request, res: Response) => {
    try {
      const { entry } = req.body;

      if (!entry || entry.length === 0) {
        return res.status(200).json({ message: 'No entries' });
      }

      for (const entryItem of entry) {
        const { changes } = entryItem;

        for (const change of changes) {
          if (change.field === 'messages') {
            await this.processWhatsAppMessage(change.value);
          }
        }
      }

      res.status(200).json({ message: 'Webhook processed' });
    } catch (error) {
      console.error('WhatsApp webhook error:', error);
      res.status(500).json({ error: 'Failed to process webhook' });
    }
  };

  verifyWhatsAppWebhook = async (req: Request, res: Response) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.status(403).json({ error: 'Verification failed' });
    }
  };

  private async processWhatsAppMessage(value: any) {
    const { metadata, messages } = value;

    if (!messages || messages.length === 0) return;

    const phoneNumberId = metadata.phone_number_id;
    const displayPhoneNumber = metadata.display_phone_number;

    // Find WhatsApp account
    const whatsappAccount = await prisma.whatsAppAccount.findUnique({
      where: { phoneNumberId }
    });

    if (!whatsappAccount) return;

    for (const message of messages) {
      if (message.type === 'text') {
        await this.handleTextMessage(message, whatsappAccount.id);
      } else if (message.type === 'image') {
        await this.handleMediaMessage(message, whatsappAccount.id, 'IMAGE');
      } else if (message.type === 'video') {
        await this.handleMediaMessage(message, whatsappAccount.id, 'VIDEO');
      } else if (message.type === 'audio') {
        await this.handleMediaMessage(message, whatsappAccount.id, 'AUDIO');
      } else if (message.type === 'document') {
        await this.handleMediaMessage(message, whatsappAccount.id, 'DOCUMENT');
      }
    }
  }

  private async handleTextMessage(message: any, whatsappAccountId: string) {
    const { from, to, timestamp, text } = message;

    // Find or create conversation
    let conversation = await prisma.conversation.findFirst({
      where: {
        customerPhone: from,
        whatsappAccountId
      }
    });

    if (!conversation) {
      // Find or create contact
      let contact = await prisma.contact.findFirst({
        where: { phone: from, whatsappAccountId }
      });

      if (!contact) {
        contact = await prisma.contact.create({
          data: {
            phone: from,
            whatsappAccountId
          }
        });
      }

      conversation = await prisma.conversation.create({
        data: {
          whatsappAccountId,
          contactId: contact.id,
          customerPhone: from,
          businessPhone: to,
          status: 'ACTIVE'
        }
      });
    }

    // Save message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        direction: 'INCOMING',
        messageType: 'TEXT',
        content: text.body,
        sentAt: new Date(parseInt(timestamp) * 1000),
        whatsappMessageId: message.id
      }
    });

    // Update conversation
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        lastMessageAt: new Date(),
        status: 'ACTIVE'
      }
    });

    // Trigger automation if enabled
    if (conversation.aiEnabled) {
      // This would trigger the AI automation flow
      // For now, just log it
      console.log('AI automation triggered for conversation:', conversation.id);
    }
  }

  private async handleMediaMessage(message: any, whatsappAccountId: string, type: string) {
    const { from, to, timestamp } = message;
    const media = message[type === 'image' ? 'image' : type === 'video' ? 'video' : type === 'audio' ? 'audio' : 'document'];

    // Similar to text message handling
    let conversation = await prisma.conversation.findFirst({
      where: {
        customerPhone: from,
        whatsappAccountId
      }
    });

    if (!conversation) {
      let contact = await prisma.contact.findFirst({
        where: { phone: from, whatsappAccountId }
      });

      if (!contact) {
        contact = await prisma.contact.create({
          data: {
            phone: from,
            whatsappAccountId
          }
        });
      }

      conversation = await prisma.conversation.create({
        data: {
          whatsappAccountId,
          contactId: contact.id,
          customerPhone: from,
          businessPhone: to,
          status: 'ACTIVE'
        }
      });
    }

    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        direction: 'INCOMING',
        messageType: type as any,
        mediaUrl: media?.mime_type ? media.url : undefined,
        mediaMimeType: media?.mime_type,
        mediaCaption: media?.caption,
        sentAt: new Date(parseInt(timestamp) * 1000),
        whatsappMessageId: message.id
      }
    });

    await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        lastMessageAt: new Date(),
        status: 'ACTIVE'
      }
    });
  }

  handleStripeWebhook = async (req: Request, res: Response) => {
    // This is handled in billingController
    // This is a placeholder for routing
    res.status(200).json({ message: 'Stripe webhook handled' });
  };

  handleGoogleWebhook = async (req: Request, res: Response) => {
    try {
      const signature = req.headers['x-goog-signature'] as string;
      const body = req.body;

      // Verify webhook signature
      const expectedSignature = crypto
        .createHmac('sha256', process.env.GOOGLE_WEBHOOK_SECRET || 'secret')
        .update(JSON.stringify(body))
        .digest('hex');

      if (signature !== expectedSignature) {
        return res.status(401).json({ error: 'Invalid signature' });
      }

      // Process Google Business Profile webhook events
      const { event_type, resource_name } = body;

      switch (event_type) {
        case 'review.created':
        case 'review.updated':
          await this.syncReview(resource_name);
          break;
        case 'location.updated':
          await this.syncLocation(resource_name);
          break;
        default:
          console.log(`Unhandled Google event: ${event_type}`);
      }

      res.status(200).json({ message: 'Webhook processed' });
    } catch (error) {
      console.error('Google webhook error:', error);
      res.status(500).json({ error: 'Failed to process webhook' });
    }
  };

  private async syncReview(resourceName: string) {
    // Extract location ID from resource name
    const locationId = resourceName.split('/').pop();

    // Trigger review sync for this location
    const businessProfile = await prisma.businessProfile.findFirst({
      where: { locationId }
    });

    if (businessProfile) {
      // Queue a background job to sync reviews
      console.log(`Queuing review sync for location: ${locationId}`);
    }
  }

  private async syncLocation(resourceName: string) {
    const locationId = resourceName.split('/').pop();

    const businessProfile = await prisma.businessProfile.findFirst({
      where: { locationId }
    });

    if (businessProfile) {
      // Queue a background job to sync location data
      console.log(`Queuing location sync for: ${locationId}`);
    }
  }
}

export { WebhookController };
