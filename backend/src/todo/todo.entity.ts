import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('todos')
export class TodoEntity {
  @ApiProperty({ example: 1, description: 'The unique identifier of the todo' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Buy groceries', description: 'The todo text/title' })
  @Column()
  text: string;

  @ApiProperty({ example: false, description: 'Whether the todo is completed' })
  @Column({ default: false })
  completed: boolean;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:35:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
