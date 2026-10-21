import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Auto } from '../entities/auto.entity';
import { Competicion } from '../entities/competicion.entity';
import { CreateAutoDto } from './dto/create-auto.dto';
import { UpdateAutoDto } from './dto/update-auto.dto';

@Injectable()
export class AutosService {
  constructor(
    @InjectRepository(Auto)
    private autosRepository: Repository<Auto>,
    @InjectRepository(Competicion)
    private competicionesRepository: Repository<Competicion>,
  ) {}

  async findAll(piloto?: string): Promise<Auto[]> {
    if (piloto) {
      return this.autosRepository.find({
        where: { piloto: Like(`%${piloto}%`) },
        relations: { competicion: true },
      });
    }
    return this.autosRepository.find({ relations: { competicion: true } });
  }

  async findOne(id: number): Promise<Auto> {
    const auto = await this.autosRepository.findOne({
      where: { id },
      relations: { competicion: true },
    });
    if (!auto) {
      throw new NotFoundException(`Auto con ID ${id} no encontrado`);
    }
    return auto;
  }

  async create(createDto: CreateAutoDto): Promise<Auto> {
    const competicion = await this.competicionesRepository.findOneBy({
      id: createDto.competicionId,
    });
    if (!competicion) {
      throw new BadRequestException(`Competición con ID ${createDto.competicionId} no encontrada`);
    }

    const auto = this.autosRepository.create({
      ...createDto,
      competicion,
    });
    return this.autosRepository.save(auto);
  }

  async update(id: number, updateDto: UpdateAutoDto): Promise<Auto> {
    const auto = await this.findOne(id);

    if (updateDto.competicionId) {
      const competicion = await this.competicionesRepository.findOneBy({
        id: updateDto.competicionId,
      });
      if (!competicion) {
        throw new BadRequestException(`Competición con ID ${updateDto.competicionId} no encontrada`);
      }
      auto.competicion = competicion;
    }

    Object.assign(auto, updateDto);
    return this.autosRepository.save(auto);
  }

  async remove(id: number): Promise<void> {
    const result = await this.autosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Auto con ID ${id} no encontrado`);
    }
  }
}
