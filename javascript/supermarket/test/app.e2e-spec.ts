import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Supermarket (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect({
        products: [
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
        ],
      });
  });

  it('/basket (PUT)', () => {
    return request(app.getHttpServer())
      .put('/basket')
      .send([{ sku: 'product-1', quantity: 2 }])
      .expect(200)
      .expect({
        totalBeforeDiscounts: 246,
        discounts: 0,
        grandTotal: 246,
      });
  });

  it('Stage 1', () => {
    return request(app.getHttpServer())
      .put('/basket')
      .send([
        { sku: 'product-1', quantity: 3 },
        { sku: 'product-3', quantity: 15 },
      ])
      .expect(200)
      .expect({
        totalBeforeDiscounts: 1119,
        discounts: 198,
        grandTotal: 921,
      });
  });

  it('Stage 2', () => {
    return request(app.getHttpServer())
      .put('/basket')
      .send([{ sku: 'product-4', quantity: 3.5 }])
      .expect(200)
      .expect({
        totalBeforeDiscounts: 525,
        discounts: 0,
        grandTotal: 525,
      });
  });
});
