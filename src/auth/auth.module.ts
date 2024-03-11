import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/local.auth';

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, UsersService],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule
    ]
})
export class AuthModule { }
