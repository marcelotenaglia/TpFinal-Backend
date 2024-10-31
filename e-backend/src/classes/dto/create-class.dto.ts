import { IsString, IsNotEmpty, MaxLength, IsNumberString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClassDto {
    @IsString({ message: 'El título debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @MaxLength(100, { message: 'El título no puede exceder los 100 caracteres' })
    title: string;

    @IsString({ message: 'El contenido debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El contenido es obligatorio' })
    content: string;

    @IsNumberString({}, { message: 'La duración debe ser un número' })
    @IsNotEmpty({ message: 'La duración es obligatoria' })
    @IsOptional()
    @Type(() => Number) // Convierte a número automáticamente
    duration: number;

    @IsNumberString({}, { message: 'El ID del curso debe ser un número' })
    @IsNotEmpty({ message: 'El ID del curso es obligatorio' })
    @Type(() => Number) // Convierte a número automáticamente
    course_id: number; // Asumiendo que se recibe el ID del curso
}
