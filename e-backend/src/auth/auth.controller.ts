import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/create-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}


    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() createUserDto: CreateUserDto)
    {
        return this.authService.register(createUserDto);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() LoginDto: LoginDto)
    {
        return this.authService.login(LoginDto);
    }
}
