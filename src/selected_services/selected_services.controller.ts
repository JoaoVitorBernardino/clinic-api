import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SelectedServicesService } from './selected_services.service';
import { CreateSelectedServiceDto } from './dto/create-selected_service.dto';
import { UpdateSelectedServiceDto } from './dto/update-selected_service.dto';

@Controller('selected-services')
export class SelectedServicesController {
  constructor(private readonly selectedServicesService: SelectedServicesService) {}

  @Post()
  create(@Body() createSelectedServiceDto: CreateSelectedServiceDto) {
    return this.selectedServicesService.create(createSelectedServiceDto);
  }

  @Get()
  findAll() {
    return this.selectedServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectedServicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSelectedServiceDto: UpdateSelectedServiceDto) {
    return this.selectedServicesService.update(+id, updateSelectedServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selectedServicesService.remove(+id);
  }
}
