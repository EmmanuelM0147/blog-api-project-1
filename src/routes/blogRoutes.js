import express from 'express';
import { protect } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createBlogSchema, updateBlogSchema } from '../validation/blogValidation.js';
import {
  createBlog,
  getPublishedBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getUserBlogs
} from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getPublishedBlogs);
router.get('/:id', getBlogById);

router.use(protect);
router.post('/', validateRequest(createBlogSchema), createBlog);
router.put('/:id', validateRequest(updateBlogSchema), updateBlog);
router.delete('/:id', deleteBlog);
router.get('/user/blogs', getUserBlogs);

export default router;