import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('/profile')
    @ApiOperation({ summary: 'Route responsible for searching the user\'s profile' })
    @ApiOkResponse()
    @ApiBearerAuth()
    findProfile(@Req() req: Request) {
        const token = req.headers['authorization'];

        return this.usersService.profile(token);
    }

    @Get()
    @ApiOperation({ summary: 'Route responsible for searching all users' })
    @ApiOkResponse({ type: UserEntity })
    @ApiBearerAuth()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Route responsible for searching for a user by ID' })
    @ApiOkResponse({ type: UserEntity })
    @ApiBearerAuth()
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Route responsible for updating a user by ID' })
    @ApiOkResponse({ type: UserEntity })
    @ApiBearerAuth()
    update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Route responsible for deleting a user by ID' })
    @ApiNoContentResponse()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.remove(id);
    }
}
