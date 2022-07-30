import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';
import { ObjectIdScalar } from 'src/graphql/scalars/object-id.scalar';

@ObjectType()
@Schema({
  timestamps: true,
})
export class Task {
  @Field(() => ObjectIdScalar)
  _id: MongooseTypes.ObjectId;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => Boolean)
  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  isCompleted: boolean;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
