import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { productProviders } from './product.providers';

import { AppController } from './product.controller';
import { AppService } from './product.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [...productProviders, AppService],
})
export class AppModule {}
