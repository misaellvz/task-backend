import { Types } from 'mongoose';
import { Task } from 'src/task/models/task.model';

export const taskStub = (): Task => {
  return {
    _id: new Types.ObjectId('62e49e425ac47fb368096014'),
    description: 'description',
    isCompleted: false,
  };
};
