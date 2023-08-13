import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<number> {
    const result = await this.todoRepository
      .createQueryBuilder()
      .insert()
      .into(Todo)
      .values([createTodoDto])
      .execute();
    return result.raw.insertId as number;
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    return await this.todoRepository.findOneBy({ id });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const result = await this.todoRepository.update(id, updateTodoDto);
    return result.affected === 1;
  }

  async remove(id: number) {
    return await this.todoRepository.delete(id);
  }
}
