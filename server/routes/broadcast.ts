import { Router } from 'express';
import { BroadcastController } from '../controllers/broadcastController';

const router = Router();
const broadcastController = new BroadcastController();

router.get('/', broadcastController.getBroadcasts);
router.get('/:id', broadcastController.getBroadcast);
router.post('/', broadcastController.createBroadcast);
router.put('/:id', broadcastController.updateBroadcast);
router.delete('/:id', broadcastController.deleteBroadcast);
router.post('/:id/send', broadcastController.sendBroadcast);
router.get('/:id/report', broadcastController.getBroadcastReport);

export default router;
