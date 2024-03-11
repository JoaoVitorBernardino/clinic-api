import { Module } from '@nestjs/common';
import { SelectedServicesService } from './selected_services.service';
import { SelectedServicesController } from './selected_services.controller';

@Module({
  controllers: [SelectedServicesController],
  providers: [SelectedServicesService],
})
export class SelectedServicesModule {}
