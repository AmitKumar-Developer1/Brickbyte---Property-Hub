import Stats from '../models/statsModel.js';
import mongoose from 'mongoose';

export const trackAPIStats = async (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', async () => {
    try {
      if (req.path === '/' || req.path === '/status' || req.path.startsWith('/health')) {
        return;
      }

      if (mongoose.connection.readyState !== 1) {
        return;
      }

      // Skip tracking for OPTIONS and HEAD requests
      if (!['OPTIONS', 'HEAD'].includes(req.method)) {
        const duration = Date.now() - start;
        await Stats.create({
          endpoint: req.originalUrl,
          method: req.method,
          responseTime: duration,
          statusCode: res.statusCode
        });
      }
    } catch (error) {
      // Log error but don't crash the app
      console.error('Error tracking API stats:', error);
    }
  });
  
  next();
};
