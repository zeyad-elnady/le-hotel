import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, guest_relation_id, room_id, payment_method } = body;

    // Fetch existing booking
    const existing = await query("SELECT * FROM bookings WHERE id = $1", [id]);
    if (existing.length === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const currentBooking = existing[0];
    const newStatus = status || currentBooking.status;
    const assignedGR = guest_relation_id !== undefined ? guest_relation_id : currentBooking.guest_relation_id;
    const assignedRoom = room_id !== undefined ? room_id : currentBooking.room_id;

    // Update timestamps according to new status
    let confirmedAt = currentBooking.confirmed_at;
    let paidAt = currentBooking.paid_at;
    let checkedInAt = currentBooking.checked_in_at;
    let checkedOutAt = currentBooking.checked_out_at;
    let cancelledAt = currentBooking.cancelled_at;

    if (newStatus === "confirmed" && !confirmedAt) confirmedAt = new Date();
    if (newStatus === "paid" && !paidAt) paidAt = new Date();
    if (newStatus === "checked_in" && !checkedInAt) checkedInAt = new Date();
    if (newStatus === "checked_out" && !checkedOutAt) checkedOutAt = new Date();
    if (newStatus === "cancelled" && !cancelledAt) cancelledAt = new Date();

    const updated = await query(
      `
      UPDATE bookings
      SET 
        status = $1,
        guest_relation_id = $2,
        room_id = $3,
        payment_method = COALESCE($4, payment_method),
        confirmed_at = $5,
        paid_at = $6,
        checked_in_at = $7,
        checked_out_at = $8,
        cancelled_at = $9,
        updated_at = NOW()
      WHERE id = $10
      RETURNING *
      `,
      [
        newStatus,
        assignedGR || null,
        assignedRoom || null,
        payment_method || null,
        confirmedAt,
        paidAt,
        checkedInAt,
        checkedOutAt,
        cancelledAt,
        id,
      ]
    );

    // Business Logic: If status changed to 'checked_out' and has a GR employee, award checkout points!
    if (newStatus === "checked_out" && currentBooking.status !== "checked_out" && assignedGR) {
      // Check if review exists
      const reviews = await query("SELECT * FROM reviews WHERE booking_id = $1", [id]);
      const configRes = await query("SELECT * FROM gr_points_config ORDER BY id ASC LIMIT 1");
      const config = configRes[0] || { checkout_no_review_pts: 10, checkout_positive_pts: 50 };

      let pointsToAward = config.checkout_no_review_pts;
      let reason = "Guest checkout – standard points";
      let reviewId = null;

      if (reviews.length > 0) {
        const review = reviews[0];
        reviewId = review.id;
        if (review.sentiment === "positive") {
          pointsToAward = config.checkout_positive_pts;
          reason = "Guest checkout – positive review bonus";
        } else if (review.sentiment === "neutral") {
          pointsToAward = config.checkout_neutral_pts || 25;
          reason = "Guest checkout – neutral review";
        } else {
          pointsToAward = config.checkout_negative_pts || 0;
          reason = "Guest checkout – negative review";
        }
      }

      if (pointsToAward > 0) {
        await query(
          `
          INSERT INTO gr_points_ledger (employee_id, booking_id, review_id, points, reason)
          VALUES ($1, $2, $3, $4, $5)
          `,
          [assignedGR, id, reviewId, pointsToAward, reason]
        );
      }
    }

    return NextResponse.json({ success: true, booking: updated[0] });
  } catch (error: any) {
    console.error("Failed to update booking:", error);
    return NextResponse.json({ error: error.message || "Failed to update booking" }, { status: 500 });
  }
}
