import { IsString, MinLength, Matches } from 'class-validator';


export class ChangePasswordDto {
    @IsString()
    currentPassword: string;
  
    @IsString()
    @MinLength(8)
    @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]+$/, {
      message:
        'La nueva contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número, un carácter especial y tener al menos 8 caracteres',
    })
    newPassword: string;
  }

