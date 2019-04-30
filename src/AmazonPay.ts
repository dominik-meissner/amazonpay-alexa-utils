import { RequestEnvelope } from 'ask-sdk-model';

import { ChargeDirectiveBuilder } from './checkout/charge/ChargeDirectiveBuilder';
import { ChargePayloadBuilder } from './checkout/charge/ChargePayloadBuilder';
import { PermissionChecker } from './checkout/PermissionChecker';
import { SetupDirectiveBuilder } from './checkout/setup/SetupDirectiveBuilder';
import { SetupPayloadBuilder } from './checkout/setup/SetupPayloadBuilder';

export const AmazonPay = {
  chargeDirective: (payloadBuilder: ChargePayloadBuilder, token: string): ChargeDirectiveBuilder => {
    return new ChargeDirectiveBuilder(payloadBuilder, token);
  },
  chargePayload: (version: string): ChargePayloadBuilder => {
    return new ChargePayloadBuilder(version);
  },
  isAmazonPayPermissionGranted(requestEnvelope: RequestEnvelope): boolean {
    return PermissionChecker.get().isPurchasingAndPayEnabled(requestEnvelope);
  },
  setupDirective: (payloadBuilder: SetupPayloadBuilder, token: string): SetupDirectiveBuilder => {
    return new SetupDirectiveBuilder(payloadBuilder, token);
  },
  setupPayload: (version: string): SetupPayloadBuilder => {
    return new SetupPayloadBuilder(version);
  },
};
