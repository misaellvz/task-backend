import { NotFoundException } from '@nestjs/common';
import {
  AnyKeys,
  AnyObject,
  Document,
  FilterQuery,
  HydratedDocument,
  Model,
  Types,
  _UpdateQueryDef,
} from 'mongoose';

function checkNotFound<T extends Document>(
  item: HydratedDocument<T, any, any>,
): HydratedDocument<T, any, any> {
  if (!item) {
    throw new NotFoundException('¡Elemento no encontrado!');
  }
  return item;
}

export type ObjectId = Types.ObjectId;

export class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async create(createDto: unknown): Promise<T> {
    const entity = new this.entityModel(createDto);
    return entity.save();
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  async findById(id: ObjectId): Promise<T> {
    const item = await this.entityModel.findById(id);
    return checkNotFound(item);
  }

  async findByIdAndDelete(id: ObjectId): Promise<T> {
    const item = await this.entityModel.findByIdAndDelete(id);
    return checkNotFound(item);
  }

  async findByIdAndUpdate(
    id: ObjectId,
    updateDto: AnyKeys<_UpdateQueryDef<T>> & AnyObject,
  ): Promise<T | null> {
    const item = await this.entityModel.findByIdAndUpdate(
      id,
      {
        $set: updateDto,
      },
      {
        new: true,
      },
    );
    return checkNotFound(item);
  }
}
