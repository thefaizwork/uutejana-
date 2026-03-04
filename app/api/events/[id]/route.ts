import { NextResponse } from 'next/server';
import { deleteEvent } from '@/lib/events';

// DELETE /api/events/[id] — removes an event by id
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }

  const success = deleteEvent(numericId);

  if (!success) {
    return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
