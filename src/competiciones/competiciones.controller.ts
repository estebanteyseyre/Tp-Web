import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { CompeticionesService } from './competiciones.service';
import type { Competicion } from '../entities/competicion.entity';
import { CreateCompeticionDto } from './dto/create-competicion.dto';
import { UpdateCompeticionDto } from './dto/update-competicion.dto';

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

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCompeticionDto,
  ): Promise<Competicion> {
    return this.competicionesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.competicionesService.remove(id);
  }
}
