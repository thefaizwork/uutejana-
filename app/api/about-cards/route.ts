import { NextResponse } from 'next/server';
import { getAboutCards, addAboutCard } from '@/lib/about-cards';

// GET /api/about-cards — returns all cards (used by admin panel)
export async function GET() {
  const cards = getAboutCards();
  return NextResponse.json(cards);
}

// POST /api/about-cards — adds a new card
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, title, image } = body;

    if (!category || !title || !image) {
      return NextResponse.json(
        { error: 'All fields (category, title, image) are required.' },
        { status: 400 }
      );
    }

    const newCard = addAboutCard({ category, title, image });
    return NextResponse.json(newCard, { status: 201 });
  } catch (_e) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
