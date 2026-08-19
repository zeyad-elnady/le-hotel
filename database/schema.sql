-- ============================================================================
-- LE HOTEL — PostgreSQL Database Schema
-- Dashboard: Next.js Hotel Management System
-- Version: 1.0.0
-- ============================================================================
-- Run order: ENUMs → Independent tables → Dependent tables → Indexes → Views
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- 0. EXTENSIONS
-- ────────────────────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";         -- uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";          -- gen_random_uuid() fallback


-- ════════════════════════════════════════════════════════════════════════════
-- 1. ENUM TYPES
-- ════════════════════════════════════════════════════════════════════════════

CREATE TYPE employee_role AS ENUM (
  'admin',
  'data_entry',
  'guest_relation'
);

CREATE TYPE booking_status AS ENUM (
  'pending',          -- website submission awaiting confirmation
  'confirmed',        -- admin/system confirmed, awaiting payment
  'paid',             -- payment received
  'checked_in',       -- guest has arrived
  'checked_out',      -- guest has departed (triggers GR points)
  'cancelled',        -- booking cancelled
  'no_show'           -- guest did not arrive
);

CREATE TYPE booking_source AS ENUM (
  'website',          -- direct website submission
  'front_desk',       -- walk-in / phone, entered by data_entry
  'airbnb',           -- Airbnb channel
  'booking_com'       -- Booking.com channel
);

CREATE TYPE review_source AS ENUM (
  'website',          -- left on Le Hotel website
  'airbnb',
  'booking_com',
  'google',
  'tripadvisor',
  'other'
);

CREATE TYPE review_sentiment AS ENUM (
  'positive',
  'neutral',
  'negative'
);

CREATE TYPE redemption_status AS ENUM (
  'pending',
  'approved',
  'rejected'
);

CREATE TYPE application_status AS ENUM (
  'new',
  'reviewed',
  'shortlisted',
  'interview',
  'hired',
  'rejected'
);


