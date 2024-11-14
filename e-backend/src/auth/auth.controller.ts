import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/create-login.dto';
import { ChangePasswordDto } from './dto/changepass.Dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario registrado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de registro inválidos',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inicio de sesión exitoso',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciales inválidas',
  })
  async loginUser(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }


  @UseGuards(AuthGuard)
  @Patch('/change-password/:user_id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cambiar la contraseña de usuario' })
  @ApiUnauthorizedResponse({
    description: 'Acceso no autorizado o cuenta desactivada',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contraseña actualizada correctamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Contraseña actual incorrecta',
  })
  @ApiParam({
    name: 'user_id',
    description: 'ID del usuario para cambiar la contraseña',
    type: Number,
  })
 async changePassword(
    @Param('user_id', ParseIntPipe) userId: number, // Usamos ParseIntPipe para convertir a number
    @Body() changePasswordDto: ChangePasswordDto,
  ):Promise<string> {
    

    return await this.authService.changePassword(userId, changePasswordDto);
  }
}
