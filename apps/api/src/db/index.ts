import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres'
import { neon } from '@neondatabase/serverless'
import { Pool } from 'pg'
import * as schema from './schema'

const isProduction = process.env.NODE_ENV === 'production'

function createDb() {
  const url = process.env.DATABASE_URL!

  if (isProduction) {
    const sql = neon(url)
    return drizzleNeon(sql, { schema })
  } else {
    const pool = new Pool({ connectionString: url })
    return drizzleNode(pool, { schema })
  }
}

export const db = createDb()
export type DB = typeof db