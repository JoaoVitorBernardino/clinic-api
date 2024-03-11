import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
    login(@Body() LoginDTO: LoginDTO) {
        return this.authService.login(LoginDTO.email, LoginDTO.password);
    }

    @Public()
    @Post('signup')
    @ApiOperation({ summary: 'Route responsible for Sign Up' })
    @ApiCreatedResponse({ type: CreateUserDto })
    signUp(@Body() signUpDTO: CreateUserDto) {
        return this.authService.signUp(signUpDTO);
    }
}