import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SQSClient, SendMessageCommand, SendMessageCommandInput } from '@aws-sdk/client-sqs';

@Injectable()
export class SqsProducer {
    private readonly client: SQSClient;
    private readonly queueUrl: string;
    private readonly logger = new Logger(SqsProducer.name);

    constructor(private readonly config: ConfigService) {
        const endpoint = this.config.get<string>('SQS_ENDPOINT');
        this.client = new SQSClient({
        region: this.config.get<string>('AWS_REGION') ?? 'us-east-1',
        // endpoint only set in local dev — undefined in production means real AWS
        ...(endpoint && { endpoint }),
        credentials: {
            accessKeyId: this.config.get<string>('AWS_ACCESS_KEY_ID') ?? 'test',
            secretAccessKey: this.config.get<string>('AWS_SECRET_ACCESS_KEY') ?? 'test',
        },
        });
        this.queueUrl = this.config.get<string>('SQS_QUEUE_URL') ?? '';
    }

    async sendMessage(payload: Record<string, unknown>): Promise<string> {
        const input: SendMessageCommandInput = {
            QueueUrl: this.queueUrl,
            MessageBody: JSON.stringify(payload),
        };

        const result = await this.client.send(new SendMessageCommand(input));
        this.logger.log(`Message sent to SQS: ${result.MessageId}`);

        return result.MessageId ?? '';
    }
}