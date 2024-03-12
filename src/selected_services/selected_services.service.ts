import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSelectedServiceDto } from './dto/create-selected_service.dto';
import { UpdateSelectedServiceDto } from './dto/update-selected_service.dto';

@Injectable()
export class SelectedServicesService {
    constructor(private prisma: PrismaService) { }

    create(createSelectedServiceDto: CreateSelectedServiceDto) {
        return this.prisma.selected_services.create({ data: createSelectedServiceDto });
    }

    findAll() {
        return this.prisma.selected_services.findMany({ where: { is_deleted: false } });
    }

    findOne(id: string) {
        return this.prisma.selected_services.findUniqueOrThrow({
            where: { id }
        }).catch(() => {
            throw new NotFoundException('not found selected service');
        });
    }

    update(id: string, updateSelectedServiceDto: UpdateSelectedServiceDto) {
        return this.prisma.selected_services.update({
            where: { id },
            data: updateSelectedServiceDto
        });
    }

    remove(id: string) {
        return this.prisma.selected_services.update({
            where: { id },
            data: { is_deleted: true }
        });
    }
}
