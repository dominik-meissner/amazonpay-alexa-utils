# amazonpay-alexa-utils

[![Build Status](https://travis-ci.org/danielneu/amazonpay-alexa-utils.svg?branch=master)](https://travis-ci.org/danielneu/amazonpay-alexa-utils)

To install it into your project, simply execute `npm i amazonpay-alexa-utils --save`

## Setup API

Build payloads for setup operations the easy way -  no need to know the pyload structure. The builder will take care to give you the right format.


Learn more about the [Amazon Pay Setup API](https://developer.amazon.com/de/docs/amazon-pay/amazon-pay-apis-for-alexa.html#setup)

```javascript
const AmazonPay = require('amazonpay-alexa-utils');

const payload = AmazonPay.setupPayload(/*version*/ '2')
    .withSellerId('ABCD1234ADS')
    .withCountryOfEstablishment('DE')
    .withLedgerCurrency(LedgerCurrency.EUR)
    .withCheckoutLanguage('en_GB')
    .withCustomInformation('so custom')
    .withPlatformId('ABCDE')
    .withSellerBillingAgreementId('12345')
    .withSellerNote('my note')
    .withStoreName('my store')
    .shippingNeeded(true)
    .onSandbox(new SandboxSetting('mysandbox@email.test'))
    .build();

console.log(JSON.stringify(payload))


{  
    "@type":"SetupAmazonPayRequest",
    "@version":"2",
    "countryOfEstablishment":"DE",
    "ledgerCurrency":"EUR",
    "needAmazonShippingAddress":true,
    "sellerId":"ABCD1234ADS",
    "sandboxCustomerEmailId":"mysandbox@email.test",
    "sandboxMode":true,
    "checkoutLanguage":"en_GB",
    "billingAgreementAttributes":{  
        "@type":"BillingAgreementAttributes",
        "@version":"2",
        "sellerNote":"my note",
        "platformId":"ABCDE",
        "sellerBillingAgreementAttributes":{  
        "@type":"SellerBillingAgreementAttributes",
        "@version":"2",
        "storeName":"my store",
        "customInformation":"so custom",
        "sellerBillingAgreementId":"12345"
        }
    }
} 
```

## Charge API

Build payloads for charge operations the easy way -  no need to know the pyload structure. The builder will take care to give you the right format.


Learn more about the [Amazon Pay Charge API](https://developer.amazon.com/de/docs/amazon-pay/amazon-pay-apis-for-alexa.html#charge)

```javascript
const AmazonPay = require('amazonpay-alexa-utils');

const payload = AmazonPay.chargePayload(/* version */ '2')
    .withSellerId('ABCD1234ADS')
    .withBillingAgreementId('B02-12345-12345')
    .withPaymentAction(PaymentAction.AUTHORIZEANDCAPTURE)
    .withAuthorizationReferenceId('ref')
    .withAmount('50')
    .withCurrency(Currency.EUR)
    .withTransactionTimeout('0')
    .withSellerAuthorizationNote('my auth note')
    .withSoftDescriptor('my store - Alexa skill')
    .withSellerOrderId('12345')
    .withStoreName('my store')
    .withCustomInformation('so custom')
    .withSellerNote('my note')
    .build();

console.log(JSON.stringify(payload))

{
    '@type': 'ChargeAmazonPayRequest',
    '@version': '2',
    'billingAgreementId': 'B02-12345-12345',
    'paymentAction': 'AUTHORIZEANDCAPTURE',
    'sellerId': 'ABCD1234ADS',
    'authorizeAttributes': {
      '@type': 'AuthorizeAttributes',
      '@version': '2',
      'authorizationReferenceId': 'ref',
      'authorizationAmount': {
        '@type': 'Price',
        '@version': '2',
        'amount': '50',
        'currencyCode': 'EUR',
      },
      'sellerAuthorizationNote': 'my auth note',
      'softDescriptor': 'my store - Alexa skill',
      'transactionTimeout': '0',
    },
    'sellerOrderAttributes': {
      '@type': 'SellerOrderAttributes',
      '@version': '2',
      'customInformation': 'so custom',
      'sellerNote': 'my note',
      'sellerOrderId': '12345',
      'storeName': 'my store',
    },
  }
```

## Directives

Directives allow you to execute Amazon Pay operations. Just pass in the right payload and the DirectiveBuilder will hand you the correct directive to execute.

### Setup

```javascript
const AmazonPay = require('amazonpay-alexa-utils');

const payloadBuilder = AmazonPay.setupPayload(/* version */ '2')
    .withSellerId('ABCD1234ADS')
    .withCountryOfEstablishment('DE')
    .withLedgerCurrency(Currency.EUR);

const directive = AmazonPay
    .setupDirective(payloadBuilder, 'token')
    .build();

console.log(JSON.stringify(directive));

    {
      "name": "Setup",
      "payload": {
        "@type": "SetupAmazonPayRequest",
        "@version": "2",
        "countryOfEstablishment": "DE",
        "ledgerCurrency": "EUR",
        "needAmazonShippingAddress": false,
        "sellerId": "ABCD1234ADS"
      },
      "token": "token",
      "type": "Connections.SendRequest"
    }


```

### Charge

```javascript
const AmazonPay = require('amazonpay-alexa-utils');

const payloadBuilder = AmazonPay.chargePayload(/* version */ '2')
    .withSellerId('ABCD1234ADS')
    .withBillingAgreementId('B02-12345-12345')
    .withAmount('50')
    .withCurrency(Currency.EUR)
    .withAuthorizationReferenceId('ref')
    .withPaymentAction(PaymentAction.AUTHORIZE);

const directive = AmazonPay
    .chargeDirective(payloadBuilder, 'token')
    .build();

    console.log(JSON.stringify(directive));

    {
      "name": "Charge",
      "payload": {
        "@type": "ChargeAmazonPayRequest",
        "@version": "2",
        "billingAgreementId": "B02-12345-12345",
        "paymentAction": "AUTHORIZE",
        "sellerId": "ABCD1234ADS",
        "authorizeAttributes": {
          "@type": "AuthorizeAttributes",
          "@version": "2",
          "authorizationAmount": {
            "@type": "Price",
            "@version": "2",
            "amount": "50",
            "currencyCode": "EUR"
          },
          "authorizationReferenceId": "ref"
        }
      },
      "token": "token",
      "type": "Connections.SendRequest"
    }

```

## Permissions

### Get Permission Status

Knowing if a custoemr has accepted Amazon Pay permissions is essential. The following method makes this job as easy as possible for you.

```javascript
const AmazonPay = require('amazonpay-alexa-utils');

const permissionIsGranted = AmazonPay.isAmazonPayPermissionGranted(handlerInput.requestEnvelope);

```


### Ask For Permissions - send card andprompt
```javascript
const AmazonPay = require('amazonpay-alexa-utils');

const response = AmazonPay.askForPermissionCard('Spoken message to ask for permission enablement')
  .withAdditionalPermissions(['alexa::profile:email:read', 'alexa::profile:name:read'])
  .send();
```

## Amazon Pay Address API

Amazon Pay offers access to different buyer data via the AMazpn Pay payment objects. SOmetimes, this is too late in the flow to personalize the experience.
The Amazon Pay address API was introduced to circumvent this situation. TRetrieve the defualt shippign address of the current buyer via a simple GET request.

Please check for accepted Amazon Pay permissions first.
```javascript
  const AmazonPay = require('amazonpay-alexa-utils');

  async handle: {
  ...

  // use this to have the current locale decide for the region to use
  const defaultAddress = await AmazonPay.getDefaultAddressForLocale(requestEnvelope, environment, merchantId);
  
  // if you know the correct region, you can specify it yourself
  const defaultAddress = await AmazonPay.getDefaultAddressForRegion(requestEnvelope, region, environment, merchantId);
  ...
  }
```

## Amazon Pay Buyer Id

The concept of Buyer Id allows you to skip account linking for known Amazon Pay customers.
Use this simple abstraction to get the buyerId.

Please check for the Amazon Pay permission first.
```javascript
  const AmazonPay = require('amazonpay-alexa-utils');

  async handle: {
  ...

  // use this to have the current locale decide for the region to use
  const buyerId = await AmazonPay.getBuyerIdForLocale(requestEnvelope);
  
  // if you know the correct region, you can specify it yourself
  const buyerId = await AmazonPay.getBuyerIdForRegion(requestEnvelope, 'EU');
  ...
  }
```

# COMING SOON

## Charge online
```javascript

AmazonPay.chargeOnline()
    .withSetupPayload(setupPayload)
    .withChargePayload(chargePaload)
    .withCorrelationToken('token')
    .onResponse(callback)
    .registerOn(skillBuilder);
```

## Decline handler

## Error handler

## DeclineSimulator for Sandbox

