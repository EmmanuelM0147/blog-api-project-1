import { verifyToken } from '../config/jwt.js';
import User from '../models/User.js';
import { AppError } from '../utils/errorHandler.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new AppError('Not authorized, no token', 401);
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new AppError('User not found', 404);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};