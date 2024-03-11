import { Injectable } from '@nestjs/common';
import { CreateSelectedServiceDto } from './dto/create-selected_service.dto';
import { UpdateSelectedServiceDto } from './dto/update-selected_service.dto';

@Injectable()
export class SelectedServicesService {
  create(createSelectedServiceDto: CreateSelectedServiceDto) {
    return 'This action adds a new selectedService';
  }

  findAll() {
    return `This action returns all selectedServices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} selectedService`;
  }

  update(id: number, updateSelectedServiceDto: UpdateSelectedServiceDto) {
    return `This action updates a #${id} selectedService`;
  }

  remove(id: number) {
    return `This action removes a #${id} selectedService`;
  }
}
