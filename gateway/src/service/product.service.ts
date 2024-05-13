import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class productService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly Service: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  //////////// Product Service ////////////

  addProduct(data): Observable<any> {
    return this.Service.send({ cmd: 'product/add' }, data);
  }

  getProduct(data: number): Observable<string> {
    return this.Service.send({ cmd: 'product/get' }, data);
  }

  updateProduct(data: any): Observable<any> {
    return this.Service.send({ cmd: 'product/update' }, data);
  }

  deleteProduct(data: number): Observable<any> {
    return this.Service.send({ cmd: 'product/delete' }, data);
  }
}
