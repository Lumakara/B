const fs = require('fs')
const axios = require('axios')
const moment = require('moment-timezone')

const { isSetWelcome, getTextSetWelcome } = require('./setwelcome')
const { isSetLeft, getTextSetLeft } = require('./setleft')

const { jidNormalizedUser } = require('@whiskeysockets/baileys')

const loadJsonSafe = (path, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(path))
  } catch (e) {
    return fallback
  }
}

let set_welcome_db = loadJsonSafe('./database/set_welcome.json', [])
let set_left_db = loadJsonSafe('./database/set_left.json', [])
let setting = loadJsonSafe('./config.json', {})

fs.watchFile('./database/set_welcome.json', () => {
  set_welcome_db = loadJsonSafe('./database/set_welcome.json', [])
})

fs.watchFile('./database/set_left.json', () => {
  set_left_db = loadJsonSafe('./database/set_left.json', [])
})

fs.watchFile('./config.json', () => {
  setting = loadJsonSafe('./config.json', {})
})

module.exports.welcome = async (iswel, isleft, satanic, anu) => {
  try {

    const metadata = await satanic.groupMetadata(anu.id)
    const participants = anu.participants
    const groupName = metadata.subject
    const memberCount = metadata.participants.length
    const groupDesc = metadata.desc || "-"

    const fallbackImage = "https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg"

    for (let num of participants) {

      const user = jidNormalizedUser(num)

      let pp_user
      try {
        pp_user = await satanic.profilePictureUrl(num, 'image')
      } catch {
        pp_user = fallbackImage
      }

      const pushName = num.split('@')[0]

      /* ================= WELCOME ================= */

      if (anu.action === 'add' && (iswel || setting.auto_welcomeMsg)) {

        if (isSetWelcome(anu.id, set_welcome_db)) {

          const get_teks = await getTextSetWelcome(anu.id, set_welcome_db)

          const replaced = get_teks
            .replace(/@user/gi, `@${pushName}`)
            .replace(/@group/gi, groupName)
            .replace(/@desc/gi, groupDesc)

          await satanic.sendMessage(anu.id, {
            text: replaced,
            mentions: [num]
          })

        } else {

          const welcomeUrl =
            `https://api.siputzx.my.id/api/canvas/welcomev5?` +
            `username=${pushName}` +
            `&guildName=${encodeURIComponent(groupName)}` +
            `&memberCount=${memberCount}` +
            `&avatar=${encodeURIComponent(pp_user)}` +
            `&background=${encodeURIComponent('https://raw.githubusercontent.com/yuusuke1101/Yuugames/refs/heads/main/Alisa%20Mikahilovna%20Kujou%20(Alya).jpg')}` +
            `&quality=50`

          // Download image from URL
          const imageResponse = await axios.get(welcomeUrl, { responseType: 'arraybuffer' })
          const imageBuffer = Buffer.from(imageResponse.data, 'binary')

          await satanic.sendMessage(anu.id, {
            image: imageBuffer,
            caption: `╭─❖ 「 *WELCOME* 」 ❖
│ 👋 Halo @${pushName}
│
│ Selamat datang di
│ *${groupName}*
│
│ 📊 Member ke : ${memberCount}
│
│ Silahkan baca deskripsi grup
│ dan patuhi semua aturan ya!
│
│ Jangan lupa intro ya!
│ Nama : 
│ Umur :
│ Instagram :
│ Tiktok :
│ Askot :
╰───────────────`,
            mentions: [num]
          })

        }

      }

      /* ================= LEAVE ================= */

      else if (anu.action === 'remove' && (isleft || setting.auto_leaveMsg)) {

        if (isSetLeft(anu.id, set_left_db)) {

          const get_teks = await getTextSetLeft(anu.id, set_left_db)

          const replaced = get_teks
            .replace(/@user/gi, `@${pushName}`)
            .replace(/@group/gi, groupName)
            .replace(/@desc/gi, groupDesc)

          await satanic.sendMessage(anu.id, {
            text: replaced,
            mentions: [num]
          })

        } else {

          const goodbyeUrl =
            `https://api.siputzx.my.id/api/canvas/goodbyev2?` +
            `username=${pushName}` +
            `&guildName=${encodeURIComponent(groupName)}` +
            `&memberCount=${memberCount}` +
            `&avatar=${encodeURIComponent(pp_user)}` +
            `&background=${encodeURIComponent('https://raw.githubusercontent.com/yuusuke1101/Yuugames/refs/heads/main/Alisa%20Mikahilovna%20Kujou%20(Alya).jpg')}`

          // Download image from URL
          const imageResponse = await axios.get(goodbyeUrl, { responseType: 'arraybuffer' })
          const imageBuffer = Buffer.from(imageResponse.data, 'binary')

          await satanic.sendMessage(anu.id, {
            image: imageBuffer,
            caption: `╭─❖ 「 *GOODBYE* 」 ❖\n│ 👋 Sampai jumpa\n│ @${pushName}\n│\n│ Terima kasih sudah\n│ pernah berada di\n│ *${groupName}*\n╰───────────────`,
            mentions: [num]
          })

        }

      }

      /* ================= PROMOTE ================= */

      else if (anu.action === 'promote') {

        await satanic.sendMessage(anu.id, {
          text: `🎉 *PROMOTE MEMBER*\n\nSelamat kepada\n@${pushName}\n\nSekarang kamu menjadi\n*ADMIN* di grup\n\n*${groupName}*`,
          mentions: [num]
        })

      }

      /* ================= DEMOTE ================= */

      else if (anu.action === 'demote') {

        await satanic.sendMessage(anu.id, {
          text: `⚠️ *STATUS MEMBER*\n\n@${pushName}\nsekarang kembali menjadi\n*MEMBER*\n\ndi grup\n*${groupName}*`,
          mentions: [num]
        })

      }

    }

  } catch (err) {
    console.error(err)
  }
}