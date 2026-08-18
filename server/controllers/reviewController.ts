import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';
import { generateAIReply } from '../services/aiService';

const prisma = new PrismaClient();

class ReviewController {
  getReviews = async (req: AuthRequest, res: Response) => {
    try {
      // Mock data for Phase 3 UI Integration
      const reviews = [
        {
          id: 'mock-review-1',
          businessProfileId: 'mock-gbp-1',
          reviewerName: 'John Doe',
          rating: 5,
          comment: 'Excellent service! Highly recommend Sharma Dental Clinic.',
          reviewTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          isReplied: false,
          replyStatus: 'PENDING',
          businessProfile: { name: 'Sharma Dental Clinic' }
        },
        {
          id: 'mock-review-2',
          businessProfileId: 'mock-gbp-1',
          reviewerName: 'Alice Smith',
          rating: 3,
          comment: 'Good experience, but the wait time was a bit long.',
          reviewTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          isReplied: false,
          replyStatus: 'PENDING',
          businessProfile: { name: 'Sharma Dental Clinic' }
        },
        {
          id: 'mock-review-3',
          businessProfileId: 'mock-gbp-1',
          reviewerName: 'Mike Johnson',
          rating: 1,
          comment: 'Terrible customer support. Will not visit again.',
          reviewTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          isReplied: true,
          reply: 'We are very sorry to hear about your experience. Please reach out to us at support@sharmadental.com so we can make this right.',
          replyUpdatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          replyStatus: 'PUBLISHED',
          businessProfile: { name: 'Sharma Dental Clinic' }
        }
      ];

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

      // Mock for Phase 3 UI Integration
      res.json({
        id,
        reply,
        replyUpdatedAt: new Date(),
        isReplied: true,
        replyStatus: 'PUBLISHED'
      });
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

      // Mock for Phase 3 UI Integration
      res.json({ message: 'Reply deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete reply' });
    }
  };

  generateAIReply = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { tone, reviewText, rating } = req.body;

      // In a real app we'd fetch this from the DB using the ID, but for Phase 3 we take it from the body
      if (!reviewText) {
        return res.status(400).json({ error: 'Review text is required for AI generation' });
      }

      const aiReply = await generateAIReply({
        review: reviewText,
        rating: rating || 5,
        tone: tone || 'professional',
        businessName: 'Sharma Dental Clinic'
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
