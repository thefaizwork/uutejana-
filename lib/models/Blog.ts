import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content: string[];
  featured: boolean;
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title:    { type: String, required: true, trim: true },
    author:   { type: String, required: true, trim: true },
    date:     { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    excerpt:  { type: String, required: true, trim: true },
    image:    { type: String, required: true, trim: true },
    content:  { type: [String], required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent model re-compilation in Next.js hot-reload
const Blog: Model<IBlog> =
  (mongoose.models.Blog as Model<IBlog>) ||
  mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
