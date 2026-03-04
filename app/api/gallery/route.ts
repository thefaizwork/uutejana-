import { NextResponse } from 'next/server';
import { getGalleryBatches, addGalleryBatch } from '@/lib/gallery';

// GET /api/gallery — returns all gallery batches
export async function GET() {
  const batches = getGalleryBatches();
  return NextResponse.json(batches);
}

// POST /api/gallery — creates a new gallery batch
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { batchName, year, members, image } = body;

    if (!batchName || !year || !image) {
      return NextResponse.json(
        { error: 'All fields (batchName, year, image) are required. members is optional.' },
        { status: 400 }
      );
    }

    const newBatch = addGalleryBatch({
      batchName,
      year,
      members: typeof members === 'number' ? members : 0,
      image,
    });
    return NextResponse.json(newBatch, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
