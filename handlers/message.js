// @ts-check

/**
 * @typedef  {import('../services/timings-provider').TimingsProvider} TimingsProvider
 */

/**
 * @param {import('node-telegram-bot-api')} bot
 * @param {TimingsProvider} timingsService
 */
exports.messageHandlerFactory = (bot, timingsService) => {
  bot.on("message", msg => {
    if (msg.location) {
      handleLocation(bot, timingsService, msg);
    }
  });

  bot.onText(/\/city\s?([a-zA-Zа-яА-Я\s]+)?/, (msg, match) => {
    if (!match) {
      return;
    }
    const city = match[1];
    if (!city) {
      handleNoCity(bot, msg);
      return;
    }
    handleCity(bot, timingsService, msg, city);
  });
};

/**
 * @param {import('node-telegram-bot-api')} bot
 * @param {TimingsProvider} timingsService
 * @param {import('node-telegram-bot-api').Message} msg
 */
async function handleLocation(bot, timingsService, msg) {
  if (!msg.from || !msg.location) {
    return;
  }
  try {
    const timings = await timingsService.timingsByLocation(msg.location);
    bot.sendMessage(msg.from.id, timings.toMarkdownString(), {
      parse_mode: "Markdown"
    });
  } catch (ex) {
    console.error(ex);
  }
}

/**
 * @param {import('node-telegram-bot-api')} bot
 * @param {TimingsProvider} timingsService
 * @param {import('node-telegram-bot-api').Message} msg
 * @param {string} city
 */
async function handleCity(bot, timingsService, msg, city) {
  if (!msg.from) {
    return;
  }
  try {
    const timings = await timingsService.timingsByCity(city);
    bot.sendMessage(msg.from.id, timings.toMarkdownString(), {
      parse_mode: "Markdown"
    });
  } catch (ex) {
    console.error(ex);
  }
}

/**
 * @param {import('node-telegram-bot-api')} bot
 * @param {import('node-telegram-bot-api').Message} msg
 */
function handleNoCity(bot, msg) {
  if (!msg.from) {
    return;
  }
  bot.sendMessage(
    msg.from.id,
    "Нужно указать город, например: `/city Москва`",
    { parse_mode: "Markdown" }
  );
}
