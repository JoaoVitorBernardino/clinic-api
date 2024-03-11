import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(username: string, password: string) {
        const user = await this.usersService.findOneByEmail(username);

        if ((await compare(password, user.password)) == false) {
            throw new UnauthorizedException();
        }

        const payload = { email: user.email, sub: user.id };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(signUpDto: CreateUserDto) {
        signUpDto.password = await this.createHashPassword(signUpDto.password);

        return this.usersService.create(signUpDto);
    }

    private async createHashPassword(password: string): Promise<string> {
        const saltRounds = 10;

        const hashedPassword = await hash(password, saltRounds);

        return hashedPassword;
    }
}