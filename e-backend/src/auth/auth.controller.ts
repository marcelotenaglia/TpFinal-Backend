import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/create-login.dto';
import { ChangePasswordDto } from './dto/changepass.Dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }


  @UseGuards(AuthGuard)
  @Patch('/change-password/:user_id')
  @HttpCode(HttpStatus.OK)
 async changePassword(
    @Param('user_id', ParseIntPipe) userId: number, // Usamos ParseIntPipe para convertir a number
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(userId, changePasswordDto);
  }
}
