import { SetupPayloadBuilder } from './checkout/SetupPayloadBuilder';

export const AmazonPay = {
  setupPayload: (version: string): SetupPayloadBuilder => {
    return new SetupPayloadBuilder(version);
  },
};
