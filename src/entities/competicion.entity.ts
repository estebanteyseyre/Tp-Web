import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Auto } from './auto.entity';

@Entity()
export class Competicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  premio: string;

  @Column()
  fecha: string;

  @Column()
  lugar: string;

  @OneToMany(() => Auto, (auto) => auto.competicion)
  autos: Auto[];
}
