import { getP2PExchangeData, getSymbolTicker } from './api';

export const getBTCRateMessage = async (): Promise<string[]> => {
    const [ads, ticker] = await Promise.all([
        getP2PExchangeData().then((data) => data?.data.map((ad) => ad.adv)),
        getSymbolTicker('BTCUSDT'),
    ]);

    return !!ads && !!ticker.price
        ? ads.map((cv) => {
            const fiftyFiatToCrypto = 50000 / parseFloat(cv.price);
            const hundredFiatToCrypto = 100000 / parseFloat(cv.price);
            const usdtPerTicker = parseFloat(ticker.price);

            return `Current price: ${cv.price} ${cv.fiatUnit}/${
                cv.asset
            }\nTrades up to: ${cv.dynamicMaxSingleTransAmount} ${
                cv.fiatUnit
            }\nHas up to: ${cv.dynamicMaxSingleTransQuantity} ${
                cv.asset
            }\n50k rub: ${fiftyFiatToCrypto.toFixed(8)} ${cv.asset}, ${(
                usdtPerTicker * fiftyFiatToCrypto
            ).toFixed(2)} USD\n100k rub: ${hundredFiatToCrypto.toFixed(8)} ${
                cv.asset
            }, ${(usdtPerTicker * hundredFiatToCrypto).toFixed(2)} USD`;
        })
        : ['An error occurred'];
};
