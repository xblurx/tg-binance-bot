import axios from 'axios';
import { IResponse } from './Models';

interface ITicker {
    ticker: string;
    price: string;
}

export const getSymbolTicker = async (symbol: string): Promise<ITicker> => {
    const { data } = await axios.get<ITicker>(
        'https://api.binance.com/api/v3/ticker/price',
        {
            params: { symbol },
        }
    );
    return data;
};

export const getP2PData = async (
    page = 1,
    fiat = 'RUB',
    tradeType = 'BUY',
    asset = 'BTC',
    payTypes = ['BANK'],
    transAmount = 50000
) => {
    const {
        data,
    } = await axios.post<IResponse>(
        'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
        {
            page,
            rows: 20,
            publisherType: null,
            asset,
            tradeType,
            fiat,
            payTypes,
            transAmount,
        },
        {
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return data.data
};
