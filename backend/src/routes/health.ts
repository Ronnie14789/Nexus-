import { Router, Request, Response } from 'express';
import { getDatabaseStatus } from '../config/database';
import { contactStore } from '../services/contactStore';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: API health check
 *     responses:
 *       200:
 *         description: API is running
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
  });
});

export default router;
