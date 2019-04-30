import { BillingAgreementAttributesBuilder } from '../../../checkout/setup/BillingAgreementAttributesBuilder';

test('no input, empty object out', () => {
  let result = new BillingAgreementAttributesBuilder('2').build();

  expect(result).toEqual({});
});

test('no SellerAttributes', () => {
  let result = new BillingAgreementAttributesBuilder('2')
    .setSellerNote('my note')
    .withPlatformId('ABCDE')
    .build();

  expect(result).toEqual({
    '@type': 'BillingAgreementAttributes',
    '@version': '2',
    sellerNote: 'my note',
    platformId: 'ABCDE',
  });

  // expect(result['@type']).toBe('BillingAgreementAttributes');
  // expect(result['@version']).toBe('2');
  expect(result.sellerNote).toBe('my note');
  expect(result.platformId).toBe('ABCDE');
});

test('only SellerAttributes', () => {
  let result = new BillingAgreementAttributesBuilder('2')
    .setSellerBillingAgreementId('12345')
    .withStoreName('my store')
    .withCustomInformation('so custom')
    .build();
  expect(result).toEqual({
    '@type': 'BillingAgreementAttributes',
    '@version': '2',
    sellerBillingAgreementAttributes: {
      '@type': 'SellerBillingAgreementAttributes',
      '@version': '2',
      storeName: 'my store',
      sellerBillingAgreementId: '12345',
      customInformation: 'so custom',
    },
  });
  //   expect(result['@type']).toBe('BillingAgreementAttributes');
  //   expect(result['@version']).toBe('2');
  let sellerAttributes = result.sellerBillingAgreementAttributes;
  if (sellerAttributes) {
    expect(sellerAttributes).toBeDefined();
    expect(sellerAttributes.customInformation).toBe('so custom');
    expect(sellerAttributes.sellerBillingAgreementId).toBe('12345');
    expect(sellerAttributes.storeName).toBe('my store');
  }
});

test('full version', () => {
  let result = new BillingAgreementAttributesBuilder('2')
    .withCustomInformation('so custom')
    .withPlatformId('ABCDE')
    .withSellerBillingAgreementId('12345')
    .withSellerNote('my note')
    .withStoreName('my store')
    .build();
  expect(result).toEqual({
    '@type': 'BillingAgreementAttributes',
    '@version': '2',
    sellerNote: 'my note',
    platformId: 'ABCDE',
    sellerBillingAgreementAttributes: {
      '@type': 'SellerBillingAgreementAttributes',
      '@version': '2',
      storeName: 'my store',
      sellerBillingAgreementId: '12345',
      customInformation: 'so custom',
    },
  });

  // expect(result['@type']).toBe('BillingAgreementAttributes');
  // expect(result['@version']).toBe('2');
  expect(result.sellerNote).toBe('my note');
  expect(result.platformId).toBe('ABCDE');
  //   expect(result['@type']).toBe('BillingAgreementAttributes');
  //   expect(result['@version']).toBe('2');
  let sellerAttributes = result.sellerBillingAgreementAttributes;
  if (sellerAttributes) {
    expect(sellerAttributes).toBeDefined();
    expect(sellerAttributes.customInformation).toBe('so custom');
    expect(sellerAttributes.sellerBillingAgreementId).toBe('12345');
    expect(sellerAttributes.storeName).toBe('my store');
  }
});
