import { BasketService } from './basket.service';
import { Body, Controller, Put } from '@nestjs/common';
import { BasketItemDto } from './dto/basketItem.dto';
import { PromoService } from './promo/promo.service';

@Controller('basket')
export class BasketController {
  constructor(
    private basketService: BasketService,
    private promoService: PromoService,
  ) {}

  @Put()
  calculate(@Body() basket: BasketItemDto[]) {
    const total = this.basketService.calculate(basket);
    const discounts = this.promoService.calculateDiscounts(basket);

    return {
      totalBeforeDiscounts: total,
      discounts: discounts,
      grandTotal: total - discounts,
    };
  }
}
