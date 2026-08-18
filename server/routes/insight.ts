import { Router } from 'express';
import { InsightController } from '../controllers/insightController';

const router = Router();
const insightController = new InsightController();

router.get('/', insightController.getInsights);
router.get('/dashboard', insightController.getDashboardData);
router.get('/competitor', insightController.getCompetitorComparison);
router.post('/sync', insightController.syncInsights);

export default router;
