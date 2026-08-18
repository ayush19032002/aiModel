import { Router } from 'express';
import { CRMController } from '../controllers/crmController';

const router = Router();
const crmController = new CRMController();

// Leads
router.get('/leads', crmController.getLeads);
router.get('/leads/:id', crmController.getLead);
router.post('/leads', crmController.createLead);
router.put('/leads/:id', crmController.updateLead);
router.delete('/leads/:id', crmController.deleteLead);
router.put('/leads/:id/stage', crmController.updateLeadStage);

// Customers
router.get('/customers', crmController.getCustomers);

// Tasks
router.get('/tasks', crmController.getTasks);
router.get('/tasks/:id', crmController.getTask);
router.post('/tasks', crmController.createTask);
router.put('/tasks/:id', crmController.updateTask);
router.delete('/tasks/:id', crmController.deleteTask);

// Notes
router.get('/notes', crmController.getNotes);
router.post('/notes', crmController.createNote);
router.put('/notes/:id', crmController.updateNote);
router.delete('/notes/:id', crmController.deleteNote);

// Activities
router.get('/activities', crmController.getActivities);

// Pipeline
router.get('/pipeline', crmController.getPipeline);

export default router;
