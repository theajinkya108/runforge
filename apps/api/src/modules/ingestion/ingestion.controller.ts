import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import { IngestAlertDto } from './dto/ingest-alert.dto';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
    constructor(private readonly ingestionService: IngestionService) {}

    @Post('alert')
    @HttpCode(HttpStatus.ACCEPTED)
    async ingestAlert(@Body() dto: IngestAlertDto){
        const result = await this.ingestionService.ingest(dto);
        return {
            status: 'queued',
            incidentId: result.incidentId,
            messageId: result.messageId,
        };
    }
}