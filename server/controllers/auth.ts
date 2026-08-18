import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';

const prisma = new PrismaClient();

class AuthController {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  // Google OAuth - Initiate
  googleAuth = async (req: Request, res: Response) => {
    try {
      const state = Math.random().toString(36).substring(7);
      const url = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/business.manage',
          'https://www.googleapis.com/auth/plus.business.manage'
        ],
        state
      });

      res.json({ url, state });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate auth URL' });
    }
  };

  // Google OAuth - Callback
  googleCallback = async (req: Request, res: Response) => {
    try {
      const { code } = req.query;

      if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'Invalid code' });
      }

      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);

      // Get user info
      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        return res.status(400).json({ error: 'Failed to get user info' });
      }

      // Find or create user
      let user = await prisma.user.findUnique({
        where: { email: payload.email }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: payload.email,
            name: payload.name,
            avatar: payload.picture,
            googleId: payload.sub,
            googleAccessToken: tokens.access_token,
            googleRefreshToken: tokens.refresh_token,
            googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null
          }
        });
      } else {
        // Update existing user
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleAccessToken: tokens.access_token,
            googleRefreshToken: tokens.refresh_token,
            googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
            lastLoginAt: new Date(),
            lastLoginIp: req.ip,
            lastLoginUserAgent: req.get('user-agent')
          }
        });
      }

      // Generate tokens
      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any }
      );

      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
        { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any }
      );

      // Save refresh token
      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
      });

      // Create session
      await prisma.session.create({
        data: {
          token: accessToken,
          userId: user.id,
          ipAddress: req.ip,
          userAgent: req.get('user-agent'),
          expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
        }
      });

      res.json({
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Google callback error:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  };

  // Refresh token
  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token required' });
      }

      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || 'your-refresh-secret'
      ) as { userId: string };

      // Check if refresh token exists in database
      const tokenRecord = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true }
      });

      if (!tokenRecord || tokenRecord.userId !== decoded.userId) {
        return res.status(401).json({ error: 'Invalid refresh token' });
      }

      if (tokenRecord.revokedAt || tokenRecord.expiresAt < new Date()) {
        return res.status(401).json({ error: 'Refresh token expired or revoked' });
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { userId: decoded.userId },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any }
      );

      res.json({ accessToken });
    } catch (error) {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  };

  // Logout
  logout = async (req: AuthRequest, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.substring(7);
        
        // Revoke refresh tokens
        await prisma.refreshToken.updateMany({
          where: { userId: req.user!.id },
          data: { revokedAt: new Date() }
        });

        // Delete session
        await prisma.session.deleteMany({
          where: { userId: req.user!.id }
        });
      }

      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Logout failed' });
    }
  };

  // Enable 2FA
  enable2FA = async (req: AuthRequest, res: Response) => {
    try {
      const speakeasy = require('speakeasy');
      const QRCode = require('qrcode');

      const secret = speakeasy.generateSecret({
        name: `GBP Growth Pro (${req.user!.email})`,
        issuer: 'GBP Growth Pro'
      });

      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

      // Store secret temporarily (not yet enabled)
      await prisma.user.update({
        where: { id: req.user!.id },
        data: { twoFactorSecret: secret.base32 }
      });

      res.json({
        secret: secret.base32,
        qrCode: qrCodeUrl
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to enable 2FA' });
    }
  };

  // Verify 2FA
  verify2FA = async (req: AuthRequest, res: Response) => {
    try {
      const { token } = req.body;
      const speakeasy = require('speakeasy');

      const user = await prisma.user.findUnique({
        where: { id: req.user!.id }
      });

      if (!user || !user.twoFactorSecret) {
        return res.status(400).json({ error: '2FA not set up' });
      }

      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token
      });

      if (!verified) {
        return res.status(400).json({ error: 'Invalid token' });
      }

      // Enable 2FA
      await prisma.user.update({
        where: { id: req.user!.id },
        data: { twoFactorEnabled: true }
      });

      res.json({ message: '2FA enabled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to verify 2FA' });
    }
  };

  // Disable 2FA
  disable2FA = async (req: AuthRequest, res: Response) => {
    try {
      await prisma.user.update({
        where: { id: req.user!.id },
        data: {
          twoFactorEnabled: false,
          twoFactorSecret: null
        }
      });

      res.json({ message: '2FA disabled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to disable 2FA' });
    }
  };
}

export { AuthController };
