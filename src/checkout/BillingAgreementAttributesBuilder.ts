import { interfaces } from 'ask-sdk-model';
import BillingAgreementAttributes = interfaces.amazonpay.model.v1.BillingAgreementAttributes;

export class BillingAgreementAttributesBuilder {
  private readonly DUMMY: string = 'dummy';

  private readonly version: string;
  private readonly type: string;

  // control flags
  private addSellerBillingAgreementAttributes: boolean = false;
  private neeToGenerate: boolean = false;

  private sellerNote: string = this.DUMMY;
  private platformId: string = this.DUMMY;
  // sellerAttributes
  private storeName: string = this.DUMMY;
  private customInformation: string = this.DUMMY;
  private sellerBillingAgreementId: string = this.DUMMY;

  constructor(version: string) {
    // version can be used to decide for the right fromat in future
    this.version = version;
    this.type = 'BillingAgreementAttributes';
  }

  public withSellerNote(sellerNote: string): BillingAgreementAttributesBuilder {
    this.sellerNote = sellerNote;
    this.neeToGenerate = true;
    return this;
  }

  public setSellerNote(sellerNote: string): BillingAgreementAttributesBuilder {
    return this.withSellerNote(sellerNote);
  }

  public withPlatformId(platformId: string): BillingAgreementAttributesBuilder {
    this.platformId = platformId;
    this.neeToGenerate = true;
    return this;
  }

  public setPlatformId(platformId: string): BillingAgreementAttributesBuilder {
    return this.withPlatformId(platformId);
  }

  public withStoreName(storeName: string): BillingAgreementAttributesBuilder {
    this.neeToGenerate = true;
    this.addSellerBillingAgreementAttributes = true;
    this.storeName = storeName;
    return this;
  }

  public setStoreName(storeName: string): BillingAgreementAttributesBuilder {
    return this.withStoreName(storeName);
  }

  public withCustomInformation(customInformation: string): BillingAgreementAttributesBuilder {
    this.neeToGenerate = true;
    this.addSellerBillingAgreementAttributes = true;
    this.customInformation = customInformation;
    return this;
  }

  public setCustomInformation(customInformation: string): BillingAgreementAttributesBuilder {
    return this.withCustomInformation(customInformation);
  }

  public withSellerBillingAgreementId(sellerBillingAgreementId: string): BillingAgreementAttributesBuilder {
    this.neeToGenerate = true;
    this.addSellerBillingAgreementAttributes = true;
    this.sellerBillingAgreementId = sellerBillingAgreementId;
    return this;
  }

  public setSellerBillingAgreementId(sellerBillingAgreementId: string): BillingAgreementAttributesBuilder {
    return this.withSellerBillingAgreementId(sellerBillingAgreementId);
  }

  public build(): BillingAgreementAttributes {
    let attributes = {};
    if (this.neeToGenerate) {
      attributes = {
        '@type': this.type,
        '@version': this.version,
      };
      if (this.sellerNote !== this.DUMMY) {
        attributes = Object.assign(attributes, { sellerNote: this.sellerNote });
      }
      if (this.platformId !== this.DUMMY) {
        attributes = Object.assign(attributes, { platformId: this.platformId });
      }
      if (this.addSellerBillingAgreementAttributes) {
        let innerAttributes = {
          '@type': 'SellerBillingAgreementAttributes',
          '@version': this.version,
        };

        if (this.storeName !== this.DUMMY) {
          innerAttributes = Object.assign(innerAttributes, { storeName: this.storeName });
        }
        if (this.customInformation !== this.DUMMY) {
          innerAttributes = Object.assign(innerAttributes, { customInformation: this.customInformation });
        }
        if (this.sellerBillingAgreementId !== this.DUMMY) {
          innerAttributes = Object.assign(innerAttributes, {
            sellerBillingAgreementId: this.sellerBillingAgreementId,
          });
        }

        const sellerAttributes = {
          sellerBillingAgreementAttributes: innerAttributes,
        };

        attributes = Object.assign(attributes, sellerAttributes);
      }
    }
    return JSON.parse(JSON.stringify(attributes));
  }
}
