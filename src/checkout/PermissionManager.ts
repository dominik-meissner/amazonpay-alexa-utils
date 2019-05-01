import { Response, RequestEnvelope } from 'ask-sdk-model';
import { ResponseBuilder } from 'ask-sdk';

export class PermissionManager {
  public static get(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }
  private static instance: PermissionManager;

  private constructor() {}

  private payPermission: string = 'payments:autopay_consent';
  private speechText: string = ''; // TODO, improve this
  private permissions: Array<string> = [];

  public isPurchasingAndPayEnabled(requestEnvelope: RequestEnvelope): boolean {
    const permissions = requestEnvelope.context.System.user.permissions;
    if (permissions && permissions.scopes) {
      const pay = permissions.scopes['payments:autopay_consent'];
      return pay.status === 'GRANTED';
    }
    return false;
  }

  public withSpeechText(speechText: string): PermissionManager {
    this.speechText = speechText;
    return this;
  }

  public withAdditionalPermissions(permissions: Array<string> = []): PermissionManager {
    this.permissions = permissions;
    return this;
  }

  public send(responseBuilder: ResponseBuilder): Response {
    const permissions = this.permissions.concat(this.payPermission);
    return responseBuilder
      .speak(this.speechText)
      .withAskForPermissionsConsentCard(permissions)
      .getResponse();
  }
}
