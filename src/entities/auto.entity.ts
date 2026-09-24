import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Competicion } from './competicion.entity';

@Entity()
export class Auto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelo: string;

  @Column()
  marca: string;

  @Column()
  numero: number;

  @Column()
  potencia: number;

  @Column()
  piloto: string;

  @Column()
  categoria: string;

  @ManyToOne(() => Competicion, (competicion) => competicion.autos, { onDelete: 'CASCADE' })
  competicion: Competicion;
}