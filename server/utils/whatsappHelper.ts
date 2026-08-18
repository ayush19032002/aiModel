import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const sendWhatsAppMessage = async (
  whatsappAccountId: string,
  toPhoneNumber: string,
  messageContent: string
) => {
  try {
    const account = await prisma.whatsAppAccount.findUnique({
      where: { id: whatsappAccountId }
    });

    if (!account || !account.metaAccessToken) {
      throw new Error('WhatsApp account or access token not found');
    }

    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${account.phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: toPhoneNumber,
        type: 'text',
        text: {
          body: messageContent
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${account.metaAccessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error sending WhatsApp message via Meta API:', error?.response?.data || error.message);
    throw error;
  }
};
