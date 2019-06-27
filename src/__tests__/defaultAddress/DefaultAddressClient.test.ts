import { DefaultAddressClient } from '../../defaultAddress/DefaultAddressClient';

test('has needed methods', () => {
  expect(DefaultAddressClient).toHaveProperty('getDefaultAdress');
  expect(DefaultAddressClient).toHaveProperty('getDefaultAdressForLocale');
  expect(DefaultAddressClient).toHaveProperty('getDefaultAdressForRegion');
});
