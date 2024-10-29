import { IsString, MaxLength, IsNotEmpty } from "class-validator";
export class CreateCategoryDto {
    
    @IsString ({ message: 'El nombre de la categoria debe ser una cadena de texto' })
    @IsNotEmpty ({ message: 'El nombre de la categoria es obligatorio'})
    @MaxLength (100, {message: 'El nombre de la categoria no puede exceder los 100 caracteres'})
    category: string;
    
    @IsString ({ message: 'Los requisitos de la categoria deben ser una cadena de texto' })
    @IsNotEmpty ({ message: 'Los requisitos de la categoria son obligatorios'})
    @MaxLength (255, {message: 'Los requisitos de la categoria no pueden exceder los 255 caracteres'})
    requisitos: string;

    @IsString ({ message: 'La certificación de la categoria debe ser una cadena de texto' })
    @IsNotEmpty ({ message: 'La certificación de la categoria es obligatoria'})
    @MaxLength (255, {message: 'La certificación de la categoria no puede exceder los 255 caracteres'})
    certificacion: string;

}
