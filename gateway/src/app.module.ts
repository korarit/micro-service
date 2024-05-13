import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { userService } from './service/user.service';
import { productService } from './service/product.service';

// import { LoginService } from './service/login.service';

import { GlobalClientModule } from './client.module';
import { orderService } from './service/order.service';

@Module({
  imports: [GlobalClientModule],
  controllers: [AppController],
  providers: [userService, productService, orderService],
})
export class AppModule {}
