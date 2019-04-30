import { ChargePayloadBuilder } from './checkout/charge/ChargePayloadBuilder';
import { SetupPayloadBuilder } from './checkout/setup/SetupPayloadBuilder';

export const AmazonPay = {
  chargePayload: (version: string): ChargePayloadBuilder => {
    return new ChargePayloadBuilder(version);
  },
  setupPayload: (version: string): SetupPayloadBuilder => {
    return new SetupPayloadBuilder(version);
  },
};
