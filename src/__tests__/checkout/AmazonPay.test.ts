import { AmazonPay } from '../../AmazonPay';
import { LedgerCurrency } from '../../model/LedgerCurrency';
import { SandboxSetting } from '../../model/SandboxSetting';

test('setupPayload full', () => {
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

  expect(payload).toEqual(
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
  );
  expect(payload['@type']).toBe('SetupAmazonPayRequest');
  expect(payload['@version']).toBe('2');
  expect(payload.checkoutLanguage).toBe('en_GB');
  expect(payload.sellerId).toBe('ABCD1234ADS');
  expect(payload.countryOfEstablishment).toBe('DE');
  expect(payload.ledgerCurrency).toBe(LedgerCurrency.EUR);
  expect(payload.needAmazonShippingAddress).toBe(true);
  expect(payload.sandboxMode).toBe(true);
  expect(payload.sandboxCustomerEmailId).toBe('mysandbox@email.test');

  expect(payload.billingAgreementAttributes).toBeDefined();
  const billingAgreementAttributes = payload.billingAgreementAttributes;
  if(billingAgreementAttributes){
    expect(billingAgreementAttributes.platformId).toBe("ABCDE");
    expect(billingAgreementAttributes.sellerNote).toBe("my note");
    expect(billingAgreementAttributes.sellerBillingAgreementAttributes).toBeDefined();
    const sellerAttributes = billingAgreementAttributes.sellerBillingAgreementAttributes;
    if(sellerAttributes){
      expect(sellerAttributes.customInformation).toBe("so custom");
      expect(sellerAttributes.sellerBillingAgreementId).toBe("12345");
      expect(sellerAttributes.storeName).toBe("my store");
    }
  }
});

test('setupPayload minimal', () => {
  const payload = AmazonPay.setupPayload(/*version*/ '2')
    .withSellerId('ABCD1234ADS')
    .withCountryOfEstablishment('DE')
    .withLedgerCurrency(LedgerCurrency.EUR)
    .build();
  expect(payload['@type']).toBe('SetupAmazonPayRequest');
  expect(payload['@version']).toBe('2');
  expect(payload.checkoutLanguage).toBeUndefined();
  expect(payload.sellerId).toBe('ABCD1234ADS');
  expect(payload.countryOfEstablishment).toBe('DE');
  expect(payload.ledgerCurrency).toBe(LedgerCurrency.EUR);
  expect(payload.needAmazonShippingAddress).toBe(false);
  expect(payload.sandboxMode).toBeUndefined();
  expect(payload.sandboxCustomerEmailId).toBeUndefined();
});

/*

var payload = {
        '@type': setupPayloadVersioning.type,
        '@version': setupPayloadVersioning.version,
        'sellerId': regionalConfig.MERCHANT_ID,
        'countryOfEstablishment': regionalConfig.COUNTRY_OF_ESTABLISHMENT,
        'ledgerCurrency': regionalConfig.LEDGER_CURRENCY,
        'checkoutLanguage': language,
        'sandboxCustomerEmailId': regionalConfig.SANDBOX_CUSTOMER_EMAIL,
        'sandboxMode': regionalConfig.SANDBOX,
        'needAmazonShippingAddress': generalConfig.NEED_AMAZON_SHIPPING_ADDRESS,
        'billingAgreementAttributes': {
            '@type': 'BillingAgreementAttributes',
            '@version': '2',
            'sellerNote': localizationClient.t('SELLER_NOTE'),
            'platformId': generalConfig.PLATFORM_ID,
            'sellerBillingAgreementAttributes': {
                '@type': 'SellerBillingAgreementAttributes',
                '@version': '2',
                //'sellerBillingAgreementId': SOME RANDOM STRING,
                'storeName': localizationClient.t('STORE_NAME'),
                'customInformation': localizationClient.t('CUSTOM_INFO')
            }
        }
    };

    */
