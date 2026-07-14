import { Request, Response, Router } from 'express';
import { getDatabaseStatus } from '../config/database';
import { authenticate } from '../middleware/auth';
import { contactStore } from '../services/contactStore';
import { emailService } from '../services/emailService';

const router = Router();

/**
 * Public application health. It intentionally exposes configuration state,
 * never credentials or provider error details.
 */
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    uptime: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV ?? 'development',
    contactStorage: contactStore.storageMode(),
    database: getDatabaseStatus(),
    email: {
      configured: emailService.isConfigured(),
    },
  });
});

/**
 * Authenticated live SMTP verification for the private admin console.
 */
router.get('/email', authenticate, async (_req: Request, res: Response) => {
  const email = await emailService.verifyConnection(true);
  res.status(email.connected ? 200 : 503).json({
    success: email.connected,
    email,
  });
});

export default router;
