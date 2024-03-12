import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSelectedServiceDto } from './create-selected_service.dto';

export class UpdateSelectedServiceDto extends PartialType(CreateSelectedServiceDto) {
    @ApiProperty()
    clinic_service_id: string;

    @ApiProperty()
    customer_service_id: string;
}
