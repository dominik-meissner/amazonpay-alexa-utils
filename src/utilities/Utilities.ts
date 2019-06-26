import { Environment } from '../model/Environment';
import { Region } from '../model/Region';

export class Utilities {
  public static regionEndpointMapping = new Map([
    [Region.EU, 'pay-api.amazon.eu'],
    [Region.UK, 'pay-api.amazon.eu'],
    [Region.NA, 'pay-api.amazon.com'],
    [Region.JP, 'pay-api.amazon.jp'],
  ]);

  public static regionLocaleMapping = new Map([
    ['de-DE', Region.EU],
    ['fr-FR', Region.EU],
    ['en-GB', Region.UK],
    ['it-IT', Region.EU],
    ['es-ES', Region.EU],
    ['en-US', Region.NA],
    ['es-US', Region.NA],
    ['en-CA', Region.NA],
    ['fr-CA', Region.NA],
    ['ja-JP', Region.JP],
  ]);

  public static getBasePath(environment: Environment) {
    return `/${environment}/v1/buyer/`;
  }
}
