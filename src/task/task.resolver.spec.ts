import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectIdScalar } from 'src/graphql/scalars/object-id.scalar';
import { CreateTaskDto, UpdateTaskDto } from './dtos/task.dto';
import { Task } from './models/task.model';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { TaskModel } from './test/task.mock';
import { taskStub } from './test/task.stub';

describe('TaskResolver', () => {
  let resolver: TaskResolver;
  let service: TaskService;

  describe('find operators', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ObjectIdScalar, TaskResolver, TaskRepository, TaskService],
      }).compile();

      resolver = module.get<TaskResolver>(TaskResolver);
      service = module.get<TaskService>(TaskService);

      jest.clearAllMocks();
    });

    describe('list', () => {
      describe('when list is called', () => {
        let list: Task[];

        beforeEach(async () => {
          jest.spyOn(service, 'list');
          list = await resolver.list();
        });

        test('then it should call service.list', () => {
          expect(service.list).toHaveBeenCalled();
        });

        test('then it should return task list', () => {
          expect(list).toEqual([taskStub()]);
        });
      });
    });

    describe('getById', () => {
      describe('when getById is called', () => {
        let obj: Task;

        beforeEach(async () => {
          jest.spyOn(service, 'getById');
          obj = await resolver.getById(taskStub()._id);
        });

        test('then it should call service.getById', () => {
          expect(service.getById).toBeCalledWith(taskStub()._id);
        });

        test('then is should return a task', () => {
          expect(obj).toEqual(taskStub());
        });
      });
    });

    describe('update', () => {
      describe('when update is called', () => {
        let obj: Task;
        let updateDto: UpdateTaskDto;

        beforeEach(async () => {
          jest.spyOn(service, 'update');
          updateDto = {
            description: taskStub().description,
          };
          obj = await resolver.update(taskStub()._id, updateDto);
        });

        test('then it should call service.update', () => {
          expect(service.update).toBeCalledWith(taskStub()._id, updateDto);
        });

        test('then is should return a task', () => {
          expect(obj).toEqual(taskStub());
        });
      });
    });

    describe('delete', () => {
      describe('when delete is called', () => {
        let obj: Task;

        beforeEach(async () => {
          jest.spyOn(service, 'delete');
          obj = await resolver.delete(taskStub()._id);
        });

        test('then it should call service.delete', () => {
          expect(service.delete).toBeCalledWith(taskStub()._id);
        });

        test('then is should return a task', () => {
          expect(obj).toEqual(taskStub());
        });
      });
    });

    describe('updateCompleteStatus', () => {
      describe('when updateCompleteStatus is called', () => {
        let obj: Task;

        beforeEach(async () => {
          jest.spyOn(service, 'updateCompleteStatus');
          obj = await resolver.updateCompleteStatus(taskStub()._id);
        });

        test('then it should call service.updateCompleteStatus', () => {
          expect(service.updateCompleteStatus).toBeCalledWith(taskStub()._id);
        });

        test('then is should return a task', () => {
          expect(obj).toEqual(taskStub());
        });
      });
    });
  });

  describe('create operators', () => {
    let repository: TaskRepository;

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        providers: [
          TaskResolver,
          TaskRepository,
          TaskService,
          {
            provide: getModelToken(Task.name),
            useValue: TaskModel,
          },
        ],
      }).compile();

      resolver = module.get<TaskResolver>(TaskResolver);
      service = module.get<TaskService>(TaskService);
      repository = module.get<TaskRepository>(TaskRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let obj: Task;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;
        let createDto: CreateTaskDto;

        beforeEach(async () => {
          saveSpy = jest.spyOn(TaskModel.prototype, 'save');
          constructorSpy = jest.spyOn(TaskModel.prototype, 'constructorSpy');
          jest.spyOn(service, 'create');
          jest.spyOn(repository, 'create');
          createDto = {
            description: taskStub().description,
          };
          obj = await resolver.create(createDto);
        });

        test('then it should call service.create', () => {
          expect(service.create).toHaveBeenCalledWith(createDto);
        });

        test('then it should call repository.create', () => {
          expect(repository.create).toHaveBeenCalled();
        });

        test('then it should call the taskModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalled();
        });

        test('then it should return a task', () => {
          expect(obj).toEqual(taskStub());
        });
      });
    });
  });
});
