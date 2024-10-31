
import  { IsString, IsNotEmpty, MaxLength, Min,Max,IsOptional,IsInt, IsNumber,IsArray, ArrayNotEmpty,IsDateString, IsPassportNumber, IsUrl} from 'class-validator';
//import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';




    export class CreateCourseDto {
        @IsString({ message: 'El título debe ser una cadena de texto' })
        @IsNotEmpty({ message: 'El título es obligatorio', always: true })
        @MaxLength(100, { message: 'El título no puede exceder los 100 caracteres' })
        title: string;
    
        @IsString({ message: 'La descripción debe ser un texto' })
        @IsNotEmpty({ message: 'La descripción es obligatoria', always: true })
        description: string;
    
        @IsInt({ message: 'La duración debe ser un número entero' })
        @Type(() => Number)
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
        @Type(() => Number)
        category_id: number;

        @IsOptional()
        @IsInt({ message: 'El Instructor debe ser un número entero' })
        @Type(() => Number)
        instructor_id: number;
    
        @Type(() => Number)
        @IsNumber(
            { maxDecimalPlaces: 2 },
            { message: 'El precio debe ser un número con hasta 2 decimales' }
        )
        @IsNotEmpty({ message: 'El precio es obligatorio', always: true })
        @Min(0, { message: 'El precio no puede ser negativo' })
        @Max(10000, { message: 'El precio no puede exceder los 10000' })
        price: number;
        

       @IsOptional()
        @IsArray()
        @ArrayNotEmpty()
        @IsInt({ each: true, message: 'Cada ID de tema debe ser un número entero' })
        @Type(() => Number)
        topicIds? : number[];


        @IsString()
        @IsOptional()
        filename: string;

        @IsOptional()
        @IsString()
        @IsUrl({}, { message: 'Debe ser una URL válida' })
        videoUrl: string;

      /*  @IsOptional()
        @IsDateString()
        startdate: string; //"YYYY-MM-DD" 
        
        @IsOptional()
        @IsDateString()
        enddate: string; //"YYYY-MM-DD" */
        
    
    }

