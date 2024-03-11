import { Module } from '@nestjs/common';
import { CustomerServicesService } from './customer_services.service';
import { CustomerServicesController } from './customer_services.controller';

@Module({
  controllers: [CustomerServicesController],
  providers: [CustomerServicesService],
})
export class CustomerServicesModule {}
