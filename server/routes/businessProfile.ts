import { Router } from 'express';
import { BusinessProfileController } from '../controllers/businessProfileController';

const router = Router();
const businessProfileController = new BusinessProfileController();

router.get('/', businessProfileController.getBusinessProfiles);
router.get('/:id', businessProfileController.getBusinessProfile);
router.put('/:id', businessProfileController.updateBusinessProfile);
router.post('/:id/publish', businessProfileController.publishChanges);
router.post('/:id/rollback/:versionId', businessProfileController.rollbackVersion);
router.get('/:id/versions', businessProfileController.getVersionHistory);
router.delete('/:id', businessProfileController.deleteBusinessProfile);

export default router;
