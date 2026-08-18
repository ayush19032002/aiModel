import { Router } from 'express';
import { AdminController } from '../controllers/adminController';

const router = Router();
const adminController = new AdminController();

// Dashboard
router.get('/dashboard', adminController.getDashboard);

// Users
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.put('/users/:id/ban', adminController.banUser);
router.put('/users/:id/unban', adminController.unbanUser);

// Plans & Subscriptions
router.post('/plans', adminController.createPlan);
router.put('/plans/:id', adminController.updatePlan);
router.delete('/plans/:id', adminController.deletePlan);
router.post('/coupons', adminController.createCoupon);

// Revenue
router.get('/revenue', adminController.getRevenue);

// API Usage
router.get('/api-usage', adminController.getApiUsage);

// Logs
router.get('/logs', adminController.getLogs);
router.get('/errors', adminController.getErrors);

// Queues
router.get('/queues', adminController.getQueues);

// Announcements
router.post('/announcements', adminController.createAnnouncement);
router.get('/announcements', adminController.getAnnouncements);

export default router;
