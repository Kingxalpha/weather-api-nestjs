import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column()
  temperature: number;

  @Column()
  description: string;

  @Column()
  date: Date;
}
