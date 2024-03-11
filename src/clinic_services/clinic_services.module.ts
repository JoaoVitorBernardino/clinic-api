import { Module } from '@nestjs/common';
import { ClinicServicesService } from './clinic_services.service';
import { ClinicServicesController } from './clinic_services.controller';

@Module({
  controllers: [ClinicServicesController],
  providers: [ClinicServicesService],
})
export class ClinicServicesModule {}
