import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthyDto } from './create-healthy.dto';

export class UpdateHealthyDto extends PartialType(CreateHealthyDto) {}
