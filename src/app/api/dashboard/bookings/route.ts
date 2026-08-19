import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer_name,
      customer_phone,
      customer_national_id,
      customer_email,
      customer_notes,
      room_id,
      source = "front_desk",
      status = "confirmed",
      check_in_date,
      check_out_date,
      num_guests = 1,
      total_price = 0,
      external_ref,
      booking_notes,
      payment_method = "cash",
      guest_relation_id,
      created_by,
    } = body;

    if (!customer_phone || !customer_name || !check_in_date || !check_out_date) {
      return NextResponse.json(
        { error: "Customer name, phone number, check-in and check-out dates are required." },
        { status: 400 }
      );
    }

    // 1. Upsert Customer by unique phone_number
    const customerRes = await query(
      `
      INSERT INTO customers (full_name, phone_number, national_id, email, notes)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (phone_number) 
      DO UPDATE SET 
        full_name = EXCLUDED.full_name,
        national_id = COALESCE(EXCLUDED.national_id, customers.national_id),
        email = COALESCE(EXCLUDED.email, customers.email),
        notes = CASE 
          WHEN EXCLUDED.notes IS NOT NULL AND EXCLUDED.notes != '' 
          THEN CONCAT(COALESCE(customers.notes, ''), ' | ', EXCLUDED.notes)
          ELSE customers.notes
        END,
        updated_at = NOW()
      RETURNING id, full_name, phone_number
      `,
      [customer_name, customer_phone, customer_national_id || null, customer_email || null, customer_notes || null]
    );

    const customerId = customerRes[0].id;

    // 2. Insert Booking
    const bookingRes = await query(
      `
      INSERT INTO bookings (
        customer_id, room_id, guest_relation_id, created_by,
        source, status, check_in_date, check_out_date, num_guests,
        total_price, external_ref, booking_notes, payment_method,
        paid_at, confirmed_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
      `,
      [
        customerId,
        room_id || null,
        guest_relation_id || null,
        created_by || null,
        source,
        status,
        check_in_date,
        check_out_date,
        num_guests,
        total_price,
        external_ref || null,
        booking_notes || null,
        payment_method,
        status === "paid" || status === "checked_in" || status === "checked_out" ? new Date() : null,
        status !== "pending" ? new Date() : null,
      ]
    );

    return NextResponse.json({ success: true, booking: bookingRes[0] });
  } catch (error: any) {
    console.error("Failed to create booking:", error);
    return NextResponse.json({ error: error.message || "Failed to create booking" }, { status: 500 });
  }
}
