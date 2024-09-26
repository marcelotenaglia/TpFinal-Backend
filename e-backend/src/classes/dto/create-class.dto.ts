import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class CreateClassDto {

    @IsString({ message: 'El título debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @MaxLength(100, { message: 'El título no puede exceder los 100 caracteres' })
    title: string;

    @IsString({ message: 'El contenido debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El contenido es obligatorio' })
    content: string;

    @IsNumber({}, { message: 'La duración debe ser un número' })
    @IsNotEmpty({ message: 'La duración es obligatoria' })
    duration: number;

    @IsNumber({}, { message: 'El ID del curso debe ser un número' })
    @IsNotEmpty({ message: 'El ID del curso es obligatorio' })
    course_id: number; // Asumiendo que se recibe el ID del curso
}
