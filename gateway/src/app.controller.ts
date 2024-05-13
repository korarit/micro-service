import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { userService } from './service/user.service';
import { productService } from './service/product.service';
import { orderService } from './service/order.service';

import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly userClass: userService,
    private readonly productClass: productService,
    private readonly orderClass: orderService,
  ) {}

  @Get()
  getHello(): string {
    return this.userClass.getHello();
  }

  //////////// User Service ////////////

  @Post('user')
  async addUser(@Body() { data }): Promise<any | string> {
    if (!data) {
      return 'Data not found';
    }
    return await this.userClass.addUser(data);
  }

  @Get('user/:id')
  getUser(@Param('id') id: number): Observable<string> | string {
    if (!id) {
      return 'ID not found';
    }
    return this.userClass.getUser(id);
  }

  @Put('user')
  updateUser(@Body() { data }): Observable<any> | string {
    if (!data) {
      return 'Data not found';
    }
    return this.userClass.updateUser(data);
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: number): Observable<string> | string {
    if (!id) {
      return 'ID not found';
    }
    return this.userClass.deleteUser(id);
  }

  //////////// Product Service ////////////
  @Post('product')
  addProduct(@Body() { data }): Observable<any> | string {
    if (!data) {
      return 'Data not found';
    }
    return this.productClass.addProduct(data);
  }

  @Get('product/:id')
  getProduct(@Param('id') id: number): Observable<string> | string {
    if (!id) {
      return 'ID not found';
    }
    return this.productClass.getProduct(id);
  }

  @Put('product')
  updateProduct(@Body() { data }): Observable<any> | string {
    if (!data) {
      return 'Data not found';
    }
    return this.productClass.updateProduct(data);
  }

  @Delete('product/:id')
  deleteProduct(@Param('id') id: number): Observable<string> | string {
    if (!id) {
      return 'ID not found';
    }
    return this.productClass.deleteProduct(id);
  }

  //////////// Order Service ////////////
  @Post('order')
  addOrder(@Body() { data }): Observable<any> {
    return this.orderClass.addOrder(data);
  }

  @Get('order/:id')
  getOrder(@Param('id') id: number): Observable<string> {
    return this.orderClass.getOrder(id);
  }

  @Put('order')
  updateOrder(@Body() { data }): Observable<any> {
    return this.orderClass.updateOrder(data);
  }

  @Delete('order/:id')
  deleteOrder(@Param('id') id: number): Observable<string> {
    return this.orderClass.deleteOrder(id);
  }
}
