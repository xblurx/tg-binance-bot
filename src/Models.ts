enum EAsset {
    BTC = 'BTC',
}

enum EFiatUnit {
    RUB = 'RUB',
    USD = 'USD',
}

export type TTradeMethodName = 'Tinkoff' | 'BANK' | 'SpecificBank';

/*
 * Via which method you're going to pay/receive. Primarily bank info.
 */
interface ITradeMethod {
    payMethodId: string;
    payType: TTradeMethodName;
    identifier: TTradeMethodName;
    tradeMethodName: string;
    tradeMethodShortName: string;
}

type TFiatSymbol = '₽' | '$';

/*
 * A search p2p response.
 */
export interface IResponse {
    code: string;
    data: IAdData[];
    message: string | null;
    messageDetail: string | null;
    success: boolean;
    total: number;
}

export interface IAdData {
    adv: IAdvertisement;
    advertiser: unknown;
}

/*
 * p2p sell advertisement.
 */
export interface IAdvertisement {
    asset: EAsset;
    fiatUnit: EFiatUnit;
    price: string;
    tradeMethods: ITradeMethod[];
    fiatSymbol: TFiatSymbol;
    /* Current amount of fiat to buy */
    dynamicMaxSingleTransAmount: string;
    /* Current amount of crypto to sell */
    dynamicMaxSingleTransQuantity: string;
}
