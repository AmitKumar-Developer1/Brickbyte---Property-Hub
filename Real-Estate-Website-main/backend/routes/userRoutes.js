import express from 'express';
import { login, register, forgotpassword, adminlogin, resetpassword, getname, verifyEmail } from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { registrationLimiter, loginLimiter, passwordResetLimiter } from '../middleware/rateLimitMiddleware.js';
import { requireDatabase } from '../middleware/databaseMiddleware.js';


const userrouter = express.Router();

userrouter.post('/login', loginLimiter, requireDatabase, login);
userrouter.post('/register', registrationLimiter, requireDatabase, register);
userrouter.get('/verify/:token', requireDatabase, verifyEmail);  // Email verification endpoint
userrouter.post('/forgot', passwordResetLimiter, requireDatabase, forgotpassword);
userrouter.post('/reset/:token', requireDatabase, resetpassword);
userrouter.post('/admin', loginLimiter, requireDatabase, adminlogin);
userrouter.get('/me', authMiddleware, requireDatabase, getname);

export default userrouter;
