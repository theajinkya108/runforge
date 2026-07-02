import { IsString, IsEnum, IsObject, IsNotEmpty } from "class-validator";
import type { AlertSource } from '@runforge/shared-types';

export class IngestAlertDto {
    @IsEnum(['cloudwatch', 'datadog', 'simulator'])
    source!: AlertSource;

    @IsString()
    @IsNotEmpty()
    serviceName!: string;

    @IsString()
    @IsNotEmpty()
    alertName!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsObject()
    rawPayload!: Record<string, unknown>;

}