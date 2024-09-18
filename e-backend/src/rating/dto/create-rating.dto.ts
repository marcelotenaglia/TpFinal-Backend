import { IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateRatingDto {
    @IsNumber({}, { message: 'La calificación debe ser un número' })
    @IsNotEmpty({ message: 'La calificación es obligatoria' })
    @Min(1, { message: 'La calificación no puede ser menor a 1' })
    @Max(5, { message: 'La calificación no puede ser mayor a 5' })
    rating: number;

    @IsNotEmpty({ message: 'El ID del curso es obligatorio' })
    @IsNumber({}, { message: 'El ID del curso debe ser un número' })
    courseId: number;

    @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
    @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
    userId: number;
}
