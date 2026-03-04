import fs from 'fs';
import path from 'path';

// TYPE DEFINITION
export interface AboutCard {
  id: number;
  category: string;
  title: string;
  image: string;
}

// File path to the JSON data store
const DATA_PATH = path.join(process.cwd(), 'data', 'about-cards.json');

// READ: returns all cards from the JSON file
export function getAboutCards(): AboutCard[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw) as AboutCard[];
  } catch (_e) {
    return [];
  }
}

// ADD: appends a new card and persists to file
export function addAboutCard(card: Omit<AboutCard, 'id'>): AboutCard {
  const cards = getAboutCards();
  const newCard: AboutCard = {
    id: Date.now(),
    category: card.category.trim(),
    title: card.title.trim(),
    image: card.image.trim(),
  };
  cards.push(newCard);
  fs.writeFileSync(DATA_PATH, JSON.stringify(cards, null, 2), 'utf-8');
  return newCard;
}

// DELETE: removes a card by id and persists to file
export function deleteAboutCard(id: number): boolean {
  const cards = getAboutCards();
  const filtered = cards.filter((c) => c.id !== id);
  if (filtered.length === cards.length) return false;
  fs.writeFileSync(DATA_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}
