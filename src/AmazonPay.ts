import { SetupPayloadBuilder } from './checkout/SetupPayloadBuilder';

export const AmazonPay = {
    setupPayload: function(version: string) : SetupPayloadBuilder {
        return new SetupPayloadBuilder(version);
    }
}