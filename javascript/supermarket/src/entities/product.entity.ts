export class Product {
  constructor(
    public readonly sku: string,
    public readonly name: string,
    public readonly price: number,
    public readonly priceType: string = 'qty',
  ) {}
}
