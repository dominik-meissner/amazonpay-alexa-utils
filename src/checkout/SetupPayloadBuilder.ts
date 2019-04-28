import { interfaces } from 'ask-sdk-model';
import SetupAmazonPayRequest = interfaces.amazonpay.request.SetupAmazonPayRequest;
import BillingAgreementAttributes = interfaces.amazonpay.model.v1.BillingAgreementAttributes;

import { LedgerCurrency } from '../model/LedgerCurrency';
import { SandboxSetting } from '../model/SandboxSetting';
import { BillingAgreementAttributesBuilder } from './BillingAgreementAttributesBuilder';

export class SetupPayloadBuilder {
  private readonly DUMMY: string = 'dummy';

  private readonly version: string;
  private readonly type: string;

  private sellerId: string = this.DUMMY;
  private countryOfEstablishment: string = this.DUMMY;
  private ledgerCurrency: LedgerCurrency = LedgerCurrency.NOT_DEFINED;
  private checkoutLanguage: string = this.DUMMY;
  private isShippingNeeded: boolean = false;
  private sandboxSetting: SandboxSetting = new SandboxSetting(this.DUMMY);
  private onSandBox: boolean = false;

  // BAAttributes

  private hasBAAttributes: boolean = false;

  private sellerNote: string = this.DUMMY;
  private platformId: string = this.DUMMY;
  // sellerAttributes
  private storeName: string = this.DUMMY;
  private customInformation: string = this.DUMMY;
  private sellerBillingAgreementId: string = this.DUMMY;

  constructor(version: string) {
    // version can be used to decide for the right fromat in future
    this.version = version;
    this.type = 'SetupAmazonPayRequest';
  }

  public withSellerId(sellerId: string): SetupPayloadBuilder {
    this.sellerId = sellerId;
    return this;
  }

  public setSellerId(sellerId: string): SetupPayloadBuilder {
    return this.withSellerId(sellerId);
  }

  public withCountryOfEstablishment(countryOfEstablishment: string): SetupPayloadBuilder {
    this.countryOfEstablishment = countryOfEstablishment;
    return this;
  }

  public setCountryOfEstablishment(countryOfEstablishment: string): SetupPayloadBuilder {
    return this.withCountryOfEstablishment(countryOfEstablishment);
  }

  public withLedgerCurrency(currency: LedgerCurrency): SetupPayloadBuilder {
    this.ledgerCurrency = currency;
    return this;
  }

  public setLedgerCurrency(currency: LedgerCurrency): SetupPayloadBuilder {
    return this.withLedgerCurrency(currency);
  }

  public withCheckoutLanguage(language: string): SetupPayloadBuilder {
    this.checkoutLanguage = language;
    return this;
  }

  public setCheckoutLanguage(language: string): SetupPayloadBuilder {
    return this.withCheckoutLanguage(language);
  }

  public shippingNeeded(needed: boolean): SetupPayloadBuilder {
    this.isShippingNeeded = needed;
    return this;
  }

  public withSellerNote(sellerNote: string): SetupPayloadBuilder {
    this.hasBAAttributes = true;
    this.sellerNote = sellerNote;
    return this;
  }

  public setSellerNote(sellerNote: string): SetupPayloadBuilder {
    return this.withSellerNote(sellerNote);
  }

  public withPlatformId(platformId: string): SetupPayloadBuilder {
    this.hasBAAttributes = true;
    this.platformId = platformId;
    return this;
  }

  public setPlatformId(platformId: string): SetupPayloadBuilder {
    return this.withPlatformId(platformId);
  }

  // sellerAttributes
  public withStoreName(storeName: string): SetupPayloadBuilder {
    this.hasBAAttributes = true;
    this.storeName = storeName;
    return this;
  }

  public setStoreName(storeName: string): SetupPayloadBuilder {
    return this.withStoreName(storeName);
  }

  public withCustomInformation(customInformation: string): SetupPayloadBuilder {
    this.hasBAAttributes = true;
    this.customInformation = customInformation;
    return this;
  }

  public setCustomInformation(customInformation: string): SetupPayloadBuilder {
    return this.withCustomInformation(customInformation);
  }

  public withSellerBillingAgreementId(sellerBillingAgreementId: string): SetupPayloadBuilder {
    this.hasBAAttributes = true;
    this.sellerBillingAgreementId = sellerBillingAgreementId;
    return this;
  }

  public setSellerBillingAgreementId(sellerBillingAgreementId: string): SetupPayloadBuilder {
    return this.withSellerBillingAgreementId(sellerBillingAgreementId);
  }

  public onSandbox(sandboxSetting: SandboxSetting): SetupPayloadBuilder {
    this.sandboxSetting = sandboxSetting;
    this.onSandBox = true;
    return this;
  }

  public build(): SetupAmazonPayRequest {
    if (this.sellerId === this.DUMMY) {
      throw new Error('sellerId is required');
    }
    if (this.ledgerCurrency === LedgerCurrency.NOT_DEFINED) {
      throw new Error('ledgerCurrency is required');
    }
    if (this.countryOfEstablishment === this.DUMMY) {
      throw new Error('countryOfEstablishment is required');
    }

    let payload = {
      '@type': this.type,
      '@version': this.version,
      countryOfEstablishment: this.countryOfEstablishment,
      ledgerCurrency: this.ledgerCurrency,
      needAmazonShippingAddress: this.isShippingNeeded,
      sellerId: this.sellerId,
    };

    let sandBoxPayload = {};
    let languagePayload = {};
    let baPayload = {};

    if (this.onSandBox) {
      sandBoxPayload = {
        sandboxCustomerEmailId: this.sandboxSetting.email,
        sandboxMode: true,
      };
    }

    if (this.checkoutLanguage !== this.DUMMY) {
      languagePayload = {
        checkoutLanguage: this.checkoutLanguage,
      };
    }

    if (this.hasBAAttributes) {
      const baAttributes = new BillingAgreementAttributesBuilder(this.version)
        .withCustomInformation(this.customInformation)
        .withPlatformId(this.platformId)
        .withSellerBillingAgreementId(this.sellerBillingAgreementId)
        .withSellerNote(this.sellerNote)
        .withStoreName(this.storeName)
        .build();

      baPayload = {
        billingAgreementAttributes: baAttributes,
      };
    }

    payload = Object.assign(payload, sandBoxPayload, languagePayload, baPayload);

    return JSON.parse(JSON.stringify(payload));
  }
}
