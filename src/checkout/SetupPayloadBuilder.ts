import { interfaces } from 'ask-sdk-model';
import SetupAmazonPayRequest = interfaces.amazonpay.request.SetupAmazonPayRequest;
import BillingAgreementAttributes = interfaces.amazonpay.model.v1.BillingAgreementAttributes;

import { LedgerCurrency } from '../model/LedgerCurrency';
import { SandboxSetting } from '../model/SandboxSetting';
import { BillingAgreementAttributesBuilder } from './BillingAgreementAttributesBuilder';

export class SetupPayloadBuilder {
  private readonly DUMMY: string = 'dummy';

  private readonly _version: string;
  private readonly _type: string;

  private _sellerId: string = this.DUMMY;
  private _countryOfEstablishment: string = this.DUMMY;
  private _ledgerCurrency: LedgerCurrency = LedgerCurrency.NOT_DEFINED;
  private _checkoutLanguage: string = this.DUMMY;
  private _shippingNeeded: boolean = false;
  private _sandboxSetting: SandboxSetting = new SandboxSetting(this.DUMMY);
  private _onSandBox: boolean = false;
  private _billingAgreementAttributes: BillingAgreementAttributes = new BillingAgreementAttributesBuilder(
    this._version,
  ).build();

  constructor(version: string) {
    // version can be used to decide for the right fromat in future
    this._version = version;
    this._type = 'SetupAmazonPayRequest';
  }

  withSellerId(sellerId: string): SetupPayloadBuilder {
    this._sellerId = sellerId;
    return this;
  }

  setSellerId(sellerId: string): SetupPayloadBuilder {
    return this.withSellerId(sellerId);
  }

  withCountryOfEstablishment(countryOfEstablishment: string): SetupPayloadBuilder {
    this._countryOfEstablishment = countryOfEstablishment;
    return this;
  }

  setCountryOfEstablishment(countryOfEstablishment: string): SetupPayloadBuilder {
    return this.withCountryOfEstablishment(countryOfEstablishment);
  }

  withLedgerCurrency(currency: LedgerCurrency): SetupPayloadBuilder {
    this._ledgerCurrency = currency;
    return this;
  }

  setLedgerCurrency(currency: LedgerCurrency): SetupPayloadBuilder {
    return this.withLedgerCurrency(currency);
  }

  withCheckoutLanguage(language: string): SetupPayloadBuilder {
    this._checkoutLanguage = language;
    return this;
  }

  setCheckoutLanguage(language: string): SetupPayloadBuilder {
    return this.withCheckoutLanguage(language);
  }

  shippingNeeded(needed: boolean): SetupPayloadBuilder {
    this._shippingNeeded = needed;
    return this;
  }

  withBillingAgreementAttributes(attributes: BillingAgreementAttributes): SetupPayloadBuilder {
    this._billingAgreementAttributes = attributes;
    return this;
  }

  onSandbox(sandboxSetting: SandboxSetting): SetupPayloadBuilder {
    this._sandboxSetting = sandboxSetting;
    this._onSandBox = true;
    return this;
  }

  build(): SetupAmazonPayRequest {
    if (this._sellerId === this.DUMMY) throw new Error('sellerId is required');
    if (this._ledgerCurrency === LedgerCurrency.NOT_DEFINED) throw new Error('ledgerCurrency is required');
    if (this._countryOfEstablishment === this.DUMMY) throw new Error('countryOfEstablishment is required');

    let payload = {
      '@type': this._type,
      '@version': this._version,
      sellerId: this._sellerId,
      countryOfEstablishment: this._countryOfEstablishment,
      ledgerCurrency: this._ledgerCurrency,
      needAmazonShippingAddress: this._shippingNeeded,
      billingAgreementAttributes: {
        '@type': 'BillingAgreementAttributes',
        '@version': '2',
        sellerNote: '',
        platformId: '',
        sellerBillingAgreementAttributes: {
          '@type': 'SellerBillingAgreementAttributes',
          '@version': '2',
          sellerBillingAgreementId: '',
          storeName: '',
          customInformation: '',
        },
      },
    };

    let sandBoxPayload = {};
    let languagePayload = {};

    if (this._onSandBox) {
      sandBoxPayload = {
        sandboxCustomerEmailId: this._sandboxSetting.email,
        sandboxMode: true,
      };
    }

    if (this._checkoutLanguage !== this.DUMMY) {
      languagePayload = {
        checkoutLanguage: this._checkoutLanguage,
      };
    }

    payload = (<any>Object).assign(payload, sandBoxPayload, languagePayload);

    return JSON.parse(JSON.stringify(payload));
  }
}
