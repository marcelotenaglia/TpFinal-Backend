
import { IsNumber, IsNotEmpty } from 'class-validator';
export class CreateFavoriteDto {


    @IsNotEmpty({ message: 'El ID del curso es obligatorio' })
    @IsNumber({}, { message: 'El ID del curso debe ser un número' })
    courseId: number;

    @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
    @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
    userId: number;
}
