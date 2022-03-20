import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { getBTCRateMessage } from './service';

dotenv.config();

const bot = new TelegramBot(process.env.token as string, { polling: true });

bot.on('message', async (msg) => {
    const userId = msg.from?.id;

    if (userId === parseInt(process.env.userId as string)) {
        const messages = await getBTCRateMessage();
        await bot.sendMessage(msg.chat.id, messages.join('\n\n'));
    }
});
