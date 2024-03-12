import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
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
            access_token: await this.createAccessToken(payload),
            refresh_token: await this.createRefreshToken(payload)
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

    async createAccessToken(payload) {
        const jti = randomUUID();

        return this.jwtService.signAsync({ payload: payload, jti: jti }, { expiresIn: '15m' });
    }

    async createRefreshToken(payload) {
        const jti = randomUUID();

        return this.jwtService.signAsync({ payload: payload, jti: jti }, { expiresIn: '7d' });
    }

    decodeRefreshToken(refreshToken: string) {
        try {
            return this.jwtService.verify(refreshToken);
        } catch (error) {
            throw new UnauthorizedException('invalid refresh token');
        }
    }

    async replaceRefreshToken(oldToken: string) {
        const decoded = await this.decodeRefreshToken(oldToken);
        console.log(decoded.payload)
        return this.createRefreshToken(decoded.payload)
    }

    async refreshAcessToken(refreshToken: string) {
        const decoded = this.decodeRefreshToken(refreshToken);

        return {
            access_token: this.jwtService.sign({ payload: decoded.payload, jti: decoded.jti }),
        };
    }
}