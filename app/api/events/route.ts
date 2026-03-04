import { NextResponse } from 'next/server';
import { getEvents, addEvent } from '@/lib/events';

// GET /api/events — returns all events
export async function GET() {
  const events = getEvents();
  return NextResponse.json(events);
}

// POST /api/events — creates a new event
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, date, shortDescription, coverImage } = body;

    if (!title || !date || !shortDescription || !coverImage) {
      return NextResponse.json(
        { error: 'All fields (title, date, shortDescription, coverImage) are required.' },
        { status: 400 }
      );
    }

    const newEvent = addEvent({ title, date, shortDescription, coverImage });
    return NextResponse.json(newEvent, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
