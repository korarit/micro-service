import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// import { Observable } from 'rxjs';

import { Repository } from 'typeorm';
import { Order } from './order.entity';

interface ProductData {
  user_id: number;
  product_id: number;
  count: number;
  address: string;
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
    if (!data.user_id || !data.product_id || !data.count || !data.address) {
      return 'All fields are required';
    }

    if (data.count <= 0) {
      return 'Count must be greater than 0';
    }

    //check if user exists
    // eslint-disable-next-line prettier/prettier
    const user: boolean = await this.userService.send({ cmd: 'user/check_by_id' },data.user_id).toPromise();
    if (!user) {
      return 'User not found';
    }

    //check if product exists
    // eslint-disable-next-line prettier/prettier
    const product: boolean = await this.productService.send({ cmd: 'product/check_by_id' },data.product_id).toPromise();
    if (!product) {
      return 'Product not found';
    }

    const payloadCount = {
      product_id: data.product_id,
      remove_count: data.count,
    };

    // subtract product count
    const productRemoveCount: boolean | string = await this.productService.send({ cmd: 'product/subtract' }, payloadCount).toPromise();

    //check productRemoveCount type is string
    if (typeof productRemoveCount === 'string') {
      return productRemoveCount;
    }

    const ProductObj = new Order();
    ProductObj.user_id = data.user_id;
    ProductObj.product_id = data.product_id;
    ProductObj.order_total = data.count;
    ProductObj.address = data.address;

    try {
      await this.orderRepository.save(ProductObj);
      return 'Order added successfully';
    } catch (error) {
      return 'Error adding Order';
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
      const productData: any | string = await this.productService.send({ cmd: 'product/get' }, orderData.product_id).toPromise();

      if (!productData || productData.item_price === undefined) {
        return 'Product not found';
      }

      return {
        user_id: orderData.user_id,
        product_id: orderData.product_id,
        order_total: orderData.order_total,
        item_price: productData.item_price,
        order_price: orderData.order_total * productData.item_price,
        user_address: orderData.address,
        createdAt: orderData.createAt,
      };
    } catch (error) {
      console.log(error);
      return 'Error fetching Order';
    }
  }

  async updateOrder(data: any): Promise<string> {
    try {
      if (!data.id) {
        return 'Order ID not provided';
      }

      const OrderData = await this.orderRepository.findOne({
        where: { id: data.id },
      });

      if (!OrderData) {
        return 'Order not found';
      }
      if (data.user_id !== undefined) {
        OrderData.user_id = data.user_id;
      }
      if (data.product_id !== undefined) {
        OrderData.product_id = data.product_id;
      }

      if (data.count !== undefined) {
        let payloadCount: any;
        if (data.count > OrderData.order_total) {
          payloadCount = {
            product_id: OrderData.product_id,
            type: 'subtract',
            count: data.count - OrderData.order_total,
          };
        } else {
          payloadCount = {
            product_id: OrderData.product_id,
            type: 'add',
            count: OrderData.order_total - data.count,
          };
        }
        //subtract product count
        // eslint-disable-next-line prettier/prettier
        const productRemoveCount: boolean | string = await this.productService.send({ cmd: 'product/subtract' }, payloadCount).toPromise();


        OrderData.order_total = data.count;
      }

      if (data.address !== undefined) {
        OrderData.address = data.address;
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
