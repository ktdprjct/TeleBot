let { youtubedlv2, youtubedlv3 } = require("@bochilteam/scraper")

module.exports = {
  start: async function(ctx, { text }) {
    let { servers, yta, ytIdRegex  } = require("../lib/y2mate")
    let args = text.split(" ")
    let limit = 1000

    if(!args[0]) return ctx.reply("Masukkan url!")
    if(!ytIdRegex.test(args[0])) return ctx.reply("Masukkan url YouTube yang valid!")

    const { thumbnail, audio: _audio, title } = await youtubedlv2(args[0]).catch(async _ => await youtubedlv3(args[0]))
    let audio, res, link
    
    for (let i in _audio) {
        try {
            audio = _audio[i]
            if (isNaN(audio.fileSize)) continue
            link = await audio.download()
            if (link) res = await fetch(link)
            break
        } catch (e) {
            console.error(e)
        }
    }
    
    ctx.replyWithPhoto(thumbnail, { caption: `Ukuran file: ${audio.fileSizeH}\nJudul: ${title}\n\nSedang mengirim audio...` }).then(function(msg) {
      ctx.replyWithAudio(link, { filename: title + ".mp3" }, { reply_to_message_id: msg.message_id })
    })
  },
  tags: "downloader",
  help: ["yta", "ytmp3"],
  desc: "Mengunduh dan mengkonversi video YouTube menjadi audio"
}
