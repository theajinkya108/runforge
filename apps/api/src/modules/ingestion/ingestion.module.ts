import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';
import { SqsProducer } from './sqs.producer';

@Module({
    controllers: [IngestionController],
    providers: [IngestionService, SqsProducer],
})

export class IngestionModule {}