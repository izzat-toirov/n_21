
import { PartialType } from '@nestjs/swagger';
import { CreateKurierDto } from './create-kurier.dto';

export class UpdateKurierDto extends PartialType(CreateKurierDto) {}
