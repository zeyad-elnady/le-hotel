import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, admin_notes, reviewed_by } = body;

    const existing = await query("SELECT * FROM point_redemptions WHERE id = $1", [id]);
    if (existing.length === 0) {
      return NextResponse.json({ error: "Redemption request not found" }, { status: 404 });
    }

    const redemption = existing[0];
    if (redemption.status !== "pending") {
      return NextResponse.json({ error: "Only pending requests can be reviewed." }, { status: 400 });
    }

    const updated = await query(
      `
      UPDATE point_redemptions
      SET 
        status = $1,
        admin_notes = COALESCE($2, admin_notes),
        reviewed_by = $3,
        reviewed_at = NOW()
      WHERE id = $4
      RETURNING *
      `,
      [status, admin_notes || null, reviewed_by || null, id]
    );

    // If approved, deduct points from ledger with a negative value!
    if (status === "approved") {
      await query(
        `
        INSERT INTO gr_points_ledger (employee_id, points, reason)
        VALUES ($1, $2, $3)
        `,
        [redemption.employee_id, -redemption.points_amount, `Cashout approved ($${redemption.cash_amount})`]
      );
    }

    return NextResponse.json({ success: true, redemption: updated[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update redemption" }, { status: 500 });
  }
}
