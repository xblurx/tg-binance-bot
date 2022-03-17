import { getP2PData, getSymbolTicker } from './api';

export const getBTCInfoMessages = async () => {
    const [ads, ticker] = await Promise.all([
        getP2PData().then((data) => data.map((item) => item.adv)),
        getSymbolTicker('BTCUSDT'),
    ]);

    const message: string[] | false =
        !!ads &&
        !!ticker.price &&
        ads.map((cv) => {
            const fiftyToCrypto = 50000 / parseFloat(cv.price);
            const hundredToCrypto = 100000 / parseFloat(cv.price);
            const btcUSD = parseFloat(ticker.price);

            return `Current price: ${cv.price} ${cv.fiatUnit}/${
                cv.asset
            }\nTrades up to: ${cv.dynamicMaxSingleTransAmount} ${
                cv.fiatUnit
            }\nHas up to: ${cv.dynamicMaxSingleTransQuantity} ${
                cv.asset
            }\n50k rub: ${fiftyToCrypto} ${cv.asset}, ${
                btcUSD * fiftyToCrypto
            } USD\n100k rub: ${hundredToCrypto} ${cv.asset}, ${
                btcUSD * hundredToCrypto
            } USD`;
        });

    return message;
};
