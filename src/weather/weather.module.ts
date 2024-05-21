import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { Weather } from './weather.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Weather]),
    HttpModule,
    ConfigModule
  ],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
