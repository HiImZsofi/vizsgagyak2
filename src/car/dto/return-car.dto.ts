import { IsNotEmpty } from 'class-validator';

export class ReturnCarDto {
  id: number;

  license_plate_number: string;

  brand: string;

  model: string;

  daily_cost: number;
}
