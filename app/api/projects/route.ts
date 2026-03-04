import { NextResponse } from "next/server";
import { getProjects, addProject } from "@/lib/projects";

export async function GET() {
  return NextResponse.json(getProjects());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, image } = body;
    if (!title?.trim() || !description?.trim() || !image?.trim()) {
      return NextResponse.json(
        { error: "All fields (title, description, image) are required." },
        { status: 400 }
      );
    }
    const created = addProject({ title: title.trim(), description: description.trim(), image: image.trim() });
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}
