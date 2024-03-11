import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicServiceDto } from './create-clinic_service.dto';

export class UpdateClinicServiceDto extends PartialType(CreateClinicServiceDto) {}
