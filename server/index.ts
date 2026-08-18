import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import winston from 'winston';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import googleRoutes from './routes/google';
import businessProfileRoutes from './routes/businessProfile';
import reviewRoutes from './routes/review';
import postRoutes from './routes/post';
import insightRoutes from './routes/insight';
import seoAuditRoutes from './routes/seoAudit';
import aiRoutes from './routes/ai';
import whatsappRoutes from './routes/whatsapp';
import contactRoutes from './routes/contact';
import broadcastRoutes from './routes/broadcast';
import automationRoutes from './routes/automation';
import appointmentRoutes from './routes/appointment';
import crmRoutes from './routes/crm';
import billingRoutes from './routes/billing';
import adminRoutes from './routes/admin';
import webhookRoutes from './routes/webhook';
import websiteRoutes from './routes/website';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { authenticate } from './middleware/authenticate';
import { authorize } from './middleware/authorize';

// Load environment variables
dotenv.config();

// Initialize logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Create Express app
const app: Application = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  }
});

// Make io accessible globally
app.set('io', io);

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('join-room', (room: string) => {
    socket.join(room);
    logger.info(`Socket ${socket.id} joined room: ${room}`);
  });

  socket.on('leave-room', (room: string) => {
    socket.leave(room);
    logger.info(`Socket ${socket.id} left room: ${room}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authenticate, userRoutes);
app.use('/api/google', authenticate, googleRoutes);
app.use('/api/business-profiles', authenticate, businessProfileRoutes);
app.use('/api/reviews', authenticate, reviewRoutes);
app.use('/api/posts', authenticate, postRoutes);
app.use('/api/insights', authenticate, insightRoutes);
app.use('/api/seo-audit', authenticate, seoAuditRoutes);
app.use('/api/ai', authenticate, aiRoutes);
app.use('/api/whatsapp', authenticate, whatsappRoutes);
app.use('/api/contacts', authenticate, contactRoutes);
app.use('/api/broadcasts', authenticate, broadcastRoutes);
app.use('/api/automation', authenticate, automationRoutes);
app.use('/api/appointments', authenticate, appointmentRoutes);
app.use('/api/crm', authenticate, crmRoutes);
app.use('/api/billing', authenticate, billingRoutes);
app.use('/api/admin', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), adminRoutes);
app.use('/api/website', authenticate, websiteRoutes);

// Webhook routes (no auth required)
app.use('/webhooks', webhookRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  httpServer.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  httpServer.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export default app;
