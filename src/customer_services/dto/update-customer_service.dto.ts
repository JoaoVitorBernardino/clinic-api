import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerServiceDto } from './create-customer_service.dto';

export class UpdateCustomerServiceDto extends PartialType(CreateCustomerServiceDto) {
    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    started_at: Date;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    fineshed_at: Date;

    @ApiProperty()
    client_id: string;

    @ApiProperty()
    professional_id: string;
}
