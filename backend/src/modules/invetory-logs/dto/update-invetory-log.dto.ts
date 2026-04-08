import { PartialType } from '@nestjs/mapped-types';
import { CreateInvetoryLogDto } from './create-invetory-log.dto';

export class UpdateInvetoryLogDto extends PartialType(CreateInvetoryLogDto) {}
