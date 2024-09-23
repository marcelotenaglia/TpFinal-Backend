import  { IsString, IsNotEmpty, MaxLength, Min,Max,IsOptional,IsInt, IsDecimal,IsArray, ArrayNotEmpty} from 'class-validator';



    export class CreateCourseDto {
        @IsString({ message: 'El título debe ser una cadena de texto' })
        @IsNotEmpty({ message: 'El título es obligatorio', always: true })
        @MaxLength(100, { message: 'El título no puede exceder los 100 caracteres' })
        title: string;
    
        @IsString({ message: 'La descripción debe ser un texto' })
        @IsNotEmpty({ message: 'La descripción es obligatoria', always: true })
        description: string;
    
        @IsInt({ message: 'La duración debe ser un número entero' })
        @IsNotEmpty({ message: 'La duración es obligatoria', always: true })
        @Min(1, { message: 'La duración debe ser al menos 1' })
        @Max(1000, { message: 'La duración no puede exceder los 1000 minutos' })
        duration: number;
    
        @IsString({ message: 'La plataforma debe ser una cadena de texto' })
        @IsNotEmpty({ message: 'La plataforma es obligatoria', always: true })
        @MaxLength(100, { message: 'La plataforma no puede exceder los 100 caracteres' })
        platform: string;
    
        @IsOptional()
        @IsInt({ message: 'La categoría debe ser un número entero' })
        category_id: number;

        @IsOptional()
        @IsInt({ message: 'El Instructor debe ser un número entero' })
        instructor_id: number;
    
        @IsDecimal({ decimal_digits: '2', force_decimal: false }, { message: 'El precio debe ser un número decimal con hasta 2 decimales' })
        @IsNotEmpty({ message: 'El precio es obligatorio', always: true })
        @Min(0, { message: 'El precio no puede ser negativo' })
        @Max(10000, { message: 'El precio no puede exceder los 10000' })
        price: number;

        @IsArray()
        @ArrayNotEmpty()
        @IsInt({ each: true, message: 'Cada ID de tema debe ser un número entero' })
        topicIds: number[];
    
}

