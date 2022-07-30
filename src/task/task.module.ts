import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectIdScalar } from 'src/graphql/scalars/object-id.scalar';
import { Task, TaskSchema } from './models/task.model';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  providers: [ObjectIdScalar, TaskResolver, TaskRepository, TaskService],
})
export class TaskModule {}
