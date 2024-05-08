import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'user/add' })
  addUser(data: any): boolean {
    return this.appService.addUser(data);
  }

  @MessagePattern({ cmd: 'user/get' })
  async getUser(id: number): Promise<any> {
    return await this.appService.getUser(id);
  }

  @MessagePattern({ cmd: 'user/update' })
  async updateUser(id: number, data: any): Promise<string> {
    return await this.appService.updateUser(id, data);
  }

  @MessagePattern({ cmd: 'user/delete' })
  deleteUser(id: number): string {
    return this.appService.deleteUser(id);
  }
}
