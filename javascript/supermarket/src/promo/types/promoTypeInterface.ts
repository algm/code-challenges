import { Product } from 'src/entities/product.entity';

export interface PromoTypeInterface {
  calculateForProductQuantity(product: Product, quantity: number): number;
}
