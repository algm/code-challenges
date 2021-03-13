import { Product } from './entities/product.entity';
import { Injectable } from '@nestjs/common';

const products = [
  new Product('product-1', 'Soda can', 123),
  new Product('product-2', 'Potato bag', 75),
  new Product('product-3', 'Sauce bucket', 50),
  new Product('product-4', 'Orange', 150, 'weight'),
];

@Injectable()
export class ProductsService {
  findAll() {
    return products;
  }

  findOne(sku: string) {
    return products.find((product) => product.sku === sku);
  }
}
