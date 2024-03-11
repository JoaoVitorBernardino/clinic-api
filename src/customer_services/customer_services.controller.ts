import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerServicesService } from './customer_services.service';
import { CreateCustomerServiceDto } from './dto/create-customer_service.dto';
import { UpdateCustomerServiceDto } from './dto/update-customer_service.dto';

@Controller('customer-services')
export class CustomerServicesController {
  constructor(private readonly customerServicesService: CustomerServicesService) {}

  @Post()
  create(@Body() createCustomerServiceDto: CreateCustomerServiceDto) {
    return this.customerServicesService.create(createCustomerServiceDto);
  }

  @Get()
  findAll() {
    return this.customerServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerServicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerServiceDto: UpdateCustomerServiceDto) {
    return this.customerServicesService.update(+id, updateCustomerServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerServicesService.remove(+id);
  }
}
