import { IsDateString, IsString, Length,IsNotEmpty,IsEmail,IsIn,Matches } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @Length(1, 25)
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
    @Length(8, 255, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/, { 
        message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.' 
    })
    password: string;

    disable: boolean = true;

}


//name, email, birthdate