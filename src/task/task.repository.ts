import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/task/models/task.model';
import { EntityRepository } from 'src/database/repositories/entity.repository';

@Injectable()
export class TaskRepository extends EntityRepository<TaskDocument> {
  constructor(@InjectModel(Task.name) TaskModel: Model<TaskDocument>) {
    super(TaskModel);
  }
}
