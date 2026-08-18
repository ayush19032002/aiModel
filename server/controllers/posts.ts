import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';
import { generateSEOContent } from '../services/aiService';

const prisma = new PrismaClient();

class PostController {
  getPosts = async (req: AuthRequest, res: Response) => {
    try {
      const { businessProfileId, status, postType } = req.query;

      const where: any = {
        businessProfile: { userId: req.user!.id }
      };

      if (businessProfileId) {
        where.businessProfileId = businessProfileId as string;
      }

      if (status) {
        where.status = status as string;
      }

      if (postType) {
        where.postType = postType as string;
      }

      const posts = await prisma.post.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          businessProfile: {
            select: { name: true }
          }
        }
      });

      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  };

  getPost = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          businessProfile: true
        }
      });

      if (!post || post.businessProfile.userId !== req.user!.id) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  };

  createPost = async (req: AuthRequest, res: Response) => {
    try {
      const {
        businessProfileId,
        postType,
        title,
        summary,
        content,
        callToAction,
        mediaUrls,
        eventStartDate,
        eventEndDate,
        offerCouponCode,
        offerRedeemUrl,
        offerTerms,
        scheduleType,
        scheduledFor,
        aiGenerated,
        aiPrompt
      } = req.body;

      const post = await prisma.post.create({
        data: {
          businessProfileId,
          userId: req.user!.id,
          postType,
          title,
          summary,
          content,
          callToAction,
          mediaUrls,
          eventStartDate: eventStartDate ? new Date(eventStartDate) : null,
          eventEndDate: eventEndDate ? new Date(eventEndDate) : null,
          offerCouponCode,
          offerRedeemUrl,
          offerTerms,
          scheduleType: scheduleType || 'IMMEDIATE',
          scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
          aiGenerated,
          aiPrompt,
          status: scheduleType === 'SCHEDULED' ? 'SCHEDULED' : 'DRAFT'
        }
      });

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  };

  updatePost = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const post = await prisma.post.update({
        where: { id },
        data
      });

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update post' });
    }
  };

  deletePost = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.post.delete({
        where: { id }
      });

      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  };

  publishPost = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      const post = await prisma.post.update({
        where: { id },
        data: {
          status: 'PUBLISHING',
          publishedAt: new Date()
        }
      });

      // This would trigger a background job to publish to Google
      // For now, just mark as published
      await prisma.post.update({
        where: { id },
        data: { status: 'PUBLISHED' }
      });

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to publish post' });
    }
  };

  schedulePost = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { scheduledFor } = req.body;

      const post = await prisma.post.update({
        where: { id },
        data: {
          scheduleType: 'SCHEDULED',
          scheduledFor: new Date(scheduledFor),
          status: 'SCHEDULED'
        }
      });

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to schedule post' });
    }
  };

  generateAIPost = async (req: AuthRequest, res: Response) => {
    try {
      const { businessProfileId, postType, tone, additionalContext } = req.body;

      const businessProfile = await prisma.businessProfile.findUnique({
        where: { id: businessProfileId }
      });

      if (!businessProfile) {
        return res.status(404).json({ error: 'Business profile not found' });
      }

      const content = await generateSEOContent({
        contentType: postType === 'OFFER' ? 'post' : postType.toLowerCase(),
        businessName: businessProfile.name,
        businessType: businessProfile.categories[0] || 'business',
        tone: tone || 'professional',
        additionalContext
      });

      res.json({ content });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate AI post' });
    }
  };

  getPostAnalytics = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      const post = await prisma.post.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          postType: true,
          views: true,
          clicks: true,
          publishedAt: true
        }
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post analytics' });
    }
  };
}

export { PostController };
