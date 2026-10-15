import { Controller, Get, Post, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { AutosService } from './autos.service';
import type { Auto } from '../entities/auto.entity';
import { CreateAutoDto } from './dto/create-auto.dto';

@Controller('autos')
export class AutosController {
  constructor(private readonly autosService: AutosService) {}

  @Get()
  findAll(@Query('piloto') piloto?: string): Promise<Auto[]> {
    return this.autosService.findAll(piloto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Auto> {
    return this.autosService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateAutoDto): Promise<Auto> {
    return this.autosService.create(createDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.autosService.remove(id);
  }
}
