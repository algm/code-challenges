import { Injectable } from '@nestjs/common';
import { Promo } from '../entities/promo.entity';
import { BuyXGetYFreeType } from './types/buyXGetYFreeType';
import { PromoTypeInterface } from './types/promoTypeInterface';
import { QtyDiscountPctType } from './types/qtyDiscountPctType';

interface PromoTypeConstructor {
  new (settings: any): PromoTypeInterface;
}

const PromoTypeMap = new Map<string, PromoTypeConstructor>();

PromoTypeMap.set('buy_x_get_y_free', BuyXGetYFreeType);
PromoTypeMap.set('qty_discount_pct', QtyDiscountPctType);

@Injectable()
export class PromoTypeFactory {
  resolvePromoType(promo: Promo): PromoTypeInterface {
    const typeClass = PromoTypeMap.get(promo.ruleType);

    if (!typeClass) {
      throw new Error('Invalid promo type');
    }

    return new typeClass(promo.ruleSettings);
  }
}
