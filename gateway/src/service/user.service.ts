import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class userService {
  constructor(@Inject('USER_SERVICE') private readonly Service: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  //////////// User Service ////////////

  addUser(data: any): Observable<any> {
    return this.Service.send({ cmd: 'user/add' }, data);
  }

  getUser(data: number): Observable<string> {
    return this.Service.send({ cmd: 'user/get' }, data);
  }

  updateUser(data: any): Observable<any> {
    return this.Service.send({ cmd: 'user/update' }, data);
  }

  deleteUser(data: number): Observable<any> {
    return this.Service.send({ cmd: 'user/delete' }, data);
  }
}
