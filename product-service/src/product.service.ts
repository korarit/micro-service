import { Injectable, Inject } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Product } from './product.entity';

interface ProductData {
  name: string;
  type: string;
  count: number;
  price: number;
}

@Injectable()
export class AppService {
  // Inject the user repository into the service
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async addProduct(data: ProductData): Promise<string> {
    if (!data.name || !data.type || !data.count || !data.price) {
      return 'All fields are required';
    }
    const ProductObj = new Product();
    ProductObj.name = data.name;
    ProductObj.type = data.type;
    ProductObj.count = data.count;
    ProductObj.price = data.price;

    try {
      await this.productRepository.save(ProductObj);
      return 'Product added successfully';
    } catch (error) {
      return 'Error adding Product';
    }
  }

  async getProduct(id: number): Promise<any> {
    try {
      if (!id) {
        return 'Product ID not provided';
      }

      const productData = await this.productRepository.findOne({
        where: { id: id },
      });

      return {
        item_name: productData.name,
        item_type: productData.type,
        item_count: productData.count,
        item_price: productData.price,
        createdAt: productData.createAt,
      };
    } catch (error) {
      return 'Error fetching Product';
    }
  }

  async updateProduct(data: any): Promise<string> {
    try {
      if (!data.id) {
        return 'Product ID not provided';
      }

      const ProductData = await this.productRepository.findOne({
        where: { id: data.id },
      });

      if (!ProductData) {
        return 'Product not found';
      }
      if (data.name !== undefined) {
        ProductData.name = data.name;
      }
      if (data.type !== undefined) {
        ProductData.type = data.type;
      }

      if (data.count !== undefined) {
        ProductData.count = data.count;
      }
      if (data.price !== undefined) {
        ProductData.price = data.price;
      }

      this.productRepository.save(ProductData);

      return 'Product updated successfully';
    } catch (error) {
      return 'Error updating Product';
    }
  }

  async subtractProductCount(data: any): Promise<string | boolean> {
    try {
      if (!data.product_id || !data.count || !data.type) {
        return 'Product ID and count not provided';
      }

      const productData = await this.productRepository.findOne({
        where: { id: data.product_id },
      });

      if (!productData) {
        return 'Product not found';
      }

      if (data.type === 'add') {
        productData.count = productData.count + data.count;

        // Update the product count
        this.productRepository.save(productData);
        return true;
      } else if (data.type === 'subtract') {
        if (productData.count < data.count || productData.count <= 0) {
          return 'Product count is less than the count to be order';
        }

        productData.count = productData.count - data.count;

        // Update the product count
        this.productRepository.save(productData);

        return true;
      }

      return true;
    } catch (error) {
      return 'Error updating Product count';
    }
  }

  async deleteProduct(id: number): Promise<string> {
    try {
      if (!id) {
        return 'Product ID not provided';
      }
      //check if user exists
      const user = await this.productRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        return 'Product not found';
      }
      this.productRepository.delete({ id: id });
      return 'Product deleted successfully';
    } catch (error) {
      return 'Error deleting Product';
    }
  }

  async checkProductById(id: number): Promise<boolean> {
    try {
      if (!id) {
        return false;
      }

      const productData = await this.productRepository.findOne({
        where: { id: id },
        select: { id: true },
      });

      if (!productData) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
