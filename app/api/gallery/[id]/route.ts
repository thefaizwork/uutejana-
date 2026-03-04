import { NextResponse } from 'next/server';
import { deleteGalleryBatch } from '@/lib/gallery';

// DELETE /api/gallery/[id] — removes a gallery batch by id
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }

  const success = deleteGalleryBatch(numericId);

  if (!success) {
    return NextResponse.json({ error: 'Gallery batch not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
