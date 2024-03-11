import { Injectable } from '@nestjs/common';
import { CreateCustomerServiceDto } from './dto/create-customer_service.dto';
import { UpdateCustomerServiceDto } from './dto/update-customer_service.dto';

@Injectable()
export class CustomerServicesService {
  create(createCustomerServiceDto: CreateCustomerServiceDto) {
    return 'This action adds a new customerService';
  }

  findAll() {
    return `This action returns all customerServices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerService`;
  }

  update(id: number, updateCustomerServiceDto: UpdateCustomerServiceDto) {
    return `This action updates a #${id} customerService`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerService`;
  }
}
