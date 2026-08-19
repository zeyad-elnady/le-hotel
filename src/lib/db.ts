import { Pool } from "pg";

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL ||
      "postgresql://lehotel_user:lehotel_password@localhost:5433/lehotel_db?schema=public";

    pool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 4000,
    });

    pool.on("error", (err) => {
      console.error("Unexpected error on idle PostgreSQL client", err);
    });
  }
  return pool;
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const db = getDbPool();
  const res = await db.query(text, params);
  return res.rows;
}
