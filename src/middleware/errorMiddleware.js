import { AppError } from '../utils/errorHandler.js';

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  } else {
    if (err.name === 'ValidationError') {
      err = new AppError(err.message, 400);
    }
    if (err.code === 11000) {
      err = new AppError('Duplicate field value', 400);
    }
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
};