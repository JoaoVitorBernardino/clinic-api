import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@Injectable()
export class ClinicsService {
    constructor(private prisma: PrismaService) { }

    create(createClinicDto: CreateClinicDto) {
        return this.prisma.clinics.create({ data: createClinicDto });
    }

    findAll() {
        return this.prisma.clinics.findMany({ where: { is_deleted: false } });
    }

    findOne(id: string) {
        return this.prisma.clinics.findUniqueOrThrow({
            where: { id }
        }).catch(() => {
            throw new NotFoundException('not found clinic');
        });
    }

    update(id: string, updateClinicDto: UpdateClinicDto) {
        return this.prisma.clinics.update({
            where: { id },
            data: updateClinicDto
        });
    }

    remove(id: string) {
        return this.prisma.clinics.update({
            where: { id },
            data: { is_deleted: true }
        });
    }
}
