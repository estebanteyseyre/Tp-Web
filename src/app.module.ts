import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Competicion } from './entities/competicion.entity';
import { Auto } from './entities/auto.entity';
import { CompeticionesModule } from './competiciones/competiciones.module';
import { AutosModule } from './autos/autos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Competicion, Auto],
        synchronize: true,
      }),
    }),
    CompeticionesModule,
    AutosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}