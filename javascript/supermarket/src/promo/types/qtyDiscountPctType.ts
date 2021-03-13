import { Product } from '../../entities/product.entity';
import { PromoTypeInterface } from './promoTypeInterface';

type RuleSettings = {
  qty: number;
  discount: number;
};

export class QtyDiscountPctType implements PromoTypeInterface {
  constructor(private readonly settings: RuleSettings) {}

  calculateForProductQuantity(product: Product, quantity: number): number {
    if (quantity <= this.settings.qty) {
      return 0;
    }

    return (quantity * product.price * this.settings.discount) / 100;
  }
}
