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
  private billingAgreementAttributes: BillingAgreementAttributes = new BillingAgreementAttributesBuilder(
    this.version,
  ).build();

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

  public withBillingAgreementAttributes(attributes: BillingAgreementAttributes): SetupPayloadBuilder {
    this.billingAgreementAttributes = attributes;
    return this;
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
      billingAgreementAttributes: {
        '@type': 'BillingAgreementAttributes',
        '@version': '2',
        platformId: '',
        sellerBillingAgreementAttributes: {
          '@type': 'SellerBillingAgreementAttributes',
          '@version': '2',
          customInformation: '',
          sellerBillingAgreementId: '',
          storeName: '',
        },
        sellerNote: '',
      },
      countryOfEstablishment: this.countryOfEstablishment,
      ledgerCurrency: this.ledgerCurrency,
      needAmazonShippingAddress: this.isShippingNeeded,
      sellerId: this.sellerId,
    };

    let sandBoxPayload = {};
    let languagePayload = {};

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

    payload = Object.assign(payload, sandBoxPayload, languagePayload);

    return JSON.parse(JSON.stringify(payload));
  }
}
