import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/configuration.module';
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, GraphqlModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
