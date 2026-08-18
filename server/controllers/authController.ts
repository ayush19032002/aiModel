import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../mocks/db';

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

  // Email/Password Login (Using In-memory mock DB)
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const user = findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isValid = bcrypt.compareSync(password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any }
      );

      res.json({ token: accessToken, user: { email: user.email, name: user.name } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  };

  // Email/Password Register (Using In-memory mock DB)
  register = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const existingUser = findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already registered' });
      }

      const passwordHash = bcrypt.hashSync(password, 10);
      const newUser = createUser(email, passwordHash, name || 'New User');

      const accessToken = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any }
      );

      res.json({ token: accessToken, user: { email: newUser.email, name: newUser.name } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration failed' });
    }
  };

  // Google OAuth - Initiate (Mock for Phase 2)
  googleAuth = async (req: Request, res: Response) => {
    try {
      // Return a URL that redirects directly to our callback to simulate OAuth completion
      const redirectUrl = process.env.NEXT_PUBLIC_API_URL 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback?code=mock_google_code`
        : `http://localhost:3001/api/auth/google/callback?code=mock_google_code`;
        
      res.json({ url: redirectUrl, state: 'mock_state' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate auth URL' });
    }
  };

  // Google OAuth - Callback (Mock for Phase 2)
  googleCallback = async (req: Request, res: Response) => {
    try {
      const { code } = req.query;

      if (!code) {
        return res.status(400).json({ error: 'Invalid code' });
      }

      // Simulate successful OAuth processing
      const accessToken = jwt.sign(
        { userId: 'mock-user-123', email: 'demo@gbpgrowthpro.com' },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any }
      );

      // Redirect back to frontend settings/onboarding with a success flag
      const frontendUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/settings?integration_success=true&token=${accessToken}`);
    } catch (error) {
      console.error('Google callback error:', error);
      const frontendUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/settings?integration_error=true`);
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
