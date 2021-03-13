export class Promo {
  constructor(
    public readonly sku: string,
    public readonly ruleType: string,
    public readonly ruleSettings: any,
  ) {}
}
