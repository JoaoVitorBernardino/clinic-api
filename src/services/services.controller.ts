import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceEntinty } from './entities/service.entity';
import { ServicesService } from './services.service';

@Controller('services')
@ApiTags('Services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) { }

    @Post()
    @ApiOperation({ summary: 'Route responsible for creating a service' })
    @ApiCreatedResponse({ type: ServiceEntinty })
    @ApiBearerAuth()
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.create(createServiceDto);
    }

    @Get()
    @ApiOperation({ summary: 'Route responsible for searching all services' })
    @ApiOkResponse({ type: ServiceEntinty, isArray: true })
    @ApiBearerAuth()
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Route responsible for searching for a service by ID' })
    @ApiOkResponse({ type: ServiceEntinty })
    @ApiBearerAuth()
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.servicesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Route responsible for updating a service by ID' })
    @ApiOkResponse({ type: ServiceEntinty })
    @ApiBearerAuth()
    update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateServiceDto: UpdateServiceDto) {
        return this.servicesService.update(id, updateServiceDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Route responsible for deleting a service by ID' })
    @ApiNoContentResponse()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.servicesService.remove(id);
    }
}
