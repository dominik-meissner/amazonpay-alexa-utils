import { interfaces } from 'ask-sdk-model';
import ChargeAmazonPayRequest = interfaces.amazonpay.request.ChargeAmazonPayRequest;

import { Currency } from '../model/Currency';
import { PaymentAction } from '../model/PaymentAction';

export class ChargePayloadBuilder {
  private readonly DUMMY: string = 'dummy';

  private readonly version: string;
  private readonly type: string;

  // required arguments on Request
  private sellerId: string = this.DUMMY;
  private billingAgreementId: string = this.DUMMY;
  private paymentAction: PaymentAction = PaymentAction.AUTHORIZEANDCAPTURE;

  // required arguments on AuthorizeAttributes
  private authorizationReferenceId: string = this.DUMMY;
  private authorizationAmount: string = this.DUMMY;
  private currency: Currency = Currency.NOT_DEFINED;

  // control flags
  private needsSellerOrderAttributes = false;
  private needsoptionalAuthAttributes = false;

  // optional arguments on AuthorizeAttributes
  private sellerAuthorizationNote: string = this.DUMMY;
  private softDescriptor: string = this.DUMMY;
  private transactionTimeout: string = this.DUMMY;

  // optional SellerOrderAttributes
  private sellerOrderId: string = this.DUMMY;
  private sellerNote: string = this.DUMMY;
  private storeName: string = this.DUMMY;
  private customInformation: string = this.DUMMY;

  constructor(version: string) {
    // version can be used to decide for the right fromat in future
    this.version = version;
    this.type = 'ChargeAmazonPayRequest';
  }

  public withSellerId(sellerId: string): ChargePayloadBuilder {
    this.sellerId = sellerId;
    return this;
  }

  public setSellerId(sellerId: string): ChargePayloadBuilder {
    return this.withSellerId(sellerId);
  }

  public withBillingAgreementId(billingAgreement: string): ChargePayloadBuilder {
    this.billingAgreementId = billingAgreement;
    return this;
  }

  public setBillingAgreementId(billingAgreement: string): ChargePayloadBuilder {
    return this.withBillingAgreementId(billingAgreement);
  }

  public withPaymentAction(action: PaymentAction): ChargePayloadBuilder {
    this.paymentAction = action;
    return this;
  }

  public setPaymentAction(action: PaymentAction): ChargePayloadBuilder {
    return this.withPaymentAction(action);
  }

  public withAuthorizationReferenceId(referenceId: string): ChargePayloadBuilder {
    this.authorizationReferenceId = referenceId;
    return this;
  }

  public setAuthorizationReferenceId(referenceId: string): ChargePayloadBuilder {
    return this.withAuthorizationReferenceId(referenceId);
  }

  public withAmount(amount: string): ChargePayloadBuilder {
    this.authorizationAmount = amount;
    return this;
  }

  public setAmount(amount: string): ChargePayloadBuilder {
    return this.withAmount(amount);
  }

  public withCurrency(currency: Currency): ChargePayloadBuilder {
    this.currency = currency;
    return this;
  }

  public setCurrency(currency: Currency): ChargePayloadBuilder {
    return this.withCurrency(currency);
  }

  public withSellerAuthorizationNote(note: string): ChargePayloadBuilder {
    this.needsoptionalAuthAttributes = true;
    this.sellerAuthorizationNote = note;
    return this;
  }

  public setSellerAuthorizationNote(note: string): ChargePayloadBuilder {
    return this.withSellerAuthorizationNote(note);
  }

  public withSoftDescriptor(softDescriptor: string): ChargePayloadBuilder {
    this.needsoptionalAuthAttributes = true;
    this.softDescriptor = softDescriptor;
    return this;
  }

  public setSoftDescriptor(softDescriptor: string): ChargePayloadBuilder {
    return this.withSoftDescriptor(softDescriptor);
  }

  public withTransactionTimeout(transactionTimeout: string): ChargePayloadBuilder {
    this.needsoptionalAuthAttributes = true;
    this.transactionTimeout = transactionTimeout;
    return this;
  }

  public setTransactionTimeout(transactionTimeout: string): ChargePayloadBuilder {
    return this.withTransactionTimeout(transactionTimeout);
  }

