import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  // CREATE
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  // READ ALL
  async findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // READ ONE
  async findOne(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  // UPDATE
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  // DELETE
  async remove(id: number): Promise<void> {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
  }
}
