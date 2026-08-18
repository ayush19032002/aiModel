import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';

const prisma = new PrismaClient();

class UserController {
  getProfile = async (req: AuthRequest, res: Response) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          status: true,
          createdAt: true,
          settings: true
        }
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  };

  updateProfile = async (req: AuthRequest, res: Response) => {
    try {
      const { name, avatar } = req.body;

      const user = await prisma.user.update({
        where: { id: req.user!.id },
        data: { name, avatar },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true
        }
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  };

  getSettings = async (req: AuthRequest, res: Response) => {
    try {
      let settings = await prisma.userSettings.findUnique({
        where: { userId: req.user!.id }
      });

      if (!settings) {
        settings = await prisma.userSettings.create({
          data: { userId: req.user!.id }
        });
      }

      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  };

  updateSettings = async (req: AuthRequest, res: Response) => {
    try {
      const settings = await prisma.userSettings.upsert({
        where: { userId: req.user!.id },
        create: { userId: req.user!.id, ...req.body },
        update: req.body
      });

      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update settings' });
    }
  };

  deleteAccount = async (req: AuthRequest, res: Response) => {
    try {
      await prisma.user.update({
        where: { id: req.user!.id },
        data: { deletedAt: new Date() }
      });

      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete account' });
    }
  };
}

export { UserController };
