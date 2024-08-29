import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMediaDto } from './create-user_media.dto';

export class UpdateUserMediaDto extends PartialType(CreateUserMediaDto) {}
