import { PartialType } from '@nestjs/mapped-types';
import { CreateBuyCourseDto } from './create-buy_course.dto';

export class UpdateBuyCourseDto extends PartialType(CreateBuyCourseDto) {}
