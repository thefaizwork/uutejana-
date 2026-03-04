import { NextResponse } from 'next/server';
import { addBatchImage, deleteBatchImage } from '@/lib/gallery';

// POST /api/gallery/[id]/images — add an image URL to the batch's gallery
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
      return NextResponse.json(
        { error: 'imageUrl is required.' },
        { status: 400 }
      );
    }

    const updatedBatch = addBatchImage(numericId, imageUrl);

    if (!updatedBatch) {
      return NextResponse.json({ error: 'Gallery batch not found.' }, { status: 404 });
    }

    return NextResponse.json(updatedBatch);
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

// DELETE /api/gallery/[id]/images — remove an image from the batch's gallery by index
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { imageIndex } = body;

    if (typeof imageIndex !== 'number' || imageIndex < 0) {
      return NextResponse.json(
        { error: 'Valid imageIndex is required.' },
        { status: 400 }
      );
    }

    const updatedBatch = deleteBatchImage(numericId, imageIndex);

    if (!updatedBatch) {
      return NextResponse.json({ error: 'Gallery batch not found or invalid image index.' }, { status: 404 });
    }

    return NextResponse.json(updatedBatch);
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
