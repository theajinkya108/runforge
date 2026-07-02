import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IngestionModule } from './modules/ingestion/ingestion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IngestionModule,
  ],
})
export class AppModule {}