import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class orderService {
  constructor(@Inject('ORDER_SERVICE') private readonly Service: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  //////////// Order Service ////////////

  addOrder(data): Observable<any> {
    return this.Service.send({ cmd: 'order/add' }, data);
  }

  getOrder(data: number): Observable<string> {
    return this.Service.send({ cmd: 'order/get' }, data);
  }

  updateOrder(data: any): Observable<any> {
    return this.Service.send({ cmd: 'order/update' }, data);
  }

  deleteOrder(data: number): Observable<any> {
    return this.Service.send({ cmd: 'order/delete' }, data);
  }
}
