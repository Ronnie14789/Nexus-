import crypto from 'crypto';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { generalLimiter } from './middleware/rateLimiter';
import { errorHandler, notFound } from './middleware/errorHandler';
import { monitoringMiddleware } from './middleware/monitoring';
import { initSentry, sentryErrorHandler } from './config/sentry';
import { logger } from './utils/logger';
import { contactStore } from './services/contactStore';

import contactRoutes from './routes/contact';
import newsletterRoutes from './routes/newsletter';
import blogRoutes from './routes/blog';
import projectRoutes from './routes/projects';
import testimonialRoutes from './routes/testimonials';
import uploadRoutes from './routes/upload';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import analyticsRoutes from './routes/analytics';

const createApp = (): Application => {
  const app = express();

  initSentry(app);

  app.set('trust proxy', 1);

  app.use((req, res, next) => {
    const incomingId = req.get('X-Request-ID');
    const requestId = incomingId && incomingId.length <= 100 ? incomingId : crypto.randomUUID();
    res.locals['requestId'] = requestId;
    res.setHeader('X-Request-ID', requestId);
    next();
  });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
          scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com'],
          imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com', 'https://www.google-analytics.com'],
          connectSrc: ["'self'", 'https://www.google-analytics.com', 'https://*.ingest.sentry.io'],
        },
      },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    })
  );

  const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:3000').split(',');
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  app.use(
    morgan('combined', {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  );

  app.use('/api', generalLimiter);
  if (process.env.ENABLE_PERFORMANCE_MONITORING !== 'false') {
    app.use('/api', monitoringMiddleware);
  }

  app.get('/api/health', (_req, res) => {
    const dbReadyState = mongoose.connection.readyState;
    const dbStateLabels: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };
    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      database: dbStateLabels[dbReadyState] ?? 'unknown',
      contactStorage: contactStore.storageMode(),
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/newsletter', newsletterRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/testimonials', testimonialRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/analytics', analyticsRoutes);

  const staticFrontendDir = process.env.STATIC_FRONTEND_DIR;
  if (staticFrontendDir && fs.existsSync(staticFrontendDir)) {
    app.use(
      express.static(staticFrontendDir, {
        index: false,
        maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
      })
    );

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        next();
        return;
      }
      res.sendFile(path.join(staticFrontendDir, 'index.html'));
    });
  }

  app.use(notFound);
  sentryErrorHandler(app);
  app.use(errorHandler);

  return app;
};

export default createApp;
