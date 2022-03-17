import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { getBTCInfoMessages } from './service';

dotenv.config();

const bot = new TelegramBot(process.env.token as string, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from?.id;

    if (userId === parseInt(process.env.userId as string)) {
        const messages = await getBTCInfoMessages();
        await bot.sendMessage(chatId, messages ? messages[0] : 'An error occurred');
    }
});
