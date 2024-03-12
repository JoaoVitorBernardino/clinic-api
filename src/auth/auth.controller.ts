import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDTO } from './dto/login.dto';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    @ApiOperation({ summary: 'Route responsible for Login' })
    @ApiOkResponse({ type: LoginDTO })
    @HttpCode(HttpStatus.OK)
    async login(@Res() res: Response, @Body() LoginDTO: LoginDTO) {
        const auth = await this.authService.login(LoginDTO.email, LoginDTO.password);

        res.cookie('refresh_token', auth.refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        return res.send({ access_token: auth.access_token, refresh_token: auth.refresh_token });

    }

    @Post('refresh')
    async refresh(@Res() res: Response, @Req() req: Request) {
        const oldRefreshToken = req['body']['refresh_token'];

        const newAccessToken = await this.authService.refreshAcessToken(oldRefreshToken);
        const newRefreshToken = await this.authService.replaceRefreshToken(oldRefreshToken);

        res.cookie('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        return res.send(newAccessToken);
    }

    @Public()
    @Post('signup')
    @ApiOperation({ summary: 'Route responsible for Sign Up' })
    @ApiCreatedResponse({ type: CreateUserDto })
    signUp(@Body() signUpDTO: CreateUserDto) {
        return this.authService.signUp(signUpDTO);
    }
}