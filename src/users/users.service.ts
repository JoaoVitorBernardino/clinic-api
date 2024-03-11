import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(createUserDto: CreateUserDto) {
        createUserDto.password = await this.createHashPassword(createUserDto.password);

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

    async createHashPassword(password: string): Promise<string> {
        const saltRounds = 10;

        const hashedPassword = await hash(password, saltRounds);

        return hashedPassword;
    }
}
