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
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly userClass: userService,
    private readonly productClass: productService,
  ) {}

  @Get()
  getHello(): string {
    return this.userClass.getHello();
  }

  //////////// User Service ////////////

  @Post('user')
  addUser(@Body() { data }): Observable<any> {
    return this.userClass.addUser(data);
  }

  @Get('user/:id')
  getUser(@Param('id') id: number): Observable<string> {
    return this.userClass.getUser(id);
  }

  @Put('user')
  updateUser(@Body() { data }): Observable<any> {
    return this.userClass.updateUser(data);
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: number): Observable<string> {
    return this.userClass.deleteUser(id);
  }

  //////////// Product Service ////////////
  @Post('product')
  addProduct(@Body() { data }): Observable<any> {
    return this.productClass.addProduct(data);
  }

  @Get('product/:id')
  getProduct(@Param('id') id: number): Observable<string> {
    return this.productClass.getProduct(id);
  }

  @Put('product')
  updateProduct(@Body() { data }): Observable<any> {
    return this.productClass.updateProduct(data);
  }

  @Delete('product/:id')
  deleteProduct(@Param('id') id: number): Observable<string> {
    return this.productClass.deleteProduct(id);
  }
}
