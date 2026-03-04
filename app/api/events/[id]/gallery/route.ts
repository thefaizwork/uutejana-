import { NextResponse } from 'next/server';
import { addEventImage, deleteEventImage } from '@/lib/events';

// POST /api/events/[id]/gallery — add an image URL to the event's gallery
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

    const updatedEvent = addEventImage(numericId, imageUrl);

    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
    }

    return NextResponse.json(updatedEvent);
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

// DELETE /api/events/[id]/gallery — remove an image from the event's gallery by index
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

    const updatedEvent = deleteEventImage(numericId, imageIndex);

    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found or invalid image index.' }, { status: 404 });
    }

    return NextResponse.json(updatedEvent);
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
