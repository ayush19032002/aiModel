import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

// Local Auth
router.post('/login', authController.login);
router.post('/register', authController.register);

// Google OAuth
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

// Refresh token
router.post('/refresh', authController.refreshToken);

// Logout
router.post('/logout', authController.logout);

// 2FA
router.post('/2fa/enable', authController.enable2FA);
router.post('/2fa/verify', authController.verify2FA);
router.post('/2fa/disable', authController.disable2FA);

export default router;
