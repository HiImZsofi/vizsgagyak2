import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from '../../car/entities/car.entity';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  car_id: number;

  @CreateDateColumn()
  start_date: Date;

  @CreateDateColumn()
  end_date: Date;

  @OneToMany(() => Car, (car) => car.id)
  car: Car;
}
