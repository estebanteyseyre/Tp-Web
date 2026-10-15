import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Competicion } from './entities/competicion.entity';
import { Auto } from './entities/auto.entity';
import { CompeticionesModule } from './competiciones/competiciones.module';
import { AutosModule } from './autos/autos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hibernate',
      database: 'competicion_db',
      entities: [Competicion, Auto],
      synchronize: true,
    }),
    CompeticionesModule,
    AutosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
