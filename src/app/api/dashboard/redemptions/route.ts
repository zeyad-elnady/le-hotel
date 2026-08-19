import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { employee_id, points_amount } = body;

    if (!employee_id || !points_amount || points_amount <= 0) {
      return NextResponse.json({ error: "Valid employee ID and positive points amount required." }, { status: 400 });
    }

    // Check available balance
    const balanceRes = await query("SELECT COALESCE(SUM(points), 0) AS balance FROM gr_points_ledger WHERE employee_id = $1", [employee_id]);
    const currentBalance = Number(balanceRes[0]?.balance || 0);

    if (points_amount > currentBalance) {
      return NextResponse.json({ error: `Insufficient points. Current balance is ${currentBalance} pts.` }, { status: 400 });
    }

    const configRes = await query("SELECT points_to_currency_rate FROM gr_points_config ORDER BY id ASC LIMIT 1");
    const rate = Number(configRes[0]?.points_to_currency_rate || 1.0);
    const cashAmount = points_amount * rate;

    const insertRes = await query(
      `
      INSERT INTO point_redemptions (employee_id, points_amount, cash_amount, status)
      VALUES ($1, $2, $3, 'pending')
      RETURNING *
      `,
      [employee_id, points_amount, cashAmount]
    );

    return NextResponse.json({ success: true, redemption: insertRes[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create redemption request" }, { status: 500 });
  }
}
