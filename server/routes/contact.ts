import { Router } from 'express';
import { ContactController } from '../controllers/contactController';

const router = Router();
const contactController = new ContactController();

router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContact);
router.post('/', contactController.createContact);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);
router.post('/import', contactController.importContacts);
router.get('/export/csv', contactController.exportContacts);
router.post('/bulk-delete', contactController.bulkDelete);

export default router;
