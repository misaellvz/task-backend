import { Injectable } from '@nestjs/common';
import { ObjectId } from 'src/database/repositories/entity.repository';
import { CreateTaskDto, UpdateTaskDto } from './dtos/task.dto';
import { Task, TaskDocument } from './models/task.model';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async create(createDto: CreateTaskDto): Promise<TaskDocument> {
    return await this.repository.create(createDto);
  }

  async list(): Promise<TaskDocument[]> {
    return await this.repository.find({});
  }

  async getById(id: ObjectId): Promise<TaskDocument> {
    return await this.repository.findById(id);
  }

  async update(id: ObjectId, updateDto: UpdateTaskDto): Promise<TaskDocument> {
    return await this.repository.findByIdAndUpdate(id, updateDto);
  }

  async delete(id: ObjectId): Promise<TaskDocument> {
    return await this.repository.findByIdAndDelete(id);
  }

  async updateCompleteStatus(id: ObjectId): Promise<TaskDocument> {
    const obj: Task = await this.repository.findById(id);
    const updateDto = {
      isCompleted: !obj.isCompleted,
    };
    return this.repository.findByIdAndUpdate(id, updateDto);
  }
}
