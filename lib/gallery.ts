import fs from 'fs';
import path from 'path';

// TYPE DEFINITION
export interface GalleryBatch {
  id: number;
  batchName: string;
  year: string;
  members: number;
  image: string;
  gallery: string[];
}

// File path to the JSON data store
const DATA_PATH = path.join(process.cwd(), 'data', 'gallery.json');

// READ: returns all gallery batches from the JSON file
export function getGalleryBatches(): GalleryBatch[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw) as GalleryBatch[];
  } catch {
    return [];
  }
}

// Helper: persist batches array to file
function saveBatches(batches: GalleryBatch[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(batches, null, 2), 'utf-8');
}

// ADD: creates a new gallery batch and persists to file
export function addGalleryBatch(
  data: Omit<GalleryBatch, 'id' | 'gallery'>
): GalleryBatch {
  const batches = getGalleryBatches();
  const newBatch: GalleryBatch = {
    id: Date.now(),
    batchName: data.batchName.trim(),
    year: data.year.trim(),
    members: data.members,
    image: data.image.trim(),
    gallery: [],
  };
  batches.push(newBatch);
  saveBatches(batches);
  return newBatch;
}

// DELETE: removes a gallery batch by id
export function deleteGalleryBatch(id: number): boolean {
  const batches = getGalleryBatches();
  const filtered = batches.filter((b) => b.id !== id);
  if (filtered.length === batches.length) return false;
  saveBatches(filtered);
  return true;
}

// ADD IMAGE: push an image URL to a batch's gallery
export function addBatchImage(batchId: number, imageUrl: string): GalleryBatch | null {
  const batches = getGalleryBatches();
  const batch = batches.find((b) => b.id === batchId);
  if (!batch) return null;
  batch.gallery.push(imageUrl.trim());
  saveBatches(batches);
  return batch;
}

// DELETE IMAGE: remove an image from a batch's gallery by index
export function deleteBatchImage(batchId: number, imageIndex: number): GalleryBatch | null {
  const batches = getGalleryBatches();
  const batch = batches.find((b) => b.id === batchId);
  if (!batch) return null;
  if (imageIndex < 0 || imageIndex >= batch.gallery.length) return null;
  batch.gallery.splice(imageIndex, 1);
  saveBatches(batches);
  return batch;
}
