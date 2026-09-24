import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompeticionDto } from './dto/create-competicion.dto';

export interface Competicion {
  id: number;
  nombre: string;
  premio: string;
  fecha: string;
  lugar: string;
}

@Injectable()
export class CompeticionesService {
  private competiciones: Competicion[] = [
    { id: 1, nombre: 'Gran Premio F1', premio: 'Copa de Oro', fecha: '2026-10-15', lugar: 'Autódromo Juan y Oscar Gálvez' },
  ];
  private idCounter = 2;

  findAll(): Competicion[] {
    return this.competiciones;
  }

  findOne(id: number): Competicion {
    const competicion = this.competiciones.find((c) => c.id === id);
    if (!competicion) {
      throw new NotFoundException(`Competición con ID ${id} no encontrada`);
    }
    return competicion;
  }

  create(createDto: CreateCompeticionDto): Competicion {
    const nuevaCompeticion: Competicion = {
      id: this.idCounter++,
      ...createDto,
    };
    this.competiciones.push(nuevaCompeticion);
    return nuevaCompeticion;
  }

  remove(id: number): void {
    const index = this.competiciones.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Competición con ID ${id} no encontrada`);
    }
    this.competiciones.splice(index, 1);
  }
}