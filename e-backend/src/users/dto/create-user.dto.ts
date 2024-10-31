import { IsDateString, IsString, Length,IsNotEmpty,IsEmail,IsIn, IsStrongPassword } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @Length(1, 30)
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    name: string;


    @Length(1, 50)
    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    email: string;

    @IsDateString()
    birthdate: string; //"YYYY-MM-DD"

    @IsNotEmpty({ message: 'El rol es obligatorio' })
    @IsIn([1, 2, 3], { message: 'El rol no es valido' })
    role_id: number;
   
    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    @Length(8, 14, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    },{message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.' })
    password: string;

   

}


//name, email, birthdate