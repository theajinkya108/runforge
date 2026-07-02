import { Injectable, Logger } from '@nestjs/common';
import { IngestAlertDto } from './dto/ingest-alert.dto';
import { SqsProducer } from './sqs.producer';
import { randomUUID } from 'crypto';

@Injectable()
export class IngestionService {
    private readonly logger = new Logger(IngestionService.name);

    constructor(private readonly sqsProducer: SqsProducer) {}

    async ingest(dto: IngestAlertDto): Promise<{ incidentId: string; messageId: string }> {
        const incidentId = randomUUID();

        const payload = {
            incidentId,
            source: dto.source,
            serviceName: dto.serviceName,
            alertName: dto.alertName,
            description: dto.description,
            rawPayload: dto.rawPayload,
            timestamp: new Date().toISOString(),
        }

        this.logger.log(`Ingesting alert from ${dto.source} for service ${dto.serviceName}`);

        const messageId = await this.sqsProducer.sendMessage(payload)

        return { incidentId, messageId };
    }
}
