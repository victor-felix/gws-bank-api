/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('NODE_ENV') === 'test'
            ? configService.get<string>('MONGO_URI_TEST')
            : configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
