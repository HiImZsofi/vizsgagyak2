import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  license_plate_number: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  daily_cost: number;
}
