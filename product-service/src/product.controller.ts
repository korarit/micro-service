import { Controller } from '@nestjs/common';
import { AppService } from './product.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @MessagePattern({ cmd: 'product/add' })
  async addProduct(data: any): Promise<string> {
    return await this.appService.addProduct(data);
  }

  @MessagePattern({ cmd: 'product/get' })
  async getProduct(id: number): Promise<any> {
    return await this.appService.getProduct(id);
  }

  @MessagePattern({ cmd: 'product/update' })
  async updateProduct(data: any): Promise<string> {
    return await this.appService.updateProduct(data);
  }

  @MessagePattern({ cmd: 'product/delete' })
  async deleteProduct(id: number): Promise<string> {
    return this.appService.deleteProduct(id);
  }

  @MessagePattern({ cmd: 'product/check_by_id' })
  async checkProductById(id: number): Promise<boolean> {
    return this.appService.checkProductById(id);
  }
}
