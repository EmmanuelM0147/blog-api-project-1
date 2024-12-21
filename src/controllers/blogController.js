import Blog from '../models/Blog.js';
import { catchAsync } from '../utils/errorHandler.js';
import { QueryBuilder } from '../utils/queryBuilder.js';

export const createBlog = catchAsync(async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    author: req.user._id
  });

  res.status(201).json(blog);
});

export const getPublishedBlogs = catchAsync(async (req, res) => {
  const queryBuilder = new QueryBuilder(Blog.find({ state: 'published' }), req.query)
    .filter()
    .sort()
    .paginate();

  const blogs = await queryBuilder.query.populate('author', 'firstName lastName email');
  const total = await Blog.countDocuments({ state: 'published' });

  res.json({
    blogs,
    page: parseInt(req.query.page) || 1,
    pages: Math.ceil(total / (parseInt(req.query.limit) || 20)),
    total
  });
});

export const getBlogById = catchAsync(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { readCount: 1 } },
    { new: true }
  ).populate('author', 'firstName lastName email');

  if (!blog) {
    throw new AppError('Blog not found', 404);
  }

  res.json(blog);
});

export const updateBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new AppError('Blog not found', 404);
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to update this blog', 403);
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedBlog);
});

export const deleteBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new AppError('Blog not found', 404);
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to delete this blog', 403);
  }

  await blog.deleteOne();
  res.json({ message: 'Blog removed' });
});

export const getUserBlogs = catchAsync(async (req, res) => {
  const queryBuilder = new QueryBuilder(Blog.find({ author: req.user._id }), req.query)
    .filter()
    .sort()
    .paginate();

  const blogs = await queryBuilder.query;
  const total = await Blog.countDocuments({ author: req.user._id });

  res.json({
    blogs,
    page: parseInt(req.query.page) || 1,
    pages: Math.ceil(total / (parseInt(req.query.limit) || 20)),
    total
  });
});