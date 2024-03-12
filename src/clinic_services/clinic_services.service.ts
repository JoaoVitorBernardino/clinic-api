import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClinicServiceDto } from './dto/create-clinic_service.dto';
import { UpdateClinicServiceDto } from './dto/update-clinic_service.dto';

@Injectable()
export class ClinicServicesService {
    constructor(private prisma: PrismaService) { }

    create(createClinicServiceDto: CreateClinicServiceDto) {
        return this.prisma.clinic_services.create({ data: createClinicServiceDto });
    }

    findAll(clinic_id) {
        return this.prisma.clinic_services.findMany({ where: { is_deleted: false, clinic_id } });
    }

    findOne(id: string) {
        return this.prisma.clinic_services.findUniqueOrThrow({
            where: { id }
        }).catch(() => {
            throw new NotFoundException('not found clinic  service');
        });
    }

    update(id: string, updateClinicServiceDto: UpdateClinicServiceDto) {
        return this.prisma.clinic_services.update({
            where: { id },
            data: updateClinicServiceDto
        });
    }

    remove(id: string) {
        return this.prisma.clinic_services.update({
            where: { id },
            data: { is_deleted: true }
        });
    }
}
