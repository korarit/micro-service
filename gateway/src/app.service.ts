import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly paymentClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly orderClient: ClientProxy,
    @Inject('ORDER_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  //////////// User Service ////////////

  addUser(data): Observable<any> {
    return this.paymentClient.send({ cmd: 'user/add' }, data);
  }

  getUser(data): Observable<string> {
    return this.orderClient.send({ cmd: 'user/get' }, data);
  }

  updateUser(data): Observable<any> {
    return this.cartClient.send({ cmd: 'user/update' }, data);
  }

  deleteUser(data): Observable<any> {
    return this.cartClient.send({ cmd: 'user/delete' }, data);
  }
}
