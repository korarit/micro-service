import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { userService } from './service/user.service';
import { productService } from './service/product.service';

import { GlobalClientModule } from './client.module';

@Module({
  imports: [GlobalClientModule],
  controllers: [AppController],
  providers: [userService, productService],
})
export class AppModule {}
