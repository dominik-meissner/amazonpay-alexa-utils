import { BuyerIdClient } from '../../buyerid/BuyerIdClient';

test('has needed methods', () => {
  expect(BuyerIdClient).toHaveProperty('getBuyerIdForLocale');
  expect(BuyerIdClient).toHaveProperty('getBuyerIdForRegion');
});
