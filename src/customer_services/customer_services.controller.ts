import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerServicesService } from './customer_services.service';
import { CreateCustomerServiceDto } from './dto/create-customer_service.dto';
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
    @ApiBearerAuth()
    findOne(@Param('id') id: string) {
        return this.customerServicesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Route responsible for updating a customer service by ID' })
    @ApiOkResponse({ type: CustomerServiceEntity })
    @ApiBody({ type: UpdateCustomerServiceDto })
    @ApiBearerAuth()
    update(@Param('id') id: string, @Body() updateCustomerServiceDto: UpdateCustomerServiceDto) {
        return this.customerServicesService.update(id, updateCustomerServiceDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Route responsible for deleting a customer service by ID' })
    @ApiNoContentResponse()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.customerServicesService.remove(id);
    }
}
