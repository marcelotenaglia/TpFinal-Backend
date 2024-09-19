import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCourseTopicDto {

    @IsNumber({}, { message: 'El ID del curso debe ser un número' })
    @IsNotEmpty({ message: 'El ID del curso es obligatorio' })
    course_id: number;

    @IsNumber({}, { message: 'El ID del tema debe ser un número' })
    @IsNotEmpty({ message: 'El ID del tema es obligatorio' })
    topic_id: number;
}
