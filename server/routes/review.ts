import { Router } from 'express';
import { ReviewController } from '../controllers/reviewController';

const router = Router();
const reviewController = new ReviewController();

router.get('/', reviewController.getReviews);
router.get('/:id', reviewController.getReview);
router.post('/:id/reply', reviewController.replyToReview);
router.put('/:id/reply', reviewController.updateReply);
router.delete('/:id/reply', reviewController.deleteReply);
router.post('/:id/ai-reply', reviewController.generateAIReply);
router.post('/sync', reviewController.syncReviews);
router.get('/export/csv', reviewController.exportReviews);

export default router;
