import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClinicServiceDto } from './create-clinic_service.dto';

export class UpdateClinicServiceDto extends PartialType(CreateClinicServiceDto) {
    @ApiProperty()
    clinic_id: string;

    @ApiProperty()
    service_id: string;
}
