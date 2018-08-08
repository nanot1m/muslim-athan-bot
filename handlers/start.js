// @ts-check

const startMessage = `
_Ас-саляму алейкум!_

Я подскажу время намаза на сегодня.  
Для этого пришли мне своё местоположение.
`.trim();

/**
 *
 * @param {import('node-telegram-bot-api')} bot
 */
exports.startHandlerFactory = bot => {
  bot.onText(/\/start/, msg => {
    if (!msg.from) {
      console.warn("No from field in message");
      return;
    }
    bot.sendMessage(msg.from.id, startMessage, {
      parse_mode: "Markdown",
      reply_markup: {
        force_reply: true,
        keyboard: [
          [
            {
              text: "Отправить местоположение",
              request_location: true
            }
          ]
        ]
      }
    });
  });
};
