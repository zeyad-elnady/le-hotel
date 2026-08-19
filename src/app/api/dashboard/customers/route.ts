import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/dashboard/customers - Fetch all CRM customers
export async function GET() {
  try {
    const rows = await query(
      `SELECT * FROM customers ORDER BY created_at DESC`
    );
    return NextResponse.json({ success: true, customers: rows });
  } catch (err: any) {
    console.error("Error fetching customers:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST /api/dashboard/customers - Create a new CRM customer
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, phone_number, national_id, email, notes } = body;

    if (!full_name || !phone_number) {
      return NextResponse.json(
        { error: "Customer full name and unique phone number are required" },
        { status: 400 }
      );
    }

    // Insert or update customer on unique phone conflict
    const rows = await query(
      `INSERT INTO customers (full_name, phone_number, national_id, email, notes)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (phone_number) DO UPDATE
       SET full_name = EXCLUDED.full_name,
           national_id = COALESCE(EXCLUDED.national_id, customers.national_id),
           email = COALESCE(EXCLUDED.email, customers.email),
           notes = CASE 
                     WHEN EXCLUDED.notes IS NOT NULL AND EXCLUDED.notes <> '' 
                     THEN COALESCE(customers.notes || E'\n' || EXCLUDED.notes, EXCLUDED.notes)
                     ELSE customers.notes 
                   END,
           updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [
        full_name,
        phone_number.trim(),
        national_id || null,
        email || null,
        notes || null,
      ]
    );

    return NextResponse.json({ success: true, customer: rows[0] });
  } catch (err: any) {
    console.error("Error creating customer:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create customer" },
      { status: 500 }
    );
  }
}
