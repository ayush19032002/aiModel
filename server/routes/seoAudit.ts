import { Router } from 'express';
import { SeoAuditController } from '../controllers/seoAuditController';

const router = Router();
const seoAuditController = new SeoAuditController();

router.post('/', seoAuditController.createAudit);
router.get('/', seoAuditController.getAudits);
router.get('/:id', seoAuditController.getAudit);
router.get('/:id/report', seoAuditController.generateReport);

export default router;
