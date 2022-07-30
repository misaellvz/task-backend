import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @Field(() => String)
  readonly description: string;
}

@InputType()
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @Field(() => String)
  readonly description: string;
}
