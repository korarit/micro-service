import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { userProviders } from './user.providers';

import { AppController } from './user.controller';
import { AppService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [...userProviders, AppService],
})
export class AppModule {}
