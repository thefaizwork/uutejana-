import { NextResponse } from 'next/server';
import { deleteAboutCard } from '@/lib/about-cards';

// DELETE /api/about-cards/[id] — removes a card by id
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }

  const success = deleteAboutCard(numericId);

  if (!success) {
    return NextResponse.json({ error: 'Card not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
