import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { BasketItemDto } from '../dto/basketItem.dto';
import { Promo } from '../entities/promo.entity';
import { PromoTypeFactory } from './promoTypeFactory';

const promos = [
  new Promo('product-1', 'buy_x_get_y_free', {
    buy: 2,
    getFree: 1,
  }),
  new Promo('product-3', 'qty_discount_pct', {
    qty: 5,
    discount: 10,
  }),
];

@Injectable()
export class PromoService {
  constructor(
    private productService: ProductsService,
    private promoTypeFactory: PromoTypeFactory,
  ) {}

  calculateDiscounts(basket: BasketItemDto[]): number {
    return basket.reduce((totalDiscount, basketItem): number => {
      const product = this.productService.findOne(basketItem.sku);
      const promo = this.findPromoBySku(basketItem.sku);

      if (promo === null) {
        return totalDiscount;
      }

      return (
        totalDiscount +
        this.promoTypeFactory
          .resolvePromoType(promo)
          .calculateForProductQuantity(product, basketItem.quantity)
      );
    }, 0);
  }

  findPromoBySku(sku: string): Promo | null {
    return promos.find((promo) => promo.sku === sku) ?? null;
  }
}
