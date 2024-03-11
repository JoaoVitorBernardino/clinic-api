import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
    constructor(private prisma: PrismaService) { }

    create(createServiceDto: CreateServiceDto) {
        return this.prisma.services.create({ data: createServiceDto });
    }

    findAll() {
        return this.prisma.services.findMany({
            where: {
                is_deleted: false
            }
        });
    }

    findOne(id: string) {
        return this.prisma.services.findUniqueOrThrow({
            where: { id }
        }).catch(() => {
            throw new NotFoundException('service not found');
        });
    }

    update(id: string, updateServiceDto: UpdateServiceDto) {
        return this.prisma.services.update({
            where: { id },
            data: updateServiceDto
        });
    }

    remove(id: string) {
        return this.prisma.services.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
}
