import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Req, UseGuards } from '@nestjs/common';
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
  @Patch('/change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = req.user.id; 
    return this.authService.changePassword(userId, changePasswordDto);
  }
}
