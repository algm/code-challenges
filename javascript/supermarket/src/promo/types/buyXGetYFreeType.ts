import { Product } from '../../entities/product.entity';
import { PromoTypeInterface } from './promoTypeInterface';

type RuleSettings = {
  buy: number;
  getFree: number;
};

export class BuyXGetYFreeType implements PromoTypeInterface {
  constructor(private readonly settings: RuleSettings) {}

  getTotalGroupQty(): number {
    return this.settings.buy + this.settings.getFree;
  }

  calculateForProductQuantity(product: Product, quantity: number): number {
    if (quantity < this.getTotalGroupQty()) {
      return 0;
    }

    const productPrice = product.price;
    const totalFreeQty = Math.floor(quantity / this.getTotalGroupQty());

    return totalFreeQty * productPrice;
  }
}
