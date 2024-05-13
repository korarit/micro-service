import { Module } from '@nestjs/common';
import { GlobalClientModule } from './client.module';

import { DatabaseModule } from './database.module';
import { productProviders } from './order.providers';

import { AppController } from './order.controller';
import { AppService } from './order.service';

@Module({
  imports: [DatabaseModule, GlobalClientModule],
  controllers: [AppController],
  providers: [...productProviders, AppService],
})
export class AppModule {}
