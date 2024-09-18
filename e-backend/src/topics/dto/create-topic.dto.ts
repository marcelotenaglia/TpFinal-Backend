import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTopicDto {
    @IsString({ message: 'El nombre del tema debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre del tema es obligatorio' })
    @MaxLength(100, { message: 'El nombre del tema no puede exceder los 100 caracteres' })
    topic: string;
}