-- ════════════════════════════════════════════════════════════════════════════
-- 2. EMPLOYEES (users who log into the dashboard)
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE employees (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name       VARCHAR(200)    NOT NULL,
  email           VARCHAR(255)    NOT NULL UNIQUE,
  phone           VARCHAR(30),
  password_hash   VARCHAR(255)    NOT NULL,   -- bcrypt / argon2 hash
  role            employee_role   NOT NULL DEFAULT 'data_entry',
  avatar_url      TEXT,
  is_active       BOOLEAN         NOT NULL DEFAULT TRUE,
  hired_at        DATE,
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  employees IS 'All dashboard users: admins, data-entry clerks, guest-relation staff.';
COMMENT ON COLUMN employees.role IS 'admin = full access | data_entry = manual booking entry | guest_relation = assigned to bookings, earns points.';


-- ════════════════════════════════════════════════════════════════════════════
-- 3. CUSTOMERS (CRM)
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE customers (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name       VARCHAR(200)    NOT NULL,       -- duplicates allowed
  phone_number    VARCHAR(30)     NOT NULL UNIQUE, -- enforced uniqueness
  national_id     VARCHAR(50),                     -- passport / national ID
  email           VARCHAR(255),
  notes           TEXT,                            -- general CRM notes
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  customers IS 'Hotel CRM — every guest. Phone number is the unique identifier.';
COMMENT ON COLUMN customers.notes IS 'Free-text notes aggregated across visits. Per-booking notes live on the booking row.';

-- Index for fast lookups by national_id or name
CREATE INDEX idx_customers_national_id ON customers (national_id) WHERE national_id IS NOT NULL;
CREATE INDEX idx_customers_name        ON customers USING GIN (to_tsvector('simple', full_name));


-- ════════════════════════════════════════════════════════════════════════════
-- 4. ROOMS
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE rooms (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_number     VARCHAR(20)     NOT NULL UNIQUE,
  room_type       VARCHAR(60)     NOT NULL,   -- e.g. 'suite', 'deluxe', 'standard'
  floor           SMALLINT,
  max_occupancy   SMALLINT        NOT NULL DEFAULT 2,
  base_price      NUMERIC(10, 2)  NOT NULL DEFAULT 0,  -- nightly rate
  description     TEXT,
  is_active       BOOLEAN         NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE rooms IS 'Physical rooms in the hotel.';


-- ════════════════════════════════════════════════════════════════════════════
-- 5. BOOKINGS
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE bookings (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Relationships
  customer_id         UUID            NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  room_id             UUID            REFERENCES rooms(id) ON DELETE SET NULL,
  guest_relation_id   UUID            REFERENCES employees(id) ON DELETE SET NULL,
  created_by          UUID            REFERENCES employees(id) ON DELETE SET NULL,  -- who entered it

  -- Core fields
  source              booking_source  NOT NULL DEFAULT 'front_desk',
  status              booking_status  NOT NULL DEFAULT 'pending',
  check_in_date       DATE            NOT NULL,
  check_out_date      DATE            NOT NULL,
  num_guests          SMALLINT        NOT NULL DEFAULT 1,
  total_price         NUMERIC(12, 2)  NOT NULL DEFAULT 0,

  -- External reference (Airbnb/Booking.com confirmation code)
  external_ref        VARCHAR(120),

  -- Notes specific to this booking
  booking_notes       TEXT,

  -- Payment
  payment_method      VARCHAR(60),       -- 'cash', 'card', 'bank_transfer', etc.
  paid_at             TIMESTAMPTZ,

  -- Timestamps
  confirmed_at        TIMESTAMPTZ,
  checked_in_at       TIMESTAMPTZ,
  checked_out_at      TIMESTAMPTZ,
  cancelled_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT chk_dates CHECK (check_out_date > check_in_date),
  CONSTRAINT chk_guests CHECK (num_guests > 0),
  CONSTRAINT chk_price  CHECK (total_price >= 0)
);

COMMENT ON TABLE  bookings IS 'All reservations regardless of source.';
COMMENT ON COLUMN bookings.guest_relation_id IS 'The GR employee assigned to this booking. Points are awarded to them on checkout.';
COMMENT ON COLUMN bookings.created_by IS 'Employee who created the booking (data_entry for manual, NULL for website self-service).';
COMMENT ON COLUMN bookings.external_ref IS 'Airbnb/Booking.com confirmation number for cross-referencing.';

-- Indexes for common dashboard queries
CREATE INDEX idx_bookings_customer      ON bookings (customer_id);
CREATE INDEX idx_bookings_room          ON bookings (room_id);
CREATE INDEX idx_bookings_gr            ON bookings (guest_relation_id)   WHERE guest_relation_id IS NOT NULL;
CREATE INDEX idx_bookings_status        ON bookings (status);
CREATE INDEX idx_bookings_dates         ON bookings (check_in_date, check_out_date);
CREATE INDEX idx_bookings_source        ON bookings (source);
CREATE INDEX idx_bookings_created_at    ON bookings (created_at DESC);


-- ════════════════════════════════════════════════════════════════════════════
-- 6. REVIEWS
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE reviews (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id      UUID            NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id     UUID            NOT NULL REFERENCES customers(id) ON DELETE CASCADE,

  source          review_source   NOT NULL DEFAULT 'website',
  sentiment       review_sentiment NOT NULL DEFAULT 'positive',
  rating          SMALLINT,                         -- 1-5 star rating (nullable for text-only reviews)
  review_text     TEXT,
  reviewer_name   VARCHAR(200),                      -- display name (may differ from customer name)

  is_verified     BOOLEAN         NOT NULL DEFAULT FALSE,  -- admin-verified review
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_rating CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5))
);

COMMENT ON TABLE reviews IS 'Guest reviews from website or external platforms. Linked to a booking.';

CREATE INDEX idx_reviews_booking   ON reviews (booking_id);
CREATE INDEX idx_reviews_customer  ON reviews (customer_id);
CREATE INDEX idx_reviews_sentiment ON reviews (sentiment);


-- ════════════════════════════════════════════════════════════════════════════
-- 7. GUEST RELATION POINTS CONFIGURATION
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE gr_points_config (
  id                      SERIAL PRIMARY KEY,
  checkout_no_review_pts  INTEGER NOT NULL DEFAULT 10,    -- points if guest checks out with NO review
  checkout_positive_pts   INTEGER NOT NULL DEFAULT 50,    -- points if guest leaves a POSITIVE review
  checkout_neutral_pts    INTEGER NOT NULL DEFAULT 25,    -- points for neutral review
  checkout_negative_pts   INTEGER NOT NULL DEFAULT 0,     -- points for negative review
  points_to_currency_rate NUMERIC(8, 2) NOT NULL DEFAULT 1.00,  -- 1 point = X currency units
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by              UUID REFERENCES employees(id) ON DELETE SET NULL
);

COMMENT ON TABLE gr_points_config IS 'Global configuration for GR point awards. Single-row table (id=1).';

-- Seed default config
INSERT INTO gr_points_config (checkout_no_review_pts, checkout_positive_pts, checkout_neutral_pts, checkout_negative_pts, points_to_currency_rate)
VALUES (10, 50, 25, 0, 1.00);


-- ════════════════════════════════════════════════════════════════════════════
-- 8. GUEST RELATION POINTS LEDGER
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE gr_points_ledger (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id     UUID            NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  booking_id      UUID            REFERENCES bookings(id) ON DELETE SET NULL,
  review_id       UUID            REFERENCES reviews(id) ON DELETE SET NULL,

  points          INTEGER         NOT NULL,          -- can be negative for deductions
  reason          VARCHAR(255)    NOT NULL,           -- e.g. 'Checkout – no review', 'Checkout – positive review', 'Redemption deduction'
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  gr_points_ledger IS 'Immutable append-only ledger of all GR point transactions. SUM(points) WHERE employee_id = X gives current balance.';
COMMENT ON COLUMN gr_points_ledger.points IS 'Positive = earned, Negative = redeemed/deducted.';

CREATE INDEX idx_gr_points_employee ON gr_points_ledger (employee_id);
CREATE INDEX idx_gr_points_booking  ON gr_points_ledger (booking_id) WHERE booking_id IS NOT NULL;


-- ════════════════════════════════════════════════════════════════════════════
-- 9. POINT REDEMPTION REQUESTS
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE point_redemptions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id     UUID              NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  points_amount   INTEGER           NOT NULL,
  cash_amount     NUMERIC(10, 2)    NOT NULL,        -- calculated: points × rate
  status          redemption_status NOT NULL DEFAULT 'pending',
  admin_notes     TEXT,
  reviewed_by     UUID              REFERENCES employees(id) ON DELETE SET NULL,
  reviewed_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ       NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_points_positive CHECK (points_amount > 0),
  CONSTRAINT chk_cash_positive   CHECK (cash_amount > 0)
);

COMMENT ON TABLE point_redemptions IS 'GR employees request to cash out earned points. Admin approves/rejects.';

CREATE INDEX idx_redemptions_employee ON point_redemptions (employee_id);
CREATE INDEX idx_redemptions_status   ON point_redemptions (status);


-- ════════════════════════════════════════════════════════════════════════════
-- 10. JOB APPLICATIONS
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE job_applications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Applicant info
  full_name       VARCHAR(200)      NOT NULL,
  email           VARCHAR(255)      NOT NULL,
  phone           VARCHAR(30)       NOT NULL,
  age             SMALLINT,
  gender          VARCHAR(20),
  marital_status  VARCHAR(30),
  current_address TEXT,
  education       VARCHAR(200),

  -- Job details
  applied_role    VARCHAR(120)      NOT NULL,  -- matches job categories from the website
  experience      TEXT,
  skills          TEXT,
  expected_salary VARCHAR(60),

  -- CV / Resume
  resume_url      TEXT,                        -- S3/Cloudinary link to uploaded CV

  -- Processing
  status          application_status NOT NULL DEFAULT 'new',
  admin_notes     TEXT,
  reviewed_by     UUID              REFERENCES employees(id) ON DELETE SET NULL,
  reviewed_at     TIMESTAMPTZ,

  created_at      TIMESTAMPTZ       NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE job_applications IS 'Career applications submitted through the website jobs page.';

CREATE INDEX idx_applications_role   ON job_applications (applied_role);
CREATE INDEX idx_applications_status ON job_applications (status);
CREATE INDEX idx_applications_date   ON job_applications (created_at DESC);


-- ════════════════════════════════════════════════════════════════════════════
-- 11. AUDIT LOG (optional but recommended)
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE audit_log (
  id              BIGSERIAL PRIMARY KEY,
  actor_id        UUID,                           -- employee who performed the action (NULL = system)
  action          VARCHAR(100)    NOT NULL,        -- e.g. 'booking.create', 'booking.status_change', 'points.award'
  entity_type     VARCHAR(60)     NOT NULL,        -- e.g. 'booking', 'customer', 'employee'
  entity_id       UUID,                            -- PK of the affected row
  old_value       JSONB,                           -- snapshot before change
  new_value       JSONB,                           -- snapshot after change
  ip_address      INET,
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE audit_log IS 'Immutable trail of all significant actions for compliance and debugging.';

CREATE INDEX idx_audit_actor   ON audit_log (actor_id)  WHERE actor_id IS NOT NULL;
CREATE INDEX idx_audit_entity  ON audit_log (entity_type, entity_id);
CREATE INDEX idx_audit_date    ON audit_log (created_at DESC);


-- ════════════════════════════════════════════════════════════════════════════
-- 12. HELPER VIEWS
-- ════════════════════════════════════════════════════════════════════════════

-- ── Customer Booking History (query by phone, national_id, or name) ──
CREATE VIEW v_customer_history AS
SELECT
  c.id              AS customer_id,
  c.full_name,
  c.phone_number,
  c.national_id,
  c.notes           AS customer_notes,
  b.id              AS booking_id,
  b.source,
  b.status,
  b.check_in_date,
  b.check_out_date,
  b.total_price,
  b.booking_notes,
  b.num_guests,
  r.room_number,
  r.room_type,
  gr.full_name      AS guest_relation_name
FROM customers c
LEFT JOIN bookings b  ON b.customer_id = c.id
LEFT JOIN rooms r     ON r.id = b.room_id
LEFT JOIN employees gr ON gr.id = b.guest_relation_id
ORDER BY c.id, b.check_in_date DESC;

COMMENT ON VIEW v_customer_history IS 'Flat view joining customers → bookings → rooms → GR. Filter by phone_number, national_id, or full_name.';


-- ── GR Points Balance per Employee ──
CREATE VIEW v_gr_points_balance AS
SELECT
  e.id              AS employee_id,
  e.full_name,
  e.email,
  COALESCE(SUM(gl.points), 0)                    AS total_earned,
  COALESCE(SUM(gl.points) FILTER (WHERE gl.points > 0), 0)  AS lifetime_earned,
  COALESCE(SUM(gl.points) FILTER (WHERE gl.points < 0), 0)  AS lifetime_redeemed,
  COALESCE(SUM(gl.points), 0)                    AS current_balance
FROM employees e
LEFT JOIN gr_points_ledger gl ON gl.employee_id = e.id
WHERE e.role = 'guest_relation'
GROUP BY e.id, e.full_name, e.email;

COMMENT ON VIEW v_gr_points_balance IS 'Current point balance for each Guest Relation employee.';


-- ── Dashboard Booking Statistics ──
CREATE VIEW v_booking_stats AS
SELECT
  DATE_TRUNC('month', b.created_at)::DATE        AS month,
  b.source,
  b.status,
  COUNT(*)                                        AS booking_count,
  SUM(b.total_price)                              AS revenue,
  AVG(b.total_price)                              AS avg_price,
  AVG(b.check_out_date - b.check_in_date)         AS avg_stay_days
FROM bookings b
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 2, 3;

COMMENT ON VIEW v_booking_stats IS 'Monthly aggregated booking statistics by source and status.';


-- ════════════════════════════════════════════════════════════════════════════
-- 13. TRIGGER: auto-update `updated_at` columns
-- ════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER trg_employees_updated       BEFORE UPDATE ON employees       FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_customers_updated       BEFORE UPDATE ON customers       FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_rooms_updated           BEFORE UPDATE ON rooms           FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_bookings_updated        BEFORE UPDATE ON bookings        FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_job_applications_updated BEFORE UPDATE ON job_applications FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();


-- ════════════════════════════════════════════════════════════════════════════
-- SCHEMA COMPLETE ✓
-- ════════════════════════════════════════════════════════════════════════════
