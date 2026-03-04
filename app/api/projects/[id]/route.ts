import { NextResponse } from "next/server";
import { deleteProject } from "@/lib/projects";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);
  if (isNaN(numId)) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }
  const ok = deleteProject(numId);
  if (!ok) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
