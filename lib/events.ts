import fs from 'fs';
import path from 'path';

// TYPE DEFINITION
export interface EventItem {
  id: number;
  title: string;
  date: string;
  shortDescription: string;
  coverImage: string;
  gallery: string[];
}

// File path to the JSON data store
const DATA_PATH = path.join(process.cwd(), 'data', 'events.json');

// READ: returns all events from the JSON file
export function getEvents(): EventItem[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw) as EventItem[];
  } catch {
    return [];
  }
}

// Helper: persist events array to file
function saveEvents(events: EventItem[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(events, null, 2), 'utf-8');
}

// ADD: creates a new event and persists to file
export function addEvent(event: Omit<EventItem, 'id' | 'gallery'>): EventItem {
  const events = getEvents();
  const newEvent: EventItem = {
    id: Date.now(),
    title: event.title.trim(),
    date: event.date.trim(),
    shortDescription: event.shortDescription.trim(),
    coverImage: event.coverImage.trim(),
    gallery: [],
  };
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
}

// DELETE: removes an event by id
export function deleteEvent(id: number): boolean {
  const events = getEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length === events.length) return false;
  saveEvents(filtered);
  return true;
}

// ADD IMAGE: push an image URL to an event's gallery
export function addEventImage(eventId: number, imageUrl: string): EventItem | null {
  const events = getEvents();
  const event = events.find((e) => e.id === eventId);
  if (!event) return null;
  event.gallery.push(imageUrl.trim());
  saveEvents(events);
  return event;
}

// DELETE IMAGE: remove an image from an event's gallery by index
export function deleteEventImage(eventId: number, imageIndex: number): EventItem | null {
  const events = getEvents();
  const event = events.find((e) => e.id === eventId);
  if (!event) return null;
  if (imageIndex < 0 || imageIndex >= event.gallery.length) return null;
  event.gallery.splice(imageIndex, 1);
  saveEvents(events);
  return event;
}
