import { Router } from 'express';
import { AutomationController } from '../controllers/automationController';

const router = Router();
const automationController = new AutomationController();

router.get('/flows', automationController.getFlows);
router.get('/flows/:id', automationController.getFlow);
router.post('/flows', automationController.createFlow);
router.put('/flows/:id', automationController.updateFlow);
router.delete('/flows/:id', automationController.deleteFlow);
router.post('/flows/:id/activate', automationController.activateFlow);
router.post('/flows/:id/deactivate', automationController.deactivateFlow);
router.get('/flows/:id/executions', automationController.getFlowExecutions);

// Knowledge base
router.get('/knowledge', automationController.getKnowledgeBase);
router.post('/knowledge', automationController.addToKnowledgeBase);
router.delete('/knowledge/:id', automationController.removeFromKnowledgeBase);

export default router;
