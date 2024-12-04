import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'El rol se ha creado exitosamente.',
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
  @ApiOperation({ summary: 'Obtener todos los roles con los usuarios asociados' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Devuelve una lista de roles con la información de los usuarios asociados.',
    schema: {
      example: [
        {
          id: 1,
          name: 'Admin',
          users: [
            { id: 1, name: 'Juan Pérez', email: 'juanperez@ejemplo.com' },
            { id: 2, name: 'María López', email: 'marialopez@ejemplo.com' },
          ],
        },
        {
          id: 2,
          name: 'Usuario',
          users: [
            { id: 3, name: 'Ana Gómez', email: 'anagomez@ejemplo.com' },
          ],
        },
      ],
    },
  })
  async findAll() {
    return this.rolesService.findAll();
  }
}
