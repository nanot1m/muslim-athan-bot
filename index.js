// @ts-check
require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const config = require("./config");
const { AladhanService } = require("./services/aladhan-service");

if (!config.telegramBotApiToken) {
  throw new Error("No telegram-bot api-token is provided");
}

let bot;

if (process.env.NODE_ENV === "production") {
  // @ts-ignore
  bot = new TelegramBot(config.telegramBotApiToken, {
    webHook: { port: config.port }
  });
  bot.setWebHook(`${config.appUrl}/bot${config.telegramBotApiToken}`);
} else {
  bot = new TelegramBot(config.telegramBotApiToken, {
    polling: true
  });
}

const aladhanService = new AladhanService(config.timeCalculationMethod);

require("./handlers/start").startHandlerFactory(bot);
require("./handlers/message").messageHandlerFactory(bot, aladhanService);
