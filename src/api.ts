import axios from 'axios';
import {
    EAsset,
    EFiatUnit,
    IP2PResponse,
    ITicker,
    TTradeMethodName,
} from './models';

axios.interceptors.response.use(
    config => config,
    (error) => {
        if (error?.response.status === 408 || error.code === 'ECONNABORTED') {
            console.log(`timeout, url: ${error.config.url}`)
        }
        throw error
    },
);

export const getSymbolTicker = async (symbol: string): Promise<ITicker> => {
    const { data } = await axios.get<ITicker>(
        'https://api.binance.com/api/v3/ticker/price',
        {
            params: { symbol },
        }
    );
    return data;
};

export const getP2PExchangeData = async (
    page = 1,
    fiat = EFiatUnit.RUB,
    tradeType = 'BUY',
    asset = EAsset.BTC,
    payTypes: TTradeMethodName[] = ['BANK'],
    transAmount = 50000
): Promise<IP2PResponse | undefined> => {
    try {
        const { data } = await axios.post<IP2PResponse>(
            'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {
                page,
                rows: 3,
                publisherType: null,
                asset,
                tradeType,
                fiat,
                payTypes,
                transAmount,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return data;
    } catch (e) {
        console.error(e);
        return
    }
};
