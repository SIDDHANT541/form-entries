import { PartialType } from '@nestjs/mapped-types';
import { CreateFormEntryDto } from './create-form-entry.dto';

export class UpdateFormEntryDto extends PartialType(CreateFormEntryDto) { }

