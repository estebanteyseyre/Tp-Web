import { Module } from '@nestjs/common';
import { CompeticionesController } from './competiciones.controller';
import { CompeticionesService } from './competiciones.service';

@Module({
  controllers: [CompeticionesController],
  providers: [CompeticionesService],
})
export class CompeticionesModule {}
