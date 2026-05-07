import mongoose from 'mongoose';

export const requireDatabase = (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  return res.status(503).json({
    success: false,
    message: 'Database is not connected. Start MongoDB locally or set MONGO_URI to a working MongoDB server.',
    databaseState: mongoose.connection.readyState,
  });
};
