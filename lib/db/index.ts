import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  max: 10,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

// Schema is inlined so it works in any deploy environment
const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS auth_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tool_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tool_slug TEXT NOT NULL,
  title TEXT,
  input_text TEXT,
  structured_output JSONB,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS council_turns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_session_id UUID NOT NULL REFERENCES tool_sessions(id) ON DELETE CASCADE,
  advisor_name TEXT NOT NULL,
  round INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`;

let initialized = false;
let initPromise: Promise<void> | null = null;

export async function initializeDatabase(): Promise<void> {
  if (initialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const client = await pool.connect();
    try {
      await client.query(SCHEMA_SQL);
      initialized = true;
    } finally {
      client.release();
    }
  })();

  return initPromise;
}

export async function query<T>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  await initializeDatabase();
  const result = await pool.query(sql, params);
  return result.rows as T[];
}

export async function queryOne<T>(
  sql: string,
  params?: unknown[]
): Promise<T | null> {
  await initializeDatabase();
  const result = await pool.query(sql, params);
  return (result.rows[0] as T) ?? null;
}

export async function execute(
  sql: string,
  params?: unknown[]
): Promise<void> {
  await initializeDatabase();
  await pool.query(sql, params);
}

export default pool;
