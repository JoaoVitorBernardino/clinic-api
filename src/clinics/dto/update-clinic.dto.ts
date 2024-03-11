import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClinicDto } from './create-clinic.dto';

export class UpdateClinicDto extends PartialType(CreateClinicDto) {
    @ApiProperty()
    name: string;
}
