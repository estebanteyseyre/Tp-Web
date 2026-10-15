import { Controller, Get, Post, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { CompeticionesService } from './competiciones.service';
import type { Competicion } from '../entities/competicion.entity';
import { CreateCompeticionDto } from './dto/create-competicion.dto';

@Controller('competiciones')
export class CompeticionesController {
  constructor(private readonly competicionesService: CompeticionesService) {}

  @Get()
  findAll(@Query('nombre') nombre?: string): Promise<Competicion[]> {
    return this.competicionesService.findAll(nombre);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Competicion> {
    return this.competicionesService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateCompeticionDto): Promise<Competicion> {
    return this.competicionesService.create(createDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.competicionesService.remove(id);
  }
}
