-- ============================================================================
-- LE HOTEL — Seed Data with Room Occupancy Tracker Rooms & Multi-Channel Bookings
-- ============================================================================

-- 1. Employees
INSERT INTO employees (id, full_name, email, phone, password_hash, role)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Zeyad Admin', 'admin@lehotel.com', '+201000000001', '$2b$10$ep/0kEw1Xq1q1q1q1q1q1ue8j1gW6Q8l3fN4a9f9g.SAMPLEHASH', 'admin'),
  ('22222222-2222-2222-2222-222222222222', 'Sara Data Entry', 'dataentry@lehotel.com', '+201000000002', '$2b$10$ep/0kEw1Xq1q1q1q1q1q1ue8j1gW6Q8l3fN4a9f9g.SAMPLEHASH', 'data_entry'),
  ('33333333-3333-3333-3333-333333333333', 'Ahmed Guest Relation', 'gr@lehotel.com', '+201000000003', '$2b$10$ep/0kEw1Xq1q1q1q1q1q1ue8j1gW6Q8l3fN4a9f9g.SAMPLEHASH', 'guest_relation')
ON CONFLICT (email) DO NOTHING;

-- 2. Rooms matching the 10 Hotel Room Occupancy Tracker Types
INSERT INTO rooms (id, room_number, room_type, floor, max_occupancy, base_price, description)
VALUES
  ('44444444-4444-4444-4444-444444444441', '101', 'High Deluxe', 1, 2, 290.00, 'Premium high deluxe suite with private balcony.'),
  ('44444444-4444-4444-4444-444444444442', '102', 'Amazing', 1, 2, 340.00, 'Amazing panoramic ocean view suite.'),
  ('44444444-4444-4444-4444-444444444443', '201', 'Elite', 2, 3, 420.00, 'Elite executive suite with private lounge.'),
  ('44444444-4444-4444-4444-444444444404', '202', 'Royal', 2, 4, 550.00, 'Royal luxury master suite with jacuzzi.'),
  ('44444444-4444-4444-4444-444444444405', '301', 'Private', 3, 2, 480.00, 'Private secluded suite with garden terrace.'),
  ('44444444-4444-4444-4444-444444444406', '302', 'Special', 3, 3, 390.00, 'Special corner suite with sunset view.'),
  ('44444444-4444-4444-4444-444444444407', '401', 'Ideal', 4, 2, 320.00, 'Ideal comfort room with bespoke amenities.'),
  ('44444444-4444-4444-4444-444444444408', '501', 'Royal Villa', 5, 6, 950.00, 'Exclusive two-story private royal villa with plunge pool.'),
  ('44444444-4444-4444-4444-444444444409', '601', 'Luxurious', 6, 4, 780.00, 'Luxurious penthouse with 360-degree city & sea views.'),
  ('44444444-4444-4444-4444-444444444410', '602', 'Fancy', 6, 2, 410.00, 'Fancy boutique designer suite.')
ON CONFLICT (room_number) DO UPDATE SET room_type = EXCLUDED.room_type, base_price = EXCLUDED.base_price;

-- 3. Customers
INSERT INTO customers (id, full_name, phone_number, national_id, email, notes)
VALUES
  ('55555555-5555-5555-5555-555555555551', 'Eleanor Vance', '+14155552671', 'US987654321', 'eleanor@example.com', 'VIP guest. Prefers high floor.'),
  ('55555555-5555-5555-5555-555555555552', 'Karim El-Sayed', '+201122334455', 'EGY29001011234567', 'karim@example.com', 'Frequent business traveler.'),
  ('55555555-5555-5555-5555-555555555553', 'Sophie Martin', '+33612345678', 'FR554433221', 'sophie@example.com', 'Anniversary stay.'),
  ('55555555-5555-5555-5555-555555555554', 'Tariq Mansoor', '+971501234567', 'UAE784199012345', 'tariq@example.com', 'Family holiday.')
ON CONFLICT (phone_number) DO NOTHING;

