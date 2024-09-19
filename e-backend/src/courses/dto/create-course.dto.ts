import  { IsString, IsNotEmpty, MaxLength, Min,Max, IsNumber, IsDecimal } from 'class-validator';

export class CreateCourseDto {

    @IsString({ message: 'El título debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @MaxLength(100, { message: 'El título no puede exceder los 100 caracteres' })
    title: string;

    @IsString({ message: 'La descripción debe ser un texto' })
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    description: string;

    @IsNumber({}, { message: 'La duración debe ser un número entero' })
    @IsNotEmpty({ message: 'La duración es obligatoria' })
    duration: number;

    @IsString({ message: 'La plataforma debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La plataforma es obligatoria' })
    @MaxLength(100, { message: 'La plataforma no puede exceder los 100 caracteres' })
    platform: string;

    @IsNumber({ maxDecimalPlaces: 1 }, { message: 'La calificación debe ser un número con hasta 1 decimal' })
    @Min(0, { message: 'La calificación no puede ser menor que 0' })
    @Max(5, { message: 'La calificación no puede ser mayor que 5' })
    rating: number;

    @IsString({ message: 'La categoría debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    @MaxLength(50, { message: 'La categoría no puede exceder los 50 caracteres' })
    category: string;

    @IsDecimal({ decimal_digits: '2', force_decimal: false }, { message: 'El precio debe ser un número decimal con 2 decimales' })
    @IsNotEmpty({ message: 'El precio es obligatorio' })
    price: number;
}
