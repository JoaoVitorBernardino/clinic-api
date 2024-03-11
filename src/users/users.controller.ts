import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Route responsible for creating a user' })
    @ApiCreatedResponse({ type: UserEntity })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get('/profile')
    @ApiOperation({ summary: 'Route responsible for searching the user\'s profile' })
    @ApiOkResponse()
    findProfile(@Req() req: Request) {
        const token = req.headers['authorization'];


        return this.usersService.findOneByEmailWithRole(token);
    }

    @Get()
    @ApiOperation({ summary: 'Route responsible for searching all users' })
    @ApiOkResponse({ type: UserEntity })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Route responsible for searching for a user by ID' })
    @ApiOkResponse({ type: UserEntity })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Route responsible for updating a user by ID' })
    @ApiOkResponse({ type: UserEntity })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Route responsible for deleting a user by ID' })
    @ApiNoContentResponse()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
