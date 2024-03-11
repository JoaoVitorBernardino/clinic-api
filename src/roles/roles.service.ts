import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) { }

    create(createRoleDto: CreateRoleDto) {
        return this.prisma.roles.create({
            data: createRoleDto
        });
    }

    findAll() {
        return this.prisma.roles.findMany({
            where: {
                is_deleted: false
            }
        });
    }

    findOne(id: string) {
        return this.prisma.roles.findUniqueOrThrow({
            where: { id }
        }).catch(() => {
            throw new NotFoundException('role not found')
        });
    }

    update(id: string, updateRoleDto: UpdateRoleDto) {
        return this.prisma.roles.update({
            where: { id },
            data: updateRoleDto
        });
    }

    remove(id: string) {
        return this.prisma.roles.update({
            where: { id },
            data: {
                is_deleted: true
            }
        });
    }
}
