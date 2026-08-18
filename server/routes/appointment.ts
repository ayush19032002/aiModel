import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';

const router = Router();
const appointmentController = new AppointmentController();

router.get('/', appointmentController.getAppointments);
router.get('/:id', appointmentController.getAppointment);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);
router.post('/:id/reschedule', appointmentController.rescheduleAppointment);
router.post('/:id/cancel', appointmentController.cancelAppointment);
router.post('/:id/reminder', appointmentController.sendReminder);

export default router;
