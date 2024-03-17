import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService) { }

    async create(createUserDto: CreateUserDto) {
        return this.prisma.users.create({
            data: createUserDto
        });
    }

    findAll() {
        return this.prisma.users.findMany({
            where: { is_deleted: false }
        });
    }

    findOne(id: string) {
        return this.prisma.users.findUniqueOrThrow({
            where: { id }
        }).catch(() => {
            throw new NotFoundException('not found user');
        });
    }

    findOneByEmail(email: string) {
        return this.prisma.users.findUniqueOrThrow({
            where: { email }
        }).catch(() => {
            throw new NotFoundException('not found user');
        });
    }

    findOneByEmailWithRole(email: string) {
        return this.prisma.users.findUniqueOrThrow({
            where: { email },
            include: { role: true }
        });
    }

    profile(token: string) {
        const decoded = this.jwtService.verify(token.split(' ')[1]);

        return this.prisma.users.findUniqueOrThrow({
            where: {
                id: decoded.payload.sub,
            },
            select: { //TODO: avaliar quais campos terão que ser retornados
                username: true,
                email: true,
                commission: true,
                created_at: true,
                updated_at: true,
                role_id: true
            },
        });
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.prisma.users.update({
            where: { id },
            data: updateUserDto
        });
    }

    remove(id: string) {
        return this.prisma.users.update({
            where: { id },
            data: { is_deleted: true }
        });
    }
}
