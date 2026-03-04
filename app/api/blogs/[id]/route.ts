import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// DELETE /api/blogs/[id] — delete a blog by MongoDB _id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/blogs/[id] error:', err);
    return NextResponse.json({ error: 'Failed to delete blog.' }, { status: 500 });
  }
}
