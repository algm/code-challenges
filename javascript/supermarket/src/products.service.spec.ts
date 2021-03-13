import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should return all products', () => {
    expect(service.findAll()).toEqual([
      { sku: 'product-1', name: 'Soda can', price: 123, priceType: 'qty' },
      {
        sku: 'product-2',
        name: 'Potato bag',
        price: 75,
        priceType: 'qty',
      },
      {
        sku: 'product-3',
        name: 'Sauce bucket',
        price: 50,
        priceType: 'qty',
      },
      {
        sku: 'product-4',
        name: 'Orange',
        price: 150,
        priceType: 'weight',
      },
    ]);
  });

  it('should return one product', () => {
    expect(service.findOne('product-2')).toEqual({
      sku: 'product-2',
      name: 'Potato bag',
      price: 75,
      priceType: 'qty',
    });
  });
});
