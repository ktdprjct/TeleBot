const axios = require("axios")
module.exports = {
  start: async function(bot, {chatId}) {
    let { data } = await axios("https://waifu.pics/api/sfw/waifu")
    bot.replyWithPhoto(chatId, data.url, {
      caption: `Source: ${data.url}`,
        reply_markup: {
            inline_keyboard: [
                [   
                    {
                        text: "Yes",
                        callback_data: "btn_yes"
                    },
                    {
                        text: "No",
                        callback_data: "btn_no"
                    },
                   
                ]
            ]
        }
    })
  },
  tags: "anime",
  help: ["waifu"],
  desc: "Mengirim foto waifu random"
}
