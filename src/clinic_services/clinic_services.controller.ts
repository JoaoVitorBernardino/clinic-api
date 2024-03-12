import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ClinicServicesService } from './clinic_services.service';
import { CreateClinicServiceDto } from './dto/create-clinic_service.dto';
import { UpdateClinicServiceDto } from './dto/update-clinic_service.dto';
import { ClinicServiceEntity } from './entities/clinic_service.entity';

@Controller('clinic-services')
@ApiTags('Clinic Services')
export class ClinicServicesController {
    constructor(private readonly clinicServicesService: ClinicServicesService) { }

    @Post()
    @ApiOperation({ summary: 'Route responsible for creating a clinic service' })
    @ApiCreatedResponse({ type: ClinicServiceEntity })
    @ApiBody({ type: CreateClinicServiceDto })
    @ApiBearerAuth()
    create(@Body() createClinicServiceDto: CreateClinicServiceDto) {
        return this.clinicServicesService.create(createClinicServiceDto);
    }

    @Get()
    @ApiOperation({ summary: 'Route responsible for searching all clinic services' })
    @ApiOkResponse({ type: ClinicServiceEntity, isArray: true })
    @ApiBearerAuth()
    @ApiQuery({ name: 'clinic_id', required: false })
    findAll(@Query('clinic_id') clinic_id: string) {
        return this.clinicServicesService.findAll(clinic_id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Route responsible for searching for a clinic service by ID' })
    @ApiOkResponse({ type: ClinicServiceEntity })
    @ApiBearerAuth()
    findOne(@Param('id') id: string) {
        return this.clinicServicesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Route responsible for updating a clinic service by ID' })
    @ApiOkResponse({ type: ClinicServiceEntity })
    @ApiBody({ type: UpdateClinicServiceDto })
    @ApiBearerAuth()
    update(@Param('id') id: string, @Body() updateClinicServiceDto: UpdateClinicServiceDto) {
        return this.clinicServicesService.update(id, updateClinicServiceDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Route responsible for deleting a clinic service by ID' })
    @ApiNoContentResponse()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.clinicServicesService.remove(id);
    }
}
