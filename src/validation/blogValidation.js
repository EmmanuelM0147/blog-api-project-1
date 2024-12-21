import Joi from 'joi';

export const createBlogSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required'
  }),
  description: Joi.string().trim(),
  body: Joi.string().required().messages({
    'string.empty': 'Blog body is required',
    'any.required': 'Blog body is required'
  }),
  tags: Joi.array().items(Joi.string().trim()),
  state: Joi.string().valid('draft', 'published').default('draft')
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().trim(),
  description: Joi.string().trim(),
  body: Joi.string(),
  tags: Joi.array().items(Joi.string().trim()),
  state: Joi.string().valid('draft', 'published')
}).min(1);