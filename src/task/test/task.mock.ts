import { getModelToken } from '@nestjs/mongoose';
import { MockModel } from 'src/database/test/mock.model';
import { Task } from 'src/task/models/task.model';
import { taskStub } from './task.stub';

export class TaskModel extends MockModel<Task> {
  protected entityStub = taskStub();
}

export const taskMockProvider = {
  provide: getModelToken(Task.name),
  useClass: TaskModel,
};
