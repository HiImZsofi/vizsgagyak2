import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rental } from '../../rental/entities/rental.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  license_plate_number: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  daily_cost: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Rental, (rental) => rental.car_id)
  rental: Rental;
}
