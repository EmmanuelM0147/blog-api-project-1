import Joi from 'joi';

export const signupSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'string.empty': 'First name is required',
    'any.required': 'First name is required'
  }),
  lastName: Joi.string().trim().required().messages({
    'string.empty': 'Last name is required',
    'any.required': 'Last name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});