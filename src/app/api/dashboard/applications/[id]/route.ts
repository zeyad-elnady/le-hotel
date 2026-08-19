import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, admin_notes, reviewed_by } = body;

    const updated = await query(
      `
      UPDATE job_applications
      SET 
        status = $1,
        admin_notes = COALESCE($2, admin_notes),
        reviewed_by = $3,
        reviewed_at = NOW(),
        updated_at = NOW()
      WHERE id = $4
      RETURNING *
      `,
      [status, admin_notes || null, reviewed_by || null, id]
    );

    if (updated.length === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, application: updated[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update application" }, { status: 500 });
  }
}
