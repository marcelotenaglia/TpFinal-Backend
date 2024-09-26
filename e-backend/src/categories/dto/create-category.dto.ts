import { IsString, MaxLength, IsNotEmpty } from "class-validator";
export class CreateCategoryDto {
    
    @IsString ({ message: 'El nombre de la categoria debe ser una cadena de texto' })
    @IsNotEmpty ({ message: 'El nombre de la categoria es obligatorio'})
    @MaxLength (100, {message: 'El nombre de la categoria no puede exceder los 100 caracteres'})
    category: string;
    
}
