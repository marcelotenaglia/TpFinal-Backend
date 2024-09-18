import { IsDateString, IsString, Length,IsNotEmpty,IsEmail,IsIn } from 'class-validator';

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
    roleId: number;

}


//name, email, birthdate