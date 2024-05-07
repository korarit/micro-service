import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy,
    @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  //////////// User Service ////////////

  addUser(data): Observable<any> {
    return this.userService.send({ cmd: 'user/add' }, data);
  }

  getUser(data): Observable<string> {
    return this.userService.send({ cmd: 'user/get' }, data);
  }

  updateUser(data): Observable<any> {
    return this.userService.send({ cmd: 'user/update' }, data);
  }

  deleteUser(data): Observable<any> {
    return this.userService.send({ cmd: 'user/delete' }, data);
  }
}
