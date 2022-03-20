export enum EAsset {
    BTC = 'BTC',
}

export enum EFiatUnit {
    RUB = 'RUB',
    USD = 'USD',
}

type TFiatSymbol = '₽' | '$';

export type TTradeMethodName = 'Tinkoff' | 'BANK' | 'SpecificBank';

export interface ITicker {
    ticker: string;
    price: string;
}

/*
 * A search p2p response.
 */
export interface IP2PResponse {
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
    /* Methods you're going to pay/receive with. Primarily bank info. */
    tradeMethods: Array<{
        payMethodId: string;
        payType: TTradeMethodName;
        identifier: TTradeMethodName;
        tradeMethodName: string;
        tradeMethodShortName: string;
    }>;
    fiatSymbol: TFiatSymbol;
    /* Current amount of fiat to buy */
    dynamicMaxSingleTransAmount: string;
    /* Current amount of crypto to sell */
    dynamicMaxSingleTransQuantity: string;
}
