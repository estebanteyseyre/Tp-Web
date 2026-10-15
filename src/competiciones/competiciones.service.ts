import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Competicion } from '../entities/competicion.entity';
import { CreateCompeticionDto } from './dto/create-competicion.dto';

@Injectable()
export class CompeticionesService {
  constructor(
    @InjectRepository(Competicion)
    private competicionesRepository: Repository<Competicion>,
  ) {}

  async findAll(nombre?: string): Promise<Competicion[]> {
    if (nombre) {
      return this.competicionesRepository.find({
        where: { nombre: Like(`%${nombre}%`) },
        relations: { autos: true },
      });
    }
    return this.competicionesRepository.find({ relations: { autos: true } });
  }

  async findOne(id: number): Promise<Competicion> {
    const competicion = await this.competicionesRepository.findOne({
      where: { id },
      relations: { autos: true },
    });
    if (!competicion) {
      throw new NotFoundException(`Competición con ID ${id} no encontrada`);
    }
    return competicion;
  }

  async create(createDto: CreateCompeticionDto): Promise<Competicion> {
    const competicion = this.competicionesRepository.create(createDto);
    return this.competicionesRepository.save(competicion);
  }

  async remove(id: number): Promise<void> {
    const result = await this.competicionesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Competición con ID ${id} no encontrada`);
    }
  }
}
