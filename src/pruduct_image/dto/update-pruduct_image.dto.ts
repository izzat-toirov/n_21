import { PartialType } from '@nestjs/swagger';
import { CreatePruductImageDto } from './create-pruduct_image.dto';

export class UpdatePruductImageDto extends PartialType(CreatePruductImageDto) {}
