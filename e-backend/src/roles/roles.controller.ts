import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The role has been successfully created.',
    schema: {
      example: {
        id: 1,
        name: 'Admin',
      },
    },
  })
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all roles with associated users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of roles with associated user data.',
    schema: {
      example: [
        {
          id: 1,
          name: 'Admin',
          users: [
            { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
            { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
          ],
        },
        {
          id: 2,
          name: 'User',
          users: [
            { id: 3, name: 'Alice', email: 'alice@example.com' },
          ],
        },
      ],
    },
  })
  async findAll() {
    return this.rolesService.findAll();
  }

}
