import { Router } from 'express';
import { PostController } from '../controllers/postController';

const router = Router();
const postController = new PostController();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.post('/:id/publish', postController.publishPost);
router.post('/:id/schedule', postController.schedulePost);
router.post('/:id/ai-generate', postController.generateAIPost);
router.get('/:id/analytics', postController.getPostAnalytics);

export default router;
