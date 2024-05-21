import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weather } from './weather.entity'
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
    private readonly configService: ConfigService
  ) {}

  async getWeatherByLocation(location: string): Promise<any> {
    const apiKey = this.configService.get<String>('API_KEYS');
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    const response = await lastValueFrom(this.httpService.get(url));
    const data = response.data;

    const weather = new Weather();
    weather.location = location;
    weather.temperature = data.main.temp;
    weather.description = data.weather[0].description;
    weather.date = new Date();

    await this.weatherRepository.save(weather);

    return data;
  }
}

