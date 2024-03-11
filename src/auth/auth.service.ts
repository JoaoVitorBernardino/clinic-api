import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email);

        const isPasswordMatch = await compare(password, user.password);

        if (isPasswordMatch) {
            return await this.generateToken(user);
        }

        throw new UnauthorizedException('invalid email or password');
    }

    async generateToken(payload: UserEntity) {
        return {
            access_token: this.jwtService.sign(
                { email: payload.email },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '50s',
                }
            )
        };
    }
}
