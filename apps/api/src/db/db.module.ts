import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export const DB_TOKEN = 'DB'

@Global()
@Module({
  providers: [
    {
      provide: DB_TOKEN,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL')!
        const isProd = config.get<string>('NODE_ENV') === 'production'

        if (isProd) {
          const sql = neon(url)
          return drizzleNeon(sql, { schema })
        } else {
          const pool = new Pool({ connectionString: url })
          return drizzleNode(pool, { schema })
        }
      },
    },
  ],
  exports: [DB_TOKEN],
})
export class DbModule {}