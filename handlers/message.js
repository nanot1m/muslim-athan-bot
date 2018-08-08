// @ts-check
/**
 * @param {import('node-telegram-bot-api')} bot
 * @param {import('../services/aladhan-service').AladhanService} aladhanService
 */
exports.messageHandlerFactory = (bot, aladhanService) => {
  bot.on("message", msg => {
    if (msg.location) {
      handleLocation(bot, aladhanService, msg);
    }
  });
};

/**
 * @param {import('node-telegram-bot-api')} bot
 * @param {import('../services/aladhan-service').AladhanService} aladhanService
 * @param {import('node-telegram-bot-api').Message} msg
 */
async function handleLocation(bot, aladhanService, msg) {
  if (!msg.from || !msg.location) {
    return;
  }
  try {
    const response = await aladhanService.timings(msg.location);
    const timings = response.data.data.timings;
    bot.sendMessage(msg.from.id, formatTimings(timings), {
      parse_mode: "Markdown"
    });
  } catch (ex) {
    console.error(ex);
  }
}

const blacklist = {
  Sunrise: true,
  Sunset: true,
  Midnight: true
};

/**
 * @param {Object.<string, string>} timings
 */
function formatTimings(timings) {
  const entries = Object.entries(timings).filter(([key]) => !blacklist[key]);
  return `
${entries.map(([key, value]) => `*${key}:* ${value}`).join("\n")}
`.trim();
}
