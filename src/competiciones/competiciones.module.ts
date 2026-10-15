import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompeticionesController } from './competiciones.controller';
import { CompeticionesService } from './competiciones.service';
import { Competicion } from '../entities/competicion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Competicion])],
  controllers: [CompeticionesController],
  providers: [CompeticionesService],
})
export class CompeticionesModule {}
