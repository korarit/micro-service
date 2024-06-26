import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

import { userService } from './service/user.service';
import { productService } from './service/product.service';
import { orderService } from './service/order.service';

// import { LoginService } from './service/login.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [userService, productService, orderService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
