import { Router } from 'express';
import { WebsiteController } from '../controllers/websiteController';

const router = Router();
const websiteController = new WebsiteController();

router.post('/publish', websiteController.publishWebsite);

export default router;
