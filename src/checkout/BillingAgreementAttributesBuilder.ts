import { interfaces } from 'ask-sdk-model';
import BillingAgreementAttributes = interfaces.amazonpay.model.v1.BillingAgreementAttributes;

export class BillingAgreementAttributesBuilder {
  private readonly DUMMY: string = 'dummy';

  private readonly _version: string;
  private readonly _type: string;

  // control flags
  private _addSellerBillingAgreementAttributes: boolean = false;
  private _neeToGenerate: boolean = false;

  private _sellerNote: string = this.DUMMY;
  private _platformId: string = this.DUMMY;
  // sellerAttributes
  private _storeName: string = this.DUMMY;
  private _customInformation: string = this.DUMMY;
  private _sellerBillingAgreementId: string = this.DUMMY;

  constructor(version: string) {
    // version can be used to decide for the right fromat in future
    this._version = version;
    this._type = 'BillingAgreementAttributes';
  }

  withSellerNote(sellerNote: string): BillingAgreementAttributesBuilder {
    this._sellerNote = sellerNote;
    this._neeToGenerate = true;
    return this;
  }

  setSellerNote(sellerNote: string): BillingAgreementAttributesBuilder {
    return this.withSellerNote(sellerNote);
  }

  withPlatformId(platformId: string): BillingAgreementAttributesBuilder {
    this._platformId = platformId;
    this._neeToGenerate = true;
    return this;
  }

  setPlatformId(platformId: string): BillingAgreementAttributesBuilder {
    return this.withPlatformId(platformId);
  }

  withStoreName(storeName: string): BillingAgreementAttributesBuilder {
    this._neeToGenerate = true;
    this._addSellerBillingAgreementAttributes = true;
    this._storeName = storeName;
    return this;
  }

  setStoreName(storeName: string): BillingAgreementAttributesBuilder {
    return this.withStoreName(storeName);
  }

  withCustomInformation(customInformation: string): BillingAgreementAttributesBuilder {
    this._neeToGenerate = true;
    this._addSellerBillingAgreementAttributes = true;
    this._customInformation = customInformation;
    return this;
  }

  setCustomInformation(customInformation: string): BillingAgreementAttributesBuilder {
    return this.withCustomInformation(customInformation);
  }

  withSellerBillingAgreementId(sellerBillingAgreementId: string): BillingAgreementAttributesBuilder {
    this._neeToGenerate = true;
    this._addSellerBillingAgreementAttributes = true;
    this._sellerBillingAgreementId = sellerBillingAgreementId;
    return this;
  }

  setSellerBillingAgreementId(sellerBillingAgreementId: string): BillingAgreementAttributesBuilder {
    return this.withSellerBillingAgreementId(sellerBillingAgreementId);
  }

  build(): BillingAgreementAttributes {
    let attributes = {};
    if (this._neeToGenerate) {
      attributes = {
        '@type': this._type,
        '@version': this._version,
      };
      if (this._sellerNote !== this.DUMMY) {
        attributes = (<any>Object).assign(attributes, { sellerNote: this._sellerNote });
      }
      if (this._platformId !== this.DUMMY) {
        attributes = (<any>Object).assign(attributes, { platformId: this._platformId });
      }
      if (this._addSellerBillingAgreementAttributes) {
        let innerAttributes = {
          '@type': 'SellerBillingAgreementAttributes',
          '@version': this._version,
        };

        if (this._storeName !== this.DUMMY) {
          innerAttributes = (<any>Object).assign(innerAttributes, { storeName: this._storeName });
        }
        if (this._customInformation !== this.DUMMY) {
          innerAttributes = (<any>Object).assign(innerAttributes, { customInformation: this._customInformation });
        }
        if (this._sellerBillingAgreementId !== this.DUMMY) {
          innerAttributes = (<any>Object).assign(innerAttributes, {
            sellerBillingAgreementId: this._sellerBillingAgreementId,
          });
        }

        let sellerAttributes = {
          sellerBillingAgreementAttributes: innerAttributes,
        };

        attributes = (<any>Object).assign(attributes, sellerAttributes);
      }
    }
    return JSON.parse(JSON.stringify(attributes));
  }
}
