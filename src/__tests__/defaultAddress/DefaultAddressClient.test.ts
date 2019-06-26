import { DefaultAddressClient } from '../../defaultAddress/DefaultAddressClient';

test('has needed methods', () => {
  expect(DefaultAddressClient).toHaveProperty('getDefaultAdressForLocale');
  expect(DefaultAddressClient).toHaveProperty('getDefaultAdressForRegion');
});
