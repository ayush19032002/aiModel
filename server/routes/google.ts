import { Router } from 'express';
import { GoogleController } from '../controllers/googleController';

const router = Router();
const googleController = new GoogleController();

// Account management
router.get('/accounts', googleController.getAccounts);
router.post('/accounts/connect', googleController.connectAccount);
router.delete('/accounts/:accountId', googleController.disconnectAccount);
router.post('/accounts/:accountId/refresh', googleController.refreshAccount);

// Business profiles
router.get('/accounts/:accountId/locations', googleController.getLocations);
router.post('/accounts/:accountId/locations/:locationId/sync', googleController.syncLocation);

export default router;
