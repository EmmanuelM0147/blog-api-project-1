import { AppError } from '../utils/errorHandler.js';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      throw new AppError(errorMessage, 400);
    }
    
    next();
  };
};