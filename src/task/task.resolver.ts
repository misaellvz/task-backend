import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'src/database/repositories/entity.repository';
import { ObjectIdScalar } from 'src/graphql/scalars/object-id.scalar';
import { CreateTaskDto, UpdateTaskDto } from './dtos/task.dto';
import { Task } from './models/task.model';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly service: TaskService) {}

  @Query(() => [Task], { name: 'tasks' })
  async list(): Promise<Task[]> {
    return await this.service.list();
  }

  @Query(() => Task, { name: 'task' })
  async getById(
    @Args({ name: 'id', type: () => ObjectIdScalar })
    id: ObjectId,
  ): Promise<Task> {
    return await this.service.getById(id);
  }

  @Mutation(() => Task, { name: 'createTask' })
  async create(
    @Args({ name: 'input', type: () => CreateTaskDto })
    input: CreateTaskDto,
  ) {
    return await this.service.create(input);
  }

  @Mutation(() => Task, { name: 'updateTask' })
  async update(
    @Args({ name: 'id', type: () => ObjectIdScalar })
    id: ObjectId,
    @Args({ name: 'input', type: () => UpdateTaskDto })
    input: UpdateTaskDto,
  ) {
    return await this.service.update(id, input);
  }

  @Mutation(() => Task, { name: 'deleteTask' })
  async delete(
    @Args({ name: 'id', type: () => ObjectIdScalar })
    id: ObjectId,
  ) {
    return await this.service.delete(id);
  }

  @Mutation(() => Task, { name: 'updateTaskCompleteStatus' })
  async updateCompleteStatus(
    @Args({ name: 'id', type: () => ObjectIdScalar })
    id: ObjectId,
  ) {
    return await this.service.updateCompleteStatus(id);
  }
}
