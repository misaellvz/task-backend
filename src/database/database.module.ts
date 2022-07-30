import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG, Config } from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [CONFIG],
      useFactory: (conf: Config) => {
        const { DB_HOST, DB_NAME, DB_PASS, DB_USER } = conf;
        return {
          uri: DB_HOST,
          user: DB_USER,
          pass: DB_PASS,
          dbName: DB_NAME,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
