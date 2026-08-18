import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';

const prisma = new PrismaClient();

class GoogleController {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
  }

  getAccounts = async (req: AuthRequest, res: Response) => {
    try {
      const accounts = await prisma.googleAccount.findMany({
        where: { userId: req.user!.id, isConnected: true },
        orderBy: { createdAt: 'desc' }
      });

      res.json(accounts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch accounts' });
    }
  };

  connectAccount = async (req: AuthRequest, res: Response) => {
    try {
      const { code } = req.body;

      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);

      // Get user info from Google
      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();

      // Check if account already exists
      let account = await prisma.googleAccount.findUnique({
        where: { googleAccountId: payload!.sub }
      });

      if (account) {
        // Update existing account
        account = await prisma.googleAccount.update({
          where: { id: account.id },
          data: {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            tokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
            isConnected: true
          }
        });
      } else {
        // Create new account
        account = await prisma.googleAccount.create({
          data: {
            userId: req.user!.id,
            googleAccountId: payload!.sub,
            email: payload!.email,
            name: payload!.name,
            avatar: payload!.picture,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            tokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
            permissions: ['business.manage']
          }
        });
      }

      res.json(account);
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect account' });
    }
  };

  disconnectAccount = async (req: AuthRequest, res: Response) => {
    try {
      const { accountId } = req.params;

      await prisma.googleAccount.update({
        where: { id: accountId, userId: req.user!.id },
        data: { isConnected: false }
      });

      res.json({ message: 'Account disconnected successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to disconnect account' });
    }
  };

  refreshAccount = async (req: AuthRequest, res: Response) => {
    try {
      const { accountId } = req.params;

      const account = await prisma.googleAccount.findUnique({
        where: { id: accountId, userId: req.user!.id }
      });

      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }

      this.oauth2Client.setCredentials({
        refresh_token: account.refreshToken
      });

      const { credentials } = await this.oauth2Client.refreshAccessToken();

      await prisma.googleAccount.update({
        where: { id: accountId },
        data: {
          accessToken: credentials.access_token,
          tokenExpiry: credentials.expiry_date ? new Date(credentials.expiry_date) : null,
          lastSyncedAt: new Date()
        }
      });

      res.json({ message: 'Account refreshed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to refresh account' });
    }
  };

  getLocations = async (req: AuthRequest, res: Response) => {
    try {
      const { accountId } = req.params;

      const businessProfiles = await prisma.businessProfile.findMany({
        where: { 
          userId: req.user!.id,
          googleAccountId: accountId,
          deletedAt: null
        }
      });

      res.json(businessProfiles);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch locations' });
    }
  };

  syncLocation = async (req: AuthRequest, res: Response) => {
    try {
      const { accountId, locationId } = req.params;

      // This would trigger a background job to sync the location
      // For now, just update the sync status
      await prisma.businessProfile.updateMany({
        where: { 
          locationId,
          googleAccountId: accountId,
          userId: req.user!.id
        },
        data: {
          syncStatus: 'SYNCING',
          lastSyncedAt: new Date()
        }
      });

      res.json({ message: 'Sync initiated' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to sync location' });
    }
  };
}

export { GoogleController };
