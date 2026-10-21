import { PartialType } from '@nestjs/mapped-types';
import { CreateCompeticionDto } from './create-competicion.dto';

export class UpdateCompeticionDto extends PartialType(CreateCompeticionDto) {}
