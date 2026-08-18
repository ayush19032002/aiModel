import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';

const prisma = new PrismaClient();

class BusinessProfileController {
  getBusinessProfiles = async (req: AuthRequest, res: Response) => {
    try {
      const profiles = await prisma.businessProfile.findMany({
        where: { 
          userId: req.user!.id,
          deletedAt: null
        },
        include: {
          googleAccount: true
        },
        orderBy: { createdAt: 'desc' }
      });

      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch business profiles' });
    }
  };

  getBusinessProfile = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      const profile = await prisma.businessProfile.findUnique({
        where: { 
          id,
          userId: req.user!.id,
          deletedAt: null
        },
        include: {
          googleAccount: true,
          reviews: {
            take: 10,
            orderBy: { reviewTime: 'desc' }
          },
          posts: {
            take: 5,
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (!profile) {
        return res.status(404).json({ error: 'Business profile not found' });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch business profile' });
    }
  };

  updateBusinessProfile = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;

      // Create a version before updating
      const currentProfile = await prisma.businessProfile.findUnique({
        where: { id }
      });

      if (currentProfile) {
        const latestVersion = await prisma.businessVersion.findFirst({
          where: { businessProfileId: id },
          orderBy: { version: 'desc' }
        });

        const newVersion = await prisma.businessVersion.create({
          data: {
            businessProfileId: id,
            version: (latestVersion?.version || 0) + 1,
            changes: data,
            data: currentProfile,
            changeReason: 'Manual update'
          }
        });
      }

      const profile = await prisma.businessProfile.update({
        where: { id, userId: req.user!.id },
        data
      });

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update business profile' });
    }
  };

  publishChanges = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      // Mark latest version as published
      const latestVersion = await prisma.businessVersion.findFirst({
        where: { businessProfileId: id },
        orderBy: { version: 'desc' }
      });

      if (latestVersion) {
        await prisma.businessVersion.update({
          where: { id: latestVersion.id },
          data: {
            isPublished: true,
            publishedAt: new Date()
          }
        });
      }

      // This would trigger a sync with Google Business Profile API
      await prisma.businessProfile.update({
        where: { id },
        data: { syncStatus: 'SYNCING' }
      });

      res.json({ message: 'Changes published successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to publish changes' });
    }
  };

  rollbackVersion = async (req: AuthRequest, res: Response) => {
    try {
      const { id, versionId } = req.params;

      const version = await prisma.businessVersion.findUnique({
        where: { id: versionId, businessProfileId: id }
      });

      if (!version) {
        return res.status(404).json({ error: 'Version not found' });
      }

      // Restore data from version
      await prisma.businessProfile.update({
        where: { id },
        data: version.data as any
      });

      await prisma.businessVersion.update({
        where: { id: versionId },
        data: { rolledBackAt: new Date() }
      });

      res.json({ message: 'Rollback successful' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to rollback version' });
    }
  };

  getVersionHistory = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      const versions = await prisma.businessVersion.findMany({
        where: { businessProfileId: id },
        orderBy: { version: 'desc' }
      });

      res.json(versions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch version history' });
    }
  };

  deleteBusinessProfile = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.businessProfile.update({
        where: { id, userId: req.user!.id },
        data: { deletedAt: new Date() }
      });

      res.json({ message: 'Business profile deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete business profile' });
    }
  };
}

export { BusinessProfileController };
