import mongoose from 'mongoose';
import readingTime from 'reading-time';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  body: {
    type: String,
    required: [true, 'Blog body is required']
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  state: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  readCount: {
    type: Number,
    default: 0
  },
  readingTime: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

blogSchema.pre('save', function(next) {
  if (this.isModified('body')) {
    const stats = readingTime(this.body);
    this.readingTime = Math.ceil(stats.minutes);
  }
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;