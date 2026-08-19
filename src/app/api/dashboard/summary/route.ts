import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // 1. Check DB health & fetch stats
    const [
      employees,
      customers,
      rooms,
      bookings,
      grBalances,
      redemptions,
      applications,
      reviews,
    ] = await Promise.all([
      query("SELECT id, full_name, email, role, phone, is_active FROM employees ORDER BY full_name ASC"),
      query("SELECT id, full_name, phone_number, national_id, email, notes, created_at FROM customers ORDER BY created_at DESC"),
      query("SELECT id, room_number, room_type, floor, max_occupancy, base_price, is_active FROM rooms ORDER BY room_number ASC"),
      query(`
        SELECT 
          b.id, b.source, b.status, b.check_in_date, b.check_out_date, b.num_guests, b.total_price,
          b.external_ref, b.booking_notes, b.payment_method, b.created_at,
          c.id AS customer_id, c.full_name AS customer_name, c.phone_number AS customer_phone, c.national_id AS customer_national_id, c.notes AS customer_notes,
          r.id AS room_id, r.room_number, r.room_type,
          gr.id AS gr_id, gr.full_name AS gr_name,
          cb.id AS created_by_id, cb.full_name AS created_by_name
        FROM bookings b
        LEFT JOIN customers c ON c.id = b.customer_id
        LEFT JOIN rooms r ON r.id = b.room_id
        LEFT JOIN employees gr ON gr.id = b.guest_relation_id
        LEFT JOIN employees cb ON cb.id = b.created_by
        ORDER BY b.created_at DESC
      `),
      query("SELECT * FROM v_gr_points_balance"),
      query(`
        SELECT pr.*, e.full_name AS employee_name, e.email AS employee_email, r.full_name AS reviewer_name
        FROM point_redemptions pr
        JOIN employees e ON e.id = pr.employee_id
        LEFT JOIN employees r ON r.id = pr.reviewed_by
        ORDER BY pr.created_at DESC
      `),
      query("SELECT * FROM job_applications ORDER BY created_at DESC"),
      query(`
        SELECT rev.*, c.full_name AS customer_name, b.id AS booking_id
        FROM reviews rev
        LEFT JOIN customers c ON c.id = rev.customer_id
        LEFT JOIN bookings b ON b.id = rev.booking_id
        ORDER BY rev.created_at DESC
      `),
    ]);

    // Calculate aggregated metrics
    const totalRevenue = bookings
      .filter((b: any) => ["paid", "checked_in", "checked_out"].includes(b.status))
      .reduce((sum: number, b: any) => sum + Number(b.total_price || 0), 0);

    const pendingBookingsCount = bookings.filter((b: any) => b.status === "pending").length;
    const activeStaysCount = bookings.filter((b: any) => b.status === "checked_in").length;
    const totalPointsAwarded = grBalances.reduce((sum: number, gr: any) => sum + Number(gr.lifetime_earned || 0), 0);

    return NextResponse.json({
      connected: true,
      data: {
        metrics: {
          totalRevenue,
          totalBookings: bookings.length,
          pendingBookingsCount,
          activeStaysCount,
          totalCustomers: customers.length,
          totalRooms: rooms.length,
          totalPointsAwarded,
          jobApplicationsCount: applications.length,
        },
        employees,
        customers,
        rooms,
        bookings,
        grBalances,
        redemptions,
        applications,
        reviews,
      },
    });
  } catch (error: any) {
    console.error("Database query failed, returning fallback data", error);
    return NextResponse.json(
      {
        connected: false,
        error: error?.message || "Failed to query database",
      },
      { status: 200 }
    );
  }
}
