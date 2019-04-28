# amazonpay-alexa-utils

## Example

### Setup API

```javascript
// TODO const AMAZONPay = require('@ask-utils/amazon-pay')
import { AmazonPay } from '../../AmazonPay';

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
## COMING SOON
### Charge API

```javascript
// TODO const AMAZONPay = require('@ask-utils/amazon-pay')
import { AmazonPay } from '../../AmazonPay';

const payload = AmazonPay.setupPayload(/*version*/ '2')
    .withReferenceId('ABCD1234ADS')
    .withCurrency('EUR')
    .withAmount(50)
    .withStoreName('my store')
    ...
    .build();

console.log(JSON.stringify(payload))

{
  "@type": "ChargeAmazonPayRequest",
  "@version": "2",
  "sellerId": "my-seller-id",
  "billingAgreementId": "agreement-id",
  "paymentAction": "AuthorizeAndCapture",
  "authorizeAttributes": {
    "@type": "AuthorizeAttributes",
    "@version": "2",
    "authorizationReferenceId": "MyReference ID",
    "authorizationAmount": {
      "@type": "Price",
      "@version": "2",
      "amount": "500",
      "currencyCode": "USD"
    }
  },
  "sellerOrderAttributes": {
    "@type": "SellerOrderAttributes",
    "@version": "2",
    "sellerOrderId": "my seller id",
    "storeName": "Example store"
  }
}
```
### Directives
```javascript

AmazonPay.setupDirective()
    .forPayload(payload)
    .withCorrelationToken('token')
    .build();
```

### Charge online
```javascript

AmazonPay.chargeOnline()
    .withSetupPayload(setupPayload)
    .withChargePayload(chargePaload)
    .wkithCorrelationToken('token')
    .onResspomse(callback)
    .registerOn(skillBuilder);
```

### Decline handler

### Error handler

### Buyer Id convenience functions

### DeclineSimulator for Sandbox

