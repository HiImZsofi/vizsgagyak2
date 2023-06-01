import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Rental } from './rental/entities/rental.entity';
import { Car } from './car/entities/car.entity';
import { faker } from '@faker-js/faker';
import { ReturnCarDto } from './car/dto/return-car.dto';
import { CreateCarDto } from './car/dto/create-car.dto';
import {response} from "express";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Post('/seed')
  async seed() {
    const rentalRepo = this.dataSource.getRepository(Rental);
    const carRepo = this.dataSource.getRepository(Car);

    for (let i = 0; i < 15; i++) {
      const rental = new Rental();
      rental.car_id = faker.datatype.number({ min: 1, max: 30 });
      rental.end_date = faker.date.soon(30);
      rental.start_date = faker.date.recent(30);
      await rentalRepo.save(rental);
    }
  }

  @Get('/api/cars')
  getCarData(@Body() returnCarDto: ReturnCarDto) {
    const carsRepo = this.dataSource.getRepository(Car);
    const { id, license_plate_number, brand, model, daily_cost } = returnCarDto;
    return carsRepo.find({
      select: ['id', 'license_plate_number', 'brand', 'model', 'daily_cost'],
    });
  }

  @Post('/api/cars')
  async createCar(@Body() createCarDto: CreateCarDto) {
    const carsRepo = this.dataSource.getRepository(Car);
    const car = new Car();
    car.license_plate_number = createCarDto.license_plate_number;
    car.brand = createCarDto.brand;
    car.model = createCarDto.model;
    car.daily_cost = createCarDto.daily_cost;
    const now = new Date();
    car.created_at = now;
    await carsRepo.save(car);
  }

  @Post('/api/cars/:id/rent')
  async rentCar(@Param('id') id: number) {
    const rentalRepo = this.dataSource.getRepository(Rental);
    const now = new Date();
    const rental = new Rental();
    if (await rentalRepo.findOneById(id)) {
      response.statusCode = 409;
    }
    rental.car_id = id;
    rental.start_date = now;
    rental.end_date = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    await rentalRepo.save(rental);
  }
}
