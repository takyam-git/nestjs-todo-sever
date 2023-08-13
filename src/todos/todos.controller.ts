import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoIndexTransformInterceptor } from './interceptors/todo.index.interceptor';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createTodoDto: CreateTodoDto) {
    const insertId = await this.todosService.create(createTodoDto);
    return await this.todosService.findOne(insertId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(TodoIndexTransformInterceptor)
  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todosService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(204)
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    await this.todosService.update(+id, updateTodoDto);
    return {};
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.todosService.remove(+id);
    return {};
  }
}
