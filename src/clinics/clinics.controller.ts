import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { ClinicEntity } from './entities/clinic.entity';

@Controller('clinics')
@ApiTags('Clinics')
export class ClinicsController {
    constructor(private readonly clinicsService: ClinicsService) { }

    @Post()
    @ApiOperation({ summary: 'Route responsible for creating a clinic' })
    @ApiCreatedResponse({ type: ClinicEntity })
    @ApiBody({ type: CreateClinicDto })
    @ApiBearerAuth()
    create(@Body() createClinicDto: CreateClinicDto) {
        return this.clinicsService.create(createClinicDto);
    }

    @Get()
    @ApiOperation({ summary: 'Route responsible for searching all clinics' })
    @ApiOkResponse({ type: ClinicEntity, isArray: true })
    @ApiBearerAuth()
    findAll() {
        return this.clinicsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Route responsible for searching for a clinic by ID' })
    @ApiOkResponse({ type: ClinicEntity })
    @ApiBearerAuth()
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.clinicsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Route responsible for updating a clinic by ID' })
    @ApiOkResponse({ type: ClinicEntity })
    @ApiBody({ type: UpdateClinicDto })
    @ApiBearerAuth()
    update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateClinicDto: UpdateClinicDto) {
        return this.clinicsService.update(id, updateClinicDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Route responsible for deleting a clinic by ID' })
    @ApiNoContentResponse()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.clinicsService.remove(id);
    }
}
