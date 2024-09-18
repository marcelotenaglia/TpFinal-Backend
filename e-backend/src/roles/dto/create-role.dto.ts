import { IsString, Length,IsNotEmpty } from "class-validator";


export class CreateRoleDto {
@IsString()
@IsNotEmpty({ message: 'El nombre del tema es obligatorio' })
@Length(1,15)
name: string;

}
