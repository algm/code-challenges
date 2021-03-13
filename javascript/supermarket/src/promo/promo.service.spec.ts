import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { PromoService } from './promo.service';
import { PromoTypeFactory } from './promoTypeFactory';

describe('PromoService', () => {
  let service: PromoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromoService, ProductsService, PromoTypeFactory],
    }).compile();

    service = module.get<PromoService>(PromoService);
  });

  it('should calculate discounts for products with buy x get y rules', () => {
    const basket = [{ sku: 'product-1', quantity: 3 }];
    const basket2 = [{ sku: 'product-1', quantity: 6 }];

    const result1 = service.calculateDiscounts(basket);
    const result2 = service.calculateDiscounts(basket2);

    expect(result1).toBe(123);
    expect(result2).toBe(123 * 2);
  });

  it('should calculate discount for products with buy x get pct discount', () => {
    const basket = [{ sku: 'product-3', quantity: 3 }];
    const basket2 = [{ sku: 'product-3', quantity: 30 }];

    const result1 = service.calculateDiscounts(basket);
    const result2 = service.calculateDiscounts(basket2);

    expect(result1).toBe(0);
    expect(result2).toBe(50 * 30 * 0.1);
  });
});
