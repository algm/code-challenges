import { BasketService } from './basket.service';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { PromoService } from './promo/promo.service';
import { PromoTypeFactory } from './promo/promoTypeFactory';

@Module({
  controllers: [ProductsController, BasketController],
  providers: [ProductsService, BasketService, PromoService, PromoTypeFactory],
})
export class AppModule {}
