import * as Alexa from 'ask-sdk';
import { RequestEnvelope } from 'ask-sdk-model';
import * as https from 'https';
import { Environment } from '../model/Environment';
import { Region } from '../model/Region';
import { Utilities } from '../Utilities/Utilities';

export class DefaultAddressClient {
  public static getDefaultAdressForLocale(requestEnvelope: RequestEnvelope, environment: Environment): Promise<any> {
    const locale = Alexa.getLocale(requestEnvelope);
    if (locale === '') {
      throw new Error('locale needs to be defined');
    }
    let region = Utilities.regionLocaleMapping.get(locale);
    if (region === undefined) {
      region = Region.DEFAULT;
    }
    return DefaultAddressClient.getDefaultAdressForRegion(requestEnvelope, region, environment);
  }

  public static getDefaultAdressForRegion(
    requestEnvelope: RequestEnvelope,
    region: Region,
    environment: Environment,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const accessToken = Alexa.getApiAccessToken(requestEnvelope);
      const addressPath = `${Utilities.getBasePath(environment)}${DefaultAddressClient.addressPathSegment}`;
      if (region !== undefined) {
        const options = {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
          hostname: Utilities.regionEndpointMapping.get(region),
          method: 'GET',
          path: addressPath,
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

  private static addressPathSegment = 'addresses';
}
