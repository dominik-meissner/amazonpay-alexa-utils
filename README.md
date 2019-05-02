# amazonpay-alexa-utils

[![Build Status](https://travis-ci.org/danielneu/amazonpay-alexa-utils.svg?branch=master)](https://travis-ci.org/danielneu/amazonpay-alexa-utils)

## Example

### Setup API

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

### Charge API

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

### Setup Directives
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

### Charge Directives
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

### Get Permission Status
```javascript
const AmazonPay = require('amazonpay-alexa-utils');

const permissionIsGranted = AmazonPay.isAmazonPayPermissionGranted(handlerInput.requestEnvelope);

```


### Ask For Permissions
```javascript
const AmazonPay = require('amazonpay-alexa-utils');

const response = AmazonPay.askForPermissionCard('Spoken message to ask for permission enablement')
  .withAdditionalPermissions(['alexa::profile:email:read', 'alexa::profile:name:read'])
  .send();
```
## COMING SOON

### Charge online
```javascript

AmazonPay.chargeOnline()
    .withSetupPayload(setupPayload)
    .withChargePayload(chargePaload)
    .withCorrelationToken('token')
    .onResponse(callback)
    .registerOn(skillBuilder);
```

### Decline handler

### Error handler

### Buyer Id convenience functions

### DeclineSimulator for Sandbox

