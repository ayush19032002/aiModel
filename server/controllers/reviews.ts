import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';
import { generateAIReply } from '../services/aiService';

const prisma = new PrismaClient();

class ReviewController {
  getReviews = async (req: AuthRequest, res: Response) => {
    try {
      const { businessProfileId, rating, keyword, sortBy } = req.query;

      const where: any = {
        businessProfile: { userId: req.user!.id }
      };

      if (businessProfileId) {
        where.businessProfileId = businessProfileId as string;
      }

      if (rating) {
        where.rating = parseInt(rating as string);
      }

      if (keyword) {
        where.comment = {
          contains: keyword as string,
          mode: 'insensitive'
        };
      }

      const orderBy: any = {};
      if (sortBy === 'newest') {
        orderBy.reviewTime = 'desc';
      } else if (sortBy === 'oldest') {
        orderBy.reviewTime = 'asc';
      } else if (sortBy === 'rating') {
        orderBy.rating = 'desc';
      }

      const reviews = await prisma.review.findMany({
        where,
        orderBy,
        include: {
          businessProfile: {
            select: { name: true }
          }
        }
      });

      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  };

  getReview = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      const review = await prisma.review.findUnique({
        where: { id },
        include: {
          businessProfile: true
        }
      });

      if (!review || review.businessProfile.userId !== req.user!.id) {
        return res.status(404).json({ error: 'Review not found' });
      }

      res.json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch review' });
    }
  };

  replyToReview = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { reply } = req.body;

      const review = await prisma.review.update({
        where: { id },
        data: {
          reply,
          replyUpdatedAt: new Date(),
          isReplied: true,
          replyStatus: 'PUBLISHED'
        }
      });

      res.json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to reply to review' });
    }
  };

  updateReply = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { reply } = req.body;

      const review = await prisma.review.update({
        where: { id },
        data: {
          reply,
          replyUpdatedAt: new Date()
        }
      });

      res.json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update reply' });
    }
  };

  deleteReply = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.review.update({
        where: { id },
        data: {
          reply: null,
          replyUpdatedAt: null,
          isReplied: false,
          replyStatus: 'PENDING'
        }
      });

      res.json({ message: 'Reply deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete reply' });
    }
  };

  generateAIReply = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { tone } = req.body;

      const review = await prisma.review.findUnique({
        where: { id },
        include: {
          businessProfile: true
        }
      });

      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }

      const aiReply = await generateAIReply({
        review: review.comment,
        rating: review.rating,
        tone: tone || 'professional',
        businessName: review.businessProfile.name
      });

      res.json({ reply: aiReply });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate AI reply' });
    }
  };

  syncReviews = async (req: AuthRequest, res: Response) => {
    try {
      const { businessProfileId } = req.body;

      // This would trigger a background job to sync reviews from Google
      await prisma.businessProfile.update({
        where: { id: businessProfileId },
        data: { syncStatus: 'SYNCING' }
      });

      res.json({ message: 'Review sync initiated' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to sync reviews' });
    }
  };

  exportReviews = async (req: AuthRequest, res: Response) => {
    try {
      const { businessProfileId } = req.query;

      const reviews = await prisma.review.findMany({
        where: {
          businessProfile: { userId: req.user!.id },
          ...(businessProfileId && { businessProfileId: businessProfileId as string })
        }
      });

      // Convert to CSV format
      const csv = [
        ['Review ID', 'Rating', 'Comment', 'Reviewer Name', 'Review Date', 'Reply', 'Reply Date'].join(','),
        ...reviews.map((r: any) => [
          r.id,
          r.rating,
          `"${r.comment || ''}"`,
          `"${r.reviewerName || ''}"`,
          r.reviewTime.toISOString(),
          `"${r.reply || ''}"`,
          r.replyUpdatedAt?.toISOString() || ''
        ].join(','))
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=reviews.csv');
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: 'Failed to export reviews' });
    }
  };
}

export { ReviewController };
