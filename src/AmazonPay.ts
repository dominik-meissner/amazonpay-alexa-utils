import { RequestEnvelope } from 'ask-sdk-model';

import { ChargeDirectiveBuilder } from './checkout/charge/ChargeDirectiveBuilder';
import { ChargePayloadBuilder } from './checkout/charge/ChargePayloadBuilder';
import { PermissionManager } from './checkout/PermissionManager';
import { SetupDirectiveBuilder } from './checkout/setup/SetupDirectiveBuilder';
import { SetupPayloadBuilder } from './checkout/setup/SetupPayloadBuilder';

export function chargeDirective(payloadBuilder: ChargePayloadBuilder, token: string): ChargeDirectiveBuilder {
  return new ChargeDirectiveBuilder(payloadBuilder, token);
}

export function chargePayload(version: string): ChargePayloadBuilder {
  return new ChargePayloadBuilder(version);
}

export function isAmazonPayPermissionGranted(requestEnvelope: RequestEnvelope): boolean {
  return PermissionManager.get().isPurchasingAndPayEnabled(requestEnvelope);
}

export function setupDirective(payloadBuilder: SetupPayloadBuilder, token: string): SetupDirectiveBuilder {
  return new SetupDirectiveBuilder(payloadBuilder, token);
}

export function setupPayload(version: string): SetupPayloadBuilder {
  return new SetupPayloadBuilder(version);
}