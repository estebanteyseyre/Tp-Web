import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateAutoDto {
  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  numero: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  potencia: number;

  @IsString()
  @IsNotEmpty()
  piloto: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  competicionId: number;
}
