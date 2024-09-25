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
    roleId: number;
   
    @IsNotEmpty({ message: 'The password is required.' })
    @Length(8, 255, { message: 'The password must be at least 8 characters long.' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/, { 
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' 
    })
    password: string;

    disable: boolean = true;

}


//name, email, birthdate