-- 4. Sample Bookings for Current Month across Channels:
-- Airbnb (Red), Booking.com (Blue), Website (Brown), Front Desk (White)
INSERT INTO bookings (
  id, customer_id, room_id, guest_relation_id, created_by, source, status, check_in_date, check_out_date, num_guests, total_price, external_ref, booking_notes
)
VALUES
  -- Airbnb (Red) on High Deluxe (11 to 14)
  (
    '66666666-6666-6666-6666-666666666601',
    '55555555-5555-5555-5555-555555555551',
    '44444444-4444-4444-4444-444444444441',
    '33333333-3333-3333-3333-333333333333',
    '22222222-2222-2222-2222-222222222222',
    'airbnb',
    'confirmed',
    '2026-08-11',
    '2026-08-14',
    2,
    870.00,
    'AB-992144',
    'Airbnb guest: High Deluxe stay'
  ),
  -- Booking.com (Blue) on Amazing (18 to 24)
  (
    '66666666-6666-6666-6666-666666666602',
    '55555555-5555-5555-5555-555555555552',
    '44444444-4444-4444-4444-444444444442',
    '33333333-3333-3333-3333-333333333333',
    '22222222-2222-2222-2222-222222222222',
    'booking_com',
    'confirmed',
    '2026-08-18',
    '2026-08-24',
    2,
    2040.00,
    'BK-771920',
    'Booking.com Genius guest'
  ),
  -- Website Direct (Brown) on Elite (Long Stay: 6 to 17)
  (
    '66666666-6666-6666-6666-666666666603',
    '55555555-5555-5555-5555-555555555553',
    '44444444-4444-4444-4444-444444444443',
    '33333333-3333-3333-3333-333333333333',
    NULL,
    'website',
    'confirmed',
    '2026-08-06',
    '2026-08-17',
    3,
    4620.00,
    'DIR-202608',
    'Direct site booking: Elite Suite'
  ),
  -- Front Desk (White) on Royal (6 to 9)
  (
    '66666666-6666-6666-6666-666666666604',
    '55555555-5555-5555-5555-555555555554',
    '44444444-4444-4444-4444-444444444404',
    '33333333-3333-3333-3333-333333333333',
    '22222222-2222-2222-2222-222222222222',
    'front_desk',
    'checked_out',
    '2026-08-06',
    '2026-08-09',
    2,
    1650.00,
    'FD-10492',
    'Walk-in booking via front desk'
  ),
  -- Airbnb (Red) on Private (7 to 9)
  (
    '66666666-6666-6666-6666-666666666605',
    '55555555-5555-5555-5555-555555555551',
    '44444444-4444-4444-4444-444444444405',
    '33333333-3333-3333-3333-333333333333',
    '22222222-2222-2222-2222-222222222222',
    'airbnb',
    'checked_out',
    '2026-08-07',
    '2026-08-09',
    2,
    960.00,
    'AB-883311',
    'Airbnb weekend getaway'
  ),
  -- Booking.com (Blue) on Royal (20 to 24)
  (
    '66666666-6666-6666-6666-666666666606',
    '55555555-5555-5555-5555-555555555552',
    '44444444-4444-4444-4444-444444444404',
    '33333333-3333-3333-3333-333333333333',
    '22222222-2222-2222-2222-222222222222',
    'booking_com',
    'confirmed',
    '2026-08-20',
    '2026-08-24',
    2,
    2200.00,
    'BK-339900',
    'Booking.com executive stay'
  ),
  -- Website Direct (Brown) on High Deluxe (6 to 10)
  (
    '66666666-6666-6666-6666-666666666607',
    '55555555-5555-5555-5555-555555555553',
    '44444444-4444-4444-4444-444444444441',
    '33333333-3333-3333-3333-333333333333',
    NULL,
    'website',
    'checked_out',
    '2026-08-06',
    '2026-08-10',
    2,
    1160.00,
    'DIR-887711',
    'Direct website stay'
  )
ON CONFLICT (id) DO NOTHING;
