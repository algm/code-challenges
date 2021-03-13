import { Test, TestingModule } from '@nestjs/testing';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { ProductsService } from './products.service';
import { PromoService } from './promo/promo.service';
import { PromoTypeFactory } from './promo/promoTypeFactory';

describe('BasketController', () => {
  let controller: BasketController;
  let promoService: PromoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketController],
      providers: [
        BasketService,
        PromoService,
        PromoTypeFactory,
        ProductsService,
      ],
    })
      .overrideProvider(BasketService)
      .useValue({
        calculate: () => 124,
      })
      .compile();

    controller = module.get<BasketController>(BasketController);
    promoService = module.get<PromoService>(PromoService);
  });

  it('should calculate baskets', () => {
    expect(
      controller.calculate([
        {
          sku: 'something',
          quantity: 2,
        },
      ]),
    ).toEqual({
      totalBeforeDiscounts: 124,
      discounts: 0,
      grandTotal: 124,
    });
  });

  it('should calculate baskets with discounts', () => {
    jest.spyOn(promoService, 'calculateDiscounts').mockImplementation(() => 60);

    expect(
      expect(
        controller.calculate([
          {
            sku: 'something',
            quantity: 2,
          },
        ]),
      ).toEqual({
        totalBeforeDiscounts: 124,
        discounts: 60,
        grandTotal: 64,
      }),
    );
  });
});
