import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CompeticionesService } from './competiciones.service';
import type { Competicion } from './competiciones.service';
import { CreateCompeticionDto } from './dto/create-competicion.dto';

@Controller('competiciones')
export class CompeticionesController {
  constructor(private readonly competicionesService: CompeticionesService) {}

  @Get()
  findAll(): Competicion[] {
    return this.competicionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Competicion {
    return this.competicionesService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateCompeticionDto): Competicion {
    return this.competicionesService.create(createDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.competicionesService.remove(id);
  }
}