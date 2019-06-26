import * as Alexa from 'ask-sdk';
import { RequestEnvelope } from 'ask-sdk-model';
import * as https from 'https';
import { Environment } from '../model/Environment';
import { Region } from '../model/Region';
import { Utilities } from '../Utilities/Utilities';

interface IHeader {
  Accept: string;
  Authorization: string;
  [key: string]: string;
}

export class DefaultAddressClient {
  public static getDefaultAdressForLocale(
    requestEnvelope: RequestEnvelope,
    environment: Environment,
    sellerId: string,
    sandboxEmail?: string,
  ): Promise<any> {
    const locale = Alexa.getLocale(requestEnvelope);
    if (locale === '') {
      throw new Error('locale needs to be defined');
    }
    let region = Utilities.regionLocaleMapping.get(locale);
    if (region === undefined) {
      region = Region.DEFAULT;
    }
    return DefaultAddressClient.getDefaultAdressForRegion(requestEnvelope, region, environment, sellerId, sandboxEmail);
  }

  public static getDefaultAdressForRegion(
    requestEnvelope: RequestEnvelope,
    region: Region,
    environment: Environment,
    sellerId: string,
    sandboxEmail?: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (environment === Environment.SANDBOX && sandboxEmail === undefined) {
        throw new Error('sandbox email needs to be defined for the sandbox environment');
      }
      const accessToken = Alexa.getApiAccessToken(requestEnvelope);
      const addressPath = `${Utilities.getBasePath(environment)}${
        DefaultAddressClient.addressPathSegment
      }?requestorId=${sellerId}`;
      if (region !== undefined) {
        const header: IHeader = {
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken,
        };
        const options = {
          headers: header,
          hostname: Utilities.regionEndpointMapping.get(region),
          method: 'GET',
          path: addressPath,
          port: 443,
        };
        if (environment === Environment.SANDBOX && sandboxEmail !== undefined) {
          options.headers['x-amz-pay-sandbox-email-id'] = sandboxEmail;
        }

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
            resolve(jsonBody);
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
