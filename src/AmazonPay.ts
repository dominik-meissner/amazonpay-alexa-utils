import { RequestEnvelope } from 'ask-sdk-model';

import { BuyerIdClient } from './buyerid/BuyerIdClient';
import { ChargeDirectiveBuilder } from './checkout/charge/ChargeDirectiveBuilder';
import { ChargePayloadBuilder } from './checkout/charge/ChargePayloadBuilder';
import { SetupDirectiveBuilder } from './checkout/setup/SetupDirectiveBuilder';
import { SetupPayloadBuilder } from './checkout/setup/SetupPayloadBuilder';
import { DefaultAddressClient } from './defaultAddress/DefaultAddressClient';
import { Environment } from './model/Environment';
import { Region } from './model/Region';
import { PermissionCardBuilder } from './permissions/PermissionCardBuilder';
import { PermissionManager } from './permissions/PermissionManager';

export function askForPermissionCard(speechText: string): PermissionCardBuilder {
  return PermissionManager.get().askForPermissionCard(speechText);
}

export function chargeDirective(payloadBuilder: ChargePayloadBuilder, token: string): ChargeDirectiveBuilder {
  return new ChargeDirectiveBuilder(payloadBuilder, token);
}

export function chargePayload(version: string): ChargePayloadBuilder {
  return new ChargePayloadBuilder(version);
}

export function getBuyerIdForLocale(requestEnvelope: RequestEnvelope): Promise<any> {
  return BuyerIdClient.getBuyerIdForLocale(requestEnvelope);
}

export function getBuyerIdForRegion(requestEnvelope: RequestEnvelope, region: Region): Promise<any> {
  return BuyerIdClient.getBuyerIdForRegion(requestEnvelope, region);
}

export function getDefaultAddressForLocale(requestEnvelope: RequestEnvelope, environment: Environment): Promise<any> {
  return DefaultAddressClient.getDefaultAdressForLocale(requestEnvelope, environment);
}

export function getDefaultAddressForRegion(
  requestEnvelope: RequestEnvelope,
  region: Region,
  environment: Environment,
): Promise<any> {
  return DefaultAddressClient.getDefaultAdressForRegion(requestEnvelope, region, environment);
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
