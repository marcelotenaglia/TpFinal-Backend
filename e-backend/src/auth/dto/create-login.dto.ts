import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from "class-validator";


export class LoginDto
{
    @Length(1, 50)
    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    @Length(8, 12, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    },{message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.' })
    password: string;

}