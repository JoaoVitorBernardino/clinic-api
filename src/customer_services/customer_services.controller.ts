import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseBoolPipe, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomerServicesService } from './customer_services.service';
import { CreateCustomerServiceDto } from './dto/create-customer_service.dto';
import { SummaryDTO } from './dto/summary.dto';
import { UpdateCustomerServiceDto } from './dto/update-customer_service.dto';
import { CustomerServiceEntity } from './entities/customer_service.entity';

@Controller('customer-services')
@ApiTags('Customer Services')
export class CustomerServicesController {
    constructor(private readonly customerServicesService: CustomerServicesService) { }

    @Post()
    @ApiOperation({ summary: 'Route responsible for creating a customer service' })
    @ApiCreatedResponse({ type: CustomerServiceEntity })
    @ApiBody({ type: CreateCustomerServiceDto })
    @ApiBearerAuth()
    create(@Body() createCustomerServiceDto: CreateCustomerServiceDto) {
        return this.customerServicesService.create(createCustomerServiceDto);
    }

    @Get()
    @ApiOperation({ summary: 'Route responsible for searching all customer service' })
    @ApiOkResponse({ type: CustomerServiceEntity, isArray: true })
    @ApiBearerAuth()
    findAll() {
        return this.customerServicesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Route responsible for searching for a customer service by ID' })
    @ApiOkResponse({ type: CustomerServiceEntity })
    @ApiQuery({ name: 'nested', required: false })
    @ApiBearerAuth()
    findOne(@Param('id', new ParseUUIDPipe()) id: string, @Query('nested', new ParseBoolPipe({ optional: true })) nested: boolean) {
        return this.customerServicesService.findOne(id, nested);
    }

    @Get(':id/summary')
    @ApiOperation({ summary: 'Route responsible for searching for a customer service summary by ID' })
    @ApiOkResponse({ type: SummaryDTO })
    @ApiBearerAuth()
    summary(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.customerServicesService.summary(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Route responsible for updating a customer service by ID' })
    @ApiOkResponse({ type: CustomerServiceEntity })
    @ApiBody({ type: UpdateCustomerServiceDto })
    @ApiBearerAuth()
    update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateCustomerServiceDto: UpdateCustomerServiceDto) {
        return this.customerServicesService.update(id, updateCustomerServiceDto);
    }

    @Patch(':id/start')
    @ApiOperation({ summary: 'Route responsible for starting customer service' })
    @ApiNoContentResponse()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    start(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.customerServicesService.start(id);
    }

    @Patch(':id/finish')
    @ApiOperation({ summary: 'Route responsible for finishing customer service' })
    @ApiNoContentResponse()
    @ApiBearerAuth()
    finish(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.customerServicesService.finish(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Route responsible for deleting a customer service by ID' })
    @ApiNoContentResponse()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.customerServicesService.remove(id);
    }
}
