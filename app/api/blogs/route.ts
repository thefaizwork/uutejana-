import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// GET /api/blogs — return all blogs sorted newest first
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(blogs);
  } catch (err) {
    console.error('GET /api/blogs error:', err);
    return NextResponse.json({ error: 'Failed to fetch blogs.' }, { status: 500 });
  }
}

// POST /api/blogs — create a new blog
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, author, date, category, excerpt, image, content, featured } = body;

    if (!title?.trim() || !author?.trim() || !date?.trim() || !category?.trim() || !excerpt?.trim() || !image?.trim()) {
      return NextResponse.json(
        { error: 'Fields title, author, date, category, excerpt, and image are required.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(content) || content.length === 0) {
      return NextResponse.json(
        { error: 'content must be a non-empty array of paragraph strings.' },
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      title: title.trim(),
      author: author.trim(),
      date: date.trim(),
      category: category.trim(),
      excerpt: excerpt.trim(),
      image: image.trim(),
      content: content.map((p: string) => p.trim()).filter(Boolean),
      featured: Boolean(featured),
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error('POST /api/blogs error:', err);
    return NextResponse.json({ error: 'Failed to create blog.' }, { status: 500 });
  }
}
