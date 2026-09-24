import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Competicion } from './entities/competicion.entity';
import { Auto } from './entities/auto.entity';
import { CompeticionesModule } from './competiciones/competiciones.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'backend-competicion',
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
