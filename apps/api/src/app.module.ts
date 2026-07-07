import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { IngestionModule } from './modules/ingestion/ingestion.module'
import { DbModule } from './db/db.module'
import { LlmModule } from './config/llm.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    LlmModule,
    IngestionModule,
  ],
})
export class AppModule {}