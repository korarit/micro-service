import { Controller } from '@nestjs/common';
import { AppService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly orderService: AppService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @MessagePattern({ cmd: 'order/add' })
  async addOrder(data: any): Promise<string> {
    return await this.orderService.addOrder(data);
  }

  @MessagePattern({ cmd: 'order/get' })
  async getOrder(id: number): Promise<any> {
    return await this.orderService.getOrder(id);
  }

  @MessagePattern({ cmd: 'order/update' })
  async updateOrder(data: any): Promise<string> {
    return await this.orderService.updateOrder(data);
  }

  @MessagePattern({ cmd: 'order/delete' })
  async deleteOrder(id: number): Promise<string> {
    return this.orderService.deleteOrder(id);
  }
}
