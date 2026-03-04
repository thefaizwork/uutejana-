import fs from "fs";
import path from "path";

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const DATA_PATH = path.join(process.cwd(), "data", "projects.json");

function read(): ProjectItem[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function write(items: ProjectItem[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export function getProjects(): ProjectItem[] {
  return read();
}

export function addProject(data: { title: string; description: string; image: string }): ProjectItem {
  const items = read();
  const newItem: ProjectItem = { id: Date.now(), ...data };
  items.push(newItem);
  write(items);
  return newItem;
}

export function deleteProject(id: number): boolean {
  const items = read();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  items.splice(idx, 1);
  write(items);
  return true;
}
