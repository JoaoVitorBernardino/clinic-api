import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerServiceDto } from './dto/create-customer_service.dto';
import { UpdateCustomerServiceDto } from './dto/update-customer_service.dto';

@Injectable()
export class CustomerServicesService {
    constructor(private prisma: PrismaService) { }

    create(createCustomerServiceDto: CreateCustomerServiceDto) {
        return this.prisma.customer_services.create({ data: createCustomerServiceDto });
    }

    findAll() {
        return this.prisma.customer_services.findMany({ where: { is_deleted: false } });
    }

    findOne(id: string) {
        return this.prisma.customer_services.findUniqueOrThrow({
            where: { id }
        }).catch(() => {
            throw new NotFoundException('not found customer service');
        });
    }

    update(id: string, updateCustomerServiceDto: UpdateCustomerServiceDto) {
        return this.prisma.customer_services.update({
            where: { id },
            data: updateCustomerServiceDto
        });
    }

    remove(id: string) {
        return this.prisma.customer_services.update({
            where: { id },
            data: { is_deleted: true }
        });
    }
}
