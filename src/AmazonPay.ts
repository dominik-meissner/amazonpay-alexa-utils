import { ChargePayloadBuilder } from './checkout/ChargePayloadBuilder';
import { SetupPayloadBuilder } from './checkout/SetupPayloadBuilder';

export const AmazonPay = {
  chargePayload: (version: string): ChargePayloadBuilder => {
    return new ChargePayloadBuilder(version);
  },
  setupPayload: (version: string): SetupPayloadBuilder => {
    return new SetupPayloadBuilder(version);
  },
};
