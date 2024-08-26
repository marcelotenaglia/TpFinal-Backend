import { IsDateString, IsString, Length } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @Length(1, 255)
    name: string;

    @IsString()
    @Length(1, 255)
    email: string;

    @IsDateString()
    birthdate: string; //"YYYY-MM-DD"

}


//name, email, birthdate