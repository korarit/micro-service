import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { userProviders } from './user.providers';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [...userProviders, AppService],
})
export class AppModule {}
