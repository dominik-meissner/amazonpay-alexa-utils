import { RequestEnvelope } from 'ask-sdk-model';
export class PermissionChecker {
  private static instance: PermissionChecker;

  private constructor() {}

  public static get(): PermissionChecker {
    if (!PermissionChecker.instance) {
      PermissionChecker.instance = new PermissionChecker();
    }
    return PermissionChecker.instance;
  }

  public isPurchasingAndPayEnabled(requestEnvelope: RequestEnvelope): boolean {
    const permissions = requestEnvelope.context.System.user.permissions;
    if (permissions && permissions.scopes) {
      const pay = permissions.scopes['payments:autopay_consent'];
      return pay.status === 'GRANTED';
    }
    return false;
  }
}
