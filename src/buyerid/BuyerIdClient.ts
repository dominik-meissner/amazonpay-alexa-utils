import * as Alexa from 'ask-sdk';
import { RequestEnvelope } from 'ask-sdk-model';
import * as https from 'https';
import { Region } from '../model/Region';

export class BuyerIdClient {
  public static getBuyerIdForLocale(requestEnvelope: RequestEnvelope): Promise<any> {
    let locale = '';
    locale = Alexa.getLocale(requestEnvelope);
    if (locale === '') {
      throw new Error('locale needs to be defined');
    }
    let region = BuyerIdClient.regionLocaleMapping.get(locale);
    if (region === undefined) {
      region = Region.DEFAULT;
    }
    return BuyerIdClient.getBuyerIdForRegion(requestEnvelope, region);
  }

  public static getBuyerIdForRegion(requestEnvelope: RequestEnvelope, region: Region): Promise<any> {
    return new Promise((resolve, reject) => {
      const accessToken = Alexa.getApiAccessToken(requestEnvelope);
      if (region !== undefined) {
        const options = {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
          hostname: BuyerIdClient.regionEndpointMapping.get(region),
          method: 'GET',
          path: BuyerIdClient.buyerIdPath,
          port: 443,
        };

        const request = https.request(options, response => {
          const { statusCode } = response;

          if (statusCode !== 200) {
            response.resume();
            reject(new Error(`Status Code: ${statusCode}`));
          }

          let body = '';

          response.on('data', chunk => {
            body += chunk;
          });
          response.on('end', () => {
            const jsonBody = JSON.parse(body);
            resolve(jsonBody.buyerId);
          });
        });

        request.on('error', error => {
          reject(error);
        });

        request.end();
      }
    });
  }

  private static buyerIdPath = '/live/v1/buyer/id';

  private static regionLocaleMapping = new Map([
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

  private static regionEndpointMapping = new Map([
    [Region.EU, 'pay-api.amazon.eu'],
    [Region.UK, 'pay-api.amazon.eu'],
    [Region.NA, 'pay-api.amazon.com'],
    [Region.JP, 'pay-api.amazon.jp'],
  ]);
}
