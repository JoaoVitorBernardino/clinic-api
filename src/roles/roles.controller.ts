import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from './decorators/roles.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { Role } from './role.enum';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('Roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Route responsible for creating a role' })
    @ApiCreatedResponse({ type: RoleEntity })
    @ApiBearerAuth()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    @ApiOperation({ summary: 'Route responsible for searching all roles' })
    @ApiOkResponse({ type: RoleEntity })
    @ApiBearerAuth()
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Route responsible for searching for a role by ID' })
    @ApiOkResponse({ type: RoleEntity })
    @ApiBearerAuth()
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.rolesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Route responsible for updating a role by ID' })
    @ApiOkResponse({ type: RoleEntity })
    @ApiBearerAuth()
    update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Route responsible for deleting a role by ID' })
    @ApiNoContentResponse()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.rolesService.remove(id);
    }
}
