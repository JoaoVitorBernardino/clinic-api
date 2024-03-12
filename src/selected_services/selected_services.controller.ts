import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSelectedServiceDto } from './dto/create-selected_service.dto';
import { UpdateSelectedServiceDto } from './dto/update-selected_service.dto';
import { SelectedServiceEntity } from './entities/selected_service.entity';
import { SelectedServicesService } from './selected_services.service';

@Controller('selected-services')
@ApiTags('Selected Services')
export class SelectedServicesController {
    constructor(private readonly selectedServicesService: SelectedServicesService) { }

    @Post()
    @ApiOperation({ summary: 'Route responsible for creating a selected service' })
    @ApiCreatedResponse({ type: SelectedServiceEntity })
    @ApiBody({ type: CreateSelectedServiceDto })
    @ApiBearerAuth()
    create(@Body() createSelectedServiceDto: CreateSelectedServiceDto) {
        return this.selectedServicesService.create(createSelectedServiceDto);
    }

    @Get()
    @ApiOperation({ summary: 'Route responsible for searching all selected services' })
    @ApiOkResponse({ type: SelectedServiceEntity, isArray: true })
    @ApiBearerAuth()
    findAll() {
        return this.selectedServicesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Route responsible for searching for a selected services by ID' })
    @ApiOkResponse({ type: SelectedServiceEntity })
    @ApiBearerAuth()
    findOne(@Param('id') id: string) {
        return this.selectedServicesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Route responsible for updating a selected services by ID' })
    @ApiOkResponse({ type: SelectedServiceEntity })
    @ApiBody({ type: UpdateSelectedServiceDto })
    @ApiBearerAuth()
    update(@Param('id') id: string, @Body() updateSelectedServiceDto: UpdateSelectedServiceDto) {
        return this.selectedServicesService.update(id, updateSelectedServiceDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Route responsible for deleting a selected services by ID' })
    @ApiNoContentResponse()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.selectedServicesService.remove(id);
    }
}
