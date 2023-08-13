import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';

@Entity({ name: 'todos' })
export class Todo {
  @Transform(({ value }) => +value)
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('longtext')
  body: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  readonly updatedAt: Date;
}
