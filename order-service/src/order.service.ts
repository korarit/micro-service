import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Repository } from 'typeorm';
import { Order } from './order.entity';

interface ProductData {
  user_id: number;
  product_id: number;
  count: number;
}

@Injectable()
export class AppService {
  // Inject the user repository into the service
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    @Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  async addOrder(data: ProductData): Promise<string> {
    if (!data.user_id || !data.product_id || !data.count) {
      return 'All fields are required';
    }

    //check if user exists
    // eslint-disable-next-line prettier/prettier
    const user = await this.userService.send({ cmd: 'user/check_by_id' },data.user_id);
    if (!user) {
      return 'User not found';
    }

    //check if product exists
    // eslint-disable-next-line prettier/prettier
    const product = await this.productService.send({ cmd: 'product/check_by_id' },data.product_id);
    if (!product) {
      return 'Product not found';
    }

    const ProductObj = new Order();
    ProductObj.user_id = data.user_id;
    ProductObj.product_id = data.product_id;
    ProductObj.order_total = data.count;

    try {
      await this.orderRepository.save(ProductObj);
      return 'Product added successfully';
    } catch (error) {
      return 'Error adding Product';
    }
  }

  async getOrder(id: number): Promise<any> {
    try {
      if (!id) {
        return 'Order ID not provided';
      }

      const orderData = await this.orderRepository.findOne({
        where: { id: id },
      });

      if (!orderData || !orderData.product_id) {
        return 'Order not found';
      }

      // get product details
      // eslint-disable-next-line prettier/prettier
      const productData: any = await this.productService.send({ cmd: 'product/get' }, orderData.product_id);

      return {
        user_id: orderData.user_id,
        product_id: orderData.product_id,
        order_total: orderData.order_total,
        item_price: productData.item_price,
        order_price: orderData.order_total * productData.item_price,
        createdAt: orderData.createAt,
      };
    } catch (error) {
      return 'Error fetching Order';
    }
  }

  async updateOrder(data: any): Promise<string> {
    try {
      if (!data.id) {
        return 'Product ID not provided';
      }

      const OrderData = await this.orderRepository.findOne({
        where: { id: data.id },
      });

      if (!OrderData) {
        return 'Product not found';
      }
      if (data.name !== undefined) {
        OrderData.user_id = data.user_id;
      }
      if (data.type !== undefined) {
        OrderData.product_id = data.product_id;
      }

      if (data.count !== undefined) {
        OrderData.order_total = data.count;
      }

      this.orderRepository.save(OrderData);

      return 'Product updated successfully';
    } catch (error) {
      return 'Error updating Product';
    }
  }

  async deleteOrder(id: number): Promise<string> {
    try {
      if (!id) {
        return 'Order ID not provided';
      }
      //check if user exists
      const user = await this.orderRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        return 'Order not found';
      }
      this.orderRepository.delete({ id: id });
      return 'Order deleted successfully';
    } catch (error) {
      return 'Error deleting Order';
    }
  }
}
