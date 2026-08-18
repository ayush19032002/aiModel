import { Router } from 'express';
import { AIController } from '../controllers/aiController';

const router = Router();
const aiController = new AIController();

// SEO content generation
router.post('/generate', aiController.generateContent);
router.get('/generated', aiController.getGeneratedContent);
router.get('/generated/:id', aiController.getGeneratedContentById);

// AI settings
router.put('/settings', aiController.updateAISettings);

export default router;
