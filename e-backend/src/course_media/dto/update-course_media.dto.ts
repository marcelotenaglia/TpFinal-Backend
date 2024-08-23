import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseMediaDto } from './create-course_media.dto';

export class UpdateCourseMediaDto extends PartialType(CreateCourseMediaDto) {}
