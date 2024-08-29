import {IsNumberString, IsString} from 'class-validator'

export class CreateUserMediaDto {

    @IsNumberString()
    userId: number;

    @IsString()
    video: string;
    
}