  public withSellerOrderId(sellerOrderId: string): ChargePayloadBuilder {
    this.needsSellerOrderAttributes = true;
    this.sellerOrderId = sellerOrderId;
    return this;
  }

  public setSellerOrderId(sellerOrderId: string): ChargePayloadBuilder {
    return this.withSellerOrderId(sellerOrderId);
  }

  public withSellerNote(sellerNote: string): ChargePayloadBuilder {
    this.needsSellerOrderAttributes = true;
    this.sellerNote = sellerNote;
    return this;
  }

  public setSellerNote(sellerNote: string): ChargePayloadBuilder {
    return this.withSellerNote(sellerNote);
  }

  // sellerAttributes
  public withStoreName(storeName: string): ChargePayloadBuilder {
    this.needsSellerOrderAttributes = true;
    this.storeName = storeName;
    return this;
  }

  public setStoreName(storeName: string): ChargePayloadBuilder {
    return this.withStoreName(storeName);
  }

  public withCustomInformation(customInformation: string): ChargePayloadBuilder {
    this.needsSellerOrderAttributes = true;
    this.customInformation = customInformation;
    return this;
  }

  public setCustomInformation(customInformation: string): ChargePayloadBuilder {
    return this.withCustomInformation(customInformation);
  }

  public build(): ChargeAmazonPayRequest {
    if (this.sellerId === this.DUMMY) {
      throw new Error('sellerId is required');
    }
    if (this.billingAgreementId === this.DUMMY) {
      throw new Error('billingAgreementId is required');
    }
    if (this.authorizationReferenceId === this.DUMMY) {
      throw new Error('authorizationReferenceId is required');
    }
    if (this.authorizationAmount === this.DUMMY) {
      throw new Error('authorizationAmount is required');
    }
    if (this.currency === Currency.NOT_DEFINED) {
      throw new Error('currency is required');
    }

    let payload = {
      '@type': this.type,
      '@version': this.version,
      billingAgreementId: this.billingAgreementId,
      paymentAction: this.paymentAction,
      sellerId: this.sellerId,
    };

    let authAttributesContainer = {};

    let authAttributes = {
      '@type': 'AuthorizeAttributes',
      '@version': this.version,
      authorizationAmount: {
        '@type': 'Price',
        '@version': this.version,
        amount: this.authorizationAmount,
        currencyCode: this.currency,
      },
      authorizationReferenceId: this.authorizationReferenceId,
    };
    let sellerOrderAttributes = {};

    if (this.needsoptionalAuthAttributes) {
      if (this.sellerAuthorizationNote !== this.DUMMY) {
        authAttributes = Object.assign(authAttributes, { sellerAuthorizationNote: this.sellerAuthorizationNote });
      }
      if (this.softDescriptor !== this.DUMMY) {
        authAttributes = Object.assign(authAttributes, { softDescriptor: this.softDescriptor });
      }
      if (this.transactionTimeout !== this.DUMMY) {
        authAttributes = Object.assign(authAttributes, { transactionTimeout: this.transactionTimeout });
      }
    }
    authAttributesContainer = {
      authorizeAttributes: authAttributes,
    };

    if (this.needsSellerOrderAttributes) {
      let orderAtrributes = {
        '@type': 'SellerOrderAttributes',
        '@version': this.version,
      };
      if (this.customInformation !== this.DUMMY) {
        orderAtrributes = Object.assign(orderAtrributes, { customInformation: this.customInformation });
      }
      if (this.sellerNote !== this.DUMMY) {
        orderAtrributes = Object.assign(orderAtrributes, { sellerNote: this.sellerNote });
      }
      if (this.sellerOrderId !== this.DUMMY) {
        orderAtrributes = Object.assign(orderAtrributes, { sellerOrderId: this.sellerOrderId });
      }
      if (this.storeName !== this.DUMMY) {
        orderAtrributes = Object.assign(orderAtrributes, { storeName: this.storeName });
      }

      sellerOrderAttributes = {
        sellerOrderAttributes: orderAtrributes,
      };
    }
    payload = Object.assign(payload, authAttributesContainer, sellerOrderAttributes);

    return JSON.parse(JSON.stringify(payload));
  }
}
