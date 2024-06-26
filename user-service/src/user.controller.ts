import { Controller } from '@nestjs/common';
import { AppService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @MessagePattern({ cmd: 'user/add' })
  async addUser(data: any): Promise<string> {
    return await this.appService.addUser(data);
  }

  @MessagePattern({ cmd: 'user/get' })
  async getUser(id: number): Promise<any> {
    return await this.appService.getUser(id);
  }

  @MessagePattern({ cmd: 'user/update' })
  async updateUser(data: any): Promise<string> {
    return await this.appService.updateUser(data);
  }

  @MessagePattern({ cmd: 'user/delete' })
  async deleteUser(id: number): Promise<string> {
    return this.appService.deleteUser(id);
  }

  @MessagePattern({ cmd: 'user/check_by_id' })
  async checkUserById(id: number): Promise<boolean> {
    return this.appService.checkUserById(id);
  }
}
