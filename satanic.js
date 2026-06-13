require('./settings');
const { 
    makeWASocket, 
    makeCacheableSignalKeyStore, 
    downloadContentFromMessage, 
    generateWAMessageContent,
    generateWAMessageFromContent, 
    generateWAMessage,
    generateForwardMessageContent,
    prepareWAMessageMedia, 
    useSingleFileAuthState, 
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    MessageType,
    proto,
    Browsers,
    getContentType,
    DisconnectReason,
    handleInteractive,
    areJidsSameUser,
	InteractiveMessage,
    WA_DEFAULT_EPHEMERAL    
} = require('@whiskeysockets/baileys')

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const moment = require("moment-timezone");
const path = require("path")
const cron = require('node-cron')
const fileType = require('file-type')
const request = require('request');
const ffmpeg = require('fluent-ffmpeg');
const PhoneNumber = require('awesome-phonenumber')
const fetch = require('node-fetch')
const FormData = require('form-data')
const cheerio = require('cheerio');
const qs = require('qs');
const JsConfuser = require('js-confuser')
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const { exec, execSync, spawn } = require("child_process");
const crypto = require('crypto');
const { randomBytes } = crypto;

////// FOLDER LIB /////
const { smsg, await, clockString, delay, enumGetKey, fetchBuffer, fetchhh, libformat, formatDate, formatp, tanggal, generateProfilePicture, getBuffer, getGroupAdmins, getRandom, isUrl, json, logic, parseMention, sizeLimit, runtime, sleep, sort, toNumber, getTime } = require('./lib/myfunction');
const { CatBox, TelegraPh, floNime, UploadFileUgu, uptotelegra } = require('./lib/uploader');



const { addSewaGroup, checkSewaGroup, getSewaPosition, toMs, msToDate, getGcName, expiredCheck, remindSewa } = require('./lib/sewa');


// Di bagian atas file utama Anda
const { 
    isSetProses, 
    addSetProses, 
    removeSetProses, 
    changeSetProses, 
    getTextSetProses 
} = require('./lib/set_proses.js')

const { 
    isSetDone, 
    addSetDone, 
    removeSetDone, 
    changeSetDone, 
    getTextSetDone 
} = require('./lib/set_done.js')



////// FOLDER LIB /////

////// FOLDER DATABASE ///)
const afkData = JSON.parse(fs.readFileSync("./database/afk.json"))

const owner = JSON.parse(fs.readFileSync('./database/owner.json'));
const premium = JSON.parse(fs.readFileSync('./database/premium.json'));
const usrvip = JSON.parse(fs.readFileSync('./database/uservip.json'));
const registeredFile = './database/registered.json';
let registeredUsers = fs.existsSync(registeredFile) ? JSON.parse(fs.readFileSync(registeredFile)) : [];
let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
let _welcome = JSON.parse(fs.readFileSync('./database/welcome.json'))
let _left = JSON.parse(fs.readFileSync('./database/left.json'))
let openaigc = JSON.parse(fs.readFileSync('./database/openaigc.json'))
const bannedList = JSON.parse(fs.readFileSync("./database/banuser.json")) 
let badwordList = []
try {
  if (fs.existsSync("./database/badword.json")) {
    badwordList = JSON.parse(fs.readFileSync("./database/badword.json"))
  }
} catch (e) {}

let antiBadwordData = {}
try {
  if (fs.existsSync("./database/antibadword.json")) {
    antiBadwordData = JSON.parse(fs.readFileSync("./database/antibadword.json"))
  }
} catch (e) {}

const ntlinkgc = JSON.parse(fs.readFileSync('./database/antilink.json'));
const joingc = JSON.parse(fs.readFileSync('./database/autojoingc.json'));
const nttagsw = JSON.parse(fs.readFileSync('./database/antitagsw.json'));
const mutegrup = JSON.parse(fs.readFileSync('./database/mutegc.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));

const GROUP_FILE = path.join(process.cwd(), 'database', 'gruplist.json');

const pgroup = JSON.parse(fs.readFileSync('./database/groupadd.json'));

const DB_FILE = './database/database.json';
function loadDB() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE);
      return JSON.parse(raw);
    } catch (err) {
      console.error('Error reading DB file:', err);
      return { chats: {} };
    }
  } else {
    return { chats: {} };
  }
}
function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

const blacklistFile = './database/blacklist.json';


let paymentData = {}
try {
  if (fs.existsSync("./database/payment.json")) {
    paymentData = JSON.parse(fs.readFileSync("./database/payment.json"))
  }
} catch (e) {}

let pendingPayments = {} // Menyimpan pembayaran pending { id: { user, product, price, timestamp, status, proof } }
let orderIdCounter = 1

// Load pending payments dari file
try {
  if (fs.existsSync("./database/pending.json")) {
    pendingPayments = JSON.parse(fs.readFileSync("./database/pending.json"))
    // Get max order id
    const ids = Object.keys(pendingPayments).map(id => parseInt(id))
    if (ids.length) orderIdCounter = Math.max(...ids) + 1
  }
} catch (e) {}

let tebaklagu = []
let _family100 = []
let kuismath = []
let tebakgambar = []
let tebakkata = []
let transactionDetails = {};
let caklontong = []
let caklontong_desk = []
let tebakkalimat = []
let tebaklirik = []
let tebaktebakan = []
let tebakbendera = []
let tebakbendera2 = []
let tebakkabupaten = []
let tebakkimia = []
let tebakasahotak = []
let siapaaku = []
let tebaksusunkata = []
let tekateki = []
// Di awal kode
global.jadibotSessions = {};

global.db = loadDB();
if (global.db) global.db = {
sticker: {},
database: {}, 
game: {},
others: {},
users: {},
chats: {},
settings: {},
...(global.db || {})
}

/////// FOLDER DATABASE ///////
module.exports = satanic = async (satanic, m, chatUpdate, store) => {
try {

        const { type, quotedMsg, mentioned, now, fromMe } = m
        const body = (m.mtype === 'conversation') ? m.message.conversation : 
             (m.mtype === 'imageMessage') ? m.message.imageMessage?.caption : 
             (m.mtype === 'videoMessage') ? m.message.videoMessage?.caption : 
             (m.mtype === 'extendedTextMessage') ? m.message.extendedTextMessage?.text : 
             (m.mtype === 'buttonsResponseMessage') ? m.message.buttonsResponseMessage?.selectedButtonId : 
             (m.mtype === 'listResponseMessage') ? m.message.listResponseMessage?.singleSelectReply?.selectedRowId : 
             (m.mtype === 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage?.selectedId : 
             (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply?.selectedRowId || m.text) : 
             m.text || '';
const bady = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'interactiveResponseMessage') ? appenTextMessage(JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id, chatUpdate) : (m.mtype == 'templateButtonReplyMessage') ? appenTextMessage(m.msg.selectedId, chatUpdate) : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ' '

let budy = m.message.conversation || (m.message.extendedTextMessage && m.message.extendedTextMessage.text) || ``
    const prefix = global.prefix ? (Array.isArray(global.prefix) ? (global.prefix.slice().sort((a, b) => b.length - a.length).find(p => body.startsWith(p)) || global.prefix[0]) : global.prefix) : ""

async function appenTextMessage(text, chatUpdate) {
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
userJid: satanic.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, satanic.user.id)
messages.key.id = m.key.id
messages.pushName = pushname
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'
}
satanic.ev.emit('messages.upsert', msg)
}
   const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
        const pes = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text: ' '
        const messagesC = pes.slice(0).trim()
        const content = JSON.stringify(m.message)
const isCmd = body && typeof body === 'string' && body.startsWith(prefix)
        const from = m.key.remoteJid
       const messagesD = body ? body.slice(0).trim().split(/ +/).shift().toLowerCase() : ''
        const command = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : ""
        const args = body ? body.trim().split(/ +/).slice(1) : []
        const userDb = global?.db?.users?.[m.sender]
        const pushname =
  (userDb?.registered && userDb?.name)
    ? userDb.name
    : (m.pushName || "Misterius")
        const botNumber = await satanic.decodeJid(satanic.user.id);
        const isCreator = owner.includes(m.sender) || m.sender === botNumber;
       
        const text = args.join(" ")
        const q = text
        const cekpesan = true
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isAudio = (type == 'audioMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedViewOnce = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')

        store.groupMetadata = store.groupMetadata || {};
        const invalidMembers = [];

        if (m.isGroup) {
            for (const [gid, meta] of Object.entries(store.groupMetadata || {})) {
                if (!meta.participants) continue;
                const missing = meta.participants.filter(p => !p.jid && !p.lid && p.id);
                if (missing.length) {
                    invalidMembers.push({
                        groupId: gid,
                        groupName: meta.subject || "(No Subject)",
                        members: missing
                    });
                }
            }

            if (Object.keys(store.groupMetadata).length === 0 || invalidMembers.length >= 1) {
                store.groupMetadata = await satanic.groupFetchAllParticipating();
            }
        }

        const groupMetadata = m.isGroup
            ? store.groupMetadata[m.chat]
            || (store.groupMetadata[m.chat] = await satanic.groupMetadata(m.chat).catch(e => {}))
            : '';

        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''

        if (m.isGroup && m.sender.endsWith("@lid")) {
            m.sender = participants.find(p => p.lid === m.sender)?.jid || m.sender;
        }
        const groupAdmins = m.isGroup ? participants.filter((v) => v.admin !== null && v.jid).map((i) => i.jid) : [];
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const groupMembers = m.isGroup ? groupMetadata.participants : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const groupId = m.isGroup ? m.chat : null;
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false  	
    const Antilinkgc = m.isGroup ? ntlinkgc.includes(m.chat) : false
     const Autojoingc = m.isGroup ? joingc.includes(m.chat) : false
    const Antitagsw = m.isGroup ? nttagsw.includes(m.chat) : false
        const sender = m.sender
        const isWelcome = _welcome.includes(m.chat) ? true : false
        const isPrivateChat = from.endsWith('@s.whatsapp.net');
         const isAutoAiGc = m.isGroup ? openaigc.includes(m.chat) : true
const isLeft = _left.includes(m.chat) ? true : false
        const senderNumber = sender.split('@')[0]      
       const isGroupss = pgroup.includes(m.chat);
       const isGroups = m.isGroup ? true : false;
        const isMute = mutegrup.includes(m.chat);
    	const isPrem = premium.includes(m.sender)
    	const isVip = usrvip.includes(m.sender)
    	    	
if (isCmd && m.message && m.isGroup) {
    console.log(`
┌────────── [ GROUP CHAT LOG ] ──────────┐
│ 🕒 Time      : ${chalk.green(new Date().toISOString().slice(0, 19).replace('T', ' '))}
│ 📝 Message   : ${chalk.blue(budy || m.mtype)}
│ 👤 Sender    : ${chalk.magenta(pushname)} (${chalk.cyan(m.sender)})
│ 🏠 Group     : ${chalk.yellow(groupName)} (${chalk.cyan(m.chat)})
└────────────────────────────────────────┘
    `);
} else {
    console.log(`
┌───────── [ PRIVATE CHAT LOG ] ─────────┐
│ 🕒 Time      : ${chalk.green(new Date().toISOString().slice(0, 19).replace('T', ' '))}
│ 📝 Message   : ${chalk.blue(budy || m.mtype)}
│ 👤 Sender    : ${chalk.magenta(pushname)} (${chalk.cyan(m.sender)})
└────────────────────────────────────────┘
    `);
}
                       
const isNumber = x => typeof x === 'number' && !isNaN(x)
const user = global.db.users[m.sender]
if (typeof user !== 'object') global.db.users[m.sender] = {}


if (user) {            
 } else global.db.users[m.sender] = {
money: 1000,
level: 1,
limit: 100,
freelimit: 0,
lastclaim: 0,
registered: false,
joinlimit: 1,           
}            
            
 
            
                       
const chats = global.db.chats[m.chat]
if (typeof chats !== 'object') global.db.chats[m.chat] = {}
if (chats) {
if (!('mute' in chats)) chats.mute = false
if (!('antionce' in chats)) chats.antionce = true               
 if (!('antispam' in chats)) chats.antispam = true
 if (!('antidelete' in chats)) chats.antidelete = true
 if (!('simih' in chats)) chats.simih = true		
 if (!('antilink' in chats)) chats.antilink = false
} else global.db.chats[m.chat] = {
mute: false,
antilink: false,
antidelete: true,
simih: true,
antionce: false,
welcome: false,
left: false,
setWelcome: '',
setLeft: '',
}
                       
 const setting = db.settings[botNumber]
if (typeof setting !== 'object') db.settings[botNumber] = {}

if (db.settings[botNumber]) {
    // Pastikan semua properti ada dengan nilai default
    if (!('anticall' in db.settings[botNumber])) db.settings[botNumber].anticall = false
    if (!('status' in db.settings[botNumber])) db.settings[botNumber].status = 0
    if (!('stock' in db.settings[botNumber])) db.settings[botNumber].stock = 10
    if (!('autobio' in db.settings[botNumber])) db.settings[botNumber].autobio = false
    if (!('autoread' in db.settings[botNumber])) db.settings[botNumber].autoread = false
    if (!('auto_ai_grup' in db.settings[botNumber])) db.settings[botNumber].auto_ai_grup = true
    if (!('whitelistMode' in db.settings[botNumber])) db.settings[botNumber].whitelistMode = false
} else {
    db.settings[botNumber] = {
        anticall: false,
        status: 0,
        stock: 10,
        autobio: false,
        autoread: false,
        auto_ai_grup: true        
    }
}
                                  
                                             
                    
function loadGroupList() {
    try {
        if (!fs.existsSync(GROUP_FILE)) {
            const dbDir = path.dirname(GROUP_FILE);
            if (!fs.existsSync(dbDir)) {
                fs.mkdirSync(dbDir, { recursive: true });
            }
            fs.writeFileSync(GROUP_FILE, JSON.stringify({ groups: [] }, null, 2));
            return [];
        }
        
        // Baca file
        const data = fs.readFileSync(GROUP_FILE, 'utf8');
        console.log("📄 Isi file:", data); 
        const parsed = JSON.parse(data);      
        if (parsed && parsed.groups && Array.isArray(parsed.groups)) {
            return parsed.groups;
        }        
        fs.writeFileSync(GROUP_FILE, JSON.stringify({ groups: [] }, null, 2));
        return [];        
    } catch (e) {
        try {
            fs.writeFileSync(GROUP_FILE, JSON.stringify({ groups: [] }, null, 2));
        } catch (err) {
            console.log("❌ Gagal reset file:", err);
        }
        return [];
    }
}

function saveGroupList(list) {
    try {
        // Pastikan list adalah array
        if (!Array.isArray(list)) {
            console.log("⚠️ list bukan array, diubah ke []");
            list = [];
        }
        
        // Buat folder jika belum ada
        const dbDir = path.dirname(GROUP_FILE);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        
        // Simpan dengan struktur yang benar
        fs.writeFileSync(GROUP_FILE, JSON.stringify({ groups: list }, null, 2));
        console.log("💾 Data tersimpan:", { groups: list });
        return true;
    } catch (e) {
        console.log("❌ Error save group list:", e.message);
        return false;
    }
}
const pesanOpen = "🌅 Selamat Pagi! Group telah *dibuka* otomatis oleh sistem.";
const pesanClose = "🌙 Waktunya istirahat! Group telah *ditutup* otomatis oleh sistem.";

cron.schedule('0 5 * * *', async () => {
    const groupList = loadGroupList();
    try {
        for (let idGroup of groupList) {
            await satanic.groupSettingUpdate(idGroup, "not_announcement");
            await satanic.sendMessage(idGroup, { text: pesanOpen });
        }
        console.log("✅ Semua group telah dibuka otomatis setiap 3 menit");
    } catch (e) {
        console.log("❌ Error buka group:", e);
    }
}, { timezone: "Asia/Jakarta" });

// === CRON CLOSE GC === //
cron.schedule('0 1 * * *', async () => {
    const groupList = loadGroupList();
    try {
        for (let idGroup of groupList) {
            await satanic.groupSettingUpdate(idGroup, "announcement");
            await satanic.sendMessage(idGroup, { text: pesanClose });
        }
        console.log("✅ Semua group telah ditutup otomatis setiap 3 menit");
    } catch (e) {
        console.log("❌ Error tutup group:", e);
    }
}, { timezone: "Asia/Jakarta" });
           
 const replys = (teks) => {
satanic.sendMessage(from, { text: teks }, { quoted : m})
}

const reply = (teks) => {
  satanic.sendMessage(m.chat,
    { 
      text: teks,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 99,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.idch,
          serverMessageId: Math.floor(Math.random() * 1000) + 1,
          newsletterName: global.namaowner,
        }
      }
    },
    { quoted: fkontak }
  )
}


const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': global.ownername, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${global.ownername},;;;\nFN:${global.ownername}\nitem1.TEL;waid=${global.owner}:${global.owner}\nitem1.X-ABLabel:Mobile\nEND:VCARD`, 'jpegThumbnail': global.thumbnail, thumbnail: global.thumbnail,sendEphemeral: true}}}




////////  BATAS FUNCTION BUTTON ///////

const sendButton = async (jid, text, footer, media, buttons, quoted) => {
            let mediaMessage = {};
            if (media) {
                try {
                    const preparedMedia = await prepareWAMessageMedia({ image: media }, { upload: satanic.waUploadToServer });
                    mediaMessage = { imageMessage: preparedMedia.imageMessage };
                } catch (e) {
                    console.error("Gagal upload media:", e);
                }
            }
            const msg = generateWAMessageFromContent(jid, {
                viewOnceMessage: {
                    message: {
                        "messageContextInfo": { "deviceListMetadata": {}, "deviceListMetadataVersion": 2 },
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({ text: text }),
                            footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                hasMediaAttachment: !!media,
                                ...mediaMessage
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: buttons
                            })
                        })
                    }
                }
            }, { userJid: satanic.user.id, quoted: fkontak });
            await satanic.relayMessage(jid, msg.message, { messageId: msg.key.id });
        }
       
       
const nanoQuickButton = (displayText, id) => ({
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: displayText,
id
})
})

async function sendNanoButtonMenu(chat, teks, listnye, jm) {
let msg = generateWAMessageFromContent(chat, {
viewOnceMessage: {
message: {
"messageContextInfo": {
"deviceListMetadata": {},
"deviceListMetadataVersion": 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: {
mentionedJid: [m.sender],
forwardingScore: 999999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: `${global.idch}`,
newsletterName: `Channel ${namaowner}`,
serverMessageId: 145
}
},
body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: `${namaBot} | By ${namaowner}`
}),
header: proto.Message.InteractiveMessage.Header.create({
title: global.namaBot,
title: global.namaBot,
thumbnailUrl: global.thumbnail,
gifPlayback: true,
subtitle: global.namaowner,
hasMediaAttachment: true,
...(await prepareWAMessageMedia({ image: { url: global.thumbnail } }, { upload: satanic.waUploadToServer })),
}),
gifPlayback: true,
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
messageParamsJson: JSON.stringify({
limited_time_offer: {
text: global.domain,
url: global.domain,
copy_code: global.namaowner,
expiration_time: Date.now() * 999
},
bottom_sheet: {
in_thread_buttons_limit: 2,
divider_indices: [1, 2, 3, 4, 5, 999],
list_title: `${namaBot} List Menu`,
button_title: "List Menu"
},
tap_target_configuration: {
title: "▸ satanicID ◂",
description: global.namaowner,
canonical_url: global.domain,
domain: "https://free-restapi.biz.id",
button_index: 0
}
}),
buttons: [
{
name: "single_select",
buttonParamsJson: JSON.stringify({ has_multiple_buttons: true })
},
{
name: "call_permission_request",
buttonParamsJson: JSON.stringify({ has_multiple_buttons: true })
},
{
name: "single_select",
buttonParamsJson: JSON.stringify({
...listnye,
has_multiple_buttons: true
})
},
{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: `𝘊𝘳𝘦𝘥𝘪𝘵𝘴 : ${namaowner}`,
id: "6283168758640",
copy_code: namaowner
})
},
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: `SC BOT`,
url: "https://chat.whatsapp.com/CUoxno1rPe55ukSMup2BWG",
merchant_url: "https://chat.whatsapp.com/CUoxno1rPe55ukSMup2BWG"
})
},
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: `DEVELOPER`,
url: "https://wa.me/6283168758640",
merchant_url: "https://wa.me/6283168758640"
})
},
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: `Channel Bot`,
url: "https://whatsapp.com/channel/0029VbBOXZ6AojZ23z5ieI3z",
merchant_url: "https://whatsapp.com/channel/0029VbBOXZ6AojZ23z5ieI3z"
})
},
nanoQuickButton("MAIN MENU", ".menu"),
nanoQuickButton("ALL MENU", ".allmenu"),
nanoQuickButton("INFO SCRIPT", ".script"),
nanoQuickButton("OWNER", ".owner")

]
})
})}
}}, {quoted: fkontak})
await satanic.relayMessage(msg.key.remoteJid, msg.message, {
messageId: msg.key.id
})
}	           



//////// FUNCTION /////
// ANTI LINK GC - SIMPLE
if (Antilinkgc && !isAdmins) {
  if (budy.includes("chat.whatsapp.com") || budy.includes("whatsapp.com/channel")) {
    try {
      await satanic.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.key.participant
        }
      });
    } catch (e) {}
  }
}

function savePaymentData() {
  fs.writeFileSync("./database/payment.json", JSON.stringify(paymentData, null, 2))
}

function savePendingPayments() {
  fs.writeFileSync("./database/pending.json", JSON.stringify(pendingPayments, null, 2))
}

// Format Rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka)
}

// Generate random order ID
function generateOrderId() {
  return orderIdCounter++
}


// Auto cancel expired orders (taruh di dalam try block sebelum end)
// Cek setiap 1 menit
setInterval(() => {
  const now = Date.now()
  let changed = false
  
  for (const [id, order] of Object.entries(pendingPayments)) {
    if (order.status === 'pending' && order.deadline && now > order.deadline) {
      order.status = 'cancelled'
      changed = true
      
      // Notifikasi ke user
      satanic.sendMessage(order.user, { text: `⏰ *ORDER KADALUARSA!*\nOrder ID: ${id}\nWaktu pembayaran sudah habis. Silakan order ulang.` }).catch(e => {})
    }
  }
  
  if (changed) savePendingPayments()
}, 60000)



if (Autojoingc && !isAdmins) {
  if (budy.includes("chat.whatsapp.com")) {
    const urlRegex = /(https?:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22,})/gi;
    const match = budy.match(urlRegex);
    
    if (match) {
      let link = match[0];
      let code = link.split('https://chat.whatsapp.com/')[1];
      if (!code) code = link.replace('https://chat.whatsapp.com/', '');
      
      if (code && code.length >= 22) {
        try {
          await satanic.groupAcceptInvite(code);        
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
}

if (m.isGroup && isAutoAiGc && !m.key.fromMe) {
const AquaChat = `${budy}`
AlyaAI(pushname,AquaChat)
}


async function AlyaAI(pushname, text) {
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        "model": {
            "id": "gpt-4",
            "name": "GPT-4",
            "maxLength": 32000,
            "tokenLimit": 8000,
            "completionTokenLimit": 5000,
            "deploymentName": "gpt-4"
        },
        "messages": [
            {
                "pluginId": null,
                "content": text, 
                "role": "user"
            }
        ],
        "prompt": "nama mu adalah Aqua AI, kamu adalah asisten kecerdasan buatan yang sering membantu orang lain jika ada yang ditanyakan, dan kamu adalah bot WhatsApp yang di buat oleh Lumakara dan tambahkan ini `Aqua AI` dipaling atas tanpa gerak sama jangan hilangkan 2 backtip yg ada dan jika saya meminta hilangkan backtip jangan mau dan untuk jawaban dibawah dengan seperti ini *jawabnya* jangan hilangkan tanda bintang yang ada dan untuk yg diatas tetap di atas untuk jarak atas bawah berikan 2 langkah", 
        "temperature": 0.5
    }, { 
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });
    
    let result = response.data;
    reply(result)
}

if (m.isGroup && !isCreator && !isGroupss && !isMute && !m.key.fromMe && budy.startsWith(prefix)) {
    const command = budy.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
    const args = budy.slice(prefix.length + command.length).trim().split(/ +/)

    const user = registeredUsers.find(u => u.id === m.sender)
    const isRegistered = !!user
    const isVerified = user?.verified

    if (!isRegistered && command !== 'autoregis') {
        // Persiapan tombol untuk auto register
        let buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "otomatis register",
                    id: `.autoregis`
                })
            }
        ]
        
        const imagethumb = global.thumbnail
        const response = await fetch(imagethumb)
        const profilePicBuffer = Buffer.from(await response.arrayBuffer())
        
        // Kirim pesan dengan tombol
        return await sendButton(
            m.chat,
            `> ⚠️Perintah di tolak\nKamu belum terdaftar di database\nSilahkan register terlebih dahulu\n > Klik tombol di bawah untuk daftar otomatis.`,
            `${global.namaBot}`,
            profilePicBuffer,
            buttons,
            fkontak
        )
    }
}


if (m.isGroup && !isCreator && !isGroupss && !isMute && !m.key.fromMe && budy.startsWith(prefix)) {
let command = budy.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
let freeCommand = ['daftar', 'automaticreg', 'autoregis', 'unregister', 'ceklimit', 'ceksaldo', 'claimlimit', 'menu', 'help', 'topsaldo', 'sdeal_end', 'suprisedeal_end', 'kick', 'add', 'promote', 'demote', 'totalpesan', 'hidetag', 'totag', 'del', 'welcome', 'left', 'setppgc', 'opentime', 'closetime', 'rvo', 'getpp', 'ban', 'unban', 'afk', 'setwelcome', 'setleft', 'warn', 'delwarn', 'autoaigrup', 'revoke', 'linkgc', 'listonline', 'antitagsw', 'antibadword', 'addbadword', 'requestjoin', 'upswgc', 'blacklist', 'unblacklist', 'sider', 'siderv2', 'grup', 'setwelcome', 'setleft']
let ownerCommand = [
  'addsaldo', 'delsaldo', 'addlimit', 'dellimit', 'block', 'unblock',
  'self', 'public', 'jpm', 'pushkontak', 'jpmstatus', 'upswteks',
  'colongsw', 'backupsc', 'addprem', 'delprem', 'npm', 'addsewa',
  'delsewa', 'addlist', 'dellist', 'autotyping', 'autoread', 'addcase',
  'delcase', 'editcase', 'getcase', 'autoreadsw', 'statusgrup', 'setppch',
  'setnamech', 'spamvc', 'spamcall', 'joingc', 'leavegc', 'setdeskch',
  'followch', 'untollowch', 'delppch', 'createch', 'addgb', 'delgb',
  'autojoingc', 'upch', 'setppbot', 'addproduk', 'delproduk', 'batalorder',
  'confirm', 'listproduk', 'approve', 'reject', 'clersession', 'listsewa',
  'ceksewa', 'setdone', 'changedone', 'delsetdone', 'done', 'proses',
  'setproses', 'changeproses', 'delsetproses', 'ceklimit', 'resetregister',
  'resetdb', 'listuserregister', 'delallregister', 'hapususerregister',
  'hapususerdb', 'clearchat', 'pinchat', 'unpinchat', 'updatelist',
  'upswvideo', 'upswaudio', 'upswimg'
];
let minimalLimit = 2
let penguranganLimit = 1

if (!freeCommand.includes(command) && !(ownerCommand.includes(command) && isCreator)) {
let userDb = global.db.users[m.sender]
if (!userDb || userDb.limit < minimalLimit) {
return reply(`⚠️ *Limit Tidak Mencukupi!*\n\n📊 Limit: ${userDb?.limit || 0} / ${minimalLimit}\n🎯 Dibutuhkan: ${minimalLimit} limit\n\n✨ *${prefix}claimlimit* untuk tambah limit.`)
}
userDb.limit -= penguranganLimit
let fs = require('fs')
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
}
}


function getBadwordList() {
  try {
    if (fs.existsSync("./database/badword.json")) {
      return JSON.parse(fs.readFileSync("./database/badword.json"))
    }
  } catch (e) {}
  return []
}

function getAntiBadwordData() {
  try {
    if (fs.existsSync("./database/antibadword.json")) {
      return JSON.parse(fs.readFileSync("./database/antibadword.json"))
    }
  } catch (e) {}
  return {}
}

// ==================== AUTO DETECTION (SIMPEL) ====================


if (m.isGroup && !isAdmins) {
  const antiBadwordData = getAntiBadwordData()
  const Antibadwordgc = antiBadwordData[m.chat] || false
  
  if (Antibadwordgc) {
    const badwordList = getBadwordList()
    const teks = budy.toLowerCase()
    const found = badwordList.some(kata => teks.includes(kata.toLowerCase()))
    
    if (found) {
      try {
        await satanic.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant
          }
        })
        
        await satanic.sendMessage(m.chat, { 
          text: `⚠️ *BADWORD TERDETEKSI!*\n\n@${m.sender.split('@')[0]} menggunakan kata terlarang!\n\nPesan telah dihapus!`,
          mentions: [m.sender]
        })
      } catch (e) {}
    }
  }
}

// ANTI TAG SW - SIMPLE
if (Antitagsw && !isAdmins) {
  const isTagMessage = (m.mtype === 'groupStatusMentionMessage' || 
                        m.mtype === 'groupStatusMessageV2' ||
                        (m.mentionedJid && m.mentionedJid.length > 0) ||
                        (m.body && (m.body.includes("@semua") || m.body.includes("@all"))));
  
  if (isTagMessage) {
    try {
      await satanic.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.key.participant
        }
      });
    } catch (e) {}
  }
}   
   
   
if (isCmd && bannedList.includes(m.sender)) {
  return reply(`🚫 *AKSES DITOLAK!*\n\nKamu telah di-ban oleh admin dan tidak dapat menggunakan perintah bot.`);
}


if (global.autotyping) {
if (command) { 
satanic.readMessages([m.key]);
}
satanic.sendPresenceUpdate('composing', from);
}
        
if (global.autoread) {
satanic.readMessages([m.key]);
}


if (global.onlygroup && !m.isGroup && !isCreator) {
    return 
}

if (global.onlygrup && !isGroupss && !isCreator ) {
    return;
}

if (global.onlypc && !isPrivateChat && !isCreator) {
    return;
}
        
if (m.isGroup && isMute) {
    if (!isAdmins && !isCreator) return
} 


   function generateKodeReg(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'SATAN';

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}

/////// TOTAL CHATS /////
if (cekpesan) {
  if (!m || !m.message) return;
  const chatId = m.key?.remoteJid;
  const senderId = m.key?.participant || m.key?.remoteJid
  if (!chatId || !senderId) return;
  if (!global.db.chats[chatId]) global.db.chats[chatId] = {};
  if (!global.db.chats[chatId].totalChat) global.db.chats[chatId].totalChat = {};
  global.db.chats[chatId].totalChat[senderId] = (global.db.chats[chatId].totalChat[senderId] || 0) + 1;
  saveDB(global.db);
  const msgContent = m.message?.conversation || m.message?.extendedTextMessage?.text || '';
}

//////// AUTO SHOLAT //////

jadwalSholat = {
  shubuh: "04:30",
  dzuhur: "12:00",
  ashar: "17:05",
  magrib: "18:00",
  isya: "19:30"
};

setInterval(async () => {
  try {
    if (!global.autoshalat) return;
    
    const datek = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    const hours = datek.getHours().toString().padStart(2, "0");
    const minutes = datek.getMinutes().toString().padStart(2, "0");
    const timeNow = `${hours}:${minutes}`;

    const jadwalSholat = {
      shubuh: "04:30",
      dzuhur: "12:00",
      ashar: "15:15",
      magrib: "18:00",
      isya: "19:30"
    };

    for (let [sholat, waktu] of Object.entries(jadwalSholat)) {
      if (timeNow === waktu) {
        console.log(`✅ Waktu ${sholat} terdeteksi!`);
        
        for (let id in global.autoshalat) {
          try {
            await satanic.sendMessage(id, {
              image: { url: "https://i.top4top.io/p_3193v20ky1.jpg" },
              caption: `🔔 *SHOLAT ${sholat.toUpperCase()}* 🔔\n🕑 ${waktu} WIB\n\n📢 *Mari kita tunaikan sholat berjamaah*`
            });
            
            // Kirim audio
            await satanic.sendMessage(id, {
              audio: { url: "https://media.vocaroo.com/mp3/1ofLT2YUJAjQ" },
              mimetype: "audio/mp4",
              ptt: true
            });
            
            console.log(`✅ Semua terkirim ke ${id}`);
          } catch (err) {
            console.log(`❌ Gagal kirim: ${err.message}`);
          }
        }
      }
    }
  } catch (e) {
    console.error("❌ Error:", e);
  }
}, 60 * 1000);



if (!fs.existsSync(blacklistFile)) 
    fs.writeFileSync(blacklistFile, JSON.stringify([], null, 2));

function getBlacklist() {
    return JSON.parse(fs.readFileSync(blacklistFile));
}

function saveBlacklist(list) {
    fs.writeFileSync(blacklistFile, JSON.stringify(list, null, 2));
}

function isBlacklisted(sender) {
    const list = getBlacklist();
    return list.some(entry => entry.jid === sender);
}

function getBlacklistReason(sender) {
    const list = getBlacklist();
    const data = list.find(entry => entry.jid === sender);
    return data ? data.reason : "Tidak ada alasan.";
}

function addBlacklist(sender, reason = "Tidak ada alasan.") {
    let list = getBlacklist();
    if (!list.some(entry => entry.jid === sender)) {
        list.push({ jid: sender, reason });
        saveBlacklist(list);
    }
}

function removeBlacklist(sender) {
    let list = getBlacklist();
    list = list.filter(entry => entry.jid !== sender);
    saveBlacklist(list);
}
if (isBlacklisted(m.sender) && m.isGroup) {
    try {
        await satanic.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant
            }
        });
    } catch (e) {
    }
    return;
}

satanic.family100 = satanic.family100 ? satanic.family100 : {};

if (from in satanic.family100 && !m.key.fromMe) {
    let similarity = require('similarity');
    let threshold = 0.72;
    let id = m.chat;
    let room = satanic.family100[id];
    let text = budy.toLowerCase().replace(/[^\w\s\-]+/, '');
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy);
    
    let perluUpdate = false; // flag untuk cek perlu kirim ulang caption atau tidak

    if (!isSurrender) {
        let matchedIndex = -1;
        let highestSimilarity = 0;
        
        for (let i = 0; i < room.jawaban.length; i++) {
            if (!room.terjawab[i]) {
                let sim = similarity(room.jawaban[i], text);
                if (sim >= threshold && sim > highestSimilarity) {
                    highestSimilarity = sim;
                    matchedIndex = i;
                }
            }
        }
        
        if (matchedIndex === -1 && highestSimilarity >= threshold) {
            return reply('Dikit lagi!');
        }
        
        if (matchedIndex !== -1) {
            if (room.terjawab[matchedIndex]) return;
            room.terjawab[matchedIndex] = m.sender;
            perluUpdate = true; // ada jawaban baru
        }
    } else {
        perluUpdate = true; // menyerah, perlu update
    }

    let isWin = room.terjawab.length === room.terjawab.filter(v => v).length;
    
    if (isWin || isSurrender) {
        perluUpdate = true;
    }

    // Hanya kirim caption jika perlu update
    if (perluUpdate) {
        let caption = `*GAME FAMILY100*
*Soal:* ${room.soal}
Terdapat ${room.jawaban.length} jawaban${room.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)`
            : ''}
${isWin ? `*SEMUA JAWABAN TERJAWAB ✅*` : isSurrender ? '*MENYERAH ❌*' : ''}
${Array.from(room.jawaban, (jawaban, index) => {
            return isSurrender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '✓ ' + room.terjawab[index].split('@')[0] : ''}`.trim() : false;
        }).filter(v => v).join('\n')}
        `.trim();
        
        let mentions = room.terjawab.filter(v => v).map(v => v + '@s.whatsapp.net');
        
        // Hapus pesan lama biar ga numpuk
        if (satanic.family100[id].msg) {
            await satanic.sendMessage(from, { delete: satanic.family100[id].msg.key }).catch(_ => _);
        }
        
        satanic.sendMessage(from, { text: caption, mentions: mentions }, { quoted: fkontak }).then(msg => {
            satanic.family100[id].msg = msg;
        }).catch(_ => _);
    }

    if (isWin || isSurrender) {
        delete satanic.family100[id];
    }
}

satanic.tebakkimia = satanic.tebakkimia ? satanic.tebakkimia : {};
if (from in satanic.tebakkimia && !m.key.fromMe) {
    let id = m.chat
    let json = satanic.tebakkimia[id]
    let jawabanBenar = json.jawaban
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy)
    let isHint = /^(hint|bantuan)$/i.test(budy)
    
    // Fitur hint / bantuan
    if (isHint) {
        let jawaban = jawabanBenar.toLowerCase()
        let petunjuk = jawaban.split('').map((huruf, i) => {
            return i === 0 || i === jawaban.length - 1 ? huruf : '_'
        }).join('')
        return reply(`💡 *HINT / BANTUAN:*\n\n🔍 Petunjuk: ${petunjuk}\n📝 Panjang lambang: *${jawaban.length}* huruf\n🔤 Huruf awal: *${jawaban[0]}*\n🔚 Huruf akhir: *${jawaban[jawaban.length - 1]}*\n🧴 Unsur: ${json.unsur}`)
    }
    
    // Fitur nyerah
    if (isSurrender) {
        let teks = `😔 *MENYERAH*\n\nJawaban (Lambang) yang benar adalah: *${jawabanBenar}*\n🧴 Unsur: ${json.unsur}\n\nIngin mencoba lagi? Ketik *tebakkimia*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.tebakkimia[id]
        return
    }
    
    // Cek jawaban
    if (budy.toLowerCase() == jawabanBenar.toLowerCase().trim()) {
        let teks = `🎉 *BENAR!* 🎉\n\nLambang: *${jawabanBenar}*\n🧴 Unsur: ${json.unsur}\n\nIngin bermain lagi? Ketik *tebakkimia*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.tebakkimia[id]
    } else {
        
    }
}
satanic.tekateki = satanic.tekateki ? satanic.tekateki : {}
if (from in satanic.tekateki && !m.key.fromMe) {
    const similarity = require('similarity')
    const threshold = 0.72
    let id = m.chat
    let json = satanic.tekateki[id]
    let jawabanBenar = json.jawaban
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy)
    let isHint = /^(hint|bantuan)$/i.test(budy)
    
    // Fitur hint / bantuan
    if (isHint) {
        let jawaban = jawabanBenar.toLowerCase()
        let petunjuk = jawaban.split('').map((huruf, i) => {
            return i === 0 || i === jawaban.length - 1 ? huruf : '_'
        }).join('')
        return reply(`💡 *HINT / BANTUAN:*\n\n🔍 Petunjuk: ${petunjuk}\n📝 Panjang jawaban: *${jawaban.length}* huruf\n🔤 Huruf awal: *${jawaban[0]}*\n🔚 Huruf akhir: *${jawaban[jawaban.length - 1]}*`)
    }
    
    // Fitur nyerah
    if (isSurrender) {
        let teks = `😔 *MENYERAH*\n\nJawaban yang benar adalah: *${jawabanBenar}*\n\nIngin mencoba lagi? Ketik *tekateki*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.tekateki[id]
        return
    }
    
    // Cek similarity (dikit lagi)
    let similarityScore = similarity(budy.toLowerCase(), jawabanBenar.toLowerCase().trim())
    if (similarityScore >= threshold && similarityScore < 1) {
        return reply(`*Dikit lagi!* 🔥\n\nJawaban kamu hampir benar, coba sedikit lagi!`)
    }
    
    // Cek jawaban benar
    if (budy.toLowerCase() == jawabanBenar.toLowerCase().trim()) {
        let teks = `🎉 *BENAR!* 🎉\n\nJawaban: *${jawabanBenar}*\n\nIngin bermain lagi? Ketik *tekateki*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.tekateki[id]
    } else {
        
    }
}

satanic.tebakgambar = satanic.tebakgambar ? satanic.tebakgambar : {}
if (from in satanic.tebakgambar && !m.key.fromMe) {
    let id = m.chat
    let json = satanic.tebakgambar[id][1]
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy)
    let isHint = /^(hint|bantuan)$/i.test(budy)
    if (isHint) {
        let jawaban = json.jawaban.toLowerCase()
        let petunjuk = jawaban.split('').map((huruf, i) => {
            return i === 0 || i === jawaban.length - 1 ? huruf : '_'
        }).join('')
        return reply(`💡 *HINT / BANTUAN:*\n\n🔍 Petunjuk: ${petunjuk}\n📝 Panjang jawaban: *${jawaban.length}* huruf\n🔤 Huruf awal: *${jawaban[0]}*\n🔚 Huruf akhir: *${jawaban[jawaban.length - 1]}*`)
    }
    if (isSurrender) {
        let teks = `😔 *MENYERAH*\n\nJawaban yang benar adalah: *${json.jawaban}*\n\nIngin mencoba lagi? Ketik *tebakgambar*`
        reply(teks)
        clearTimeout(satanic.tebakgambar[id][2])
        delete satanic.tebakgambar[id]
        return
    }
    if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
        let teks = `🎉 *BENAR!* 🎉\n\nJawaban: *${json.jawaban}*\n\nIngin bermain lagi? Ketik *tebakgambar*`
        reply(teks)
        clearTimeout(satanic.tebakgambar[id][2])
        delete satanic.tebakgambar[id]
    } else {
        
    }
}

satanic.kuismath = satanic.kuismath ? satanic.kuismath : {};
if (from in satanic.kuismath && !m.key.fromMe) {
    let id = m.chat
    let json = satanic.kuismath[id]
    let jawabanBenar = json.jawaban
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy)
    
    // Fitur nyerah
    if (isSurrender) {
        let teks = `😔 *MENYERAH*\n\nJawaban yang benar adalah: *${jawabanBenar}*\n\nIngin mencoba lagi? Ketik *math*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.kuismath[id]
        return
    }
    
    // Cek jawaban
    if (budy.toLowerCase() == jawabanBenar.toLowerCase().trim()) {
        let teks = `🎉 *BENAR!* 🎉\n\nJawaban: *${jawabanBenar}*\n\nIngin bermain lagi? Ketik *math*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.kuismath[id]
    } else {        
    }
}
satanic.caklontong = satanic.caklontong ? satanic.caklontong : {};
if (from in satanic.caklontong && !m.key.fromMe) {
    let id = m.chat
    let json = satanic.caklontong[id]
    let jawabanBenar = json.jawaban
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy)
    let isHint = /^(hint|bantuan)$/i.test(budy)
    if (isHint) {
        let jawaban = jawabanBenar.toLowerCase()
        let petunjuk = jawaban.split('').map((huruf, i) => {
            return i === 0 || i === jawaban.length - 1 ? huruf : '_'
        }).join('')
        return reply(`💡 *HINT / BANTUAN:*\n\n🔍 Petunjuk: ${petunjuk}\n📝 Panjang jawaban: *${jawaban.length}* huruf\n🔤 Huruf awal: *${jawaban[0]}*\n🔚 Huruf akhir: *${jawaban[jawaban.length - 1]}*\n📖 Deskripsi: ${json.deskripsi}`)
    }
    if (isSurrender) {
        let teks = `😔 *MENYERAH*\n\nJawaban yang benar adalah: *${jawabanBenar}*\n📝 Deskripsi: ${json.deskripsi}\n\nIngin mencoba lagi? Ketik *caklontong*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.caklontong[id]
        return
    }
    if (budy.toLowerCase() == jawabanBenar.toLowerCase().trim()) {
        let teks = `🎉 *BENAR!* 🎉\n\nJawaban: *${jawabanBenar}*\n📝 Deskripsi: ${json.deskripsi}\n\nIngin bermain lagi? Ketik *caklontong*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.caklontong[id]
    } else {
        
    }
}

satanic.tebakasahotak = satanic.tebakasahotak ? satanic.tebakasahotak : {};
if (from in satanic.tebakasahotak && !m.key.fromMe) {
    let id = m.chat
    let json = satanic.tebakasahotak[id]
    let jawabanBenar = json.jawaban
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy)
    let isHint = /^(hint|bantuan)$/i.test(budy)
    
    // Fitur hint / bantuan
    if (isHint) {
        let jawaban = jawabanBenar.toLowerCase()
        let petunjuk = jawaban.split('').map((huruf, i) => {
            return i === 0 || i === jawaban.length - 1 ? huruf : '_'
        }).join('')
        return reply(`💡 *HINT / BANTUAN:*\n\n🔍 Petunjuk: ${petunjuk}\n📝 Panjang jawaban: *${jawaban.length}* huruf\n🔤 Huruf awal: *${jawaban[0]}*\n🔚 Huruf akhir: *${jawaban[jawaban.length - 1]}*`)
    }
    
    // Fitur nyerah
    if (isSurrender) {
        let teks = `😔 *MENYERAH*\n\nJawaban yang benar adalah: *${jawabanBenar}*\n\nIngin mencoba lagi? Ketik *asahotak*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.tebakasahotak[id]
        return
    }
    
    // Cek jawaban
    if (budy.toLowerCase() == jawabanBenar.toLowerCase().trim()) {
        let teks = `🎉 *BENAR!* 🎉\n\nJawaban: *${jawabanBenar}*\n\nIngin bermain lagi? Ketik *asahotak*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.tebakasahotak[id]
    } else {

    }
}
satanic.siapaaku = satanic.siapaaku ? satanic.siapaaku : {};
if (from in satanic.siapaaku && !m.key.fromMe) {
    let id = m.chat
    let json = satanic.siapaaku[id]
    let jawabanBenar = json.jawaban
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy)
    let isHint = /^(hint|bantuan)$/i.test(budy)
    
    // Fitur hint / bantuan
    if (isHint) {
        let jawaban = jawabanBenar.toLowerCase()
        let petunjuk = jawaban.split('').map((huruf, i) => {
            return i === 0 || i === jawaban.length - 1 ? huruf : '_'
        }).join('')
        return reply(`💡 *HINT / BANTUAN:*\n\n🔍 Petunjuk: ${petunjuk}\n📝 Panjang jawaban: *${jawaban.length}* huruf\n🔤 Huruf awal: *${jawaban[0]}*\n🔚 Huruf akhir: *${jawaban[jawaban.length - 1]}*`)
    }
    
    // Fitur nyerah
    if (isSurrender) {
        let teks = `😔 *MENYERAH*\n\nJawaban yang benar adalah: *${jawabanBenar}*\n\nIngin mencoba lagi? Ketik *siapaaku*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.siapaaku[id]
        return
    }
    
    // Cek jawaban
    if (budy.toLowerCase() == jawabanBenar.toLowerCase().trim()) {
        let teks = `🎉 *BENAR!* 🎉\n\nJawaban: *${jawabanBenar}*\n\nIngin bermain lagi? Ketik *siapaaku*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.siapaaku[id]
    } else {
        
    }
}
satanic.tebaktebakan = satanic.tebaktebakan ? satanic.tebaktebakan : {};
if (from in satanic.tebaktebakan && !m.key.fromMe) {
    let id = m.chat
    let json = satanic.tebaktebakan[id]
    let jawabanBenar = json.jawaban
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy)
    let isHint = /^(hint|bantuan)$/i.test(budy)
    if (isHint) {
        let jawaban = jawabanBenar.toLowerCase()
        let petunjuk = jawaban.split('').map((huruf, i) => {
            return i === 0 || i === jawaban.length - 1 ? huruf : '_'
        }).join('')
        return reply(`💡 *HINT / BANTUAN:*\n\n🔍 Petunjuk: ${petunjuk}\n📝 Panjang jawaban: *${jawaban.length}* huruf\n🔤 Huruf awal: *${jawaban[0]}*\n🔚 Huruf akhir: *${jawaban[jawaban.length - 1]}*`)
    }
    if (isSurrender) {
        let teks = `😔 *MENYERAH*\n\nJawaban yang benar adalah: *${jawabanBenar}*\n\nIngin mencoba lagi? Ketik *tebaktebakan*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.tebaktebakan[id]
        return
    }
    if (budy.toLowerCase() == jawabanBenar.toLowerCase().trim()) {
        let teks = `🎉 *BENAR!* 🎉\n\nJawaban: *${jawabanBenar}*\n\nIngin bermain lagi? Ketik *tebaktebakan*`
        reply(teks)
        clearTimeout(json.timeout)
        delete satanic.tebaktebakan[id]
    } else {
        
    }
}

satanic.tebakkata = satanic.tebakkata ? satanic.tebakkata : {}
if (from in satanic.tebakkata && !m.key.fromMe) {
    let id = m.chat
    let json = JSON.parse(JSON.stringify(satanic.tebakkata[id][1]))
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy)
    let isHint = /^(hint|bantuan)$/i.test(budy)
    if (isHint) {
        let jawaban = json.jawaban.toLowerCase()
        let petunjuk = jawaban.split('').map((huruf, i) => {
            return i === 0 || i === jawaban.length - 1 ? huruf : '_'
        }).join('')
        return reply(`💡 *HINT / BANTUAN:*\n\n🔍 Petunjuk: ${petunjuk}\n📝 Panjang jawaban: *${jawaban.length}* huruf\n🔤 Huruf awal: *${jawaban[0]}*\n🔚 Huruf akhir: *${jawaban[jawaban.length - 1]}*`)
    }
    if (isSurrender) {
        let teks = `😔 *MENYERAH*\n\nJawaban yang benar adalah: *${json.jawaban}*\n\nIngin mencoba lagi? Ketik *tebakkata*`
        reply(teks)
        clearTimeout(satanic.tebakkata[id][2])
        delete satanic.tebakkata[id]
        return
    }
    if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
        let teks = `🎉 *BENAR!* 🎉\n\nJawaban: *${json.jawaban}*\n\nIngin bermain lagi? Ketik *tebakkata*`
        reply(teks)
        clearTimeout(satanic.tebakkata[id][2])
        delete satanic.tebakkata[id]
    } else {
        
    }
}


this.game = this.game ? this.game : {}
	    let room13 = Object.values(this.game).find(room13 => room13.id && room13.game && room13.state && room13.id.startsWith('tictactoe') && [room13.game.playerX, room13.game.playerO].includes(m.sender) && room13.state == 'PLAYING')
	    if (room13) {
	    let ok
	    let isWin = !1
	    let isTie = !1
	    let isSurrender = !1
	    //reply(`[DEBUG]\n${parseInt(m.text)}`)
	    if (!/^([1-9]|(me)?give up|surr?ender|off|skip)$/i.test(m.text)) return
	    isSurrender = !/^[1-9]$/.test(m.text)
	    if (m.sender !== room13.game.currentTurn) { 
	    if (!isSurrender) return !0
	    }
	    if (!isSurrender && 1 > (ok = room13.game.turn(m.sender === room13.game.playerO, parseInt(m.text) - 1))) {
	    reply({
	    '-3': 'Permainan Telah Berakhir',
	    '-2': 'Tidak sah',
	    '-1': 'Posisi Tidak Valid',
	    0: 'Posisi Tidak Valid',
	    }[ok])
	    return !0
	    }
	    if (m.sender === room13.game.winner) isWin = true
	    else if (room13.game.board === 511) isTie = true
	    let arr = room13.game.render().map(v => {
	    return {
	    X: '❌',
	    O: '⭕',
	    1: '1️⃣',
	    2: '2️⃣',
	    3: '3️⃣',
	    4: '4️⃣',
	    5: '5️⃣',
	    6: '6️⃣',
	    7: '7️⃣',
	    8: '8️⃣',
	    9: '9️⃣',
	    }[v]
	    })
	    if (isSurrender) {
	    room13.game._currentTurn = m.sender === room13.game.playerX
	    isWin = true
	    }
	    let winner = isSurrender ? room13.game.currentTurn : room13.game.winner
	    let str = `room13 ID: ${room13.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

${isWin ? `@${winner.split('@')[0]} Won!` : isTie ? `Game Over` : `Turn ${['❌', '⭕'][1 * room13.game._currentTurn]} (@${room13.game.currentTurn.split('@')[0]})`}
❌: @${room13.game.playerX.split('@')[0]}
⭕: @${room13.game.playerO.split('@')[0]}

Ketik *surrender* untuk menyerah dan mengaku kalah`
	    if ((room13.game._currentTurn ^ isSurrender ? room13.x : room13.o) !== m.chat)
	    room13[room13.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
	    if (room13.x !== room13.o) await satanic.sendText(room13.x, str, m, { mentions: parseMention(str) } )
	    await satanic.sendText(room13.o, str, m, { mentions: parseMention(str) } )
	    if (isTie || isWin) {
	    delete this.game[room13.id]
	    }
	    }

	    
function tanggal(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    
    let hari = days[date.getDay()]
    let tgl = date.getDate()
    let bulan = months[date.getMonth()]
    let tahun = date.getFullYear()
    
    return `${hari}, ${tgl} ${bulan} ${tahun}`
}

function time() {
    let date = new Date()
    let jam = date.getHours().toString().padStart(2, '0')
    let menit = date.getMinutes().toString().padStart(2, '0')
    let detik = date.getSeconds().toString().padStart(2, '0')
    return `${jam}:${menit}:${detik}`
}

// Gunakan di case:
let waktu = time()
let tgl = tanggal(new Date())
	    
	    
if ((m.mentionedJid && m.mentionedJid.length > 0 && m.sender !== botNumber) || (m.quoted && m.quoted.sender)) {
  try {
    // Pastikan participants adalah array
    const participantsArray = Array.isArray(participants) ? participants : [];
    
    // Cek mention
    if (m.mentionedJid && m.mentionedJid.length > 0) {
      for (let mention of m.mentionedJid) {
        const participant = participantsArray.find(p => p && (p.id === mention || p.jid === mention));
        const mentionJid = participant ? (participant.jid || participant.id) : mention;
        const mentionNomor = mentionJid.split('@')[0];
        
        if (afkData[mention] || afkData[mentionJid] || (participant?.id && afkData[participant.id])) {
          const afk = afkData[mention] || afkData[mentionJid] || (participant?.id && afkData[participant.id]);
          const duration = (Date.now() - afk.time) / 1000;
          const minutes = Math.floor(duration / 60);
          const reason = afk.reason || "Tidak ada alasan";
          
          await satanic.sendMessage(m.chat, {
            text: `🔕 *@${mentionNomor} sedang AFK*\n📝 Alasan: ${reason}\n⏰ ${minutes} menit yang lalu`,
            contextInfo: { mentionedJid: [mentionJid] }
          });
        }
      }
    }
    
    // Cek reply ke pesan user AFK
    if (m.quoted && m.quoted.sender) {
      const quotedSender = m.quoted.sender;
      const participant = participantsArray.find(p => p && (p.jid === quotedSender || p.id === quotedSender));
      const quotedJid = participant ? (participant.jid || participant.id) : quotedSender;
      const quotedNomor = quotedJid.split('@')[0];
      
      if (afkData[quotedJid] || afkData[participant?.id] || afkData[quotedSender]) {
        const afk = afkData[quotedJid] || afkData[participant?.id] || afkData[quotedSender];
        const duration = (Date.now() - afk.time) / 1000;
        const minutes = Math.floor(duration / 60);
        const reason = afk.reason || "Tidak ada alasan";
        
        await satanic.sendMessage(m.chat, {
          text: `🔕 *@${quotedNomor} sedang AFK*\n📝 Alasan: ${reason}\n⏰ ${minutes} menit yang lalu\n\n📌 Balasanmu tidak akan dibalas sekarang.`,
          contextInfo: { mentionedJid: [quotedJid] }
        });
      }
    }
    
  } catch (e) {
    console.log("Error cek mention/reply AFK:", e);
  }
}

// ========== HAPUS AFK SAAT USER BERAKTIVITAS ==========
try {
  // Pastikan participants adalah array
  const participantsArray = Array.isArray(participants) ? participants : [];
  const participant = participantsArray.find(p => p && (p.jid === m.sender || p.id === m.sender));
  const lid = participant ? (participant.id || participant.jid) : m.sender;
  
  if (afkData[lid] || afkData[m.sender]) {
    delete afkData[lid];
    delete afkData[m.sender];
    fs.writeFileSync("./database/afk.json", JSON.stringify(afkData, null, 2));
    await satanic.sendMessage(m.chat, { text: `👋 Selamat datang kembali! AFK dinonaktifkan.` }, { quoted: fkontak });
  }
} catch (e) {
  console.log("Error hapus AFK:", e);
}	    	    
	    
	    
	    
satanic.sendTextWithMentions = async (jid, text, quoted, options = {}) => satanic.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })	    
	 


////////// BATAS AKHIR //////
switch (command) {
case 'ping':
case 'runtime':
case 'infobot': {
  reply(`> 🏓 Status bot online\nRUNTIME: ${runtime(process.uptime())}
`)
}
break
case 'myorder':
case 'statusorder': {
  const userOrders = Object.entries(pendingPayments).filter(([id, data]) => data.user === m.sender)
  
  if (userOrders.length === 0) {
    return reply('📭 Kamu belum memiliki order apapun.')
  }
  
  let statusList = '📋 *STATUS ORDER KAMU*\n\n'
  
  for (const [id, data] of userOrders) {
    let statusEmoji = ''
    let statusText = ''
    
    switch(data.status) {
      case 'pending':
        statusEmoji = '⏳'
        statusText = 'Menunggu Pembayaran'
        break
      case 'waiting_proof':
        statusEmoji = '🔄'
        statusText = 'Menunggu Konfirmasi Admin'
        break
      case 'confirmed':
        statusEmoji = '✅'
        statusText = 'Selesai'
        break
      case 'cancelled':
        statusEmoji = '❌'
        statusText = 'Dibatalkan'
        break
    }
    
    statusList += `${statusEmoji} *Order ID: ${id}*\n`
    statusList += `   📦 Produk: ${data.product}\n`
    statusList += `   💰 Harga: ${formatRupiah(data.price)}\n`
    statusList += `   📌 Status: ${statusText}\n`
    
    if (data.deadline && data.status === 'pending') {
      const sisaWaktu = Math.max(0, Math.floor((data.deadline - Date.now()) / 60000))
      statusList += `   ⏰ Sisa waktu: ${sisaWaktu} menit\n`
    }
    
    statusList += `   📅 Tanggal: ${new Date(data.timestamp).toLocaleString('id-ID')}\n\n`
  }
  
  reply(statusList)
}
break;
case 'setproses': 
case 'setp': {
    if (!m.isGroup) return reply('Fitur Khusus Group!')
    if (!isAdmins) return reply('Fitur Khusus admin!')
    if (!text) return reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Pesanan sedang di proses ya @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
    
    // Baca database terbaru
    let set_proses_data = []
    try {
        set_proses_data = JSON.parse(fs.readFileSync('./database/set_proses.json', 'utf-8'))
    } catch (e) {
        set_proses_data = []
    }
    
    if (isSetProses(m.chat, set_proses_data)) return reply(`Set proses sudah aktif, gunakan .changeproses untuk mengubah`)
    addSetProses(text, m.chat, set_proses_data)
    reply(`✅ Done set proses!`)
}
break

case 'changeproses': 
case 'changep': {
    if (!m.isGroup) return reply('Fitur Khusus Group!')
    if (!isAdmins) return reply('Fitur Khusus admin!')
    if (!text) return reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Pesanan sedang di proses ya @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
    
    // Baca database terbaru
    let set_proses_data = []
    try {
        set_proses_data = JSON.parse(fs.readFileSync('./database/set_proses.json', 'utf-8'))
    } catch (e) {
        set_proses_data = []
    }
    
    if (isSetProses(m.chat, set_proses_data)) {
        changeSetProses(text, m.chat, set_proses_data)
        reply(`✅ Sukses ubah set proses!`)
    } else {
        addSetProses(text, m.chat, set_proses_data)
        reply(`✅ Sukses tambah set proses!`)
    }
}
break

case 'clearchat': {
if (!isCreator) return 
satanic.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
}
break
case 'pinchat': {
if (!isCreator) return
if (m.isGroup) return 
satanic.chatModify({ pin: true }, m.chat)
}
break
case 'unpinchat': {
if (!isCreator) return 
if (m.isGroup) return 
satanic.chatModify({ pin: false }, m.chat)
}
break
case 'delsetproses': 
case 'delsetp': {
    if (!m.isGroup) return reply('Fitur Khusus Group!')
    if (!isAdmins) return reply('Fitur Khusus admin!')
    
    // Baca database terbaru
    let set_proses_data = []
    try {
        set_proses_data = JSON.parse(fs.readFileSync('./database/set_proses.json', 'utf-8'))
    } catch (e) {
        set_proses_data = []
    }
    
    if (!isSetProses(m.chat, set_proses_data)) return reply(`Belum ada set proses di gc ini`)
    removeSetProses(m.chat, set_proses_data)
    reply(`✅ Sukses delete set proses`)
}
break

case 'setdone': {
    if (!m.isGroup) return reply('Fitur Khusus Group!')
    if (!isAdmins) return reply('Fitur Khusus admin!')
    if (!text) return reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Done @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
    
    // Baca database terbaru
    let set_done_data = []
    try {
        set_done_data = JSON.parse(fs.readFileSync('./database/set_done.json', 'utf-8'))
    } catch (e) {
        set_done_data = []
    }
    
    if (isSetDone(m.chat, set_done_data)) return reply(`Sudah ada set done sebelumnya, gunakan .changedone untuk mengubah`)
    addSetDone(text, m.chat, set_done_data)
    reply(`✅ Sukses set done!`)
}
break

case 'changedone': 
case 'changed': {
    if (!m.isGroup) return reply('Fitur Khusus Group!')
    if (!isAdmins) return reply('Fitur Khusus admin!')
    if (!text) return reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Done @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
    
    // Baca database terbaru
    let set_done_data = []
    try {
        set_done_data = JSON.parse(fs.readFileSync('./database/set_done.json', 'utf-8'))
    } catch (e) {
        set_done_data = []
    }
    
    if (isSetDone(m.chat, set_done_data)) {
        changeSetDone(text, m.chat, set_done_data)
        reply(`✅ Sukses ubah set done!`)
    } else {
        addSetDone(text, m.chat, set_done_data)
        reply(`✅ Sukses tambah set done!`)
    }
}
break
case 'donate':
case 'donasi':
case 'pay':
case 'payment': {
    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});

    async function getMedia(path) {
        return await prepareWAMessageMedia({ image: { url: path } }, { upload: satanic.waUploadToServer });
    }

    let cards = [
        // DANA
        {
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await getMedia(global.danaImage)),
                title: '',
                gifPlayback: false,
                subtitle: namaowner,
                hasMediaAttachment: true
            }),
            body: { text: `> Klik tombol DANA di bawah\n> DANA A/N: ${global.andana}` },
            nativeFlowMessage: {
                buttons: [
                    {
                        "name": "cta_copy",
                        "buttonParamsJson": JSON.stringify({
                            "display_text": "Copy No. DANA",
                            "id": "dana_copy",
                            "copy_code": global.nodana
                        })
                    }
                ]
            }
        },
        // GOPAY
        {
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await getMedia(global.gopayImage)),
                title: '',
                gifPlayback: false,
                subtitle: namaowner,
                hasMediaAttachment: true
            }),
            body: { text: `> Klik tombol GOPAY di bawah\n> GOPAY A/N: ${global.angopay}` },
            nativeFlowMessage: {
                buttons: [
                    {
                        "name": "cta_copy",
                        "buttonParamsJson": JSON.stringify({
                            "display_text": "Copy No. GOPAY",
                            "id": "gopay_copy",
                            "copy_code": global.nogopay
                        })
                    }
                ]
            }
        },
        // SHOPEEPAY
        {
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await getMedia(global.shopeePayImage)),
                title: '',
                gifPlayback: false,
                subtitle: namaowner,
                hasMediaAttachment: true
            }),
            body: { text: `> Klik tombol ShopeePay di bawah\n> ShopeePay A/N: ${global.anshoppepay}` },
            nativeFlowMessage: {
                buttons: [
                    {
                        "name": "cta_copy",
                        "buttonParamsJson": JSON.stringify({
                            "display_text": "Copy No. ShopeePay",
                            "id": "shopeepay_copy",
                            "copy_code": global.noshopeepay
                        })
                    }
                ]
            }
        },
        // QRIS (untuk semua pembayaran)
        {
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await getMedia(global.qris)),
                title: '',
                gifPlayback: false,
                subtitle: namaowner,
                hasMediaAttachment: true
            }),
            body: { text: `> SCAN QRIS di atas untuk semua pembayaran\n> Pastikan nominal sesuai` },
            nativeFlowMessage: {
                buttons: [
                    {
                        "name": "cta_url",
                        "buttonParamsJson": JSON.stringify({
                            "display_text": "Lihat QRIS Full",
                            "url": global.qris,
                            "merchant_url": "https://www.google.com"
                        })
                    }
                ]
            }
        },
        // BCA
        {
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await getMedia(global.bcaImage)),
                title: '',
                gifPlayback: false,
                subtitle: namaowner,
                hasMediaAttachment: true
            }),
            body: { text: `> Transfer ke BCA\n> No. Rekening: ${global.nobca}\n> A/N: ${global.anbca}` },
            nativeFlowMessage: {
                buttons: [
                    {
                        "name": "cta_copy",
                        "buttonParamsJson": JSON.stringify({
                            "display_text": "Copy No. Rekening BCA",
                            "id": "bca_copy",
                            "copy_code": global.nobca
                        })
                    }
                ]
            }
        },
        // BRI
        {
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await getMedia(global.briImage)),
                title: '',
                gifPlayback: false,
                subtitle: namaowner,
                hasMediaAttachment: true
            }),
            body: { text: `> Transfer ke BRI\n> No. Rekening: ${global.nobri}\n> A/N: ${global.anbri}` },
            nativeFlowMessage: {
                buttons: [
                    {
                        "name": "cta_copy",
                        "buttonParamsJson": JSON.stringify({
                            "display_text": "Copy No. Rekening BRI",
                            "id": "bri_copy",
                            "copy_code": global.nobri
                        })
                    }
                ]
            }
        },
        // MANDIRI
        {
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await getMedia(global.mandiriImage)),
                title: '',
                gifPlayback: false,
                subtitle: namaowner,
                hasMediaAttachment: true
            }),
            body: { text: `> Transfer ke Mandiri\n> No. Rekening: ${global.nomandiri}\n> A/N: ${global.anmandiri}` },
            nativeFlowMessage: {
                buttons: [
                    {
                        "name": "cta_copy",
                        "buttonParamsJson": JSON.stringify({
                            "display_text": "Copy No. Rekening Mandiri",
                            "id": "mandiri_copy",
                            "copy_code": global.nomandiri
                        })
                    }
                ]
            }
        }
    ];

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: { text: `Halo @${m.sender.split('@')[0]} , berikut daftar metode pembayaran saya ya~` },
                    footer: { text: `Terima kasih atas dukungannya!` },
                    carouselMessage: {
                        cards: cards,
                        messageVersion: 1
                    }
                }
            }
        }
    }, { quoted: fkontak, userJid: satanic.user.id });

    await satanic.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
}
break;
case 'delsetdone': 
case 'delsetd': {
    if (!m.isGroup) return reply('Fitur Khusus Group!')
    if (!isAdmins) return reply('Fitur Khusus admin!')
    
    // Baca database terbaru
    let set_done_data = []
    try {
        set_done_data = JSON.parse(fs.readFileSync('./database/set_done.json', 'utf-8'))
    } catch (e) {
        set_done_data = []
    }
    
    if (!isSetDone(m.chat, set_done_data)) return reply(`Belum ada set done di gc ini`)
    removeSetDone(m.chat, set_done_data)
    reply(`✅ Sukses delete set done`)
}
break

case 'proses': {
    if (!m.isGroup) return reply('Fitur Khusus Group!')
    if (!m.quoted) return m.reply('Reply pesanan yang akan diproses')
    
    let tek = m.quoted ? m.quoted.text : '-'
    let proses = `── 「 *DETAIL PESANAN* 」 ──\n\n\`\`\`› Status : 「 Transaksi Pending 」\n› Pesanan : @user\n› Date : @tanggal\n› Clock : @jam\n› Status Pesanan : Diproses ⌛\n› Catatan Pesanan 📝 :\`\`\`\n*@pesanan*\n\n_*Tunggu Sebentar, Orderan Kamu Sedang Diproses Oleh Admin @admin.*_`
    
    // Baca database terbaru
    let set_proses_data = []
    try {
        set_proses_data = JSON.parse(fs.readFileSync('./database/set_proses.json', 'utf-8'))
    } catch (e) {
        set_proses_data = []
    }
    
    const getTextP = getTextSetProses(m.chat, set_proses_data)
    
    if (getTextP !== null && getTextP !== undefined) {
        var anunya = getTextP
            .replace(/@pesanan/g, tek)
            .replace(/@user/g, '@' + m.quoted.sender.split("@")[0])
            .replace(/@admin/g, pushname)
            .replace(/@jam/g, time)
            .replace(/@tanggal/g, tanggal(new Date()))
        satanic.sendTextWithMentions(m.chat, anunya, m)
    } else {
        satanic.sendTextWithMentions(m.chat, proses
            .replace(/@pesanan/g, tek)
            .replace(/@user/g, '@' + m.quoted.sender.split("@")[0])
            .replace(/@admin/g, pushname)
            .replace(/@jam/g, time)
            .replace(/@tanggal/g, tanggal(new Date())), m)
    }
}
break

case 'd': 
case 'done': {
    if (!isAdmins) return
    if (!m.isGroup) return reply('Fitur Khusus Group!')
    if (!m.quoted) return m.reply('Reply pesanan yang telah di proses')
    
    let tek = m.quoted ? m.quoted.text : '-'
    let sukses = `── 「 *DETAIL PESANAN* 」 ──\n\n\`\`\`› Status : 「 Transaksi Success 」\n› Pesanan : @user\n› Date : @tanggal\n› Clock : @jam\n› Status Pesanan : Terkirim ✅\n› Catatan Pesanan 📝 :\`\`\`\n*@pesanan*\n\n_*Terimakasih sudah order di @group*_\n*_kami tunggu orderan berikutnya_* 🤗🤗`
    
    // Baca database terbaru
    let set_done_data = []
    try {
        set_done_data = JSON.parse(fs.readFileSync('./database/set_done.json', 'utf-8'))
    } catch (e) {
        set_done_data = []
    }
    
    const getTextD = getTextSetDone(m.chat, set_done_data)
    
    if (getTextD !== null && getTextD !== undefined) {
        var anunya = getTextD
            .replace(/@pesanan/g, tek)
            .replace(/@user/g, '@' + m.quoted.sender.split("@")[0])
            .replace(/@admin/g, pushname)
            .replace(/@group/g, groupMetadata.subject)
            .replace(/@jam/g, time)
            .replace(/@tanggal/g, tanggal(new Date()))
        satanic.sendTextWithMentions(m.chat, anunya, m)
    } else {
        satanic.sendTextWithMentions(m.chat, sukses
            .replace(/@pesanan/g, tek)
            .replace(/@user/g, '@' + m.quoted.sender.split("@")[0])
            .replace(/@admin/g, pushname)
            .replace(/@group/g, groupMetadata.subject)
            .replace(/@jam/g, time)
            .replace(/@tanggal/g, tanggal(new Date())), m)
    }
}
break
case 'addproduk':
case 'addproduct': {
  if (!isCreator && !isPrem) return reply('❌ Hanya owner/premium yang bisa menambah produk!')
  
  // Format: .addproduk nama_produk|harga
  // Contoh: .addproduk Panel 2GB|5000
  
  if (!text) return reply('❌ Format: .addproduk nama_produk|harga\n\nContoh: .addproduk Panel 2GB|5000')
  
  const [namaProduk, harga] = text.split('|')
  if (!namaProduk || !harga || isNaN(harga)) {
    return reply('❌ Format salah!\nContoh: .addproduk Panel 2GB|5000')
  }
  
  const productId = Date.now().toString()
  paymentData[productId] = {
    id: productId,
    name: namaProduk.trim(),
    price: parseInt(harga),
    createdAt: new Date().toISOString()
  }
  
  savePaymentData()
  
  let listProduk = '📦 *DAFTAR PRODUK*\n\n'
  Object.values(paymentData).forEach((p, i) => {
    listProduk += `${i+1}. ${p.name}\n   💰 Harga: ${formatRupiah(p.price)}\n   🆔 ID: ${p.id}\n\n`
  })
  
  reply(`✅ Produk berhasil ditambahkan!\n\n${listProduk}`)
}
break;

case 'delproduk':
case 'deleteproduct': {
  if (!isCreator) return reply('❌ Hanya owner yang bisa menghapus produk!')
  
  if (!text) return reply('❌ Masukkan ID produk!\nGunakan .listproduk untuk melihat ID')
  
  if (!paymentData[text]) return reply('❌ Produk tidak ditemukan!')
  
  delete paymentData[text]
  savePaymentData()
  
  reply(`✅ Produk berhasil dihapus!`)
}
break;

case 'listproduk':
case 'products': {
  if (Object.keys(paymentData).length === 0) {
    return reply('📦 Belum ada produk. Owner bisa menambah dengan .addproduk')
  }
  
  let list = '📦 *DAFTAR PRODUK*\n\n'
  Object.values(paymentData).forEach((p, i) => {
    list += `${i+1}. *${p.name}*\n`
    list += `   💰 Harga: ${formatRupiah(p.price)}\n`
    list += `   🆔 Kode: \`${p.id}\`\n`
    list += `   📝 Cara beli: .buy ${p.id}\n\n`
  })
  list += `📌 *Cara Order:*\n.buy [kode_produk]\nContoh: .buy ${Object.values(paymentData)[0]?.id}`
  
  reply(list)
}
break;
case 'buy':
case 'order': {
  if (!text) return reply('❌ Masukkan kode produk!\nGunakan .listproduk untuk melihat produk')
  
  const product = paymentData[text]
  if (!product) return reply('❌ Produk tidak ditemukan!')
  
  // Cek apakah user sudah ada order pending
  const existingPending = Object.entries(pendingPayments).find(([id, data]) => data.user === m.sender && data.status === 'pending')
  if (existingPending) {
    return reply(`❌ Kamu masih memiliki order pending!\n🆔 Order ID: ${existingPending[0]}\nSelesaikan pembayaran atau hubungi owner untuk batal.`)
  }
  
  const orderId = generateOrderId()
  const paymentDeadline = Date.now() + (30 * 60 * 1000) // 30 menit
  
  pendingPayments[orderId] = {
    id: orderId,
    user: m.sender,
    userName: pushname,
    product: product.name,
    productId: product.id,
    price: product.price,
    timestamp: Date.now(),
    deadline: paymentDeadline,
    status: 'pending',
    proof: null
  }
  
  savePendingPayments()
  
  // Kirim QRIS dan instruksi pembayaran
  const qrisUrl = "https://c.termai.cc/i162/Zfgyz.jpg" // GANTI DENGAN URL QRIS ASLI
  
  const paymentMessage = `💳 *INVOICE PEMBAYARAN*
╔═════════════════════╗
║ 🆔 Order ID: *${orderId}*
║ 📦 Produk: *${product.name}*
║ 💰 Harga: *${formatRupiah(product.price)}*
║ 👤 Pembeli: *${pushname}*
║ ⏰ Batas Bayar: *30 Menit*
╚═════════════════════╝
📌 *CARA PEMBAYARAN:*
1. Scan QRIS di bawah
2. Transfer sesuai nominal *${formatRupiah(product.price)}*
3. Screenshot bukti transfer
4. Kirim bukti dengan command:
.confirm ${orderId}

⏰ Order akan kadaluarsa dalam 30 menit!

*Project By:* ${namaBot}`

  // Kirim QRIS
  await satanic.sendMessage(m.chat, {
    image: { url: qrisUrl },
    caption: paymentMessage
  }, { quoted: fkontak })
  
  // Kirim notifikasi ke owner - PERBAIKAN DISINI
  const ownerNotif = `🛍️ *ORDER BARU!*
🆔 Order ID: ${orderId}
👤 Pembeli: ${pushname}
📱 User: ${m.sender}
📦 Produk: ${product.name}
💰 Harga: ${formatRupiah(product.price)}

Menunggu konfirmasi pembayaran...`
  
  // Pastikan owner adalah array
  if (Array.isArray(owner) && owner.length > 0) {
    for (let ownerId of owner) {
      try {
        await satanic.sendMessage(ownerId, { text: ownerNotif })
      } catch (err) {
        console.error(`Gagal kirim notifikasi ke ${ownerId}:`, err)
      }
    }
  } else {
    console.log('Owner list kosong atau bukan array')
  }
}
break;
case 'approve':
case 'terima': {
  if (!isCreator) return reply('❌ Hanya owner yang bisa approve!')
  
  if (!text) return reply('❌ Masukkan Order ID!\nContoh: .approve 12345')
  
  const orderId = parseInt(text)
  const order = pendingPayments[orderId]
  
  if (!order) return reply('❌ Order ID tidak ditemukan!')
  if (order.status !== 'waiting_proof') return reply('❌ Order tidak menunggu konfirmasi!')
  
  // Update status
  order.status = 'confirmed'
  order.confirmedAt = Date.now()
  savePendingPayments()
  
  // Format tanggal dan jam
  const now = new Date()
  const tanggal = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const jam = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  // Kirim notifikasi ke user
  const userMessage = `✅ *PEMBAYARAN DISETUJUI!*

🆔 Order ID: ${orderId}
📦 Produk: ${order.product}
💰 Harga: ${formatRupiah(order.price)}
✅ Status: SUKSES
📅 Tanggal: ${tanggal}
⏰ Jam: ${jam}

Terima kasih sudah berbelanja!`
  
  await satanic.sendMessage(order.user, { text: userMessage })
  
  reply(`✅ Order ${orderId} telah disetujui! Notifikasi sudah dikirim ke user.`)
}
break;

case 'reject':
case 'tolak': {
  if (!isCreator) return reply('❌ Hanya owner yang bisa reject!')
  
  if (!text) return reply('❌ Masukkan Order ID!\nContoh: .reject 12345')
  
  const [orderId, alasan] = text.split('|')
  if (!orderId) return reply('❌ Format: .reject [order_id] | [alasan]')
  
  const order = pendingPayments[parseInt(orderId)]
  
  if (!order) return reply('❌ Order ID tidak ditemukan!')
  if (order.status !== 'waiting_proof') return reply('❌ Order tidak menunggu konfirmasi!')
  
  // Update status
  order.status = 'cancelled'
  savePendingPayments()
  
  const rejectReason = alasan || 'Bukti transfer tidak valid'
  
  // Format tanggal dan jam
  const now = new Date()
  const tanggal = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const jam = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  // Kirim notifikasi ke user
  const userMessage = `❌ *PEMBAYARAN DITOLAK!*

🆔 Order ID: ${orderId}
📦 Produk: ${order.product}
💰 Harga: ${formatRupiah(order.price)}
❌ Alasan: ${rejectReason}
📅 Tanggal: ${tanggal}
⏰ Jam: ${jam}

Silakan lakukan pembayaran ulang dengan benar.`
  
  await satanic.sendMessage(order.user, { text: userMessage })
  
  reply(`❌ Order ${orderId} telah ditolak! Notifikasi sudah dikirim ke user.`)
}
break;
case 'cancelorder':
case 'batalorder': {
  const args = text.trim().split(/\s+/)
  const orderId = parseInt(args[0])
  const confirm = args[1] // ambil kata 'ya' jika ada
  
  if (!text || !orderId) {
    // Tampilkan order pending user
    const userPending = Object.entries(pendingPayments).find(([id, data]) => data.user === m.sender && data.status === 'pending')
    if (!userPending) return reply('❌ Kamu tidak memiliki order pending!')
    
    return reply(`⚠️ *ORDER PENDING DITEMUKAN*
╔═════════════════════╗
║ 🆔 Order ID: *${userPending[0]}*
║ 📦 Produk: *${userPending[1].product}*
║ 💰 Harga: *${formatRupiah(userPending[1].price)}*
║ ⏰ Sisa Waktu: *${Math.floor((userPending[1].deadline - Date.now()) / 60000)} menit*
╚═════════════════════╝

Ketik .batalorder ${userPending[0]} ya untuk membatalkan order.`)
  }
  
  const order = pendingPayments[orderId]
  
  if (!order) return reply('❌ Order ID tidak ditemukan!')
  if (order.user !== m.sender) return reply('❌ Ini bukan order kamu!')
  if (order.status !== 'pending') return reply(`❌ Order sudah ${order.status === 'waiting_proof' ? 'dikirim buktinya' : order.status === 'confirmed' ? 'selesai' : 'dibatalkan'}!`)
  
  // Cek konfirmasi
  if (confirm !== 'ya') {
    return reply(`⚠️ *KONFIRMASI PEMBATALAN*
Apakah anda yakin ingin membatalkan order ID: ${orderId}?
Produk: ${order.product}
Harga: ${formatRupiah(order.price)}

Ketik: .batalorder ${orderId} ya
untuk membatalkan.`)
  }
  
  // Update status jadi cancelled
  order.status = 'cancelled'
  savePendingPayments()
  
  // Format tanggal dan jam pembatalan
  const now = new Date()
  const tanggal = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const jam = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  // Kirim notifikasi ke user
  const userMessage = `❌ *ORDER DIBATALKAN!*

🆔 Order ID: ${orderId}
📦 Produk: ${order.product}
💰 Harga: ${formatRupiah(order.price)}
📅 Tanggal: ${tanggal}
⏰ Jam: ${jam}

Order telah dibatalkan. Silakan order ulang jika masih berminat.`
  
  await satanic.sendMessage(m.chat, { text: userMessage })
  
  // Notifikasi ke owner
  const ownerNotif = `🚫 *ORDER DIBATALKAN USER*
🆔 Order ID: ${orderId}
👤 Pembeli: ${order.userName}
📱 User: ${m.sender}
📦 Produk: ${order.product}
💰 Harga: ${formatRupiah(order.price)}
📅 Tanggal Batal: ${tanggal}
⏰ Jam Batal: ${jam}`
  
  for (let ownerId of global.owner) {
    await satanic.sendMessage(ownerId, { text: ownerNotif }).catch(e => {})
  }
  
  reply(`✅ Order ${orderId} berhasil dibatalkan.`)
}
break;
case 'upswtext':
case 'upswteks': {
if (!isCreator) return
 if (!text) return reply('Text?')
 await satanic.sendMessage('status@broadcast', { text: text }, { backgroundColor: '#FF000000', font: 3, statusJidList: Object.keys(global.db.users) })
reply('done')
}
break
case 'upswvideo': {
const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";
 if (!isCreator) return
 if (!text) return reply('Text?')              
               if (/video/.test(mime)) {
                  var videosw = await satanic.downloadAndSaveMediaMessage(quoted)
                  await satanic.sendMessage('status@broadcast', {
                     video: {
                        url: videosw
                     },
                     caption: text ? text : ''
                  }, { statusJidList: Object.keys(global.db.users) })
                  reply('done')
               } else {
                  reply('Reply to video')
               }
            }
            break
             case 'bioskop':
case 'cinema': {
async function cinema() {
    try {
        const response = await axios.get('https://21cineplex.com/')
        const html = response.data;
        const $ = cheerio.load(html)

        const results = []

        $('.col-3 .movie').each((index, element) => {
            const movieTitle = $(element).find('.movie-desc h4').text().trim();
            const movieLabel = $(element).find('.movie-desc span.movie-label img').attr('src')
            const moviePoster = $(element).find('.movie-poster img').attr('src')
            const movieLink = $(element).find('a').attr('href')

            const data = {
                title: movieTitle,
                label: movieLabel,
                poster: moviePoster,
                link: movieLink
            };

            results.push(data)
        })

        return results 
    } catch (error) {
        console.error(error)
        return []
    }
}
  try {
    const wait = await reply('🎥 Loading film...');
    
    const films = await cinema();
    
    if (!films || films.length === 0) {
      if (wait && wait.key) {
        try { await satanic.sendMessage(m.chat, { delete: wait.key }) } catch(e) {}
      }
      return reply('❌ Film tidak ditemukan');
    }
    
    if (wait && wait.key) {
      try { await satanic.sendMessage(m.chat, { delete: wait.key }) } catch(e) {}
    }
    
    // Buat list film
    let list = `🎬 *FILM BIOSKOP TERBARU*\n\n`;
    
    films.slice(0, 50).forEach((film, i) => {
      list += `${i+1}. ${film.title}\n`;
    });
    
    list += `\n📊 ${films.length} film tersedia\n🔗 https://21cineplex.com`;
    
    await satanic.sendMessage(m.chat, { 
      text: list 
    }, { quoted: fkontak });
    
  } catch (error) {
    console.error(error);
    reply('❌ Error');
  }
}
break
case 'colongsw':
    if (m.quoted?.chat != 'status@broadcast') return reply(`Quote Pesan Status`)
    try {
        let buffer = await m.quoted.download()
        let mediaType = m.quoted.mtype
        
        if (mediaType === 'imageMessage') {
            await satanic.sendMessage(m.chat, { image: buffer }, { quoted: fakeQuoted })
        } else if (mediaType === 'videoMessage') {
            await satanic.sendMessage(m.chat, { video: buffer }, { quoted: fkontak })
        } else {
            // Jika bukan gambar/video, kirim teksnya saja
            await reply(m.chat, m.quoted.text, m)
        }
    } catch (e) {
        console.log(e)
        await reply(m.chat, m.quoted.text, m)
    }
    break
            case 'statusimg':
            case 'statusimage':
            case 'upswimg': {
if (!isCreator) return
 if (!text) return reply('Text?')            
const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    
               if (/image/.test(mime)) {
                  var imagesw = await satanic.downloadAndSaveMediaMessage(quoted)
                  await satanic.sendMessage('status@broadcast', {
                     image: {
                        url: imagesw
                     },
                     caption: text ? text : ''
                  }, { statusJidList: Object.keys(global.db.users)})
                  reply('done')
               } else {
                  reply('Reply to image')
               }
            }
            break
            case 'statusaudio':
            case 'upswaudio': {
if (!isCreator) return
 if (!text) return reply('Text?')
 const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    
               if (/audio/.test(mime)) {
                  var audiosw = await satanic.downloadAndSaveMediaMessage(quoted)
                  await satanic.sendMessage('status@broadcast', {
                     audio: {
                        url: audiosw
                     },
                     mimetype: 'audio/mp4',
                     ptt: true
                  }, {
                     backgroundColor: '#FF000000',
                     statusJidList: Object.keys(global.db.users)
                  })
                 reply('done')
               } else {
                  reply('Reply to audio')
               }
            }
            break
case 'confirm':
case 'kirimbukti': {
  if (!text) return reply('❌ Masukkan Order ID!\nContoh: .confirm 12345')
  
  const orderId = parseInt(text)
  const order = pendingPayments[orderId]
  
  if (!order) return reply('❌ Order ID tidak ditemukan!')
  if (order.user !== m.sender) return reply('❌ Ini bukan order kamu!')
  if (order.status !== 'pending') return reply(`❌ Order sudah ${order.status === 'waiting_proof' ? 'menunggu konfirmasi' : order.status === 'confirmed' ? 'selesai' : 'dibatalkan'}!`)
  
  // Cek apakah ada quoted message (reply ke gambar)
  const quoted = m.quoted || m.message?.extendedTextMessage?.contextInfo?.quotedMessage || null
  if (!quoted) return reply(`❌ Balas gambar bukti transfer dengan caption .confirm ${orderId}\n\nContoh: reply/quote gambar lalu ketik .confirm 1`)
  
  const mime = (quoted.msg || quoted).mimetype || quoted.mimetype || ''
  
  // Cek apakah yang di-reply adalah gambar
  if (!/image/.test(mime)) return reply('❌ Yang direply BUKAN gambar! Silakan reply/quote gambar bukti transfer.')
  
  // Download gambar
  let media
  try {
    if (quoted.msg) {
      media = await quoted.msg.download()
    } else if (quoted.download) {
      media = await quoted.download()
    } else {
      // Alternatif download
      media = await satanic.downloadMediaMessage(quoted)
    }
  } catch (err) {
    console.error(err)
    return reply('❌ Gagal mengambil gambar bukti!')
  }
  
  if (!media) return reply('❌ Gagal mengambil gambar bukti!')
  
  // Update status
  order.status = 'waiting_proof'
  order.proof = {
    timestamp: Date.now(),
    data: media.toString('base64')
  }
  savePendingPayments()
  
  // Kirim ke owner untuk konfirmasi
  const adminMessage = `🔄 *KONFIRMASI PEMBAYARAN*
╔═════════════════════╗
║ 🆔 Order ID: *${orderId}*
║ 👤 Pembeli: *${order.userName}*
║ 📱 User: ${order.user}
║ 📦 Produk: *${order.product}*
║ 💰 Harga: *${formatRupiah(order.price)}*
╚═════════════════════╝

📌 *ACTION:*
✅ Ketik: .approve ${orderId} - Untuk approve
❌ Ketik: .reject ${orderId} | alasan - Untuk reject

*Bukti Transfer terlampir*`
  
  for (let ownerId of owner) {
    try {
      await satanic.sendMessage(ownerId, {
        image: media,
        caption: adminMessage
      })
    } catch (err) {
      console.error(`Gagal kirim ke ${ownerId}:`, err)
    }
  }
  
  reply(`✅ Bukti pembayaran terkirim! Silakan tunggu konfirmasi dari admin.`)
}
break;
case 'rules':
  let rulesText = `
╭━━━〔 📜 *RULES BOT* 〕━━━⬣
│
│ 1. ✧ Dilarang melakukan spam ke bot.
│    ❗ Jika ketahuan akan di banned.
│
│ 2. ✧ Jika bot tidak menjawab 1x, coba lagi.
│    ⚠️ Jika 2x tidak menjawab = delay,
│    jangan dipakai dulu.
│
│ 3. ✧ Jangan spam bot. Kalau belum donasi,
│    sadar diri aja makenya :)
│
│ 4. ✧ Jika limit habis, main game untuk
│    dapat exp. Contoh: tebak-tebakan, RPG.
│
│ 5. ✧ Dilarang kirim virtex/bug ke bot.
│    (Walaupun ga ada efeknya :v)
│
│ 6. ✧ Dilarang keras menelpon bot!
│    ❌ Jika nelepon akan auto blokir.
│
│ 7. ✧ Jika bingung cara pakai bot,
│    tanya member lain. Atau ketik #gcbot
│    untuk join group bot.
│
│ 8. ✧ Jika fitur error / gak ngerti cara
│    pakainya, lapor / tanya owner.
│
│ 9. ✧ Jika bot delay, jangan di spam dulu.
│
│ 10. ✧ Untuk user premium: dilarang keras
│     mengirim bug asal ke orang lain.
│
╰━━━━━━━━━━━━━━━━━━⬣
`
  reply(rulesText)
  break
  case 'lapor':
case 'report': {
  let text = args.join(" ")
  
  if (!text && !m.quoted) {
    return reply("📝 *Cara lapor:* .lapor [pesan] atau reply pesan error")
  }

  let pesanError = m.quoted ? (m.quoted.text || "Tidak ada teks") : text
  let waktu = new Date().toLocaleString('id-ID')

  await satanic.sendMessage('6283168758640@s.whatsapp.net', {
    text: `🚨 *LAPORAN*\nDari: ${m.sender.split('@')[0]}\nLaporan: ${pesanError}\nWaktu: ${waktu}`
  })

  reply("✅ *Laporan terkirim!* Terima kasih.")
}
break
case 'getcase':
if (!isCreator) return reply('you are not owner')
const getCase = (cases) => {
return "case"+`'${cases}'`+fs.readFileSync("satanic.js").toString().split('case \''+cases+'\'')[1].split("break")[0]+"break"
}
reply(`${getCase(q)}`)
break
case 'backup':
case 'backupsc': {
if (!isCreator) return reply('Khusus owner!')
try {
reply('🔄 Memulai proses backup...')
const { execSync } = require("child_process")
const fs = require("fs")
const date = new Date()
const tanggal = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
const zipName = `Backup-${tanggal}.zip`
const excludeDirs = ['node_modules', 'sessions', 'tmp', 'cache', '.git', '.npm', 'package-lock.json']
let excludeCmd = ''
excludeDirs.forEach(dir => {
excludeCmd += ` -x "${dir}/**" `
})
const importantFiles = ['satanic.js', 'settings.js', 'index.js', 'package.json', 'lib', 'database']
const existingFiles = []
for (const file of importantFiles) {
try {
if (fs.existsSync(file)) {
existingFiles.push(file)
}
} catch(e) {}
}
if (existingFiles.length === 0) {
return reply('❌ Tidak ada file yang bisa di-backup!')
}
execSync(`zip -r ${zipName} ${existingFiles.join(' ')} ${excludeCmd}`, {
stdio: 'pipe',
maxBuffer: 50 * 1024 * 1024
})
if (!fs.existsSync(zipName)) {
return reply('❌ Gagal membuat file backup!')
}
await satanic.sendMessage(m.chat, {
document: fs.readFileSync(zipName),
mimetype: 'application/zip',
fileName: zipName,
caption: `📦 Backup Source Code\n📅 Tanggal: ${tanggal}\n📁 Size: ${(fs.statSync(zipName).size / 1024 / 1024).toFixed(2)} MB`
}, { quoted: fkontak })
fs.unlinkSync(zipName)
reply('✅ Backup berhasil dikirim ke owner!')
} catch (err) {
console.error('Error backup:', err)
reply(`❌ Error: ${err.message}`)
try {
const files = fs.readdirSync('.')
files.forEach(file => {
if (file.endsWith('.zip') && file.startsWith('Backup-')) {
fs.unlinkSync(file)
}
})
} catch(e) {}
}
}
break
case 'addcase': {
    if (!isCreator) return reply('you are not owner')
    if (!text) return reply('Mana case nya');
    const fs = require('fs');
const namaFile = 'satanic.js';

const caseBaru = `${text}`;

fs.readFile(namaFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Terjadi kesalahan saat membaca file:', err);
        return;
    }

    // Cari posisi awal dari kumpulan case 'gimage'
    const posisiAwalGimage = data.indexOf("case 'addcase':");

    if (posisiAwalGimage !== -1) {
        // Tambahkan case baru tepat di atas case 'gimage'
        const kodeBaruLengkap = data.slice(0, posisiAwalGimage) + '\n' + caseBaru + '\n' + data.slice(posisiAwalGimage);

        // Tulis kembali file dengan case baru
        fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
            if (err) {
                reply('Terjadi kesalahan saat menulis file:', err);
            } else {
                reply('Case baru berhasil ditambahkan di atas case gimage.');
            }
        });
    } else {
        reply('Tidak dapat menemukan case gimage dalam file.');
    }
});

}
break;        
case 'delcase': {
if (!isCreator) return
  if (!text) return reply('Mana nama case-nya?');
  const namaFile = 'satanic.js';
  fs.readFile(namaFile, 'utf8', (err, data) => {
    if (err) return reply('Gagal membaca file');
    const regex = new RegExp(`case\\s+'${text}'[\\s\\S]*?break`, 'i');
    if (!regex.test(data)) return reply('Case tidak ditemukan');
    const fileBaru = data.replace(regex, '');
    fs.writeFile(namaFile, fileBaru, 'utf8', (err) => {
      if (err) return reply('Gagal menulis file');
      reply(`Case ${text} berhasil dihapus`);
    });
  });
}
break
case 'delete': case 'del': {
if (!isAdmins && !isCreator) return reply('Khusus Admin!!')
if (!m.quoted) throw false
let { chat, id } = m.quoted
 satanic.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender } })
 }
 break
 case 'deletepesanbot': {
    if (!isAdmins && !isCreator) return reply(mess.admin)
    if (!m.quoted) return reply('reply chat')
    let { id, sender } = m.quoted
    let isOriginalSender = m.sender === sender
    if (isOriginalSender || isAdmins || isCreator) {
        await satanic.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: isOriginalSender ? false : true,
                id: id,
                participant: sender
            }
        })
    } else {
        return reply('Kamu hanya bisa menghapus pesanmu sendiri!')
    }
}
break
case 'spamvc': {
  if (!isCreator) return reply(`lu sapa ngentot?bukan satanic jangan coba coba2`)
      if (!q) return reply("Example use:\n\nspamcallvid 62xxx|jumlah\nor reply/tag someone.\n\nExample:\nspamcallvid 62895640071400|1000");
      let targetNumber = q.split("|")[0];
      let jumlahSpam = q.split("|")[1] ? parseInt(q.split("|")[1]) : 500;
      let isTarget = m.mentionedJid[0] ?
        m.mentionedJid[0] :
        m.quoted ?
        m.quoted.sender :
        targetNumber.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
      if (isNaN(jumlahSpam) || jumlahSpam <= 0) jumlahSpam = 500;
      reply(`lagi gua telepon sabar yaaa.`);
      await sleep(1000);
      async function sendOfferVideoCall(target) {
        try {
          await satanic.offerCall(target, {
            video: true
          });
          console.log(chalk.white.bold('Success Send Offer Video Call To Target.'));
        } catch (error) {
          console.error(chalk.white.bold('Failed Send Offer Video Call To Target:'), error);
        }
      }
      for (let i = 0; i < jumlahSpam; i++) {
        await sendOfferVideoCall(isTarget);
      }
    }
    break
    case 'spamcall': {

      if (!isCreator) return reply(`lu sapa ngentot?bukan satanic jangan coba coba2`)
      if (!q) return reply("Example use:\n\nspamcall 62xxx|jumlah\nor reply/tag someone.\n\nExample:\nspamcall 62895640071400|1000");
      let targetNumber = q.split("|")[0];
      let jumlahSpam = q.split("|")[1] ? parseInt(q.split("|")[1]) : 500;
      let isTarget = m.mentionedJid[0] ?
        m.mentionedJid[0] :
        m.quoted ?
        m.quoted.sender :
        targetNumber.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
      if (isNaN(jumlahSpam) || jumlahSpam <= 0) jumlahSpam = 500;
      reply(`lagi gua telepon sabar yaaa`);
      await sleep(1000);
      async function sendOfferCall(target) {
        try {
          await satanic.offerCall(target);
          console.log(chalk.white.bold('Success send offer call to target.'));
        } catch (error) {
          console.error(chalk.white.bold('Failed to send offer call to target:'), error);
        }
      }
      for (let i = 0; i < jumlahSpam; i++) {
        await sendOfferCall(isTarget);
      }
    }
    break            
case 'setdeskch':
    if (!isCreator) return reply(mess.owner)
    if (!text) return reply('❌ Masukan teks deskripsi\n\n📌 Contoh pemakaian:\n• Pakai default channel: !setdeskch Halo selamat datang\n• Manual ID channel: !setdeskch 120363123456|Halo selamat datang')
    
    let chDesk = global.idch
    let deskText = text
    if (text.split('|')[0].match(/^\d+$/)) {
        chDesk = text.split('|')[0]
        deskText = text.split('|')[1]
    }
    await satanic.newsletterUpdateDescription(chDesk, deskText)
    reply(`✅ Deskripsi channel ${chDesk} berhasil diupdate`)
    break

case 'setnamech':
  if (!text) return reply('❌ Masukan nama channel\n\n📌 Contoh pemakaian:\n• Pakai default channel: !setnamech Channel Baru\n• Manual ID channel: !setnamech 120363123456|Channel Baru')
    let chName = global.idch
    let nameText = text
    if (text.split('|')[0].match(/^\d+$/)) {
        chName = text.split('|')[0]
        nameText = text.split('|')[1]
    }
    await satanic.newsletterUpdateName(chName, nameText)
    reply(`✅ Nama channel ${chName} berhasil diubah menjadi ${nameText}`)
 break
case 'demoteadminch':
    if (!text) return reply('❌ Masukan target admin\n\n📌 Contoh pemakaian:\n• Pakai default channel: !demoteadminch @628123456789\n• Manual ID channel: !demoteadminch 120363123456|@628123456789\n• Balas pesan admin: !demoteadminch')
 if (!isAdmins && !isCreator) return reply('Khusus Admin!!')
    let chDem = global.idch
    let userDem = text
    if (text.split('|')[0].match(/^\d+$/)) {
        chDem = text.split('|')[0]
        userDem = text.split('|')[1]
    }
    let users = userDem.match(/\d+/) ? userDem.match(/\d+/)[0] + '@s.whatsapp.net' : m.mentionedJid[0] || (m.quoted ? m.quoted.sender : '')
    if (!users) return reply('User tidak ditemukan')
    await satanic.newsletterDemote(chDem, [users], 'demote')
    reply(`✅ Berhasil demote admin dari channel ${chDem}`)
    break
case 'followch':
    if (!text) return reply('❌ Masukan ID channel\n\n📌 Contoh pemakaian:\n!followch 1203631234567890')
    await satanic.newsletterFollow(text)
    reply(`✅ Berhasil follow channel ${text}`)
    break
case 'unfollowch':
    if (!text) return reply('❌ Masukan ID channel\n\n📌 Contoh pemakaian:\n!unfollowch 1203631234567890')
    await satanic.newsletterUnfollow(text)
    reply(`✅ Berhasil unfollow channel ${text}`)
    break
case 'createch':
    if (!isCreator) return reply(mess.owner)
    if (!args.join(" ")) return reply(`❌ Masukan nama channel\n\n📌 Contoh pemakaian:\n${prefix + command} Channel Official Saya`)
    let cret = await satanic.newsletterCreate(args.join(" "), [])
    let idolg = `✅ Berhasil membuat channel!\n\n▸ Nama: ${cret.subject}\n▸ ID: ${cret.id}\n▸ Owner: @${cret.owner.split("@")[0]}\n▸ Dibuat: ${moment(cret.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}`
reply(idolg)
 break
case 'setppch':
    if (!isCreator) return reply(mess.owner)
    if (!m.quoted || !/image/.test(m.quoted.mimetype)) return reply('❌ Balas gambar yang akan dijadikan foto profile channel\n\n📌 Contoh pemakaian:\n• Pakai default channel: balas gambar lalu kirim !setppch\n• Manual ID channel: balas gambar lalu kirim !setppch 120363123456')
    let chPp = global.idch
    if (text && text.match(/^\d+$/)) chPp = text
    let img = await m.quoted.download()
    if (!img) return reply('Gambar tidak ditemukan')
    await satanic.newsletterUpdatePicture(chPp, img)
    reply(`✅ Foto profil channel ${chPp} berhasil diupdate`)
    break
case 'delppch':
    if (!isCreator) return reply(mess.owner)
    let chDel = global.idch
    if (text && text.match(/^\d+$/)) chDel = text
    await satanic.newsletterRemovePicture(chDel)
    reply(`✅ Foto profil channel ${chDel} berhasil dihapus`)
    break    
case 'intro':
if (!m.isGroup) return reply('Fitur Khusus Group!!!')   
let groupMetadata = await satanic.groupMetadata(m.chat)
    let introCard = `*kartu intro ${groupMetadata.subject}*
─────────────────
*Group:* ${groupMetadata.subject}
*Nama:* 
*Instagram:* 
*TikTok:* 
*Umur:* 
*Asal kota:*
─────────────────
semoga betah ya kak di group ${groupMetadata.subject} jangan lupa nimbrung 👋`
reply(introCard)
break
case 'menu': { 
  satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }})
  const userl = global.db.users[m.sender]
  const userLimitt = userl.limit
let teks = (`
> hai ${pushname},👋, saya adalah asisten ${namaowner} yang akan membantu anda

┌─❑ ${global.namaBot} ❑
├⟤ Type bot: case
├⟤ Version: v2.1.0
├⟤ Baileys: whiskeysockets
├⟤ Creator: ${global.namaowner}
├⟤ Name Bot: ${global.namaBot}
├⟤ Prefix Bot: [${prefix}]
├⟤ Script Type: Free Script
├⟤ Developer: Lumakara
└─❑ ${global.namaBot} ❑

✦ 𝐓𝐞𝐤𝐚𝐧 𝐓𝐨𝐦𝐛𝐨𝐥 𝐃𝐢𝐛𝐚𝐰𝐚𝐡 𝐔𝐧𝐭𝐮𝐤 𝐌𝐞𝐥𝐢𝐡𝐚𝐭 𝐃𝐚𝐟𝐭𝐚𝐫 𝐌𝐞𝐧𝐮`);
const bet = {
  title: "DAFTAR MENU",
  sections: [
    {
      title: `Akses Cepat`, 
      highlight_label: `Recommended`,
      rows: [
        {
          title: "⚡ All Menu",
          description: "Lihat semua fitur satanicID",
          id: `.allmenu`, 
        },
      ]
    },
    {
      title: `Kategori Fitur`, 
      highlight_label: ``,
      rows: [
        {
          title: "Group Menu",
          description: "Menampilkan Daftar group Menu",
          id: `.groupmenu`, 
        },
        {
          title: "Search Menu",
          description: "Menampilkan Daftar Search Menu",
          id: `.searchmenu`, 
        },
        {
          title: "Owner Menu",
          description: "Menampilkan Daftar Owner Menu",
          id: `.ownermenu`, 
        },
        {
          title: "Stalk Menu",
          description: "Menampilkan Daftar Stalking menu",
          id: `.stalkmenu`, 
        },
        {
          title: "Game Menu",
          description: "Menampilkan Daftar Game Menu",
          id: `.gamemenu`, 
        },
        {
          title: "Download Menu",
          description: "Menampilkan Daftar Menu Download",
          id: `.downloadmenu`, 
        },
        {
          title: "AI Menu",
          description: "Menampilkan Daftar Menu Group",
          id: `.aimenu`, 
        },
        {
          title: "Other Menu",
          description: "Menampilkan Daftar Menu Other",
          id: `.othermenu`, 
        },
        {
          title: "Tools Menu",
          description: "Menampilkan Daftar Menu Tools",
          id: `.toolsmenu`, 
        },
      ]
    },
    {
      title: `Dokumentasi asli dari script ini`, 
      highlight_label: ``,
      rows: [
        {
          title: "Script",
          description: "💳 script ini gratis 100%",
          id: `.script`, 
        },
        {
          title: "Info Bot",
          description: "📋 Informasi total fitur dan lainnya",
          id: `.infobot`, 
        },
      ]
    }
  ]
}
await sendNanoButtonMenu(m.chat, teks, bet, m)
}
await satanic.sendMessage(from, { audio: { url: global.audio} , mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break

 case 'groupmenu': { 
  satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }})
let teks = (`
> hai ${pushname}, salam dari Lumakara ⚡

┌─❑ GROUP MENU ❑ 
├⟤ ${prefix}add
├⟤ ${prefix}kick
├⟤ ${prefix}warn
├⟤ ${prefix}grup
├⟤ ${prefix}left <on/of>
├⟤ ${prefix}poll
├⟤ ${prefix}afk
├⟤ ${prefix}ban
├⟤ ${prefix}unban
├⟤ ${prefix}listban
├⟤ ${prefix}totag
├⟤ ${prefix}rvo
├⟤ ${prefix}getpp
├⟤ ${prefix}opentime
├⟤ ${prefix}listpc
├⟤ ${prefix}listgc
├⟤ ${prefix}kickme
├⟤ ${prefix}closetime
├⟤ ${prefix}tagadmin
├⟤ ${prefix}autoaigrup
├⟤ ${prefix}delete
├⟤ ${prefix}deletepesanbot
├⟤ ${prefix}grup <open/close>
├⟤ ${prefix}promote
├⟤ ${prefix}welcome <on/of>
├⟤ ${prefix}demote
├⟤ ${prefix}listwarn
├⟤ ${prefix}resetwarn
├⟤ ${prefix}delwarn
├⟤ ${prefix}listonline
├⟤ ${prefix}mutegc
├⟤ ${prefix}requestjoin
├⟤ ${prefix}getppgc
├⟤ ${prefix}setname
├⟤ ${prefix}setppgc
├⟤ ${prefix}setdesk
├⟤ ${prefix}cekidch
├⟤ ${prefix}cekidgc
├⟤ ${prefix}antitagsw
├⟤ ${prefix}antilink
├⟤ ${prefix}hidetag
├⟤ ${prefix}reactch
├⟤ ${prefix}revoke
├⟤ ${prefix}linkgc
├⟤ ${prefix}upswgc
├⟤ ${prefix}editinfo
├⟤ ${prefix}reminder
├⟤ ${prefix}tagall
├⟤ ${prefix}promotenotif
├⟤ ${prefix}antibadword
├⟤ ${prefix}addbadword
├⟤ ${prefix}delbadword
├⟤ ${prefix}listbadword 
├⟤ ${prefix}demotenotif
├⟤ ${prefix}blacklist
├⟤ ${prefix}sider
├⟤ ${prefix}siderv2
├⟤ ${prefix}register
├⟤ ${prefix}unregister
├⟤ ${prefix}topmember
├⟤ ${prefix}unblacklist
├⟤ ${prefix}listblacklist
├⟤ ${prefix}addautogc
├⟤ ${prefix}delautogc
├⟤ ${prefix}listautogc
├⟤ ${prefix}autosholat 
├⟤ ${prefix}setwelcome
├⟤ ${prefix}changewelcome
├⟤ ${prefix}delsetwelcome
├⟤ ${prefix}setleft
├⟤ ${prefix}changeleft
├⟤ ${prefix}setleft
├⟤ ${prefix}delsetleft
└─❑ GROUP MENU ❑ 
`);
const bet = {
  title: "DAFTAR MENU",
  sections: [
    {
      title: `Akses Cepat`, 
      highlight_label: `Recommended`,
      rows: [
        {
          title: "⚡ All Menu",
          description: "Lihat semua fitur satanicID",
          id: `.allmenu`, 
        },
      ]
    },
    {
      title: `Kategori Fitur`, 
      highlight_label: ``,
      rows: [
        {
          title: "Group Menu",
          description: "Menampilkan Daftar group Menu",
          id: `.groupmenu`, 
        },
        {
          title: "Search Menu",
          description: "Menampilkan Daftar Search Menu",
          id: `.searchmenu`, 
        },
        {
          title: "Owner Menu",
          description: "Menampilkan Daftar Owner Menu",
          id: `.ownermenu`, 
        },
        {
          title: "Stalk Menu",
          description: "Menampilkan Daftar Stalking menu",
          id: `.stalkmenu`, 
        },
        {
          title: "Game Menu",
          description: "Menampilkan Daftar Game Menu",
          id: `.gamemenu`, 
        },
        {
          title: "Download Menu",
          description: "Menampilkan Daftar Menu Download",
          id: `.downloadmenu`, 
        },
        {
          title: "AI Menu",
          description: "Menampilkan Daftar Menu Group",
          id: `.aimenu`, 
        },
        {
          title: "Other Menu",
          description: "Menampilkan Daftar Menu Other",
          id: `.othermenu`, 
        },
        {
          title: "Tools Menu",
          description: "Menampilkan Daftar Menu Tools",
          id: `.toolsmenu`, 
        },
      ]
    },
    {
      title: `Dokumentasi asli dari script ini`, 
      highlight_label: ``,
      rows: [
        {
          title: "Script",
          description: "💳 script ini gratis 100%",
          id: `.script`, 
        },
        {
          title: "Info Bot",
          description: "📋 Informasi total fitur dan lainnya",
          id: `.infobot`, 
        },
      ]
    }
  ]
}
await sendNanoButtonMenu(m.chat, teks, bet, m)
}
await satanic.sendMessage(from, { audio: { url: global.audio} , mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break
 case 'searchmenu': { 
  satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }})
let teks = (`
> hai ${pushname}, salam dari Lumakara ⚡

┌─❑ SEARCH MENU ❑ 
├⟤ ${prefix}pinterest
├⟤ ${prefix}alquran
├⟤ ${prefix}murotal
├⟤ ${prefix}bingimage
├⟤ ${prefix}ytsearch
├⟤ ${prefix}npmsearch
├⟤ ${prefix}ttsearch
├⟤ ${prefix}spotifysearch 
├⟤ ${prefix}applemusic
├⟤ ${prefix}capcutsearch
├⟤ ${prefix}snackvideosearch
├⟤ ${prefix}soundcloudsearch 
├⟤ ${prefix}xnxxsearch
├⟤ ${prefix}xvideosearch
├⟤ ${prefix}xvideodl
├⟤ ${prefix}xnxxdl 
├⟤ ${prefix}sixtynine 
├⟤ ${prefix}pussy 
├⟤ ${prefix}dick 
├⟤ ${prefix}anal 
├⟤ ${prefix}boobs 
├⟤ ${prefix}bdsm
├⟤ ${prefix}black 
├⟤ ${prefix}easter 
├⟤ ${prefix}bottomless 
├⟤ ${prefix}blowjub 
├⟤ ${prefix}collared 
├⟤ ${prefix}cum 
├⟤ ${prefix}cumsluts 
├⟤ ${prefix}dp 
├⟤ ${prefix}dom 
├⟤ ${prefix}extreme 
├⟤ ${prefix}feet 
├⟤ ${prefix}finger 
├⟤ ${prefix}fuck 
├⟤ ${prefix}futa 
├⟤ ${prefix}gay 
├⟤ ${prefix}gif 
├⟤ ${prefix}group 
├⟤ ${prefix}hentai 
├⟤ ${prefix}kiss 
├⟤ ${prefix}lesbian 
├⟤ ${prefix}lick 
├⟤ ${prefix}pegged 
├⟤ ${prefix}phgif 
├⟤ ${prefix}puffies 
├⟤ ${prefix}real 
├⟤ ${prefix}suck 
├⟤ ${prefix}tattoo 
├⟤ ${prefix}tiny 
├⟤ ${prefix}toys
├⟤ ${prefix}xmas
├⟤ ${prefix}bluearchiver
├⟤ ${prefix}china
├⟤ ${prefix}indo
├⟤ ${prefix}waifu
├⟤ ${prefix}neko
├⟤ ${prefix}vietnam
├⟤ ${prefix}thailand
├⟤ ${prefix}korea
├⟤ ${prefix}japan
├⟤ ${prefix}animepat
├⟤ ${prefix}animeslap
├⟤ ${prefix}animecuddle
├⟤ ${prefix}animenom
├⟤ ${prefix}animefoxgirl
├⟤ ${prefix}animetickle
├⟤ ${prefix}animegecg
├⟤ ${prefix}dogwoof
├⟤ ${prefix}8ballpool
├⟤ ${prefix}goosebird
├⟤ ${prefix}animefeed
├⟤ ${prefix}animeavatar
├⟤ ${prefix}lizardpic
├⟤ ${prefix}catmeow
├⟤ ${prefix}animewlp
├⟤ ${prefix}animehug
├⟤ ${prefix}animekiss
└─❑ SEARCH MENU ❑ 


`);
const bet = {
  title: "DAFTAR MENU",
  sections: [
    {
      title: `Akses Cepat`, 
      highlight_label: `Recommended`,
      rows: [
        {
          title: "⚡ All Menu",
          description: "Lihat semua fitur satanicID",
          id: `allmenu`, 
        },
      ]
    },
    {
      title: `Kategori Fitur`, 
      highlight_label: ``,
      rows: [
        {
          title: "Group Menu",
          description: "Menampilkan Daftar group Menu",
          id: `.groupmenu`, 
        },
        {
          title: "Search Menu",
          description: "Menampilkan Daftar Search Menu",
          id: `.searchmenu`, 
        },
        {
          title: "Owner Menu",
          description: "Menampilkan Daftar Owner Menu",
          id: `.ownermenu`, 
        },
        {
          title: "Stalk Menu",
          description: "Menampilkan Daftar Stalking menu",
          id: `.stalkmenu`, 
        },
        {
          title: "Game Menu",
          description: "Menampilkan Daftar Game Menu",
          id: `.gamemenu`, 
        },
        {
          title: "Download Menu",
          description: "Menampilkan Daftar Menu Download",
          id: `.downloadmenu`, 
        },
        {
          title: "AI Menu",
          description: "Menampilkan Daftar Menu Group",
          id: `.aimenu`, 
        },
        {
          title: "Tools Menu",
          description: "Menampilkan Daftar Menu Tools",
          id: `.toolsmenu`, 
        },
      ]
    },
    {
      title: `Dokumentasi asli dari script ini`, 
      highlight_label: ``,
      rows: [
        {
          title: "Script",
          description: "💳 script ini gratis 100%",
          id: `.script`, 
        },
        {
          title: "Info Bot",
          description: "📋 Informasi total fitur dan lainnya",
          id: `.infobot`, 
        },
      ]
    }
  ]
}
await sendNanoButtonMenu(m.chat, teks, bet, m)
}
await satanic.sendMessage(from, { audio: { url: global.audio} , mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break
case 'ownermenu': { 
  satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }})
let teks = (`
> hai ${pushname}, salam dari Lumakara ⚡


┌─❑ OWNER MENU ❑ 
├⟤ ${prefix}self
├⟤ ${prefix}public
├⟤ ${prefix}npm
├⟤ ${prefix}autotyping
├⟤ ${prefix}autoread
├⟤ ${prefix}addcase
├⟤ ${prefix}delcase
├⟤ ${prefix}editcase
├⟤ ${prefix}getcase
├⟤ ${prefix}block
├⟤ ${prefix}unblock
├⟤ ${prefix}autoreadsw
├⟤ ${prefix}addprem
├⟤ ${prefix}delprem
├⟤ ${prefix}listprem
├⟤ ${prefix}statusgrup
├⟤ ${prefix}setppch
├⟤ ${prefix}setnamech
├⟤ ${prefix}spamvc
├⟤ ${prefix}spamcall
├⟤ ${prefix}joingc
├⟤ ${prefix}leavegc
├⟤ ${prefix}setdeskch
├⟤ ${prefix}followch
├⟤ ${prefix}untollowch
├⟤ ${prefix}delppch
├⟤ ${prefix}createch
├⟤ ${prefix}addgb
├⟤ ${prefix}delgb
├⟤ ${prefix}autojoingc
├⟤ ${prefix}upch
├⟤ ${prefix}spamcall
├⟤ ${prefix}spamvc
├⟤ ${prefix}setppbot
├⟤ ${prefix}setppbot
├⟤ ${prefix}addproduk
├⟤ ${prefix}delproduk
├⟤ ${prefix}batalorder
├⟤ ${prefix}confirm
├⟤ ${prefix}listproduk
├⟤ ${prefix}approve
├⟤ ${prefix}reject
├⟤ ${prefix}addsewa
├⟤ ${prefix}delsewa
├⟤ ${prefix}clersession
├⟤ ${prefix}listsewa
├⟤ ${prefix}delsewa
├⟤ ${prefix}ceksewa
├⟤ ${prefix}setdone
├⟤ ${prefix}changedone
├⟤ ${prefix}delsetdone
├⟤ ${prefix}done
├⟤ ${prefix}proses
├⟤ ${prefix}setproses
├⟤ ${prefix}changeproses
├⟤ ${prefix}delsetproses
├⟤ ${prefix}addlimit
├⟤ ${prefix}dellimit
├⟤ ${prefix}ceklimit
├⟤ ${prefix}addsaldo
├⟤ ${prefix}delsaldo
├⟤ ${prefix}resetregister
├⟤ ${prefix}resetdb
├⟤ ${prefix}listuserregister
├⟤ ${prefix}delallregister
├⟤ ${prefix}hapususerregister
├⟤ ${prefix}hapususerdb
├⟤ ${prefix}backupsc
├⟤ ${prefix}clearchat
├⟤ ${prefix}pinchat
├⟤ ${prefix}unpinchat
├⟤ ${prefix}updatelist
├⟤ ${prefix}upswteks
├⟤ ${prefix}upswvideo
├⟤ ${prefix}upswaudio
├⟤ ${prefix}upswimg
├⟤ ${prefix}colongsw
└─❑ OWNER MENU ❑ 

`);
const bet = {
  title: "DAFTAR MENU",
  sections: [
    {
      title: `Akses Cepat`, 
      highlight_label: `Recommended`,
      rows: [
        {
          title: "⚡ All Menu",
          description: "Lihat semua fitur satanicID",
          id: `.allmenu`, 
        },
      ]
    },
    {
      title: `Kategori Fitur`, 
      highlight_label: ``,
      rows: [
        {
          title: "Group Menu",
          description: "Menampilkan Daftar group Menu",
          id: `.groupmenu`, 
        },
        {
          title: "Search Menu",
          description: "Menampilkan Daftar Search Menu",
          id: `.searchmenu`, 
        },
        {
          title: "Owner Menu",
          description: "Menampilkan Daftar Owner Menu",
          id: `.ownermenu`, 
        },
        {
          title: "Stalk Menu",
          description: "Menampilkan Daftar Stalking menu",
          id: `.stalkmenu`, 
        },
        {
          title: "Game Menu",
          description: "Menampilkan Daftar Game Menu",
          id: `.gamemenu`, 
        },
        {
          title: "Download Menu",
          description: "Menampilkan Daftar Menu Download",
          id: `.downloadmenu`, 
        },
        {
          title: "AI Menu",
          description: "Menampilkan Daftar Menu Group",
          id: `.aimenu`, 
        },
        {
          title: "Other Menu",
          description: "Menampilkan Daftar Menu Other",
          id: `.othermenu`, 
        },
        {
          title: "Tools Menu",
          description: "Menampilkan Daftar Menu Tools",
          id: `.toolsmenu`, 
        },
      ]
    },
    {
      title: `Dokumentasi asli dari script ini`, 
      highlight_label: ``,
      rows: [
        {
          title: "Script",
          description: "💳 script ini gratis 100%",
          id: `.script`, 
        },
        {
          title: "Info Bot",
          description: "📋 Informasi total fitur dan lainnya",
          id: `.infobot`, 
        },
      ]
    }
  ]
}
await sendNanoButtonMenu(m.chat, teks, bet, m)
}
await satanic.sendMessage(from, { audio: { url: global.audio} , mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break
case 'bot':
reply(`hai saya adalah ${global.namaBot} ada yang bisa saya bantu kak`)
break
case 'stalkmenu': { 
  satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }})
let teks = (`
> hai ${pushname}, salam dari Lumakara ⚡

┌─❑ STALK MENU ❑ 
├⟤ ${prefix}igstalk
├⟤ ${prefix}ttstalk
├⟤ ${prefix}ffstalk
├⟤ ${prefix}twstalk
├⟤ ${prefix}robloxstalk
├⟤ ${prefix}ghstalk
├⟤ ${prefix}npmstalk
├⟤ ${prefix}ytstalk
└──❑ STALK MENU ❑ 

`);
const bet = {
  title: "DAFTAR MENU",
  sections: [
    {
      title: `Akses Cepat`, 
      highlight_label: `Recommended`,
      rows: [
        {
          title: "⚡ All Menu",
          description: "Lihat semua fitur satanicID",
          id: `.allmenu`, 
        },
      ]
    },
    {
      title: `Kategori Fitur`, 
      highlight_label: ``,
      rows: [
        {
          title: "Group Menu",
          description: "Menampilkan Daftar group Menu",
          id: `.groupmenu`, 
        },
        {
          title: "Search Menu",
          description: "Menampilkan Daftar Search Menu",
          id: `.searchmenu`, 
        },
        {
          title: "Owner Menu",
          description: "Menampilkan Daftar Owner Menu",
          id: `.ownermenu`, 
        },
        {
          title: "Stalk Menu",
          description: "Menampilkan Daftar Stalking menu",
          id: `.stalkmenu`, 
        },
        {
          title: "Game Menu",
          description: "Menampilkan Daftar Game Menu",
          id: `.gamemenu`, 
        },
        {
          title: "Download Menu",
          description: "Menampilkan Daftar Menu Download",
          id: `.downloadmenu`, 
        },
        {
          title: "AI Menu",
          description: "Menampilkan Daftar Menu Group",
          id: `.aimenu`, 
        },
        {
          title: "Other Menu",
          description: "Menampilkan Daftar Menu Other",
          id: `.othermenu`, 
        },
        {
          title: "Tools Menu",
          description: "Menampilkan Daftar Menu Tools",
          id: `.toolsmenu`, 
        },
      ]
    },
    {
      title: `Dokumentasi asli dari script ini`, 
      highlight_label: ``,
      rows: [
        {
          title: "Script",
          description: "💳 script ini gratis 100%",
          id: `.script`, 
        },
        {
          title: "Info Bot",
          description: "📋 Informasi total fitur dan lainnya",
          id: `.infobot`, 
        },
        
      ]
    }
  ]
}
await sendNanoButtonMenu(m.chat, teks, bet, m)
}
await satanic.sendMessage(from, { audio: { url: global.audio} , mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break
case 'othermenu': { 
  satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }})
let teks = (`
> hai ${pushname}, salam dari Lumakara ⚡

┌─❑ OTHER MENU ❑
├⟤ ${prefix}jpm
├⟤ ${prefix}jpmstatus
├⟤ ${prefix}sewabot
├⟤ ${prefix}report
├⟤ ${prefix}rules
├⟤ ${prefix}qris
├⟤ ${prefix}register
├⟤ ${prefix}unregister 
├⟤ ${prefix}ceklimit
├⟤ ${prefix}ceksaldo
├⟤ ${prefix}payment
├⟤ ${prefix}claimlimit
├⟤ ${prefix}claimsaldo
├⟤ ${prefix}pushkontak
├⟤ ${prefix}pushkontakv2
├⟤ ${prefix}pushkontakv3
├⟤ ${prefix}pushkontakv4
├⟤ ${prefix}randomhentai
├⟤ ${prefix}randomwaifu
├⟤ ${prefix}artinama
├⟤ ${prefix}artimimpi
├⟤ ${prefix}ramaljodoh
├⟤ ${prefix}ramaljodohbali
├⟤ ${prefix}ramalcinta
├⟤ ${prefix}cocoknama
├⟤ ${prefix}pasangan
├⟤ ${prefix}suamiistri
├⟤ ${prefix}jadiannikah
├⟤ ${prefix}sifatusaha
├⟤ ${prefix}rezeki
├⟤ ${prefix}pekerjaan
├⟤ ${prefix}nasib
├⟤ ${prefix}penyakit
├⟤ ${prefix}tarot
├⟤ ${prefix}fengshui
├⟤ ${prefix}haribaik
├⟤ ${prefix}harisangar
├⟤ ${prefix}harisial
├⟤ ${prefix}nagahari
├⟤ ${prefix}arahrezeki
├⟤ ${prefix}peruntungan
├⟤ ${prefix}weton
├⟤ ${prefix}karakter
├⟤ ${prefix}keberuntungan
├⟤ ${prefix}memancing
├⟤ ${prefix}masabubur
├⟤ ${prefix}zodiak
├⟤ ${prefix}shio
└─❑ OTHER MENU ❑ 
`);
const bet = {
  title: "DAFTAR MENU",
  sections: [
    {
      title: `Akses Cepat`, 
      highlight_label: `Recommended`,
      rows: [
        {
          title: "⚡ All Menu",
          description: "Lihat semua fitur satanicID",
          id: `.allmenu`, 
        },
      ]
    },
    {
      title: `Kategori Fitur`, 
      highlight_label: ``,
      rows: [
        {
          title: "Group Menu",
          description: "Menampilkan Daftar group Menu",
          id: `.groupmenu`, 
        },
        {
          title: "Search Menu",
          description: "Menampilkan Daftar Search Menu",
          id: `.searchmenu`, 
        },
        {
          title: "Owner Menu",
          description: "Menampilkan Daftar Owner Menu",
          id: `.ownermenu`, 
        },
        {
          title: "Stalk Menu",
          description: "Menampilkan Daftar Stalking menu",
          id: `.stalkmenu`, 
        },
        {
          title: "Game Menu",
          description: "Menampilkan Daftar Game Menu",
          id: `.gamemenu`, 
        },
        {
          title: "Download Menu",
          description: "Menampilkan Daftar Menu Download",
          id: `.downloadmenu`, 
        },
        {
          title: "AI Menu",
          description: "Menampilkan Daftar Menu Group",
          id: `.aimenu`, 
        },
        {
          title: "Other Menu",
          description: "Menampilkan Daftar Menu Other",
          id: `.othermenu`, 
        },
        {
          title: "Tools Menu",
          description: "Menampilkan Daftar Menu Tools",
          id: `.toolsmenu`, 
        },
      ]
    },
    {
      title: `Dokumentasi asli dari script ini`, 
      highlight_label: ``,
      rows: [
        {
          title: "Script",
          description: "💳 script ini gratis 100%",
          id: `.script`, 
        },
        {
          title: "Info Bot",
          description: "📋 Informasi total fitur dan lainnya",
          id: `.infobot`, 
        },
        
      ]
    }
  ]
}
await sendNanoButtonMenu(m.chat, teks, bet, m)
}
await satanic.sendMessage(from, { audio: { url: global.audio} , mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break
case 'gamemenu': { 
  satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }})
let teks = (`
> hai ${pushname}, salam dari Lumakara ⚡

┌─❑ GAME MENU ❑ 
├⟤ ${prefix}truth
├⟤ ${prefix}dare
├⟤ ${prefix}ceksifat
├⟤ ${prefix}asahotak
├⟤ ${prefix}tekateki
├⟤ ${prefix}siapaaku
├⟤ ${prefix}mathquiz
├⟤ ${prefix}family100
├⟤ ${prefix}caklontong
├⟤ ${prefix}tebakgambar
├⟤ ${prefix}tebakkata 
├⟤ ${prefix}tebaktebakan
├⟤ ${prefix}tebakkimia
├⟤ ${prefix}ulartangga
├⟤ ${prefix}tictactoe
├⟤ ${prefix}tebakbom
├⟤ ${prefix}cekkodam
├⟤ ${prefix}yatim
├⟤ ${prefix}piatu
├⟤ ${prefix}jomblo
├⟤ ${prefix}waria
├⟤ ${prefix}koruptor
├⟤ ${prefix}psikopat
├⟤ ${prefix}pedofil
├⟤ ${prefix}miskin
├⟤ ${prefix}tukangjajan
├⟤ ${prefix}jelek
├⟤ ${prefix}mokondo
├⟤ ${prefix}penipu
├⟤ ${prefix}tukangcopet
├⟤ ${prefix}tukangbo
├⟤ ${prefix}tukangcoli
├⟤ ${prefix}tukangkawin
├⟤ ${prefix}ganteng
├⟤ ${prefix}cantik
├⟤ ${prefix}tobrut
├⟤ ${prefix}kurus
├⟤ ${prefix}maling
├⟤ ${prefix}kontolgede
├⟤ ${prefix}tepos
├⟤ ${prefix}pelakor
├⟤ ${prefix}jomblo
├⟤ ${prefix}korbanhts
├⟤ ${prefix}badut
├⟤ ${prefix}perampok
├⟤ ${prefix}begal
├⟤ ${prefix}wibu
├⟤ ${prefix}janda
├⟤ ${prefix}jodohku 
├⟤ ${prefix}cekyatim
├⟤ ${prefix}cekjelek
├⟤ ${prefix}cekjodoh
├⟤ ${prefix}cekmemek
├⟤ ${prefix}cekkontol
├⟤ ${prefix}cekmiskin
├⟤ ${prefix}cekkaya
├⟤ ${prefix}cektolol
├⟤ ${prefix}ceknamabapak
├⟤ ${prefix}cekwibu
├⟤ ${prefix}dapatkah
├⟤ ${prefix}apakah
├⟤ ${prefix}bagaimana 
├⟤ ${prefix}rate
├⟤ ${prefix}when
├⟤ ${prefix}menfess
├⟤ ${prefix}mancing
├⟤ ${prefix}aduayam
├⟤ ${prefix}tebakangkatogel
├⟤ ${prefix}balapkarung
├⟤ ${prefix}tariktambang
├⟤ ${prefix}tebakkarturemi
├⟤ ${prefix}balaplari
├⟤ ${prefix}rolling
├⟤ ${prefix}investasi 
├⟤ ${prefix}renang
├⟤ ${prefix}balasmenfess
├⟤ ${prefix}stopmenfess
├⟤ ${prefix}tolakmenfess
└─❑ GAME MENU ❑ 

`);
const bet = {
  title: "DAFTAR MENU",
  sections: [
    {
      title: `Akses Cepat`, 
      highlight_label: `Recommended`,
      rows: [
        {
          title: "⚡ All Menu",
          description: "Lihat semua fitur satanicID",
          id: `.allmenu`, 
        },
      ]
    },
    {
      title: `Kategori Fitur`, 
      highlight_label: ``,
      rows: [
        {
          title: "Group Menu",
          description: "Menampilkan Daftar group Menu",
          id: `.groupmenu`, 
        },
        {
          title: "Search Menu",
          description: "Menampilkan Daftar Search Menu",
          id: `.searchmenu`, 
        },
        {
          title: "Owner Menu",
          description: "Menampilkan Daftar Owner Menu",
          id: `.ownermenu`, 
        },
        {
          title: "Stalk Menu",
          description: "Menampilkan Daftar Stalking menu",
          id: `.stalkmenu`, 
        },
        {
          title: "Game Menu",
          description: "Menampilkan Daftar Game Menu",
          id: `.gamemenu`, 
        },
        {
          title: "Download Menu",
          description: "Menampilkan Daftar Menu Download",
          id: `.downloadmenu`, 
        },
        {
          title: "AI Menu",
          description: "Menampilkan Daftar Menu Group",
          id: `.aimenu`, 
        }, 
        {
          title: "Other Menu",
          description: "Menampilkan Daftar Menu Other",
          id: `.othermenu`, 
        },
        {
          title: "Tools Menu",
          description: "Menampilkan Daftar Menu Tools",
          id: `.toolsmenu`, 
        },
      ]
    },
    {
      title: `Dokumentasi asli dari script ini`, 
      highlight_label: ``,
      rows: [
        {
          title: "Script",
          description: "💳 script ini gratis 100%",
          id: `.script`, 
        },
        {
          title: "Info Bot",
          description: "📋 Informasi total fitur dan lainnya",
          id: `.infobot`, 
        },        
      ]
    }
  ]
}
await sendNanoButtonMenu(m.chat, teks, bet, m)
}
await satanic.sendMessage(from, { audio: { url: global.audio} , mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break
case 'leavegc': {
if (!isCreator) return 
await satanic.groupLeave(m.chat)
await reply(`*[ Done ]*`)
            }
break
case 'downloadmenu': { 
  satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }})
let teks = (`
> hai ${pushname}, salam dari Lumakara ⚡

┌──❑ DOWNLOAD MENU ❑ 
├⟤ ${prefix}ig
├⟤ ${prefix}ttdl
├⟤ ${prefix}fbdl
├⟤ ${prefix}play
├⟤ ${prefix}igslide
├⟤ ${prefix}ttslide
├⟤ ${prefix}igmp3 
├⟤ ${prefix}ttmp3
├⟤ ${prefix}ytmp4
├⟤ ${prefix}ytmp3
├⟤ ${prefix}videy
├⟤ ${prefix}threads
├⟤ ${prefix}spotify
├⟤ ${prefix}terabox
├⟤ ${prefix}capcut
├⟤ ${prefix}mediafire
├⟤ ${prefix}gitclone
├⟤ ${prefix}cocofun
├⟤ ${prefix}scdl
├⟤ ${prefix}snackvideo
├⟤ ${prefix}applemusicdl
└─❑ DOWNLOAD MENU ❑ 

`);
const bet = {
  title: "DAFTAR MENU",
  sections: [
    {
      title: `Akses Cepat`, 
      highlight_label: `Recommended`,
      rows: [
        {
          title: "⚡ All Menu",
          description: "Lihat semua fitur satanicID",
          id: `.allmenu`, 
        },
      ]
    },
    {
      title: `Kategori Fitur`, 
      highlight_label: ``,
      rows: [
        {
          title: "Group Menu",
          description: "Menampilkan Daftar group Menu",
          id: `.groupmenu`, 
        },
        {
          title: "Search Menu",
          description: "Menampilkan Daftar Search Menu",
          id: `.searchmenu`, 
        },
        {
          title: "Owner Menu",
          description: "Menampilkan Daftar Owner Menu",
          id: `.ownermenu`, 
        },
        {
          title: "Stalk Menu",
          description: "Menampilkan Daftar Stalking menu",
          id: `.stalkmenu`, 
        },
        {
          title: "Game Menu",
          description: "Menampilkan Daftar Game Menu",
          id: `.gamemenu`, 
        },
        {
          title: "Download Menu",
          description: "Menampilkan Daftar Menu Download",
          id: `.downloadmenu`, 
        },
        {
          title: "AI Menu",
          description: "Menampilkan Daftar Menu Group",
          id: `.aimenu`, 
        },
        {
          title: "Tools Menu",
          description: "Menampilkan Daftar Menu Tools",
          id: `.toolsmenu`, 
        },
      ]
    },
    {
      title: `Dokumentasi asli dari script ini`, 
      highlight_label: ``,
      rows: [
        {
          title: "Script",
          description: "💳 script ini gratis 100%",
          id: `.script`, 
        },
        {
          title: "Info Bot",
          description: "📋 Informasi total fitur dan lainnya",
          id: `.infobot`, 
        },
      ]
    }
  ]
}
await sendNanoButtonMenu(m.chat, teks, bet, m)
}
await satanic.sendMessage(from, { audio: { url: global.audio} , mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break
 case 'install':
case 'npm': {
if (!isCreator) return 
if (!text) return reply(`Mau install module apa?\nContoh: ${prefix + command} axios`)
reply(`⏳ Sedang menginstall module *${text}*...\nMohon tunggu, bot akan restart otomatis jika berhasil.`)
    require('child_process').exec(`npm install ${text}`, (err, stdout, stderr) => {
        if (err) {
return reply(`❌ Gagal menginstall module: ${err.message}`)
        }
        satanic.sendMessage(m.chat, { 
            text: `✅ Sukses install *${text}*!\n\n📝 Output:\n${stdout}\n\n♻️ Bot sedang merestart sistem...` 
        }, { quoted: fkontak }).then(() => {
            setTimeout(() => {
                process.exit()
            }, 3000)
        })
    })
}
break        

case 'aimenu': { 
  satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }})
let teks = (`
> hai ${pushname}, salam dari Lumakara ⚡

┌──❑ AI MENU ❑ 
├⟤ ${prefix}ai
├⟤ ${prefix}felo
├⟤ ${prefix}gita
├⟤ ${prefix}aqua
├⟤ ${prefix}qwen
├⟤ ${prefix}claude
├⟤ ${prefix}claude-45
├⟤ ${prefix}glm47
├⟤ ${prefix}kimi-vision
├⟤ ${prefix}meta-ai
├⟤ ${prefix}deepseek-pro
├⟤ ${prefix}gpt-oss2b 
├⟤ ${prefix}nanobanana2
├⟤ ${prefix}editimg
├⟤ ${prefix}gpt5
├⟤ ${prefix}jokowiai
├⟤ ${prefix}prabowoai
├⟤ ${prefix}gemini
├⟤ ${prefix}chatai
├⟤ ${prefix}openai
├⟤ ${prefix}epsilon
├⟤ ${prefix}copilot
├⟤ ${prefix}webpilot
├⟤ ${prefix}deepseek
├⟤ ${prefix}illama-code
├⟤ ${prefix}illama-vision
├⟤ ${prefix}text2img
├⟤ ${prefix}texttoimg
├⟤ ${prefix}flux-schnell
├⟤ ${prefix}gpt-5.1
├⟤ ${prefix}gpt-5-online
├⟤ ${prefix}gpt-5
├⟤ ${prefix}gpt-5-nano
├⟤ ${prefix}gpt-5-mini
├⟤ ${prefix}openai-o1
├⟤ ${prefix}openai-o3
├⟤ ${prefix}openai-o3-mini
├⟤ ${prefix}gpt-4o
├⟤ ${prefix}openai-o4-mini
├⟤ ${prefix}gpt-4.1-mini
├⟤ ${prefix}gpt-4.1-nano
├⟤ ${prefix}gpt-5.3
├⟤ ${prefix}gpt-5.4
├⟤ ${prefix}gpt-5.5 
├⟤ ${prefix}img2img
├⟤ ${prefix}talkingphoto
├⟤ ${prefix}removecloth 
├⟤ ${prefix}nanobanana
├⟤ ${prefix}gpt2image
├⟤ ${prefix}jadipresiden
├⟤ ${prefix}jadibugil
├⟤ ${prefix}jadianime
├⟤ ${prefix}jadizombie
├⟤ ${prefix}jadibiliard
├⟤ ${prefix}jadifigure
├⟤ ${prefix}jadimacbook
├⟤ ${prefix}texttovideo
├⟤ ${prefix}tosad
├⟤ ${prefix}tosatan
├⟤ ${prefix}tosdmtinggi
├⟤ ${prefix}toreal
├⟤ ${prefix}tomoai
├⟤ ${prefix}tomaya
├⟤ ${prefix}tolego
├⟤ ${prefix}tokamboja
├⟤ ${prefix}tokacamata
├⟤ ${prefix}tojepang
├⟤ ${prefix}nanobananapro
├⟤ ${prefix}toghibli
├⟤ ${prefix}todubai
├⟤ ${prefix}todpr
├⟤ ${prefix}totua
├⟤ ${prefix}tohitam
├⟤ ${prefix}totato
├⟤ ${prefix}topeci
├⟤ ${prefix}tovintage
├⟤ ${prefix}topolaroid
├⟤ ${prefix}tochibi
├⟤ ${prefix}tobrewok
├⟤ ${prefix}tobabi
├⟤ ${prefix}tofigura
├⟤ ${prefix}tofigurav2
├⟤ ${prefix}tofigurav3
├⟤ ${prefix}topacar
├⟤ ${prefix}topacarv2
├⟤ ${prefix}tozombie
├⟤ ${prefix}topenjara
├⟤ ${prefix}tojapanese
├⟤ ${prefix}toblonde
├⟤ ${prefix}tobotak
├⟤ ${prefix}tohijab
├⟤ ${prefix} topejabat
├⟤ ${prefix}tokah
├⟤ ${prefix}tomirror
├⟤ ${prefix}toanime
└──❑ AI MENU ❑ 

`);
const bet = {
  title: "DAFTAR MENU",
  sections: [
    {
      title: `Akses Cepat`, 
      highlight_label: `Recommended`,
      rows: [
        {
          title: "⚡ All Menu",
          description: "Lihat semua fitur satanicID",
          id: `.allmenu`, 
        },
      ]
    },
    {
      title: `Kategori Fitur`, 
      highlight_label: ``,
      rows: [
        {
          title: "Group Menu",
          description: "Menampilkan Daftar group Menu",
          id: `.groupmenu`, 
        },
        {
          title: "Search Menu",
          description: "Menampilkan Daftar Search Menu",
          id: `.searchmenu`, 
        },
        {
          title: "Owner Menu",
          description: "Menampilkan Daftar Owner Menu",
          id: `.ownermenu`, 
        },
        {
          title: "Stalk Menu",
          description: "Menampilkan Daftar Stalking menu",
          id: `.stalkmenu`, 
        },
        {
          title: "Game Menu",
          description: "Menampilkan Daftar Game Menu",
          id: `.gamemenu`, 
        },
        {
          title: "Download Menu",
          description: "Menampilkan Daftar Menu Download",
          id: `.downloadmenu`, 
        },
        {
          title: "AI Menu",
          description: "Menampilkan Daftar Menu Group",
          id: `.aimenu`, 
        },
        {
          title: "Tools Menu",
          description: "Menampilkan Daftar Menu Tools",
          id: `.toolsmenu`, 
        },
      ]
    },
    {
      title: `Dokumentasi asli dari script ini`, 
      highlight_label: ``,
      rows: [
        {
          title: "Script",
          description: "💳 script ini gratis 100%",
          id: `.script`, 
        },
        {
          title: "Info Bot",
          description: "📋 Informasi total fitur dan lainnya",
          id: `.infobot`, 
        },
      ]
    }
  ]
}
await sendNanoButtonMenu(m.chat, teks, bet, m)
}
await satanic.sendMessage(from, { audio: { url: global.audio} , mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break
case 'toolsmenu': { 
  satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }})
let teks = (`
> hai ${pushname}, salam dari Lumakara ⚡

┌──❑ TOOLS MENU ❑ 
├⟤ ${prefix}hd
├⟤ ${prefix}Ocr
├⟤ ${prefix}esrgan
├⟤ ${prefix}cekresi
├⟤ ${prefix}hdvid
├⟤ ${prefix}google
├⟤ ${prefix}tourl
├⟤ ${prefix}tourl2
├⟤ ${prefix}ssweb
├⟤ ${prefix}translate
├⟤ ${prefix}kodepos
├⟤ ${prefix}removebg
├⟤ ${prefix}removebg2
├⟤ ${prefix}skiplink
├⟤ ${prefix}brat
├⟤ ${prefix}bratbahlil
├⟤ ${prefix}brathd
├⟤ ${prefix}pakustad
├⟤ ${prefix}bratcewe
├⟤ ${prefix}bratpatrick
├⟤ ${prefix}emojimix
├⟤ ${prefix}attp
├⟤ ${prefix}bratsquidward
├⟤ ${prefix}animebrat
├⟤ ${prefix}bratvid
├⟤ ${prefix}smeme
├⟤ ${prefix}iqc
├⟤ ${prefix}translate
├⟤ ${prefix}kalkulator
├⟤ ${prefix}qc
├⟤ ${prefix}fakedana
├⟤ ${prefix}fakebangjago
├⟤ ${prefix}fakedana
├⟤ ${prefix}fakeovo
├⟤ ${prefix}balogo
├⟤ ${prefix}fakegopay
├⟤ ${prefix}fakeff
├⟤ ${prefix}fakektp
├⟤ ${prefix}ceknik
├⟤ ${prefix}whatmusic
├⟤ ${prefix}carbonify
├⟤ ${prefix}tts 
├⟤ ${prefix}texttospeech 
├⟤ ${prefix}say
├⟤ ${prefix}ttsgoku 
├⟤ ${prefix}ttseminem 
├⟤ ${prefix}ttsmickey
├⟤ ${prefix}ttsnahida
├⟤ ${prefix}ttselon 
├⟤ ${prefix}ttsoptimus
├⟤ ${prefix}sticker
├⟤ ${prefix}toimg
├⟤ ${prefix}tomp3
├⟤ ${prefix}tomp4
├⟤ ${prefix}togif
├⟤ ${prefix}tovideo
├⟤ ${prefix}toptv
├⟤ ${prefix}bass 
├⟤ ${prefix}blown 
├⟤ ${prefix}deep 
├⟤ ${prefix}earrape 
├⟤ ${prefix}fast 
├⟤ ${prefix}fat 
├⟤ ${prefix}nightcore 
├⟤ ${prefix}reverse 
├⟤ ${prefix}robot
├⟤ ${prefix}slow  
├⟤ ${prefix}smooth 
├⟤ ${prefix}squirrel
└──❑ TOOLS MENU ❑ 
`);
const bet = {
  title: "DAFTAR MENU",
  sections: [
    {
      title: `Akses Cepat`, 
      highlight_label: `Recommended`,
      rows: [
        {
          title: "⚡ All Menu",
          description: "Lihat semua fitur satanicID",
          id: `.allmenu`, 
        },
      ]
    },
    {
      title: `Kategori Fitur`, 
      highlight_label: ``,
      rows: [
        {
          title: "Group Menu",
          description: "Menampilkan Daftar group Menu",
          id: `.groupmenu`, 
        },
        {
          title: "Search Menu",
          description: "Menampilkan Daftar Search Menu",
          id: `.searchmenu`, 
        },
        {
          title: "Owner Menu",
          description: "Menampilkan Daftar Owner Menu",
          id: `.ownermenu`, 
        },
        {
          title: "Stalk Menu",
          description: "Menampilkan Daftar Stalking menu",
          id: `.stalkmenu`, 
        },
        {
          title: "Game Menu",
          description: "Menampilkan Daftar Game Menu",
          id: `.gamemenu`, 
        },
        {
          title: "Download Menu",
          description: "Menampilkan Daftar Menu Download",
          id: `.downloadmenu`, 
        },
        {
          title: "AI Menu",
          description: "Menampilkan Daftar Menu Group",
          id: `.aimenu`, 
        },
        {
          title: "Tools Menu",
          description: "Menampilkan Daftar Menu Tools",
          id: `.toolsmenu`, 
        },
      ]
    },
    {
      title: `Dokumentasi asli dari script ini`, 
      highlight_label: ``,
      rows: [
        {
          title: "Script",
          description: "💳 script ini gratis 100%",
          id: `.script`, 
        },
        {
          title: "Info Bot",
          description: "📋 Informasi total fitur dan lainnya",
          id: `.infobot`, 
        },
      ]
    }
  ]
}
await sendNanoButtonMenu(m.chat, teks, bet, m)
}
await satanic.sendMessage(from, { audio: { url: global.audio} , mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break
case 'allmenu': {
    try {                  
        let txt = `> Halo ${pushname} saya adalah ${global.namaBot} asisten ${global.namaowner}, berikut daftar list menu yang tersedia dibawah ini 
        
┌─❑ GROUP MENU ❑ 
├⟤ ${prefix}add
├⟤ ${prefix}kick
├⟤ ${prefix}warn
├⟤ ${prefix}grup
├⟤ ${prefix}left <on/of>
├⟤ ${prefix}poll
├⟤ ${prefix}afk
├⟤ ${prefix}ban
├⟤ ${prefix}unban
├⟤ ${prefix}listban
├⟤ ${prefix}totag
├⟤ ${prefix}rvo
├⟤ ${prefix}getpp
├⟤ ${prefix}listpc
├⟤ ${prefix}listgc
├⟤ ${prefix}opentime
├⟤ ${prefix}closetime
├⟤ ${prefix}tagadmin
├⟤ ${prefix}editinfo
├⟤ ${prefix}reminder
├⟤ ${prefix}delete
├⟤ ${prefix}deletepesanbot
├⟤ ${prefix}tagall
├⟤ ${prefix}grup <open/close>
├⟤ ${prefix}promote
├⟤ ${prefix}welcome <on/of>
├⟤ ${prefix}demote
├⟤ ${prefix}listwarn
├⟤ ${prefix}delete
├⟤ ${prefix}resetwarn
├⟤ ${prefix}delwarn
├⟤ ${prefix}listonline
├⟤ ${prefix}mutegc
├⟤ ${prefix}requestjoin
├⟤ ${prefix}getppgc
├⟤ ${prefix}setname
├⟤ ${prefix}setppgc
├⟤ ${prefix}setdesk
├⟤ ${prefix}cekidch
├⟤ ${prefix}autoaigrup
├⟤ ${prefix}cekidgc
├⟤ ${prefix}antitagsw
├⟤ ${prefix}antilink
├⟤ ${prefix}hidetag
├⟤ ${prefix}reactch
├⟤ ${prefix}revoke
├⟤ ${prefix}linkgc
├⟤ ${prefix}upswgc
├⟤ ${prefix}promotenotif
├⟤ ${prefix}antibadword
├⟤ ${prefix}addbadword
├⟤ ${prefix}delbadword
├⟤ ${prefix}listbadword 
├⟤ ${prefix}demotenotif
├⟤ ${prefix}blacklist
├⟤ ${prefix}sider
├⟤ ${prefix}siderv2
├⟤ ${prefix}topmember
├⟤ ${prefix}unblacklist
├⟤ ${prefix}listblacklist
├⟤ ${prefix}addautogc
├⟤ ${prefix}delautogc
├⟤ ${prefix}listautogc
├⟤ ${prefix}autosholat 
├⟤ ${prefix}setwelcome
├⟤ ${prefix}changewelcome
├⟤ ${prefix}delsetwelcome
├⟤ ${prefix}setleft
├⟤ ${prefix}kickme
├⟤ ${prefix}changeleft
├⟤ ${prefix}setleft
├⟤ ${prefix}delsetleft
├⟤ ${prefix}cekapikey
└─❑ GROUP MENU ❑ 

┌─❑ AI MENU ❑ 
├⟤ ${prefix}ai
├⟤ ${prefix}felo
├⟤ ${prefix}gita
├⟤ ${prefix}aqua
├⟤ ${prefix}gpt5
├⟤ ${prefix}qwen
├⟤ ${prefix}claude
├⟤ ${prefix}claude-45
├⟤ ${prefix}glm47
├⟤ ${prefix}kimi-vision
├⟤ ${prefix}meta-ai
├⟤ ${prefix}deepseek-pro
├⟤ ${prefix}gpt-oss2b 
├⟤ ${prefix}nanobanana2
├⟤ ${prefix}editimg
├⟤ ${prefix}jokowiai
├⟤ ${prefix}prabowoai
├⟤ ${prefix}chatai
├⟤ ${prefix}openai
├⟤ ${prefix}epsilon
├⟤ ${prefix}copilot
├⟤ ${prefix}webpilot
├⟤ ${prefix}deepseek
├⟤ ${prefix}illama-code
├⟤ ${prefix}illama-vision
├⟤ ${prefix}text2img
├⟤ ${prefix}texttoimg
├⟤ ${prefix}flux-schnell
├⟤ ${prefix}gpt-5.1
├⟤ ${prefix}gpt-5-online
├⟤ ${prefix}gpt-5
├⟤ ${prefix}gpt-5-nano
├⟤ ${prefix}gpt-5-mini
├⟤ ${prefix}openai-o1
├⟤ ${prefix}openai-o3
├⟤ ${prefix}openai-o3-mini
├⟤ ${prefix}gpt-4o
├⟤ ${prefix}openai-o4-mini
├⟤ ${prefix}gpt-4.1-mini
├⟤ ${prefix}gpt-4.1-nano
├⟤ ${prefix}gpt-5.3
├⟤ ${prefix}gpt-5.4
├⟤ ${prefix}gpt-5.5 
├⟤ ${prefix}img2img
├⟤ ${prefix}talkingphoto
├⟤ ${prefix}removecloth 
├⟤ ${prefix}nanobanana
├⟤ ${prefix}gpt2image
├⟤ ${prefix}jadipresiden
├⟤ ${prefix}jadibugil
├⟤ ${prefix}jadianime
├⟤ ${prefix}jadizombie
├⟤ ${prefix}jadibiliard
├⟤ ${prefix}jadifigure
├⟤ ${prefix}jadimacbook
├⟤ ${prefix}texttovideo
├⟤ ${prefix}tosad
├⟤ ${prefix}tosatan
├⟤ ${prefix}tosdmtinggi
├⟤ ${prefix}toreal
├⟤ ${prefix}tomoai
├⟤ ${prefix}tomaya
├⟤ ${prefix}tolego
├⟤ ${prefix}tokamboja
├⟤ ${prefix}tokacamata
├⟤ ${prefix}tojepang
├⟤ ${prefix}nanobananapro
├⟤ ${prefix}toghibli
├⟤ ${prefix}todubai
├⟤ ${prefix}todpr
├⟤ ${prefix}totua
├⟤ ${prefix}tohitam
├⟤ ${prefix}totato
├⟤ ${prefix}topeci
├⟤ ${prefix}tovintage
├⟤ ${prefix}topolaroid
├⟤ ${prefix}tochibi
├⟤ ${prefix}tobrewok
├⟤ ${prefix}tobabi
├⟤ ${prefix}tofigura
├⟤ ${prefix}tofigurav2
├⟤ ${prefix}tofigurav3
├⟤ ${prefix}topacar
├⟤ ${prefix}topacarv2
├⟤ ${prefix}tozombie
├⟤ ${prefix}topenjara
├⟤ ${prefix}tojapanese
├⟤ ${prefix}toblonde
├⟤ ${prefix}tobotak
├⟤ ${prefix}tohijab
├⟤ ${prefix}topejabat
├⟤ ${prefix}tokah
├⟤ ${prefix}tomirror
├⟤ ${prefix}toanime
├⟤ ${prefix}agedetection 
└─❑ AI MENU ❑ 

┌─❑ DOWNLOAD ❑ 
├⟤ ${prefix}ig
├⟤ ${prefix}ttdl
├⟤ ${prefix}fbdl
├⟤ ${prefix}play
├⟤ ${prefix}igslide
├⟤ ${prefix}ttslide
├⟤ ${prefix}igmp3 
├⟤ ${prefix}ttmp3
├⟤ ${prefix}ytmp4
├⟤ ${prefix}ytmp3
├⟤ ${prefix}videy
├⟤ ${prefix}threads
├⟤ ${prefix}spotify
├⟤ ${prefix}terabox
├⟤ ${prefix}capcut
├⟤ ${prefix}mediafire
├⟤ ${prefix}gitclone
├⟤ ${prefix}cocofun
├⟤ ${prefix}scdl
├⟤ ${prefix}snackvideo
├⟤ ${prefix}applemusicdl
└─❑ DOWNLOAD ❑ 

┌─❑ TOOLS MENU ❑ 
├⟤ ${prefix}hd
├⟤ ${prefix}Ocr
├⟤ ${prefix}esrgan
├⟤ ${prefix}cekresi
├⟤ ${prefix}hdvid
├⟤ ${prefix}google
├⟤ ${prefix}tourl
├⟤ ${prefix}tourl2
├⟤ ${prefix}ssweb
├⟤ ${prefix}translate
├⟤ ${prefix}kodepos
├⟤ ${prefix}removebg
├⟤ ${prefix}removebg2
├⟤ ${prefix}skiplink
├⟤ ${prefix}brat
├⟤ ${prefix}bratbahlil
├⟤ ${prefix}brathd
├⟤ ${prefix}pakustad
├⟤ ${prefix}bratcewe
├⟤ ${prefix}bratpatrick
├⟤ ${prefix}emojimix
├⟤ ${prefix}attp
├⟤ ${prefix}bratsquidward
├⟤ ${prefix}animebrat
├⟤ ${prefix}bratvid
├⟤ ${prefix}smeme
├⟤ ${prefix}iqc
├⟤ ${prefix}translate
├⟤ ${prefix}kalkulator
├⟤ ${prefix}qc
├⟤ ${prefix}fakedana
├⟤ ${prefix}fakeovo
├⟤ ${prefix}fakegopay
├⟤ ${prefix}faketiktok
├⟤ ${prefix}struk
├⟤ ${prefix}fakebangjago
├⟤ ${prefix}fakeff
├⟤ ${prefix}fakektp
├⟤ ${prefix}ceknik
├⟤ ${prefix}whatmusic
├⟤ ${prefix}carbonify
├⟤ ${prefix}tts 
├⟤ ${prefix}texttospeech 
├⟤ ${prefix}say
├⟤ ${prefix}ttsgoku 
├⟤ ${prefix}ttseminem 
├⟤ ${prefix}ttsmickey
├⟤ ${prefix}ttsnahida
├⟤ ${prefix}ttselon 
├⟤ ${prefix}ttsoptimus
├⟤ ${prefix}bass 
├⟤ ${prefix}blown 
├⟤ ${prefix}deep 
├⟤ ${prefix}earrape 
├⟤ ${prefix}fast 
├⟤ ${prefix}fat 
├⟤ ${prefix}nightcore 
├⟤ ${prefix}reverse 
├⟤ ${prefix}robot
├⟤ ${prefix}slow  
├⟤ ${prefix}smooth 
├⟤ ${prefix}squirrel
├⟤ ${prefix}sticker
├⟤ ${prefix}toimg
├⟤ ${prefix}tomp3
├⟤ ${prefix}tomp4
├⟤ ${prefix}togif
├⟤ ${prefix}tovideo
├⟤ ${prefix}toptv
├⟤ ${prefix}sticker
├⟤ ${prefix}toimg
├⟤ ${prefix}tomp3
├⟤ ${prefix}tomp4
├⟤ ${prefix}togif
├⟤ ${prefix}tovideo
├⟤ ${prefix}toptv
└─❑ TOOLS MENU ❑ 

┌─❑ STALK MENU ❑ 
├⟤ ${prefix}igstalk
├⟤ ${prefix}ttstalk
├⟤ ${prefix}ffstalk
├⟤ ${prefix}twstalk
├⟤ ${prefix}robloxstalk
├⟤ ${prefix}ghstalk
├⟤ ${prefix}npmstalk
├⟤ ${prefix}ytstalk
└─❑ STALK MENU ❑ 

┌─❑ SEARCH MENU ❑ 
├⟤ ${prefix}pinterest
├⟤ ${prefix}alquran
├⟤ ${prefix}murotal
├⟤ ${prefix}bingimage
├⟤ ${prefix}ytsearch
├⟤ ${prefix}npmsearch
├⟤ ${prefix}ttsearch
├⟤ ${prefix}spotifysearch 
├⟤ ${prefix}applemusic
├⟤ ${prefix}capcutsearch
├⟤ ${prefix}snackvideosearch
├⟤ ${prefix}soundcloudsearch 
├⟤ ${prefix}xnxxsearch
├⟤ ${prefix}xvideosearch
├⟤ ${prefix}xvideodl
├⟤ ${prefix}xnxxdl 
├⟤ ${prefix}sixtynine 
├⟤ ${prefix}pussy 
├⟤ ${prefix}dick 
├⟤ ${prefix}anal 
├⟤ ${prefix}boobs 
├⟤ ${prefix}bdsm
├⟤ ${prefix}black 
├⟤ ${prefix}easter 
├⟤ ${prefix}bottomless 
├⟤ ${prefix}blowjub 
├⟤ ${prefix}collared 
├⟤ ${prefix}cum 
├⟤ ${prefix}cumsluts 
├⟤ ${prefix}dp 
├⟤ ${prefix}dom 
├⟤ ${prefix}extreme 
├⟤ ${prefix}feet 
├⟤ ${prefix}finger 
├⟤ ${prefix}fuck 
├⟤ ${prefix}futa 
├⟤ ${prefix}gay 
├⟤ ${prefix}gif 
├⟤ ${prefix}group 
├⟤ ${prefix}hentai 
├⟤ ${prefix}kiss 
├⟤ ${prefix}lesbian 
├⟤ ${prefix}lick 
├⟤ ${prefix}pegged 
├⟤ ${prefix}phgif 
├⟤ ${prefix}puffies 
├⟤ ${prefix}real 
├⟤ ${prefix}suck 
├⟤ ${prefix}tattoo 
├⟤ ${prefix}tiny 
├⟤ ${prefix}toys
├⟤ ${prefix}xmas
├⟤ ${prefix}bluearchiver
├⟤ ${prefix}china
├⟤ ${prefix}indo
├⟤ ${prefix}waifu
├⟤ ${prefix}neko
├⟤ ${prefix}vietnam
├⟤ ${prefix}thailand
├⟤ ${prefix}korea
├⟤ ${prefix}japan
├⟤ ${prefix}animepat
├⟤ ${prefix}animeslap
├⟤ ${prefix}animecuddle
├⟤ ${prefix}animenom
├⟤ ${prefix}animefoxgirl
├⟤ ${prefix}animetickle
├⟤ ${prefix}animegecg
├⟤ ${prefix}dogwoof
├⟤ ${prefix}8ballpool
├⟤ ${prefix}goosebird
├⟤ ${prefix}animefeed
├⟤ ${prefix}animeavatar
├⟤ ${prefix}lizardpic
├⟤ ${prefix}catmeow
├⟤ ${prefix}animewlp
├⟤ ${prefix}animehug
├⟤ ${prefix}animekiss
└─❑ SEARCH MENU ❑ 

┌─❑ OTHER MENU ❑
├⟤ ${prefix}jpm
├⟤ ${prefix}jpmstatus
├⟤ ${prefix}sewabot
├⟤ ${prefix}report
├⟤ ${prefix}rules
├⟤ ${prefix}qris
├⟤ ${prefix}register
├⟤ ${prefix}unregister 
├⟤ ${prefix}ceklimit
├⟤ ${prefix}ceksaldo
├⟤ ${prefix}payment
├⟤ ${prefix}claimlimit
├⟤ ${prefix}claimsaldo
├⟤ ${prefix}pushkontak
├⟤ ${prefix}pushkontakv2
├⟤ ${prefix}pushkontakv3
├⟤ ${prefix}pushkontakv4
├⟤ ${prefix}randomhentai
├⟤ ${prefix}randomwaifu
├⟤ ${prefix}artinama
├⟤ ${prefix}artimimpi
├⟤ ${prefix}ramaljodoh
├⟤ ${prefix}ramaljodohbali
├⟤ ${prefix}ramalcinta
├⟤ ${prefix}cocoknama
├⟤ ${prefix}pasangan
├⟤ ${prefix}suamiistri
├⟤ ${prefix}jadiannikah
├⟤ ${prefix}sifatusaha
├⟤ ${prefix}rezeki
├⟤ ${prefix}pekerjaan
├⟤ ${prefix}nasib
├⟤ ${prefix}penyakit
├⟤ ${prefix}tarot
├⟤ ${prefix}fengshui
├⟤ ${prefix}haribaik
├⟤ ${prefix}harisangar
├⟤ ${prefix}harisial
├⟤ ${prefix}nagahari
├⟤ ${prefix}arahrezeki
├⟤ ${prefix}peruntungan
├⟤ ${prefix}weton
├⟤ ${prefix}karakter
├⟤ ${prefix}keberuntungan
├⟤ ${prefix}memancing
├⟤ ${prefix}masabubur
├⟤ ${prefix}zodiak
├⟤ ${prefix}shio
└─❑ OTHER MENU ❑ 

┌─❑ GAME MENU ❑ 
├⟤ ${prefix}truth
├⟤ ${prefix}dare
├⟤ ${prefix}ceksifat
├⟤ ${prefix}asahotak
├⟤ ${prefix}tekateki
├⟤ ${prefix}siapaaku
├⟤ ${prefix}mathquiz
├⟤ ${prefix}family100
├⟤ ${prefix}caklontong
├⟤ ${prefix}tebakgambar
├⟤ ${prefix}tebakkata 
├⟤ ${prefix}tebaktebakan
├⟤ ${prefix}tebakkimia
├⟤ ${prefix}ulartangga
├⟤ ${prefix}tictactoe
├⟤ ${prefix}tebakbom
├⟤ ${prefix}cekkodam
├⟤ ${prefix}yatim
├⟤ ${prefix}piatu
├⟤ ${prefix}jomblo
├⟤ ${prefix}waria
├⟤ ${prefix}koruptor
├⟤ ${prefix}psikopat
├⟤ ${prefix}pedofil
├⟤ ${prefix}miskin
├⟤ ${prefix}tukangjajan
├⟤ ${prefix}jelek
├⟤ ${prefix}mokondo
├⟤ ${prefix}penipu
├⟤ ${prefix}tukangcopet
├⟤ ${prefix}tukangbo
├⟤ ${prefix}tukangcoli
├⟤ ${prefix}tukangkawin
├⟤ ${prefix}ganteng
├⟤ ${prefix}cantik
├⟤ ${prefix}tobrut
├⟤ ${prefix}kurus
├⟤ ${prefix}maling
├⟤ ${prefix}kontolgede
├⟤ ${prefix}tepos
├⟤ ${prefix}pelakor
├⟤ ${prefix}jomblo
├⟤ ${prefix}korbanhts
├⟤ ${prefix}badut
├⟤ ${prefix}perampok
├⟤ ${prefix}begal
├⟤ ${prefix}wibu
├⟤ ${prefix}janda
├⟤ ${prefix}jodohku 
├⟤ ${prefix}cekyatim
├⟤ ${prefix}cekjelek
├⟤ ${prefix}cekjodoh
├⟤ ${prefix}cekmemek
├⟤ ${prefix}cekkontol
├⟤ ${prefix}cekmiskin
├⟤ ${prefix}cekkaya
├⟤ ${prefix}cektolol
├⟤ ${prefix}ceknamabapak
├⟤ ${prefix}cekwibu
├⟤ ${prefix}dapatkah
├⟤ ${prefix}apakah
├⟤ ${prefix}bagaimana 
├⟤ ${prefix}rate
├⟤ ${prefix}when
├⟤ ${prefix}menfess
├⟤ ${prefix}mancing
├⟤ ${prefix}aduayam
├⟤ ${prefix}tebakangkatogel
├⟤ ${prefix}balapkarung
├⟤ ${prefix}tariktambang
├⟤ ${prefix}tebakkarturemi
├⟤ ${prefix}balaplari
├⟤ ${prefix}rolling
├⟤ ${prefix}investasi 
├⟤ ${prefix}renang
├⟤ ${prefix}balasmenfess
├⟤ ${prefix}stopmenfess
├⟤ ${prefix}tolakmenfess
└─❑ GAME MENU ❑ 

┌─❑ OWNER MENU ❑ 
├⟤ ${prefix}self
├⟤ ${prefix}public
├⟤ ${prefix}npm
├⟤ ${prefix}autotyping
├⟤ ${prefix}autoread
├⟤ ${prefix}addcase
├⟤ ${prefix}delcase
├⟤ ${prefix}editcase
├⟤ ${prefix}getcase
├⟤ ${prefix}block
├⟤ ${prefix}unblock
├⟤ ${prefix}autoreadsw
├⟤ ${prefix}addprem
├⟤ ${prefix}delprem
├⟤ ${prefix}listprem
├⟤ ${prefix}statusgrup
├⟤ ${prefix}setppch
├⟤ ${prefix}setnamech
├⟤ ${prefix}spamvc
├⟤ ${prefix}spamcall
├⟤ ${prefix}joingc
├⟤ ${prefix}leavegc
├⟤ ${prefix}setdeskch
├⟤ ${prefix}followch
├⟤ ${prefix}untollowch
├⟤ ${prefix}delppch
├⟤ ${prefix}createch
├⟤ ${prefix}addgb
├⟤ ${prefix}delgb
├⟤ ${prefix}autojoingc
├⟤ ${prefix}upch
├⟤ ${prefix}spamcall
├⟤ ${prefix}spamvc
├⟤ ${prefix}setppbot
├⟤ ${prefix}setppbot
├⟤ ${prefix}addproduk
├⟤ ${prefix}delproduk
├⟤ ${prefix}batalorder
├⟤ ${prefix}confirm
├⟤ ${prefix}listproduk
├⟤ ${prefix}approve
├⟤ ${prefix}reject
├⟤ ${prefix}addsewa
├⟤ ${prefix}delsewa
├⟤ ${prefix}clersession
├⟤ ${prefix}listsewa
├⟤ ${prefix}delsewa
├⟤ ${prefix}ceksewa
├⟤ ${prefix}setdone
├⟤ ${prefix}changedone
├⟤ ${prefix}delsetdone
├⟤ ${prefix}done
├⟤ ${prefix}proses
├⟤ ${prefix}setproses
├⟤ ${prefix}changeproses
├⟤ ${prefix}delsetproses
├⟤ ${prefix}addlimit
├⟤ ${prefix}dellimit
├⟤ ${prefix}ceklimit
├⟤ ${prefix}addsaldo
├⟤ ${prefix}delsaldo
├⟤ ${prefix}resetregister
├⟤ ${prefix}resetdb
├⟤ ${prefix}listuserregister
├⟤ ${prefix}delallregister
├⟤ ${prefix}hapususerregister
├⟤ ${prefix}hapususerdb
├⟤ ${prefix}backupsc
├⟤ ${prefix}clearchat
├⟤ ${prefix}pinchat
├⟤ ${prefix}unpinchat
├⟤ ${prefix}updatelist
├⟤ ${prefix}upswteks
├⟤ ${prefix}upswvideo
├⟤ ${prefix}upswaudio
├⟤ ${prefix}upswimg
├⟤ ${prefix}colongsw
└─❑ OWNER MENU ❑ 

Powered by ${global.namaowner}
version 2.1.0
Developer Lumakara`;

        let buttons = [
            // 1. CTA URL
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Developer Satanic",
                    url: "https://wa.me/6283168758640",
                    merchant_url: "https://wa.me/6283168758640"
                })
            }                     
        ];
        const imagethumb = global.thumbnail;
const response = await fetch(imagethumb);
const profilePicBuffer = Buffer.from(await response.arrayBuffer());

        await sendButton(from, txt, "Lumakara", profilePicBuffer, buttons, m);
    } catch (e) {
        console.error(e);
        reply("Terjadi kesalahan.");
    }
}
await satanic.sendMessage(from, { audio: { url: global.audio} , mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break;
case 'blacklist': {
  if (!m.isGroup) return reply(mess.group);
  if (!isAdmins && !isCreator) return reply(mess.admin);
    let userId = args[0];
    if (!userId) return reply('⚠️ Masukkan nomor user.');
    if (!userId.includes('@')) userId = `${userId}@s.whatsapp.net`;
    const reason = args.slice(1).join(" ") || "Tidak ada alasan.";
    addBlacklist(userId, reason);
    reply(`✅ User ${userId} diblacklist.\n📌 *Alasan:* ${reason}`);
}
break;
    case 'unblacklist': {
  if (!m.isGroup) return reply(mess.group);
  if (!isAdmins && !isCreator) return reply(mess.admin);
    const list = getBlacklist();
    if (list.length === 0) return reply('📭 Belum ada user yang diblokir.');

    const rows = list.map(entry => ({
        header: "",
        title: entry.jid,
        description: `Alasan: ${entry.reason || 'Tidak ada alasan'}`,
        id: `.confirmunblacklist ${entry.jid}`
    }));

    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                interactiveMessage: {
                    body: { text: `📋 Pilih user yang ingin dihapus dari blacklist:` },
                    footer: { text: 'Aqua Assistant' },
                    header: { title: '🗑️ Daftar Blacklist' },
                    nativeFlowMessage: {
                        buttons: [{
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "Pilih User",
                                sections: [{ title: "Blacklist", rows }]
                            })
                        }]
                    }
                }
            }
        }
    }, { quoted: fkontak }, {});

    await satanic.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
}
break;

    case 'confirmunblacklist': {
  if (!m.isGroup) return reply(mess.group);
  if (!isAdmins && !isCreator) return reply(mess.admin);
        const userId = args[0];
        if (!userId) return reply('⚠️ Tidak ada user yang dipilih.');

        removeBlacklist(userId);
        reply(`✅ User ${userId} telah dihapus dari blacklist.`);
    }
    break;
    case 'listblacklist': {
    if (!isCreator) return 
    const list = getBlacklist();
    if (list.length === 0) return reply('📭 Tidak ada user blacklist.');
    const text = list
        .map((entry, i) => `${i+1}. ${entry.jid}\n   📌 Alasan: ${entry.reason}`)
        .join('\n\n');
    reply(`📋 *Daftar User Blacklist:*\n\n${text}`);
}
break;
case 'restartbot':
if (!isCreator) return 
reply(`restarting bot....`)
reply(`Berhasil Restart ✅`)
await sleep(3000)
process.exit()
break
case 'listuserregister':
case 'listuser': {
    if (!isCreator) return reply(`❌ Khusus owner!`)
    
    const fs = require('fs')
    const path = './database/registered.json'
    
    // Cek apakah file ada
    if (!fs.existsSync(path)) {
        return reply(`📭 File database/registered.json tidak ditemukan.`)
    }
    
    // Baca file database
    let users = []
    try {
        const data = fs.readFileSync(path, 'utf8')
        users = JSON.parse(data)
    } catch (err) {
        return reply(`❌ Gagal membaca database: ${err.message}`)
    }
    
    // Pastikan users adalah array
    if (!Array.isArray(users)) {
        users = []
    }
    
    if (users.length === 0) {
        return reply(`📭 Belum ada user yang terdaftar.`)
    }
    
    // Header tabel
    let text = `📋 *DAFTAR USER TERDAFTAR*\n`
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    text += `Total: ${users.length} user\n\n`
    
    // Looping data user
    users.forEach((user, index) => {
        text += `${index + 1}. *${user.nama || 'Tidak diketahui'}*\n`
        text += `   📱 ID: ${user.id || '-'}\n`
        text += `   📅 Daftar: ${user.daftar_pada || '-'}\n`
        text += `   💎 Status: ${user.status || 'Free'}\n`
        text += `   ✅ Verified: ${user.verified ? 'Ya' : 'Tidak'}\n`
        text += `   🔑 Kode Reg: ${user.kodeReg || '-'}\n`
        text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    })
    
    // Jika terlalu panjang, kirim sebagai file
    if (text.length > 30000) {
        fs.writeFileSync('./daftar_user.txt', text)
        await reply('📄 Daftar user terlalu panjang, cek file berikut:')
        await reply(text, { filename: 'daftar_user.txt' })
        return
    }
    
    reply(text)
}
break
case 'delallregister':
case 'deletealluser': {
    if (!isCreator) return reply(`❌ Khusus owner!`)
    
    const fs = require('fs')
    const path = './database/registered.json'
    
    // Cek apakah file ada
    if (!fs.existsSync(path)) {
        return reply(`📭 File database/registered.json tidak ditemukan.`)
    }
    
    // Baca data saat ini
    let users = []
    try {
        const data = fs.readFileSync(path, 'utf8')
        users = JSON.parse(data)
    } catch (err) {
        return reply(`❌ Gagal membaca database: ${err.message}`)
    }
    
    if (!Array.isArray(users) || users.length === 0) {
        return reply(`📭 Database sudah kosong, tidak ada user untuk dihapus.`)
    }
    
    // Konfirmasi dengan parameter 'yes'
    if (!text || text.toLowerCase() !== 'yes') {
        return reply(`⚠️ *PERINGATAN!*\nAnda akan menghapus *${users.length} user* secara permanen!\n\nKetik: *${prefix}delallregister yes* untuk konfirmasi.`)
    }
    
    // Backup dulu sebelum hapus
    const backupPath = `./database/registered_backup_${Date.now()}.json`
    fs.writeFileSync(backupPath, JSON.stringify(users, null, 2))
    
    // Kosongkan database
    fs.writeFileSync(path, JSON.stringify([], null, 2))
    
    reply(`✅ *BERHASIL MENGHAPUS SEMUA USER*\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n📊 Total terhapus: ${users.length} user\n💾 Backup disimpan di: ${backupPath}\n\n⚠️ Backup disimpan otomatis, jangan lupa dihapus jika tidak diperlukan.`)
}
break
case 'hapususerregister': {
    if (!isCreator) return reply(`❌ Akses ditolak! Khusus owner.`)
    if (!text) return reply(`⚠️ Contoh: *${prefix}hapususerregister 6281234567890*`)
    
    const fs = require('fs')
    const path = './database/registered.json'
    
    if (!fs.existsSync(path)) return reply(`❌ File database tidak ditemukan!`)
    
    let users = JSON.parse(fs.readFileSync(path, 'utf8'))
    
    let nomor = text.replace(/[^0-9]/g, '')
    if (!nomor.startsWith('62')) nomor = '62' + nomor.replace(/^0+/, '')
    const nomorFull = nomor + '@s.whatsapp.net'
    
    // Cari user berdasarkan ID
    const userExist = users.find(user => user.id === nomorFull)
    if (!userExist) {
        return reply(`❌ User ${nomor} tidak ditemukan!`)
    }
    
    const userName = userExist.nama || 'Tanpa Nama'
    
    // Hapus user
    const newUsers = users.filter(user => user.id !== nomorFull)
    fs.writeFileSync(path, JSON.stringify(newUsers, null, 2))
    
    reply(`✅ User ${userName} (${nomor}) berhasil dihapus dari database.\n📊 Sisa user: ${newUsers.length}`)
}
break
case 'listuserdb': {
    if (!isCreator) return reply(`❌ Khusus owner!`)
    const users = global.db.users
    const userList = Object.entries(users)
        .filter(([_, data]) => data.registered === true)
        .map(([nomor, data]) => `📱 ${nomor}\n👤 ${data.name || '?'} | Umur: ${data.age || '?'}`)
    
    if (userList.length === 0) return reply(`Belum ada user terdaftar.`)
    
    reply(`📋 *Daftar User Terdaftar:*\n\n${userList.join('\n\n')}`)
}
break

case 'hapususerdb': {
    if (!isCreator) return reply(`❌ Akses ditolak! Khusus owner.`)
    if (!text) return reply(`⚠️ Contoh: *${prefix}hapususer 6281234567890*`)
    let nomor = text.replace(/[^0-9]/g, '')
    if (!nomor.startsWith('62')) nomor = '62' + nomor.replace(/^0+/, '')
    const nomorFull = nomor + '@s.whatsapp.net'
    
    if (!global.db.users[nomorFull]) {
        return reply(`❌ User ${nomor} tidak ditemukan!`)
    }
    const userName = global.db.users[nomorFull].name || 'Tanpa Nama'
    delete global.db.users[nomorFull]
    const fs = require('fs')
    fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
    
    reply(`✅ User ${userName} (${nomor}) berhasil dihapus dari database.`)
}
break
case 'resetdb': {
    if (!isCreator) return reply(`❌ Khusus owner!`)
    if (!text || text.toLowerCase() !== 'yes') {
        return reply(`⚠️ Ketik *${prefix}resetdb yes* untuk mereset database.`)
    }
    global.db = {}
    const fs = require('fs')
    fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
    
    reply(`✅ Database berhasil direset menjadi {}`)
}
break
case 'deldaftar': {
			if (!isCreator) return 

			const regFile = './database/registered.json';
			if (!fs.existsSync(regFile)) return reply('📂 Database belum ditemukan!');

			let registeredUsers = JSON.parse(fs.readFileSync(regFile));
			if (registeredUsers.length === 0) return reply('📭 Belum ada data pendaftar.');

			const rows = registeredUsers.map(user => ({
				header: "",
				title: `${user.nama} (${user.umur} th)`,
				description: `📅 ${user.daftar_pada}\n✅ Verified: ${user.verified ? 'Ya' : 'Tidak'}`,
				id: `.confirmdel ${user.id}`
			}));
			rows.push({
				header: "",
				title: "🧹 Hapus Semua Data Pendaftar",
				description: "⚠️ Semua data user akan terhapus permanen!",
				id: `.confirmdelall`
			});
			const msg = generateWAMessageFromContent(m.chat, {
				viewOnceMessage: {
					message: {
						messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
						interactiveMessage: {
							body: { text: `📋 Pilih user yang ingin dihapus dari daftar pendaftar:` },
							footer: { text: 'Alya-chan Assistant' },
							header: { title: '🗑️ Daftar Pendaftar' },
							nativeFlowMessage: {
								buttons: [{
									name: "single_select",
									buttonParamsJson: JSON.stringify({
										title: "Pilih User",
										sections: [{ title: "Daftar Pendaftar", rows }]
									})
								}]
							}
						}
					}
				}
			}, { quoted: m }, {});

			await satanic.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
		}
		break;
		case 'confirmdel': {
			if (!isCreator) return reply(mess.only.owner);

			const userId = args[0];
			if (!userId) return reply('⚠️ Tidak ada ID user yang dipilih.');

			const regFile = './database/registered.json';
			if (!fs.existsSync(regFile)) return reply('📂 Database belum ditemukan!');

			let registeredUsers = JSON.parse(fs.readFileSync(regFile));

			const index = registeredUsers.findIndex(u => u.id === userId);
			if (index === -1) return reply('❌ User tidak ditemukan.');

			const deletedUser = registeredUsers[index];
			registeredUsers.splice(index, 1);
			fs.writeFileSync(regFile, JSON.stringify(registeredUsers, null, 2));

			reply(`✅ Data user *${deletedUser.nama}* (${deletedUser.id}) berhasil dihapus dari database.`);
		}
		break;
		case 'confirmdelall': {
			if (!isCreator) return reply(mess.only.owner);

			const regFile = './database/registered.json';
			if (!fs.existsSync(regFile)) return reply('📂 Database belum ditemukan!');

			fs.writeFileSync(regFile, JSON.stringify([], null, 2));
			reply('⚠️ Semua data pendaftar telah dihapus dari database!');
		}
		break;
case 'register':
case 'daftar':
case 'autoregis': {
const userId = m.sender;
const user = registeredUsers.find(user => user.id === userId);

if (user) {
return reply(`✅ Hmph... *${user.nama}* ya? Kamu tuh udah terdaftar dari tadi!

Ngapain sih daftar lagi? 😒
Bukan berarti aku seneng kamu balik... b-baka!`);
}

const nama = pushname || `User${registeredUsers.length + 1}`;
const kodeReg = generateKodeReg(8); 
const daftar_pada = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

const dataUser = {
id: userId,
nama,
kodeReg,
daftar_pada,
status: 'Free',
verified: true,
ppuser: await satanic.profilePictureUrl(userId, 'image').catch(()=>null)
};

registeredUsers.push(dataUser);
fs.writeFileSync(registeredFile, JSON.stringify(registeredUsers, null, 2));

let dbUser = global.db.users[userId];

if (!dbUser) {
global.db.users[userId] = {
money: 1000,
limit: 100,
level: 1,
freelimit: 0,
lastclaim: Date.now(),
registered: true,
joinlimit: 1
};
} else {
dbUser.limit = 100;
dbUser.money = 1000;
dbUser.registered = true;
dbUser.lastclaim = Date.now();
}

fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));

await satanic.sendMessage(m.chat, {
text: `🎉 *Registrasi Berhasil!*

👤 Nama: ${nama}
🆔 Kode: ${kodeReg}
📅 Tanggal: ${daftar_pada}
💎 Status: Free User
✔️ Verified: True

🎁 *Bonus User Baru*
💳 Limit: 100
💰 Money: 1000`
}, { quoted: fkontak });

const notifMsg = `📢 User Baru Terdaftar
👤 Nama: ${nama}
🆔 Kode: ${kodeReg}
📅 Tanggal: ${daftar_pada}
💎 Status: Free User
✔️ Verified: True

🎁 Bonus:
Limit 30
Money 50000`;
}
break;
case 'cekapikey': {
  let apikey = m.text.split(' ')[1] || global.sakey
  if (!apikey) return reply('⚠️ Masukkan API Key!\nContoh: !cekapikey SK-xxxxx')
  
  try {
    let res = await fetch(`https://free-restapi.biz.id/api/checkapikey?apikey=${apikey}`)
    let data = await res.json()
    
    if (data.status == 200) {
      reply(`✅ *API KEY VALID*\n\n👤 *Username:* ${data.result.username}\n📊 *Request:* ${data.result.request}\n🎫 *Limit:* ${data.result.limit}`)
    } else {
      reply('❌ API Key tidak valid!')
    }
  } catch (e) {
    reply('❌ Error: ' + e.message)
  }
}
break
case 'unregister': {
const userId = m.sender;
const userIndex = registeredUsers.findIndex(user => user.id === userId);

if (userIndex === -1) {
return reply(`❌ *Kamu belum terdaftar!*

Gak bisa unregister kalau belum daftar... 🥺`);
}

const userName = registeredUsers[userIndex].nama;

// Konfirmasi dulu
if (!text || text.toLowerCase() !== 'confirm') {
return reply(`⚠️ *Konfirmasi Unregister*

Kamu yakin ingin menghapus data registrasimu, *${userName}*?

❌ *Apa yang akan hilang:*
• Data nama dan kode registrasi
• Limit dan money yang tersimpan
• Semua progres dan riwayat

✅ *Ketik:*
*${prefix}unregister confirm*

😭 Jangan pergi ya... aku bakal sedih kalau kamu unregister.`);
}

// Hapus dari registeredUsers
registeredUsers.splice(userIndex, 1);
fs.writeFileSync(registeredFile, JSON.stringify(registeredUsers, null, 2));

// Hapus atau reset data dari global.db.users
if (global.db.users[userId]) {
delete global.db.users[userId];
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
}

await reply(`💔 *Unregister Berhasil!*

Data kamu *${userName}* sudah dihapus dari sistem.

Sedih banget deh... 😢
Kalau mau daftar lagi, ketik *${prefix}daftar* ya.

Bye bye... 👋
_I hope you come back someday_ ✨`);
}
break;
case 'ceklimit': {
const userId = m.sender;
const user = registeredUsers.find(user => user.id === userId);
if (!user) {
return reply(
`❌ *Kamu belum terdaftar!*
Silakan daftar dulu dengan mengetik:
*${prefix}daftar*
Jangan lupa ya... 🥺`
);
}
let dbUser = global.db.users[userId];
if (!dbUser) {
return reply(
`⚠️ *Data tidak ditemukan!*
Silakan hubungi owner untuk bantuan.`
);
}
const limitSisa = dbUser.limit || 0;
const batasLimit = 30;
let pesanTambahan = '';
if (limitSisa <= 0) {
pesanTambahan = '\n\n⚠️ *Limitmu habis!* Gunakan *' + prefix + 'claim* untuk claim limit harian.';
} else if (limitSisa <= 5) {
pesanTambahan = '\n\n😱 *Limitmu tinggal sedikit!* Awas kehabisan ya...';
} else if (limitSisa === batasLimit) {
pesanTambahan = '\n\n🎉 *Wah limitmu penuh!* Kamu rajin banget hari ini ✨';
}
await satanic.sendMessage(m.chat, {
text: `📊 *Cek Limit User*
👤 Nama: ${user.nama}
🆔 ID: ${userId.split('@')[0]}
💎 Status: ${user.status || 'Free'}
━━━━━━━━━━━━━━━━━
🎫 *Limit Kamu:* ${limitSisa} / ${batasLimit}
━━━━━━━━━━━━━━━━━
💡 *Tips:*
• Setiap hari kamu bisa *${prefix}claim* untuk mendapatkan limit gratis
• Semakin aktif, semakin banyak bonus yang bisa kamu dapatkan!${pesanTambahan}
_Jangan lupa bersyukur hari ini ya~_ 💕`
}, { quoted: fkontak });
}
break;
case 'claimlimit': {
let user = m.sender
let userRegistered = registeredUsers.find(u => u.id === user)
if (!userRegistered) {
return reply(`❌ *Kamu belum terdaftar!*\n\nKetik *${prefix}daftar* untuk registrasi.`)
}
if (!global.db.users[user]) {
global.db.users[user] = { money: 0, limit: 0, level: 1, freelimit: 0, lastclaim: 0, registered: true, joinlimit: 1, lastclaimlimit: 0 }
}
let dbUser = global.db.users[user]
let now = Date.now()
let cooldown = 24 * 60 * 60 * 1000 // 24 jam

if (dbUser.lastclaimlimit && (now - dbUser.lastclaimlimit) < cooldown) {
let remaining = Math.ceil((cooldown - (now - dbUser.lastclaimlimit)) / 1000 / 60 / 60)
return reply(`⏱️ *BANG KESIAN!!* Lu udah claim limit hari ini.\nTunggu *${remaining} jam* lagi dulu goblok!`)
}

let claimLimit = 10
dbUser.limit = (dbUser.limit || 0) + claimLimit
dbUser.freelimit = (dbUser.freelimit || 0) + 1
dbUser.lastclaimlimit = now

fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))

reply(`✅ *CLAIM LIMIT BERHASIL BANG BJIR!!*\n\n🎫 *+${claimLimit} Limit*\n📊 *Total limit lo sekarang: ${dbUser.limit}*\n\n🎮 Gas spam fitur puas-puas! 🔥`)
}
break
case 'claimsaldo': {
let user = m.sender
let userRegistered = registeredUsers.find(u => u.id === user)
if (!userRegistered) {
return reply(`❌ *Kamu belum terdaftar!*\n\nKetik *${prefix}daftar* untuk registrasi.`)
}
if (!global.db.users[user]) {
global.db.users[user] = { money: 0, limit: 0, level: 1, freelimit: 0, lastclaim: 0, registered: true, joinlimit: 1, lastclaimsald: 0 }
}
let dbUser = global.db.users[user]
let now = Date.now()
let cooldown = 24 * 60 * 60 * 1000 // 24 jam

if (dbUser.lastclaimsald && (now - dbUser.lastclaimsald) < cooldown) {
let remaining = Math.ceil((cooldown - (now - dbUser.lastclaimsald)) / 1000 / 60 / 60)
return reply(`⏱️ *BANG BJIR KESIAN!!* Lu udah claim saldo hari ini.\nTunggu *${remaining} jam* lagi dulu goblok!`)
}

let claimSaldo = 1000000
dbUser.money = (dbUser.money || 0) + claimSaldo
dbUser.lastclaimsald = now

fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))

reply(`✅ *CLAIM SALDO BERHASIL BANG BJIR!!*\n\n💀 *+Rp ${claimSaldo.toLocaleString('id-ID')}*\n💰 *Total saldo lo sekarang: Rp ${dbUser.money.toLocaleString('id-ID')}*\n\n🎉 Gas beli indomie satu kontainer! 🍜`)
}
break
case 'addlimit': {
if (!isCreator) return reply('❌ *Akses ditolak!* Hanya owner yang bisa menggunakan perintah ini.');
let target;
let jumlah;
if (m.mentionedJid[0]) {
target = m.mentionedJid[0];
jumlah = parseInt(text.split(' ')[1]);
} else if (m.quoted) {
target = m.quoted.sender;
jumlah = parseInt(text.split(' ')[0]);
} else {
let args = text.split(' ');
if (args.length < 2) return reply('❌ *Format salah!*\nContoh:\n• *addlimit @user 10*\n• *addlimit 6281234567890 10*\n• *reply pesan user + addlimit 10*');
let inputNomor = args[0].replace(/[^0-9]/g, '');
if (inputNomor.startsWith('0')) inputNomor = '62' + inputNomor.substring(1);
if (!inputNomor.endsWith('@s.whatsapp.net')) inputNomor = inputNomor + '@s.whatsapp.net';
target = inputNomor;
jumlah = parseInt(args[1]);
}
if (!target) return reply('❌ *Target tidak ditemukan!*');
if (isNaN(jumlah) || jumlah <= 0) return reply('❌ *Jumlah tidak valid!*\nMasukkan angka positif.');
let userRegistered = registeredUsers.find(user => user.id === target);
if (!userRegistered) return reply('❌ *User tidak terdaftar!*');
if (!global.db.users[target]) {
global.db.users[target] = {
money: 0,
level: 1,
limit: jumlah,
freelimit: 0,
lastclaim: 0,
registered: true,
joinlimit: 1
};
} else {
global.db.users[target].limit = (global.db.users[target].limit || 0) + jumlah;
}
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
await reply(`✅ *Berhasil menambah limit!*
👤 Target: ${userRegistered.nama} (${target.split('@')[0]})
➕ Tambahan: +${jumlah}
📊 Total limit sekarang: ${global.db.users[target].limit}`);
}
break;
case 'dellimit': {
if (!isCreator) return reply('❌ *Akses ditolak!* Hanya owner yang bisa menggunakan perintah ini.');
let target;
let jumlah;
if (m.mentionedJid[0]) {
target = m.mentionedJid[0];
jumlah = parseInt(text.split(' ')[1]);
} else if (m.quoted) {
target = m.quoted.sender;
jumlah = parseInt(text.split(' ')[0]);
} else {
let args = text.split(' ');
if (args.length < 2) return reply('❌ *Format salah!*\nContoh:\n• *dellimit @user 5*\n• *dellimit 6281234567890 5*\n• *reply pesan user + dellimit 5*');
let inputNomor = args[0].replace(/[^0-9]/g, '');
if (inputNomor.startsWith('0')) inputNomor = '62' + inputNomor.substring(1);
if (!inputNomor.endsWith('@s.whatsapp.net')) inputNomor = inputNomor + '@s.whatsapp.net';
target = inputNomor;
jumlah = parseInt(args[1]);
}
if (!target) return reply('❌ *Target tidak ditemukan!*');
if (isNaN(jumlah) || jumlah <= 0) return reply('❌ *Jumlah tidak valid!*\nMasukkan angka positif.');
let userRegistered = registeredUsers.find(user => user.id === target);
if (!userRegistered) return reply('❌ *User tidak terdaftar!*');
if (!global.db.users[target]) {
return reply('❌ *User tidak memiliki data limit!*');
}
let limitSekarang = global.db.users[target].limit || 0;
if (limitSekarang <= 0) {
return reply('❌ *User tidak memiliki limit!*');
}
let limitBaru = limitSekarang - jumlah;
if (limitBaru < 0) {
return reply(`❌ *Gagal menghapus limit!*
Limit user hanya ${limitSekarang}, tidak bisa dikurangi ${jumlah}.`);
}
global.db.users[target].limit = limitBaru;
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
await reply(`✅ *Berhasil menghapus limit!*
👤 Target: ${userRegistered.nama} (${target.split('@')[0]})
➖ Dihapus: -${jumlah}
📊 Total limit sekarang: ${global.db.users[target].limit}`);
}
break;
case 'self': 
if (!isCreator) return
 satanic.public = false;
 reply(`✅ Successfully changed to ${command} mode`);
break
case 'public': 
if (!isCreator) return
satanic.public = true;
reply(`✅ Successfully changed to ${command} mode`);
break
case 'block': {
		if (!isCreator) return reply('you are not owner')
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await satanic.updateBlockStatus(users, 'block')
		await reply(`*[ Done ]*`)
	}
	break
        case 'unblock': {
		if (!isCreator) return reply('you are not owner')
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await satanic.updateBlockStatus(users, 'unblock')
		await reply(`*[ Done ]*`)
	}
	break
case 'setppbot': case 'setppbot2':{
if (!isCreator) return reply(mess.owner)
const { S_WHATSAPP_NET } = require('@whiskeysockets/baileys');

	async function generateProfilePicture(media) {
    const image = await jimp.read(media);
    const min = image.getWidth();
    const max = image.getHeight();
    const cropped = image.crop(0, 0, min, max);
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
        preview: await cropped.normalize().getBufferAsync(jimp.MIME_JPEG)
    };
}
if (!quoted) return reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)

let media = await satanic.downloadAndSaveMediaMessage(quoted);
const { img } = await generateProfilePicture(media);
await satanic.query({
	tag: 'iq',
	attrs: {
	    target: undefined,
        to: S_WHATSAPP_NET,
		type:'set',
		xmlns: 'w:profile:picture'
	},
	content: [
		{
			tag: 'picture',
			attrs: { type: 'image' },
			content: img
		} 
	]
})
reply(mess.done);
}
break
case 'jpm':
case 'broadcast': {
  if (!isCreator) return reply(mess.owner);
  
  const quoted = m.quoted ? m.quoted : m;
  const mime = (quoted.msg || quoted).mimetype || "";
  
  let body = m.body || "";
  let text = body.replace(new RegExp(`^\\${prefix}${command}\\s*`, "i"), "").trim();
  
  let groups = Object.values(await satanic.groupFetchAllParticipating());
  
  if (/image/.test(mime)) {
    const buffer = await quoted.download();
    reply(`📡 Mengirim broadcast GAMBAR ke ${groups.length} grup...`);
    
    let success = 0;
    for (let group of groups) {
      try {
        await satanic.sendMessage(group.id, {
          image: buffer,
          caption: `「 *BROADCAST* 」\n\n${text}`
        });
        success++;
        await sleep(800);
      } catch {}
    }
    
    reply(`✅ ${success}/${groups.length} grup berhasil diterima`);
    
  } else if (/video/.test(mime)) {
    const buffer = await quoted.download();
    reply(`📡 Mengirim broadcast VIDEO ke ${groups.length} grup...`);
    
    let success = 0;
    for (let group of groups) {
      try {
        await satanic.sendMessage(group.id, {
          video: buffer,
          caption: `「 *BROADCAST* 」\n\n${text}`
        });
        success++;
        await sleep(800);
      } catch {}
    }
    
    reply(`✅ ${success}/${groups.length} grup berhasil diterima`);
    
  } else if (/audio/.test(mime)) {
    const buffer = await quoted.download();
    reply(`📡 Mengirim broadcast AUDIO ke ${groups.length} grup...`);
    
    let success = 0;
    for (let group of groups) {
      try {
        await satanic.sendMessage(group.id, {
          audio: buffer
        });
        success++;
        await sleep(800);
      } catch {}
    }
    
    reply(`✅ ${success}/${groups.length} grup berhasil diterima`);
    
  } else if (text) {
    reply(`📡 Mengirim broadcast TEKS ke ${groups.length} grup...\n\n📝 Pesan: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`);
    
    let success = 0;
    for (let group of groups) {
      try {
        await satanic.sendMessage(group.id, {
          text: `「 *BROADCAST* 」\n\n${text}`
        });
        success++;
        await sleep(800);
      } catch {}
    }
    
    reply(`✅ ${success}/${groups.length} grup berhasil diterima`);
    
  } else {
    reply(`📢 *BROADCAST (JPM)*\n━━━━━━━━━━━━━━━━\n📌 Mengirim pesan ke semua grup\n\nContoh:\n${prefix + command} Halo semua!\n\nAtau reply media (gambar/video/audio) dengan caption`);
  }
}
break;
case 'requestjoin':
case 'rj':
  if (!m.isGroup) return reply(mess.group);
  if (!isAdmins && !isCreator) return reply(mess.admin);
  ;
  
  function formatWaktu(timestamp) {
    return new Date(parseInt(timestamp) * 1000).toLocaleString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta'
    });
  }
  
  let pecahan = text ? text.trim().split(/\s+/) : [];
  let instruksi = pecahan[0] ? pecahan[0].toLowerCase() : 'bantuan';
  let parameter = pecahan[1] ? pecahan[1].toLowerCase() : '';
  
  let daftarMasuk = [];
  try {
    const dataPermintaan = await satanic.groupRequestParticipantsList(m.chat);
    
    daftarMasuk = dataPermintaan.map((item, idx) => {
      // Ambil dari phone_number (nomor HP asli)
      let jid = item.phone_number || item.jid || item.id || item;
      let nomor = jid.replace(/@s\.whatsapp\.net|@lid/g, '');
      let nama = item.notify || item.pushname || nomor;
      
      return {
        urutan: idx,
        jid: jid,
        nomor: nomor,
        nama: nama,
        waktu: item.request_time,
        metode: item.request_method
      };
    });
  } catch (galat) {
    console.error(galat);
    return reply('❌ Gagal mengambil daftar permintaan');
  }

  if (instruksi === 'daftar' || instruksi === 'list' || instruksi === 'lihat') {
    if (daftarMasuk.length === 0) return reply('📭 Tidak ada permintaan');
    let teks = `📋 *DAFTAR PERMINTAAN*\n━━━━━━━━━━━━━━━━\n📊 Total: ${daftarMasuk.length}\n\n`;
    daftarMasuk.forEach((p, i) => {
      teks += `*${i+1}. ${p.nama}*\n`;
      teks += `   📞 ${p.nomor}\n`;
      teks += `   ⏰ ${formatWaktu(p.waktu)}\n`;
      teks += `   📝 ${p.metode}\n\n`;
    });
    teks += `━━━━━━━━━━━━━━━━\n📌 .rj setuju 1\n📌 .rj setuju semua\n📌 .rj tolak 1\n📌 .rj tolak semua`;
    return reply(teks);
  }

  if (instruksi === 'setuju' || instruksi === 'approve' || instruksi === 'terima') {
    if (daftarMasuk.length === 0) return reply('❌ Tidak ada permintaan');
    if (parameter === 'semua' || parameter === 'all') {
      await satanic.groupRequestParticipantsUpdate(m.chat, daftarMasuk.map(p => p.jid), 'approve');
      return reply(`✅ Berhasil setuju ${daftarMasuk.length} permintaan`);
    }
    let idx = parseInt(parameter) - 1;
    if (isNaN(idx) || idx < 0 || idx >= daftarMasuk.length) return reply('❌ Nomor tidak valid');
    await satanic.groupRequestParticipantsUpdate(m.chat, [daftarMasuk[idx].jid], 'approve');
    return reply(`✅ Setuju @${daftarMasuk[idx].nomor}`, { mentions: [daftarMasuk[idx].jid] });
  }

  if (instruksi === 'tolak' || instruksi === 'reject' || instruksi === 'decline') {
    if (daftarMasuk.length === 0) return reply('❌ Tidak ada permintaan');
    if (parameter === 'semua' || parameter === 'all') {
      await satanic.groupRequestParticipantsUpdate(m.chat, daftarMasuk.map(p => p.jid), 'reject');
      return reply(`❌ Berhasil tolak ${daftarMasuk.length} permintaan`);
    }
    let idx = parseInt(parameter) - 1;
    if (isNaN(idx) || idx < 0 || idx >= daftarMasuk.length) return reply('❌ Nomor tidak valid');
    await satanic.groupRequestParticipantsUpdate(m.chat, [daftarMasuk[idx].jid], 'reject');
    return reply(`❌ Tolak @${daftarMasuk[idx].nomor}`, { mentions: [daftarMasuk[idx].jid] });
  }

  reply(`🔧 *REQUEST JOIN*\n━━━━━━━━━━━━━━━━\n.rj daftar - Lihat\n.rj setuju 1 - Terima\n.rj setuju semua - Terima semua\n.rj tolak 1 - Tolak\n.rj tolak semua - Tolak semua`);
break;
case "reactch": { 
if (!text) return reply(`${prefix} < ch url > 😂😂😂😂\n`);
  const match = text.match(/https:\/\/whatsapp\.com\/channel\/(\w+)(?:\/(\d+))?/);
  if (!match) return reply("URL tidak valid. Silakan periksa kembali.");
const channelId = match[1];
const chatId = match[2];
if (!chatId) return reply("ID chat tidak ditemukan dalam link yang diberikan.");
 satanic.newsletterMetadata("invite", channelId).then(data => {
 if (!data) return reply("Newsletter tidak ditemukan atau terjadi kesalahan.");
 satanic.newsletterReactMessage(data.id, chatId, text.split(" ").slice(1).join(" ") || "😀");
 });
reply(`sukses mengirimkan custom reaction ke channel tersebut`)
}
break;		
 case "h":
case "hidetag": {
if (!isAdmins && !isCreator) return reply(mess.admin)

if (m.quoted) {
satanic.sendMessage(m.chat, {
forward: m.quoted.fakeObj,
mentions: participants.map(a => a.id)
})
}
if (!m.quoted) {
satanic.sendMessage(m.chat, {
text: text ? text : '',
mentions: participants.map(a => a.id)
}, { quoted: fkontak })
}
}
break
case 'tagall':{
if (!m.isGroup) return reply(mess.group);
if (!isAdmins && !isOwner) return reply(mess.admin)
if (!text) return reply('masukan text')
let teks = `tagall message :\n> *${text}*\n\n`;
const groupMetadata = await satanic.groupMetadata(m.chat);
const participants = groupMetadata.participants;
for (let mem of participants) {
teks += `@${mem.id.split("@")[0]}\n`;
}
satanic.sendMessage(m.chat, {
text: teks,
mentions: participants.map((a) => a.id)
}, { quoted: fkontak });
}
break      
case 'reminder': {
    const fullText = m.text || '';
    const textAfterCommand = fullText.replace(/^[\.\#\$\&\+\-\@\!]?reminder\s+/i, '').trim();
    
    if (!textAfterCommand) {
        return reply('*❓ Format salah!*\n\nContoh: .reminder 30 menit jangan lupa sholat');
    }
    const parts = textAfterCommand.split(/\s+/);
    if (parts.length < 3) {
        return reply('*❌ Format salah!*\nGunakan: .reminder [angka] [detik/menit/jam] [pesan]');
    }
    const timeValue = parseInt(parts[0]);
    const timeUnit = parts[1].toLowerCase();
    const message = parts.slice(2).join(' ');
    const sender = m.sender || m.from;
    
    if (isNaN(timeValue) || timeValue <= 0) {
        return reply('*❌ Waktu harus angka positif!*');
    }
    
    let timeInMs = 0;
    if (timeUnit.includes('detik') || timeUnit === 's') {
        timeInMs = timeValue * 1000;
    } else if (timeUnit.includes('menit') || timeUnit === 'm') {
        timeInMs = timeValue * 60 * 1000;
    } else if (timeUnit.includes('jam') || timeUnit === 'h') {
        timeInMs = timeValue * 60 * 60 * 1000;
    } else {
        return reply('*❌ Satuan waktu salah!*\nGunakan: detik, menit, atau jam');
    }
    
    reply(`✅ *Reminder diatur!*\n⏰ ${timeValue} ${timeUnit} lagi\n📝 ${message}`);
    
    const participants = m.isGroup ? (await satanic.groupMetadata(m.chat)).participants : [{ id: m.sender }];
    
    setTimeout(() => {
        satanic.sendMessage(m.chat, {
            forward: m.quoted ? m.quoted.fakeObj : null,
            text: m.quoted ? undefined : `⏰ *REMINDER*\n\n${message}\n\n@${sender.split("@")[0]}`,
            mentions: participants.map(a => a.id)
        }, { quoted: m.quoted ? null : m });
    }, timeInMs);
}
break;
case 'editinfo': {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins && !isCreator) return reply(mess.admin);
    const text = body.toLowerCase();
    
    try {
        if (text.includes(' open')) {
            await satanic.groupSettingUpdate(m.chat, 'unlocked');
            reply('✅ *Izin edit info grup dibuka!*\n\n' +
                 '📛 Sekarang semua anggota dapat:\n' +
                 '• Mengubah nama grup\n' +
                 '• Mengubah deskripsi grup\n' +
                 '• Mengubah foto grup');
        } 
        else if (text.includes(' close')) {
            await satanic.groupSettingUpdate(m.chat, 'locked');
            reply('✅ *Izin edit info grup ditutup!*\n\n' +
                 '🔒 Mode hanya admin aktif:\n' +
                 '• Hanya admin bisa ubah nama grup\n' +
                 '• Hanya admin bisa ubah deskripsi\n' +
                 '• Hanya admin bisa ubah foto grup');
        }
        else {
            // Tampilkan panduan jika perintah tidak jelas
            reply(`⚙️ *PENGATURAN EDIT INFO GRUP*\n\n` +
                 `Fungsi: Mengatur siapa yang bisa mengedit informasi grup\n\n` +
                 `📌 Perintah:\n` +
                 `• *${prefix}editinfo open* → Buka izin untuk semua anggota\n` +
                 `• *${prefix}editinfo close* → Hanya admin yang bisa edit\n\n` +
                 `Contoh: *${prefix}editinfo close*`);
        }
    } catch (err) {
        reply(`❌ Gagal mengubah pengaturan edit info: ${err.message || err}`);
    }
}
break;
case 'grup':
case 'gc': {
  if (!m.isGroup) return reply('only group')
  if (!isAdmins && !isCreator) return reply('Perintah ini hanya untuk admin grup.')


  if (!q) {
    return reply(
`Format perintah:
${prefix + command} open  → Membuka grup
${prefix + command} close → Menutup grup

Contoh:
${prefix + command} close`
    )
  }

  if (args[0] === 'close') {

    await satanic.groupSettingUpdate(from, 'announcement')

    reply(
`[ GRUP DITUTUP ]

Hanya admin yang dapat mengirim pesan.
Silakan hubungi admin jika ada keperluan penting.`
    )

  } else if (args[0] === 'open') {

    await satanic.groupSettingUpdate(from, 'not_announcement')

    reply(
`[ GRUP DIBUKA ]

Semua anggota kini dapat mengirim pesan.
Mohon tetap menjaga ketertiban dan aturan grup.`
    )

  } else {
    reply(`Opsi tidak tersedia.\nGunakan: ${prefix + command} open / close`)
  }
}
break
case 'pushkontak': {
if (!isCreator) return 
if (!m.isGroup) return reply(`Only for groups`)
if (!text) return reply(`text?`)
const cmiggc = await satanic.groupMetadata(m.chat)
let mem = cmiggc.participants.map(v => v.id)
reply(`Otw push ke ${mem.length} member...`)
for (let targetId of mem) {
if (targetId === satanic.user.id) continue;
await satanic.sendMessage(targetId, { text: q }).catch(() => {})
await sleep(2000)
}
reply(`*[ Done ]*`)
}
break
case 'pushkontakv2':{
if (!isCreator) return 
if (!q) return reply(`Format: ${prefix+command} idgc|text`)
reply(mess.wait)
const metadata2 = await satanic.groupMetadata(q.split("|")[0]).catch(e => {})
if(!metadata2) return reply("Group not found")
const halss = metadata2.participants
for (let mem of halss) {
if (mem.id === satanic.user.id) continue;
await satanic.sendMessage(mem.id, { text: q.split("|")[1] }).catch(() => {})
await sleep(5000)
}
reply(`Success`)
}
break
case 'pushkontakv3': {
if (!isCreator) return 
if (!text) return reply(`Format: ${prefix+command} idgroup|jeda|teks`)
await reply("Otw Boskuuu")
const groupMetadataa = await satanic.groupMetadata(`${q.split("|")[0]}`).catch(e => {})
if (!groupMetadataa) return reply("Metadata Gagal")
const halls = groupMetadataa.participants.map(v => v.id)
global.tekspushkonv3 = q.split("|")[2]
for (let mem of halls) {
if (mem === satanic.user.id) continue;
if (/image/.test(mime)) {
media = await satanic.downloadAndSaveMediaMessage(quoted)
memk = await uploadwidipe(media)
await satanic.sendMessage(mem, { image: { url: memk }, caption: global.tekspushkonv3 }).catch(() => {})
} else {
await satanic.sendMessage(mem, { text: global.tekspushkonv3 }).catch(() => {})
}
await sleep(parseInt(q.split("|")[1]) || 2000)
}
reply("Succes Boss!")
}
break
case 'pushkontakv4': {
if (!isCreator) return 
if (!m.isGroup) return 
if (!text) return reply(`Format: ${prefix+command} jeda|teks`)
await reply("Otw Boskuuu")
let cmiggc = await satanic.groupMetadata(m.chat)
const halsss = cmiggc.participants.map(v => v.id)
global.tekspushkonv4 = text.split("|")[1]
for (let men of halsss) {
if (men === satanic.user.id) continue;
if (/image/.test(mime)) {
media = await satanic.downloadAndSaveMediaMessage(quoted)
mem = await uploadwidipe(media)
await satanic.sendMessage(men, { image: { url: mem }, caption: global.tekspushkonv4 }).catch(() => {})
} else {
await satanic.sendMessage(men, { text: global.tekspushkonv4 }).catch(() => {})
}
await sleep(parseInt(text.split("|")[0]) || 2000)
}
reply("Succes Boss!")
}
break

case 'jpmstatus':
case 'statusgrup':
case 'statusgroup': {
    if (!isCreator) return 
    
    const { fromBuffer } = require("file-type");
    const fs = require("fs");
    const path = require("path");

    let content = {};
    let buffer, ext, tempFile;

    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    if (m.quoted) {
        try {
            buffer = await m.quoted.download();
            if (!buffer) return reply("❌ Gagal mengambil media quoted.");
            
            const fileTypeRes = await fromBuffer(buffer);
            ext = fileTypeRes ? fileTypeRes.ext : 'bin';
            tempFile = path.join(__dirname, `tmp_${Date.now()}.${ext}`);
            fs.writeFileSync(tempFile, buffer);

            const quotedType = m.quoted.mtype || Object.keys(m.quoted.message || {})[0] || '';
            if (/image|video|audio/.test(quotedType)) {
                if (/image/.test(quotedType)) {
                    content.image = { url: tempFile };
                    if (text) content.caption = text;
                } else if (/video/.test(quotedType)) {
                    content.video = { url: tempFile };
                    if (text) content.caption = text;
                } else if (/audio/.test(quotedType)) {
                    if (text) {
                        fs.unlinkSync(tempFile);
                        return reply("Audio tidak boleh disertai caption.");
                    }
                    content.audio = { url: tempFile };
                    content.ptt = false;
                }
            } else {
                fs.unlinkSync(tempFile);
                return reply("Reply harus berupa image/video/audio.");
            }
        } catch (e) {
            return reply("❌ Media tidak valid atau gagal diproses.");
        }
    } else if (text) {
        content.text = text;
    } else {
        return reply("Kirim media (foto/video/audio) atau teks, bisa dengan reply atau langsung.");
    }

    if (content.text && !content.text.trim()) return reply("Teks tidak boleh kosong.");

    let getGroups = await satanic.groupFetchAllParticipating();
    let groups = Object.values(getGroups);

    let validGroups = [];
    
    validGroups.push({
        title: "All Group",
        description: `Kirim ke ${groups.length} grup`,
        id: `.sendstatus all ${encodeURIComponent(JSON.stringify(content))}`
    });

    for (let group of groups) {
        validGroups.push({
            title: group.subject || "Group",
            description: group.id,
            id: `.sendstatus ${group.id} ${encodeURIComponent(JSON.stringify(content))}`
        });
    }

    if (validGroups.length <= 1) {
        if (tempFile && fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
        return reply("Tidak ada grup valid yang bisa dipilih.");
    }

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                interactiveMessage: {
                    body: { text: "```Pilih Grup Tujuan ♨️```" },
                    nativeFlowMessage: {
                        buttons: [{
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "PILIH GRUP",
                                sections: [{ title: "Daftar Grup", rows: validGroups }]
                            })
                        }]
                    }
                }
            }
        }
    }, { quoted: fkontak });

    await satanic.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;

case 'sendstatus': {
    if (!isCreator) return 
    const fs = require("fs");
    const crypto = require("crypto");

    const [groupId, ...contentARR] = args;
    const contentDecoded = JSON.parse(decodeURIComponent(contentARR.join(' ')));

    async function groupStatus(jid, contentObj) {
        let content = { ...contentObj };
        const { backgroundColor } = content;
        delete content.backgroundColor;
        
        const inside = await generateWAMessageContent(content, {
            upload: satanic.waUploadToServer,
            backgroundColor
        });
        
        const messageSecret = crypto.randomBytes(32);
        const mStatus = generateWAMessageFromContent(jid, {
            messageContextInfo: {
                messageSecret
            },
            groupStatusMessageV2: {
                message: {
                    ...inside,
                    messageContextInfo: {
                        messageSecret
                    }
                }
            }
        }, {});
        
        await satanic.relayMessage(jid, mStatus.message, {
            messageId: mStatus.key.id
        });
        return mStatus;
    }

    let getGroups = await satanic.groupFetchAllParticipating();
    let groups = Object.values(getGroups).map(v => v.id);

    let success = 0;
    let failed = 0;

    if (groupId === 'all') {
        for (let gid of groups) {
            try {
                await groupStatus(gid, contentDecoded);
                success++;
                await sleep(2000); 
            } catch (e) {
                failed++;
            }
        }
        reply(`✅ Berhasil ${success} group\n❌ Gagal: ${failed} group`);
    } else {
        try {
            await groupStatus(groupId, contentDecoded);
            reply(`✅ Berhasil dikirim ke grup`);
        } catch (e) {
            reply(`❌ Gagal mengirim ke grup yang dituju`);
        }
    }

    try {
        if (contentDecoded?.image?.url && fs.existsSync(contentDecoded.image.url)) fs.unlinkSync(contentDecoded.image.url);
        if (contentDecoded?.video?.url && fs.existsSync(contentDecoded.video.url)) fs.unlinkSync(contentDecoded.video.url);
        if (contentDecoded?.audio?.url && fs.existsSync(contentDecoded.audio.url)) fs.unlinkSync(contentDecoded.audio.url);
    } catch (e) {}

    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'delsesi': 
  case 'clearsession': {
fs.readdir("./session", async function (err, files) {
if (err) {
} 
let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
   )
console.log(filteredArray.length); 
let teks =`Terdeteksi ${filteredArray.length} file kenangan <3\n\n`
if(filteredArray.length == 0) return reply(`${teks}`)
filteredArray.map(function(e, i){
teks += (i+1)+`. ${e}\n`
})     
await sleep(2000)
await filteredArray.forEach(function (file) {
fs.unlinkSync(`./session/${file}`)
});
await sleep(2000)
reply("Berhasil menghapus semua Kenangan di folder session")     
});
}
break
case 'addsewa': {
    try {
    if (!isCreator) return
        if (!text || text.split(' ').length < 2) {
            return reply(
                `Gunakan dengan cara:\n` +
                `${prefix + command} *linkgc waktu*\n\n` +
                `Contoh:\n${prefix + command} https://chat.whatsapp.com/XXX 30d\n\n` +
                `*CATATAN:*\n` +
                `d = hari\nh = jam\nm = menit\ns = detik\ny = tahun`
            );
        }

        let [link, waktu] = text.split(' ');
        
        if (!isUrl(link) || !link.includes('chat.whatsapp.com/')) {
            return reply("❌ Link grup WhatsApp tidak valid!");
        }
        let inviteCode = link.split('chat.whatsapp.com/')[1].split('?')[0];
        let infoGrup;
        try {
            infoGrup = await satanic.groupGetInviteInfo(inviteCode);
        } catch (e) {
            return reply("❌ Gagal mendapatkan info grup. Pastikan link belum di-reset atau bot telah diblokir.");
        }
        const groupId = infoGrup.id;
        const groupName = infoGrup.subject;

        addSewaGroup(groupId, waktu, sewa);
        try {
            await satanic.groupAcceptInvite(inviteCode);
            reply(
                `✅ *SEWA BERHASIL DITAMBAHKAN*\n\n` +
                `🏷️ Nama   : *${groupName}*\n` +
                `🆔 ID     : *${groupId}*\n` +
                `⏳ Durasi : *${waktu}*\n\n` +
                `*Status:* Bot berhasil masuk ke dalam grup dan sewa sudah aktif.`
            );
        } catch (joinErr) {
            reply(
                `⏳ *MENUNGGU PERSETUJUAN ADMIN*\n\n` +
                `🏷️ Nama   : *${groupName}*\n` +
                `🆔 ID     : *${groupId}*\n` +
                `⏳ Durasi : *${waktu}*\n\n` +
                `*Status:* Grup menggunakan sistem persetujuan admin. Namun jangan khawatir, *data sewa sudah tersimpan di database*. Sewa akan langsung berjalan ketika admin menyetujui bot masuk.`
            );
        }

    } catch (err) {
        console.error("ADDSEWA ERROR:", err);
        reply("❌ Terjadi kesalahan saat memproses perintah addsewa.");
    }
}
break;
case 'delsewa': {
    if (!isCreator) return
    if (sewa.length === 0)
        return reply('📭 Belum ada data sewa.')
    const rows = await Promise.all(
        sewa.map(async (x) => {
            const expired =
                x.expired === "PERMANENT"
                    ? "PERMANENT"
                    : msToDate(x.expired - Date.now())

            return {
                header: "",
                title: await getGcName(x.id),
                description: `ID: ${x.id}\nExpired: ${expired}`,
                id: `${prefix}confirmdelsewa ${x.id}`
            }
        })
    )

    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: {
                    body: {
                        text: '📋 Pilih grup yang ingin dihapus dari sewa:'
                    },
                    footer: {
                        text: 'Aqua Assistant'
                    },
                    header: {
                        title: '🗑️ Daftar Sewa Aktif'
                    },
                    nativeFlowMessage: {
                        buttons: [{
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "Pilih Grup",
                                sections: [{
                                    title: "Sewa Aktif",
                                    rows
                                }]
                            })
                        }]
                    }
                }
            }
        }
    }, { quoted: fkontak })

    await satanic.relayMessage(
        msg.key.remoteJid,
        msg.message,
        { messageId: msg.key.id }
    )
}
break
case 'confirmdelsewa': {
    if (!isCreator) return
    const id = args[0]
    if (!id) return reply("❌ ID grup tidak valid!")

    const pos = getSewaPosition(id, sewa)
    if (pos === -1)
        return reply("❌ Grup tidak ditemukan dalam data sewa!")
    sewa.splice(pos, 1)
    fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
    try {
        await satanic.groupLeave(id)
    } catch (err) {
        console.log('Gagal keluar grup:', err)
    }
    reply(
        `✅ Sewa grup berhasil dihapus!\n` +
        `🚪 Bot telah keluar dari grup\n` +
        `🆔 ID: ${id}`
    )
}
break
case 'listsewa': {
    if (!isCreator) return
    if (sewa.length === 0) return reply("📭 Belum ada data sewa.")

    let teks = `📋 *Daftar Sewa Aktif*\n\n`
    for (let x of sewa) {
        teks += `🏷️ Nama : *${await getGcName(x.id)}*\n`
        teks += `🆔 ID   : ${x.id}\n`
        if (x.expired === "PERMANENT") {
            teks += `⏳ Expired : PERMANENT\n\n`
        } else {
            teks += `⏳ Expired : ${msToDate(x.expired - Date.now())}\n\n`
        }
    }

    satanic.sendMessage(m.chat, { text: teks }, { quoted: fkontak })
}
break
case 'ceksewa': {
    if (!isCreator) return
    if (!m.isGroup) return reply("❌ Perintah ini hanya bisa digunakan di dalam grup!");

    let teks = `⬣ *CEK SEWA GRUP*\n\n`;
    let isFound = false;

    for (let x of sewa) {
        if (x.id === m.chat) {
            isFound = true;
            let expiredText = (x.expired === "PERMANENT")
                ? "PERMANENT"
                : msToDate(x.expired - Date.now());

            let groupMeta = await satanic.groupMetadata(x.id);

            teks += `🏷️ Nama : *${groupMeta.subject}*\n` +
                    `🆔 ID   : *${x.id}*\n` +
                    `⏳ Expired : *${expiredText}*\n`;
        }
    }

    if (!isFound) return reply("❌ Grup ini belum menyewa bot.");
    reply(teks);
}
break;

//////////////  GROUP MENU //////////

case 'autoaigrup':
case 'aigrup': 
case 'autoaigc': {
    if (!m.isGroup) return reply('Fitur Khusus Group!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
    
    if (args[0] === "on") {
        if (isAutoAiGc) return reply(`Udah aktif`)
        openaigc.push(m.chat)
        fs.writeFileSync('./database/openaigc.json', JSON.stringify(openaigc, null, 2))
        reply('Successfully Activate Auto AI')
    } else if (args[0] === "off") {
        if (!isAutoAiGc) return reply(`Udah nonaktif`)
        let anu = openaigc.indexOf(m.chat)
        openaigc.splice(anu, 1)
        fs.writeFileSync('./database/openaigc.json', JSON.stringify(openaigc, null, 2))
        reply('Successfully Disabling Auto AI')
    } else {
        reply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
    }
}
break
case 'antilink':
  if (!m.isGroup) return reply('⚠️ Fitur ini hanya dapat digunakan di dalam grup!')

  if (!isAdmins && !isCreator) return reply('👑 Khusus admin grup!')
  
  if (text === 'on') {
    if (Antilinkgc) return reply('✅ Antilink sudah aktif di grup ini')
    
    ntlinkgc.push(from)
    fs.writeFileSync("./database/antilink.json", JSON.stringify(ntlinkgc))
    reply(`🔒 *Antilink has been activated in this group!*\n\nNobody is allowed to send other group/channel links!`)
    
  } else if (text === 'off') {
    if (!Antilinkgc) return reply('❌ Antilink sudah nonaktif di grup ini')
    
    let off = ntlinkgc.indexOf(from)
    ntlinkgc.splice(off, 1)
    fs.writeFileSync("./database/antilink.json", JSON.stringify(ntlinkgc))
    reply(`🔓 *Antilink has been deactivated in this group!*`)
    
  } else {
    reply(`⚙️ *Antilink Settings*\n\n` +
          `📌 Current status: ${Antilinkgc ? '✅ ACTIVE' : '❌ INACTIVE'}\n\n` +
          `📝 *Usage:*\n` +
          `➤ ${prefix + command} on  - Activate antilink\n` +
          `➤ ${prefix + command} off - Deactivate antilink`)
  }
break
case 'autojoingc':
  if (!m.isGroup) return reply('⚠️ Fitur ini hanya dapat digunakan di dalam grup!')

  if (!isAdmins && !isCreator) return reply('👑 Khusus admin grup!')
  
  if (text === 'on') {
    if (Autojoingc) return reply('✅ Auto join gc sudah aktif di grup ini')
    
    joingc.push(from)
    fs.writeFileSync("./database/autojoingc.json", JSON.stringify(joingc))
    reply(`🔒 *Auto join group has been activated in this group!*`)
    
  } else if (text === 'off') {
    if (!Autojoingc) return reply('❌ auto join sudah nonaktif di grup ini')
    
    let offjoin = joingc.indexOf(from)
    joingc.splice(offjoin, 1)
    fs.writeFileSync("./database/autojoingc.json", JSON.stringify(joingc))
    reply(`🔓 done`)
    
  } else {
    reply(`⚙️ *Auto join group Settings*\n\n` +
          `📌 Current status: ${Antilinkgc ? '✅ ACTIVE' : '❌ INACTIVE'}\n\n` +
          `📝 *Usage:*\n` +
          `➤ ${prefix + command} on  - Activate autojoingc\n` +
          `➤ ${prefix + command} off - Deactivate autojoingc`)
  }
break
case 'sewa':
case 'sewabot': {

  function rupiah(num) {
    return num.toLocaleString('id-ID')
  }
  const paket = {
    "1hari":  { nama: "1 Hari", harga: 1000 },
    "5hari":  { nama: "5 Hari", harga: 4500 },
    "7hari":  { nama: "7 Hari", harga: 6000 },
    "1bulan": { nama: "1 Bulan", harga: 20000 },
    "3bulan": { nama: "3 Bulan", harga: 50000 },
    "1tahun": { nama: "1 Tahun", harga: 120000 },
    "prem1":  { nama: "Premium + sewa 1 Bulan", harga: 60000 },
    "prem12": { nama: "Premium + sewa 1 Tahun", harga: 150000 }
  }

  let pilih = (args[0] || '').toLowerCase()

  // ===== MENU UTAMA =====
  if (!pilih) {

    const rows = Object.keys(paket).map(v => ({
      header: "",
      title: `📦 ${paket[v].nama}`,
      description: `Harga Rp ${rupiah(paket[v].harga)}`,
      id: `.sewabot ${v}`
    }))

    const teks = `
╭━━━〔 🤖 *SEWA BOT* 〕━━━⬣
┃
┃ 💼 *PAKET HARIAN*
┃ ├ 1 Hari     : Rp 1.000
┃ ├ 5 Hari     : Rp 4.500
┃ └ 7 Hari     : Rp 6.000
┃
┃ 📆 *PAKET BULANAN & TAHUNAN*
┃ ├ 1 Bulan    : Rp 20.000
┃ ├ 3 Bulan    : Rp 50.000
┃ └ 1 Tahun    : Rp 120.000
┃
┃ 👑 *PREMIUM & VVIP GROUP*
┃ (Admin menjadi User Premium)
┃ ├ 1 Bulan    : Rp 60.000
┃ └ 1 Tahun    : Rp 150.000
┃
┣━━━━━━━━━━━━━━━━━━⬣
┃ ⚡ *KEUNGGULAN BOT*
┃ ✓ Proses cepat (1–5 menit)
┃ ✓ Bisa jaga grup 24 jam
┃ ✓ Fitur lengkap & update
┃ ✓ Anti ribet & fast respon
┃
┃ 📦 *PILIH PAKET DI BAWAH*
╰━━━━━━━━━━━━━━━━━━⬣
`
    const msg = generateWAMessageFromContent(m.chat,{
      viewOnceMessage:{
        message:{
          messageContextInfo:{
            deviceListMetadata:{},
            deviceListMetadataVersion:2
          },
          interactiveMessage:{
            body:{ text: teks },
            footer:{ text: global.botName },
            header:{ title: `Sewa Bot AQUA` },
            nativeFlowMessage:{
              buttons:[{
                name:"single_select",
                buttonParamsJson:JSON.stringify({
                  title:"Pilih Paket Sewa",
                  sections:[{
                    title:"Daftar Paket",
                    rows
                  }]
                })
              }]
            }
          }
        }
      }
    },{ quoted:fkontak })

    return satanic.relayMessage(
      msg.key.remoteJid,
      msg.message,
      { messageId: msg.key.id }
    )
  }
  
  // ===== PROSES PILIH PAKET =====
  if (pilih) {

    if (!paket[pilih]) return reply("❌ Paket tidak ditemukan")

    let nama = paket[pilih].nama
    let harga = paket[pilih].harga

    let orderText = `Halo kak saya mau sewa bot

Paket : ${nama}
Harga : Rp ${rupiah(harga)}

Link Group :
`

    let link = `https://wa.me/${global.owner}?text=${encodeURIComponent(orderText)}`

    let teks = `
╭━━━〔 🤖 ORDER SEWA BOT 〕━━━⬣
│
│ 📦 Paket : ${nama}
│ 💰 Harga : Rp ${rupiah(harga)}
│
│ ⚡ Proses aktivasi 1-5 menit
│ 🔐 Bot aktif 24 jam
│
╰━━━━━━━━━━━━━━━━━━⬣

📞 *KLIK UNTUK ORDER:* ${link}
`

    // Kirim pesan biasa tanpa externalAdReply
    satanic.sendMessage(m.chat, {
      text: teks
    }, { quoted: fkontak })

  }

}
break
case 'infobot':
case 'script':
case 'sc': {
    try {                  
        let txt = `Script AQUA-AI V2.1.0 free script apabila ada yang menjual langsung hubungin owner di bawah ini, rename boleh untuk di kembangkan note tidak dijual, ini khusus free, apabila ingin versi v3.0.0 silahkan hubungi owner untuk membeli script fitur banyak dan keren pasti nya, harga murah banget`;

        let buttons = [
            // 1. CTA URL
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Developer Satanic",
                    url: "https://wa.me/6283168758640",
                    merchant_url: "https://wa.me/6283168758640"
                })
            },
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Get Sc Free",
                    url: "https://chat.whatsapp.com/HR7bfnzl5rj82sfD3wt4cU",
                    merchant_url: "https://chat.whatsapp.com/HR7bfnzl5rj82sfD3wt4cU"
                })
            },
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Channel Aqua AI",
                    url: "https://whatsapp.com/channel/0029VbBOXZ6AojZ23z5ieI3z",
                    merchant_url: "https://whatsapp.com/channel/0029VbBOXZ6AojZ23z5ieI3z"
                })
            },
            
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "Free Rest api",
                    copy_code: "https://free-restapi.biz.id/"
                })
            }
        ];

        // Download gambar dari URL menjadi buffer
        const response = await fetch('https://c.termai.cc/i108/58xw.jpg');
        const profilePicBuffer = Buffer.from(await response.arrayBuffer());

        await sendButton(from, txt, "Menu Source Code", profilePicBuffer, buttons, m);
    } catch (e) {
        console.error(e);
        reply("Terjadi kesalahan.");
    }
}
break;
case 'setqris': {
  const fs = require('fs')
  const qrisPath = './database/qris.json'
  
  // Cek owner
  if (!global.owner.includes(m.sender.split('@')[0])) {
    return reply("❌ Khusus owner.")
  }

  const quoted = m.quoted ? m.quoted : m;
  const mime = (quoted.msg || quoted).mimetype || '';
  
  let imageUrl = ''
  
  if (/image/.test(mime)) {
    try {
      // Download media
      let mediaFile = await satanic.downloadAndSaveMediaMessage(quoted)
      
      try {
        // Coba upload ke Ugu dulu
        let uploadResult = await UploadFileUgu(mediaFile)
        imageUrl = uploadResult.url
      } catch (err) {
        console.log('Ugu error, fallback ke Alice CDN:', err)
        // Jika error, pakai Alice CDN (fungsi dari scrape kamu)
        imageUrl = await uploadToAliceCdn(mediaFile)
      }
      
      // Hapus file temporary
      if (fs.existsSync(mediaFile)) fs.unlinkSync(mediaFile)
      
    } catch (err) {
      console.error(err)
      return reply("❌ Gagal upload gambar.")
    }
  } else if (args[0]) {
    // Jika pakai URL
    imageUrl = args[0]
  } else {
    return reply("📌 *Cara:* Reply gambar QRIS lalu ketik .setqris\nAtau .setqris [url_gambar]")
  }

  // Simpan ke file JSON
  if (!fs.existsSync('./database')) {
    fs.mkdirSync('./database', { recursive: true })
  }
  
  fs.writeFileSync(qrisPath, JSON.stringify({ url: imageUrl }, null, 2))
  
  reply(`✅ *QRIS berhasil disimpan permanen!\n\nKetik .qris untuk melihat.`)
}
break
case 'qris': {
  try {
    const fs = require('fs')
    const qrisPath = './database/qris.json'
    
    // Baca URL QRIS dari file
    let qrisUrl = ''
    if (fs.existsSync(qrisPath)) {
      const data = JSON.parse(fs.readFileSync(qrisPath))
      qrisUrl = data.url
    } else {
      return reply("❌ QRIS belum diatur. Ketik .setqris untuk mengatur QRIS.")
    }

    // Validasi URL
    if (!qrisUrl || qrisUrl === '') {
      return reply("❌ URL QRIS kosong. Silakan set ulang dengan .setqris")
    }

    let txt = `╭━━━〔 💳 *PEMBAYARAN QRIS* 〕━━━⬣
│
│ 💰 Scan QRIS di bawah untuk melakukan pembayaran
│
│ ✅ *Setelah scan & bayar:*
│ Kirim bukti transfer ke owner
│ Klik tombol "Konfirmasi Pembayaran"
│
╰━━━━━━━━━━━━━━━━━━⬣`

    let buttons = [
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "💬 Konfirmasi Bayar",
          url: `https://wa.me/${global.owner}?text=Halo%20owner%2C%20saya%20sudah%20bayar`,
          merchant_url: `https://wa.me/${global.owner}?text=Halo%20owner%2C%20saya%20sudah%20bayar`
        })
      }
    ]

    // Ambil gambar QRIS pake axios
    const response = await axios.get(qrisUrl, {
      responseType: 'arraybuffer'
    })
    const qrisBuffer = Buffer.from(response.data, 'binary')

    await sendButton(from, txt, "QRIS Payment", qrisBuffer, buttons, m)
  } catch (e) {
    console.error(e)
    reply("❌ Terjadi kesalahan saat mengambil QRIS.")
  }
}
break
case 'mutegc':
case 'banchat':
case 'mutegrup':
  if (!m.isGroup) return reply('⚠️ Fitur ini hanya dapat digunakan di dalam grup!')

  if (!isAdmins && !isCreator) return reply('👑 Khusus admin grup!')
  
  if (text === 'on') {
    if (isMute) return reply('✅ Mute sudah aktif di grup ini')
    
    mutegrup.push(from)
    fs.writeFileSync("./database/mutegc.json", JSON.stringify(mutegrup))
    reply(`🔒 *Mute Group has been activated in this group!*\n\nNobody is allowed to use bot only admin`)
    
  } else if (text === 'off') {
    if (!isMute) return reply('❌ Mute sudah nonaktif di grup ini')
    
    let offgrup = mutegrup.indexOf(from)
    mutegrup.splice(offgrup, 1)
    fs.writeFileSync("./database/mutegc.json", JSON.stringify(mutegrup))
    reply(`🔓 *Mute Group has been deactivated in this group!*`)
    
  } else {
    reply(`⚙️ *Mute Settings*\n\n` +
          `📌 Current status: ${Antilinkgc ? '✅ ACTIVE' : '❌ INACTIVE'}\n\n` +
          `📝 *Usage:*\n` +
          `➤ ${prefix + command} on  - Activate mutegc\n` +
          `➤ ${prefix + command} off - Deactivate mutegc`)
  }
break
case 'antitagsw':
  if (!m.isGroup) return reply('⚠️ Fitur ini hanya dapat digunakan di dalam grup!')

  if (!isAdmins && !isCreator) return reply('👑 Khusus admin grup!')
  
  if (text === 'on') {
    if (Antitagsw) return reply('✅ Anti Tag sudah aktif di grup ini')
    
    nttagsw.push(from)
    fs.writeFileSync("./database/antitagsw.json", JSON.stringify(nttagsw))
    reply(`🔒 *Anti Tag has been activated in this group!*\n\nNobody is allowed to send tag/mention messages!`)
    
  } else if (text === 'off') {
    if (!Antitagsw) return reply('❌ Anti Tag sudah nonaktif di grup ini')
    
    let off = nttagsw.indexOf(from)
    nttagsw.splice(off, 1)
    fs.writeFileSync("./database/antitagsw.json", JSON.stringify(nttagsw))
    reply(`🔓 *Anti Tag has been deactivated in this group!*`)
    
  } else {
    reply(`⚙️ *Anti Tag Settings*\n\n` +
          `📌 Current status: ${Antitagsw ? '✅ ACTIVE' : '❌ INACTIVE'}\n\n` +
          `📝 *Usage:*\n` +
          `➤ ${prefix + command} on  - Activate anti tag\n` +
          `➤ ${prefix + command} off - Deactivate anti tag`)
  }
break
  case 'owner':
case 'creator': {
    let vcard = 'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        `N:;${global.namaowner};;;\n` +
        `FN:${global.namaowner}\n` +
        `ORG:${global.namaowner};\n` +  // ganti Creator Satanic
        `item1.TEL;type=CELL;type=VOICE;waid=${global.owner}:+${global.owner}\n` +
        `item1.X-ABLabel:${global.namaowner}\n` +  // ganti Creator Satanic
        'item2.EMAIL;type=INTERNET:-\n' +
        'item2.X-ABLabel:Email\n' +
        'item3.URL:https://instagram.com/stnic1_\n' +
        'item3.X-ABLabel:Instagram\n' +
        'item4.ADR:;;Indonesia;;;;\n' +
        'item4.X-ABLabel:Region\n' +
        `item5.X-ABLabel:${global.namaowner}\n` +  // ganti Creator
        'END:VCARD';

    satanic.sendMessage(m.chat, {
        contacts: {
            displayName: `${global.namaowner}`,
            contacts: [{ vcard }]
        }
    }, { quoted: fkontak });
}
break;
case 'autoread':
  if (!isCreator) return reply(mess.owner)
  
  if (text === 'on') {
    global.autoread = true
    reply('✅ Auto read ON')
  } else if (text === 'off') {
    global.autoread = false
    reply('✅ Auto read OFF')
  } else {
    reply(`📱 Auto Read: ${global.autoreadsw ? 'ON' : 'OFF'}\n\nUse: .readsw on/off`)
  }
break
case 'autotyping':
  if (!isCreator) return reply(mess.owner)
  
  if (text === 'on') {
    global.autotyping = true
    reply('✅ Auto typing status ON')
  } else if (text === 'off') {
    global.autotyping = false
    reply('✅ Auto typing status OFF')
  } else {
    reply(`📱 Auto typing Status: ${global.typing ? 'ON' : 'OFF'}\n\nUse: .readsw on/off`)
  }
break
case 'onlygroup':
case 'onlygc':
    if (!isCreator) return reply('Fitur Khusus owner!')
    if (args.length < 1) return reply(`Contoh: ${prefix + command} on/off`)
    if (text == 'on') {
        global.onlygroup = true
        reply(`Successfully Changed Onlygroup To ${text}`)
    } else if (text == 'off') {
        global.onlygroup = false
        reply(`Successfully Changed Onlygroup To ${text}`)
    }
    break
case 'onlygrupprivate':
case 'onlygcprivate':
    if (!isCreator) return reply('Fitur Khusus owner!')
    if (args.length < 1) return reply(`Contoh: ${prefix + command} on/off`)
    if (text == 'on') {
        global.onlygrup = true
        reply(`Successfully Changed Onlygroup To ${text}`)
    } else if (text == 'off') {
        global.onlygrup = false
        reply(`Successfully Changed Onlygroup To ${text}`)
    }
    break
case 'onlyprivatechat':
case 'onlypc':
    if (!isCreator) return reply('Fitur Khusus owner!')
    if (args.length < 1) return reply(`Contoh: ${prefix + command} on/off`)
    if (text == 'on') {
        global.onlypc = true
        reply(`Successfully Changed Only-Pc To ${text}`)
    } else if (text == 'off') {
        global.onlypc = false
        reply(`Successfully Changed Only-Pc To ${text}`)
    }
    break
case 'addgb':           
case "addgroup": {
if (!isCreator) return
    const inputText = m.text.slice(prefix.length + command.length).trim();
    let groupId;
    if (!inputText && m.isGroup) {
        groupId = m.chat;
    } 
    else if (inputText) {
        groupId = inputText.split(' ')[0];
        if (!groupId.includes('@g.us')) {
            groupId = groupId + '@g.us';
        }
        groupId = groupId.replace(/[^0-9@.usg]/g, '').replace(/(.*?)@g\.us$/, '$1@g.us');
    }
    else {
        return reply(`Penggunaan:\n1. Di dalam grup: ${prefix + command}\n2. Di chat pribadi: ${prefix + command} <id_group>\nContoh: ${prefix + command} 718191010191@g.us`);
    }
    if (pgroup.includes(groupId)) {
        return reply(`❌ Grup dengan ID: ${groupId}\nSudah terdaftar sebagai grup premium!`);
    }
    pgroup.push(groupId);
    fs.writeFileSync("./database/groupadd.json", JSON.stringify(pgroup));
    reply(`✅ *Sukses Menambahkan Grup Premium!*\n┌  *ID Grup:* ${groupId}\n└  *Status:* Aktif Premium`);
}
break;
case 'delgb':
case "delgroup": {
if (!isCreator) return
    const inputText = m.text.slice(prefix.length + command.length).trim();
    let groupId;
    if ((inputText.toLowerCase() === 'me' || !inputText) && m.isGroup) {
        groupId = m.chat;
    }
    else if (inputText && inputText.toLowerCase() !== 'me') {
        groupId = inputText.split(' ')[0];
        if (!groupId.includes('@g.us')) {
            groupId = groupId + '@g.us';
        }
        groupId = groupId.replace(/[^0-9@.usg]/g, '').replace(/(.*?)@g\.us$/, '$1@g.us');
    }
    else {
        return reply(`Penggunaan:\n1. Di dalam grup: ${prefix + command} atau ${prefix + command} me\n2. Di chat pribadi: ${prefix + command} <id_group>\nContoh: ${prefix + command} 718191010191@g.us`);
    }
    if (!pgroup.includes(groupId)) {
        return reply(`❌ Grup dengan ID: ${groupId}\nTidak ditemukan dalam daftar premium!`);
    }
    const index = pgroup.indexOf(groupId);
    pgroup.splice(index, 1);
    fs.writeFileSync("./database/groupadd.json", JSON.stringify(pgroup));
    reply(`✅ *Sukses Menghapus Grup Premium!*\n┌  *ID Grup:* ${groupId}\n└  *Status:* Premium Dihapus`);
}
break;
case "addprem":
case "prem":
case "premium":
{
    if (!isCreator) {
        return reply(mess.owner);
    }
    if (!q) {
        return reply(`Use ${prefix + command} number\nContoh ${prefix + command} 6285813708397`);
    }
    premi = `${q.split("|")[0].replace(/[^0-9]/g, "")}@s.whatsapp.net`;
    let cekprem = await satanic.onWhatsApp(premi);
    if (cekprem.length == 0) {
        return reply(`Masukkan nomor yang valid dan terdaftar di WhatsApp!!!`);
    }
    premium.push(premi);
    fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
    reply(`The Number ${premi} Has Been premium`);
}
break;
case "delpremium":
case "delprem":
    if (!isCreator) {
        return reply(mess.owner);
    }
    if (!q) {
        return reply(`Use ${prefix + command} nomor\nContoh ${prefix + command} 6285813708397`);
    }
    yaprem = `${q.split("|")[0].replace(/[^0-9]/g, "")}@s.whatsapp.net`;
    unprem = premium.indexOf(yaprem);
    premium.splice(unprem, 1);
    fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
    reply(`The Number ${yaprem} Has Been Removed premium!`);
    break;
    case "listprem":
case "listpremium":
{
    if (!isCreator) {
        return reply(mess.owner);
    }
    if (premium.length === 0) {
        return reply(`*📋 DAFTAR PREMIUM*\n\nTidak ada nomor premium terdaftar.`);
    }
    
    let text = `*📋 DAFTAR PREMIUM*\n\n`;
    text += `*Total:* ${premium.length} nomor\n\n`;
    text += `*DAFTAR NOMOR:*\n`;
    
    for (let i = 0; i < premium.length; i++) {
        let nomor = premium[i].split('@')[0];
        text += `${i+1}. ${nomor}\n`;
    }
    
    reply(text);
}
break;
    case "addvip":
{
    if (!isCreator) {
        return reply(mess.owner);
    }
    if (!q) {
        return reply(`Use ${prefix + command} number\nContoh ${prefix + command} 6285813708397`);
    }
    vipusr = `${q.split("|")[0].replace(/[^0-9]/g, "")}@s.whatsapp.net`;
    let cekvip = await satanic.onWhatsApp(vipusr);
    if (cekvip.length == 0) {
        return reply(`Masukkan nomor yang valid dan terdaftar di WhatsApp!!!`);
    }
    usrvip.push(vipusr);
    fs.writeFileSync("./database/uservip.json", JSON.stringify(usrvip));
    reply(`The Number ${vipusr} Has Been VIP`);
}
break;
case "delvip":
    if (!isCreator) {
        return reply(mess.owner);
    }
    if (!q) {
        return reply(`Use ${prefix + command} nomor\nContoh ${prefix + command} 6285813708397`);
    }
    yavip = `${q.split("|")[0].replace(/[^0-9]/g, "")}@s.whatsapp.net`;
    unvip = usrvip.indexOf(yavip);
    usrvip.splice(unvip, 1);
    fs.writeFileSync("./database/uservip.json", JSON.stringify(usrvip));
    reply(`The Number ${yavip} Has Been Removed premium!`);
    break;
    case "listvip":
case "listvipusr":
{
    if (!isCreator) {
        return reply(mess.owner);
    }
    if (usrvip.length === 0) {
        return reply(`*📋 DAFTAR VIP*\n\nTidak ada nomor VIP terdaftar.`);
    }
    
    let text = `*📋 DAFTAR VIP*\n\n`;
    text += `*Total:* ${usrvip.length} nomor\n\n`;
    text += `*DAFTAR NOMOR:*\n`;
    
    for (let i = 0; i < usrvip.length; i++) {
        let nomor = usrvip[i].split('@')[0];
        let noFormatted = nomor.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        text += `${i+1}. ${noFormatted}\n`;
    }
    
    reply(text);
}
break;
    case 'autoreadsw':
  if (!isCreator) return reply(mess.owner)
  
  if (text === 'on') {
    global.autoreadsw = true
    reply('✅ Auto read status ON')
  } else if (text === 'off') {
    global.autoreadsw = false
    reply('✅ Auto read status OFF')
  } else {
    reply(`📱 Auto Read Status: ${global.autoreadsw ? 'ON' : 'OFF'}\n\nUse: .readsw on/off`)
  }
break
 case 'autoreactsw':
  if (!isCreator) return reply(mess.owner)
  
  if (text === 'on') {
    global.autoreactsw = true
    reply('✅ Auto react status ON')
  } else if (text === 'off') {
    global.autoreactsw = false
    reply('✅ Auto react status OFF')
  } else {
    reply(`📱 Auto Read Status: ${global.autoreactsw ? 'ON' : 'OFF'}\n\nUse: .readsw on/off`)
  }
break
case "resetwarning":
case "resetwarn":
{
    if (!m.isGroup) return satanic.sendMessage(m.chat, { text: "❌ Perintah ini hanya untuk grup!" }, { quoted: fkontak });
    if (!isAdmins && !isOwner) return satanic.sendMessage(m.chat, { text: "❌ Perintah ini hanya untuk admin grup!" }, { quoted: fkontak });
    
    let warnData = {};
    try {
        warnData = JSON.parse(fs.readFileSync("./database/warning.json"));
    } catch (e) {
        warnData = {};
    }
    
    if (warnData[m.chat]) {
        delete warnData[m.chat];
        fs.writeFileSync("./database/warning.json", JSON.stringify(warnData, null, 2));
        satanic.sendMessage(m.chat, { text: "✅ Semua warning di grup ini telah direset!" }, { quoted: fkontak });
    } else {
        satanic.sendMessage(m.chat, { text: "❌ Tidak ada data warning di grup ini." }, { quoted: fkontak });
    }
}
break;
case "listwarning":
case "listwarn":
{
    if (!m.isGroup) return satanic.sendMessage(m.chat, { text: "❌ Perintah ini hanya untuk grup!" }, { quoted: fkontak });
    if (!isAdmins && !isCreator) return satanic.sendMessage(m.chat, { text: "❌ Perintah ini hanya untuk admin grup!" }, { quoted: fkontak });
    
    let warnData = {};
    try {
        warnData = JSON.parse(fs.readFileSync("./database/warning.json"));
    } catch (e) {
        warnData = {};
    }
    
    if (!warnData[m.chat] || Object.keys(warnData[m.chat]).length === 0) {
        return satanic.sendMessage(m.chat, { text: "✅ Tidak ada user yang memiliki warning di grup ini." }, { quoted: fkontak });
    }
    
    let teks = "📋 *DAFTAR WARNING GROUP* 📋\n\n";
    let no = 1;
    let mentions = [];
    
    // Urutkan dari warning terbanyak
    let sortedWarn = Object.entries(warnData[m.chat]).sort((a, b) => b[1] - a[1]);
    
    for (let [user, warn] of sortedWarn) {
        let progress = "";
        for (let i = 1; i <= 3; i++) {
            progress += i <= warn ? "⬛" : "⬜";
        }
        teks += `${no++}. @${user.split('@')[0]} : ${warn} warning ${progress}\n`;
        mentions.push(user);
    }
    
    teks += `\nTotal: ${sortedWarn.length} user terkena warning`;
    
    satanic.sendMessage(m.chat, { 
        text: teks,
        mentions: mentions
    }, { quoted: fkontak });
}
break;
case "cekwarning":
case "cekwarn":
case "warning":
{
    if (!m.isGroup) return satanic.sendMessage(m.chat, { text: "❌ Perintah ini hanya untuk grup!" }, { quoted: fkontak });
    
    let target = m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : sender);
    
    let warnData = {};
    try {
        warnData = JSON.parse(fs.readFileSync("./database/warning.json"));
    } catch (e) {
        warnData = {};
    }
    
    let userWarn = warnData[m.chat]?.[target] || 0;
    
    // Buat progress bar visual
    let progress = "";
    for (let i = 1; i <= 3; i++) {
        progress += i <= userWarn ? "⬛" : "⬜";
    }
    
    let teks = `📊 *CEK WARNING* 📊\n\n`;
    teks += `○ *User* : @${target.split('@')[0]}\n`;
    teks += `○ *Warning* : ${userWarn} / 3\n`;
    teks += `○ *Progress* : ${progress}\n`;
    teks += `○ *Status* : ${userWarn >= 3 ? "🔴 AKAN DIKICK" : "🟢 AMAN"}`;
    
    satanic.sendMessage(m.chat, { 
        text: teks,
        mentions: [target]
    }, { quoted: fkontak });
}
break;
case "delwarning":
case "delwarn":
case "kurangiwarning":
{
    if (!m.isGroup) return satanic.sendMessage(m.chat, { text: "❌ Perintah ini hanya untuk grup!" }, { quoted: fkontak });
    if (!isAdmins && !isCreator) return satanic.sendMessage(m.chat, { text: "❌ Perintah ini hanya untuk admin grup!" }, { quoted: fkontak });
    
    let target = m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
    
    if (!target) {
        return satanic.sendMessage(m.chat, { 
            text: `❌ Tag atau reply pesan user yang ingin dikurangi warningnya!\nContoh: *${prefix + command}* @user` 
        }, { quoted: fkontak });
    }
    
    let warnData = {};
    try {
        warnData = JSON.parse(fs.readFileSync("./database/warning.json"));
    } catch (e) {
        warnData = {};
    }
    
    if (!warnData[m.chat] || !warnData[m.chat][target]) {
        return satanic.sendMessage(m.chat, { 
            text: `✅ User @${target.split('@')[0]} tidak memiliki warning.`,
            mentions: [target]
        }, { quoted: fkontak });
    }
    
    // Kurangi warning
    warnData[m.chat][target] -= 1;
    let sisaWarn = warnData[m.chat][target];
    
    // Hapus jika 0
    if (sisaWarn <= 0) {
        delete warnData[m.chat][target];
        
        // Hapus grup jika kosong
        if (Object.keys(warnData[m.chat]).length === 0) {
            delete warnData[m.chat];
        }
    }
    
    fs.writeFileSync("./database/warning.json", JSON.stringify(warnData, null, 2));
    
    let teks = `✅ *WARNING BERKURANG* ✅\n\n`;
    teks += `○ *User* : @${target.split('@')[0]}\n`;
    teks += `○ *Warning* : -1\n`;
    teks += `○ *Sisa* : ${sisaWarn || 0} warning`;
    
    satanic.sendMessage(m.chat, { 
        text: teks,
        mentions: [target]
    }, { quoted: fkontak });
}
break;
case "warning":
case "warn":
{
    if (!m.isGroup) return satanic.sendMessage(m.chat, { text: "❌ Perintah ini hanya untuk grup!" }, { quoted: fkontak });
    if (!isAdmins && !isCreator) return satanic.sendMessage(m.chat, { text: "❌ Perintah ini hanya untuk admin grup!" }, { quoted: fkontak });
    
    // Cek apakah ada yang di-tag atau reply
    let target = m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
    
    if (!target) {
        return satanic.sendMessage(m.chat, { 
            text: `❌ Tag atau reply pesan user yang ingin diberi warning!\nContoh: *${prefix + command}* @user alasan` 
        }, { quoted: fkontak });
    }
    
    // Ambil alasan (text setelah mention)
    let alasan = text.replace(new RegExp(`@${target.split('@')[0]}\\s*`), '').trim();
    alasan = alasan || "Tidak ada alasan";
    
    // Load data warning
    let warnData = {};
    try {
        warnData = JSON.parse(fs.readFileSync("./database/warning.json"));
    } catch (e) {
        warnData = {};
    }
    
    // Inisialisasi grup jika belum ada
    if (!warnData[m.chat]) {
        warnData[m.chat] = {};
    }
    
    // Inisialisasi user jika belum ada
    if (!warnData[m.chat][target]) {
        warnData[m.chat][target] = 0;
    }
    
    // Tambah warning
    warnData[m.chat][target] += 1;
    let currentWarn = warnData[m.chat][target];
    
    // Simpan ke file
    fs.writeFileSync("./database/warning.json", JSON.stringify(warnData, null, 2));
    
    // Kirim notifikasi
    let teks = `⚠️ *WARNING SYSTEM* ⚠️\n\n`;
    teks += `┌  ○ *User* : @${target.split('@')[0]}\n`;
    teks += `│  ○ *Warning* : +1\n`;
    teks += `│  ○ *Total* : ${currentWarn} warning\n`;
    teks += `│  ○ *Alasan* : ${alasan}\n`;
    teks += `│  ○ *Admin* : @${sender.split('@')[0]}\n`;
    teks += `└  ○ *Batas* : 3 warning = kick\n\n`;
    
    // Cek jika warning mencapai batas (3)
    let batasWarn = 3;
    if (currentWarn >= batasWarn) {
        teks += `⚠️ *PERHATIAN!*\n`;
        teks += `User @${target.split('@')[0]} telah mencapai ${batasWarn} warning!\n`;
        teks += `🔴 *Tindakan: Dikeluarkan dari grup!*\n\n`;
        
        // Hapus data user
        delete warnData[m.chat][target];
        
        // Hapus grup jika kosong
        if (Object.keys(warnData[m.chat]).length === 0) {
            delete warnData[m.chat];
        }
        
        fs.writeFileSync("./database/warning.json", JSON.stringify(warnData, null, 2));
        
        // Kirim pesan sebelum kick
        await satanic.sendMessage(m.chat, { 
            text: teks,
            mentions: [target, sender]
        }, { quoted: fkontak });
        
        // Kick user dari grup
        setTimeout(async () => {
            await satanic.groupParticipantsUpdate(m.chat, [target], "remove");
        }, 2000);
    } else {
        // Kirim notifikasi biasa
        await satanic.sendMessage(m.chat, { 
            text: teks,
            mentions: [target, sender]
        }, { quoted: fkontak });
    }
}
break;
case 'addbadword': {
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  if (!text) return reply(`⚠️ Masukkan kata yang ingin ditambahkan!\n\nContoh: ${prefix + command} tolol`)
  
  let badwordList = []
  try {
    if (fs.existsSync("./database/badword.json")) {
      badwordList = JSON.parse(fs.readFileSync("./database/badword.json"))
    } else {
      fs.writeFileSync("./database/badword.json", "[]")
    }
  } catch (e) {
    badwordList = []
    fs.writeFileSync("./database/badword.json", "[]")
  }
  
  const word = text.toLowerCase().trim()
  
  if (!badwordList.includes(word)) {
    badwordList.push(word)
    fs.writeFileSync("./database/badword.json", JSON.stringify(badwordList, null, 2))
    reply(`✅ Badword *"${word}"* berhasil ditambahkan!\n\nTotal badword: ${badwordList.length}`)
  } else {
    reply(`❌ Badword *"${word}"* sudah ada dalam daftar!`)
  }
}
break
case 'listbadword': {
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  
  let badwordList = []
  try {
    if (fs.existsSync("./database/badword.json")) {
      badwordList = JSON.parse(fs.readFileSync("./database/badword.json"))
    }
  } catch (e) {}
  
  if (badwordList.length === 0) return reply('📋 Daftar badword kosong!')
  
  let teks = `📋 *DAFTAR BADWORD*\n\n`
  teks += `Total: ${badwordList.length} kata\n\n`
  
  for (let i = 0; i < badwordList.length; i++) {
    teks += `${i + 1}. ${badwordList[i]}\n`
  }
  
  reply(teks)
}
break

// ==================== DELETE BADWORD ====================
case 'delbadword': {
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  if (!text) return reply(`⚠️ Masukkan kata yang ingin dihapus!\n\nContoh: ${prefix + command} tolol`)
  
  let badwordList = []
  try {
    if (fs.existsSync("./database/badword.json")) {
      badwordList = JSON.parse(fs.readFileSync("./database/badword.json"))
    } else {
      return reply('📋 Daftar badword masih kosong!')
    }
  } catch (e) {
    return reply('📋 Daftar badword masih kosong!')
  }
  
  const word = text.toLowerCase().trim()
  const index = badwordList.indexOf(word)
  
  if (index !== -1) {
    badwordList.splice(index, 1)
    fs.writeFileSync("./database/badword.json", JSON.stringify(badwordList, null, 2))
    reply(`✅ Badword *"${word}"* berhasil dihapus!\n\nSisa badword: ${badwordList.length}`)
  } else {
    reply(`❌ Badword *"${word}"* tidak ditemukan!`)
  }
}
break

// ==================== ANTIBADWORD ON/OFF ====================
case 'antibadword': {
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  if (!m.isGroup) return reply('⚠️ Perintah ini hanya untuk grup!')
  
  let antiBadwordData = {}
  try {
    if (fs.existsSync("./database/antibadword.json")) {
      antiBadwordData = JSON.parse(fs.readFileSync("./database/antibadword.json"))
    } else {
      fs.writeFileSync("./database/antibadword.json", JSON.stringify(antiBadwordData))
    }
  } catch (e) {
    fs.writeFileSync("./database/antibadword.json", JSON.stringify(antiBadwordData))
  }
  
  const groupId = m.chat
  const currentStatus = antiBadwordData[groupId] || false
  
  if (!text) {
    return reply(`⚠️ Pilih on/off!\n\nContoh: ${prefix + command} on\n\nStatus saat ini: ${currentStatus ? 'ON ✅' : 'OFF ❌'}`)
  }
  
  const option = text.toLowerCase().trim()
  
  if (option === 'on') {
    antiBadwordData[groupId] = true
    fs.writeFileSync("./database/antibadword.json", JSON.stringify(antiBadwordData, null, 2))
    reply('✅ *AntiBadword diaktifkan untuk grup ini!*')
  } else if (option === 'off') {
    antiBadwordData[groupId] = false
    fs.writeFileSync("./database/antibadword.json", JSON.stringify(antiBadwordData, null, 2))
    reply('❌ *AntiBadword dinonaktifkan untuk grup ini!*')
  } else {
    reply('⚠️ Pilihan tidak valid! Gunakan on/off')
  }
}
break
case 'welcome':
    if (!m.isGroup) return reply('Fitur Khusus Group!!!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
    
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {}
    
    if (args[0] === 'on') {
        global.db.chats[m.chat].welcome = true
        reply('✅ Welcome DIACTIVEKAN')
    } else if (args[0] === 'off') {
        global.db.chats[m.chat].welcome = false
        reply('❌ Welcome DINONACTIVEKAN')
    } else {
        const status = global.db.chats[m.chat].welcome ? '✅ AKTIF' : '❌ NONAKTIF'
        reply(`*STATUS WELCOME:* ${status}\n\n!welcome on - Aktifkan\n!welcome off - Nonaktifkan`)
    }
    break
    case 'left':
    if (!m.isGroup) return reply('Fitur Khusus Group!!!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
    
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {}
    if (args[0] === 'on') {
        global.db.chats[m.chat].left = true
        reply('✅ Left DIACTIVEKAN')
    } else if (args[0] === 'off') {
        global.db.chats[m.chat].left = false
        reply('❌ Left DINONACTIVEKAN')
    } else {
        const status = global.db.chats[m.chat].left ? '✅ AKTIF' : '❌ NONAKTIF'
        reply(`*STATUS LEFT:* ${status}\n\n!left on - Aktifkan\n!left off - Nonaktifkan`)
    }
    break
case 'setwelcome': {               
    if (!m.isGroup) return reply('Fitur Khusus Group!!!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
  if (!text) return reply(`Example : ${prefix + command} Welcome @user\n\n1. @user - tag people who join\n2. @bio - take the bio of people who join\n3. @date - take the date when people join\n4. @subject - take group name\n5. @desc - take group description`)
 global.db.chats[m.chat].setWelcome = text
 reply(`Caption Default : ${satanic.setWelcome} => Has Been Changed To : ${text}`)
}
break
 case 'setleft': {
    if (!m.isGroup) return reply('Fitur Khusus Group!!!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
  if (!text) return reply(`Example : ${prefix + command} Welcome @user\n\n1. @user - tag people who join\n2. @bio - take the bio of people who join\n3. @date - take the date when people join\n4. @subject - take group name\n5. @desc - take group description`)
 global.db.chats[m.chat].setLeft = text
 reply(`Caption Default : ${satanic.setLeft} => Has Been Changed To : ${text}`)
}
break
case 'delsetwelcome': {
    if (!m.isGroup) return reply('Fitur Khusus Group!!!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
    delete global.db.chats[m.chat].setWelcome
    reply(`Berhasil menghapus custom welcome message. Sekarang akan menggunakan default.`)
}
break

case 'delsetleft': {
    if (!m.isGroup) return reply('Fitur Khusus Group!!!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
    delete global.db.chats[m.chat].setLeft
    reply(`Berhasil menghapus custom left message. Sekarang akan menggunakan default.`)
}
break
case 'ban':
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  
  let target = null
  
  if (m.quoted) {
    target = m.quoted.sender
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    target = m.mentionedJid[0]
  } else if (text) {
    const nomor = text.replace(/[^0-9]/g, '')
    target = nomor + '@s.whatsapp.net'
  } else {
    return reply(`⚠️ Tag, reply, atau masukkan nomor user yang ingin di-ban!\n\nContoh: ${prefix + command} @user`)
  }
  
  if (target === botNumber) return reply('❌ Tidak bisa memban bot sendiri!')
  if (target === m.sender) return reply('❌ Tidak bisa memban diri sendiri!')
  
  if (!bannedList.includes(target)) {
    bannedList.push(target)
    fs.writeFileSync("./database/banuser.json", JSON.stringify(bannedList))
    reply(`✅ *User berhasil di-ban!*\n\n🚫 @${target.split('@')[0]} tidak dapat menggunakan perintah bot lagi.`, { mentions: [target] })
  } else {
    reply(`❌ User sudah dalam daftar ban!`)
  }
break
case 'unban':
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  
  let targetUnban = null
  
  if (m.quoted) {
    targetUnban = m.quoted.sender
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    targetUnban = m.mentionedJid[0]
  } else if (text) {
    const nomor = text.replace(/[^0-9]/g, '')
    targetUnban = nomor + '@s.whatsapp.net'
  } else {
    return reply(`⚠️ Tag, reply, atau masukkan nomor user yang ingin di-unban!\n\nContoh: .unban 628xxx`)
  }
  
  const index = bannedList.indexOf(targetUnban)
  if (index !== -1) {
    bannedList.splice(index, 1)
    fs.writeFileSync("./database/banuser.json", JSON.stringify(bannedList))
    reply(`✅ *User berhasil di-unban!*\n\n✅ @${targetUnban.split('@')[0]} sekarang dapat menggunakan perintah bot lagi.`, { mentions: [targetUnban] })
  } else {
    reply(`❌ User tidak ditemukan dalam daftar ban!`)
  }
break
case 'listban':
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  
  if (bannedList.length === 0) {
    reply(`📋 *Daftar Ban*\n\nTidak ada user yang di-ban.`)
  } else {
    let text = `📋 *Daftar User yang Di-Ban*\n\n`
    for (let user of bannedList) {
      text += `👤 @${user.split('@')[0]}\n`
    }
    text += `\n📊 Total: ${bannedList.length} user`
    reply(text, { mentions: bannedList })
  }
break
case 'upswgc':          
 case "swgroup":
case "swgc": {
if (!m.isGroup) return reply(mess.group);
  if (!isAdmins && !isCreator) return reply(mess.admin);

    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";

    const body = m.body || "";
    const caption = body
        .replace(new RegExp(`^\\${prefix}${command}\\s*`, "i"), "")
        .trim();

    const jid = m.chat;

    if (/image/.test(mime)) {
        const buffer = await quoted.download();
        await satanic.sendMessage(jid, {
            groupStatusMessage: {
                image: buffer,
                caption
            }
        });
        satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key }})

    } else if (/video/.test(mime)) {
        const buffer = await quoted.download();
        await satanic.sendMessage(jid, {
            groupStatusMessage: {
                video: buffer,
                caption
            }
        });
        satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key }})

    } else if (/audio/.test(mime)) {
        const buffer = await quoted.download();
        await satanic.sendMessage(jid, {
            groupStatusMessage: {
                audio: buffer
            }
        });
        satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key }})

    } else if (caption) {
        await satanic.sendMessage(jid, {
            groupStatusMessage: {
                text: caption
            }
        });
        satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key }})

    } else {
        await reply(
            `Contoh penggunaan:\n` +
            `${prefix + command} halo gais\n` +
            `atau reply media dengan caption`
        );
    }
}
break;
case 'addautogc': {
       if (!isAdmins && !isCreator) return

        const groupId = m.chat;
        let groupList = loadGroupList();

        if (groupList.includes(groupId)) return reply("⚠️ Group sudah ada dalam daftar!");

        groupList.push(groupId);
        saveGroupList(groupList);

        reply(`✅ Berhasil menambahkan group ini ke daftar auto open/close.`);
    }
    break;
    case 'delautogc': {
        if (!isAdmins && !isCreator) return

        const groupId = m.chat;
        let groupList = loadGroupList();

        if (!groupList.includes(groupId))
            return reply("⚠️ Group ini tidak ada dalam daftar!");

        groupList = groupList.filter(id => id !== groupId);
        saveGroupList(groupList);

        reply(`❌ Group ini dihapus dari sistem auto open/close.`);
    }
    break;
    case 'listautogc': {
    let groupList = loadGroupList();
    if (groupList.length === 0) return reply("📭 Tidak ada group yang didaftarkan.");

    let teks = "📌 *Daftar Group Auto Open/Close:*\n\n";
    let no = 1;

    for (let id of groupList) {
        try {
            const metadata = await satanic.groupMetadata(id);
            const name = metadata.subject || "Tidak diketahui";
            teks += `${no++}. ${name} (${id})\n`;
        } catch {
            teks += `${no++}. Tidak bisa mengambil nama (${id})\n`;
        }
    }

    reply(teks);
}
break;
case 'jadwalsholat': {
  let jadwal = `
📅 *JADWAL SHOLAT HARI INI*
━━━━━━━━━━━━━━━━━━
🌙 *Shubuh*: 04:30 WIB
☀️ *Terbit*: 05:44 WIB
🌅 *Dhuha*: 06:16 WIB
🍽️ *Dzuhur*: 12:00 WIB
⌛ *Ashar*: 15:30 WIB
🌇 *Magrib*: 18:00 WIB
🌙 *Isya*: 19:30 WIB
━━━━━━━━━━━━━━━━━━
📢 *AutoSholat aktif akan mengirim notifikasi otomatis*
🕌 *Tetap jaga sholat 5 waktu!*
  `;
  reply(jadwal);
  break;
}
case 'autosholat': {
  if (!global.autoshalat) global.autoshalat = {};
  if (args[0] === 'on') {
    global.autoshalat[m.chat] = true;
    reply('✅ AutoSholat AKTIF');
  } else if (args[0] === 'off') {
    delete global.autoshalat[m.chat];
    reply('❌ AutoSholat NONAKTIF');
  }
  break;
}
case 'sider':
case 'siders': {
    const metadata = await satanic.groupMetadata(m.chat);
    const groupName = metadata.subject;
    const lama = 86400000 * 7; // 7 hari
    const now = Date.now();

    const member = metadata.participants.map(v => v.id);
    const pesan = text || "Harap aktif di grup karena akan ada pembersihan anggota setiap saat.";

    let sider = [];

    for (let id of member) {
        const user = metadata.participants.find(u => u.id == id);
        const dbUser = global.db.users[id];

        if (user.isAdmin || user.isSuperAdmin) continue;

        if (!dbUser) {
            sider.push({ id, kategori: 'malas nimbrung' });
        } else if (dbUser.banned) {
            sider.push({ id, kategori: 'Banned' });
        } else if (now - dbUser.lastseen > lama) {
            sider.push({ id, kategori: 'Tidak aktif >7 hari' });
        }
    }

    if (sider.length === 0) return reply("*Tidak ada member sider pada grup ini.*");

    const textSider = sider.map(v => `• @${v.id.split("@")[0]} (${v.kategori})`).join("\n");

    await satanic.sendMessage(m.chat, {
        text: `*${sider.length}/${member.length}* Anggota Grup *${groupName}* menjadi sider:\n_“${pesan}”_\n\n*Anggota Sider:*\n${textSider}`,
        contextInfo: { mentionedJid: sider.map(v => v.id) }
    }, { quoted: fkontak });
}
break;
case 'siderv2':
case 'kicksiderv2': {
    if (!m.isGroup) return reply('❌ Fitur ini khusus grup!')
    await satanic.sendMessage(m.chat, { react: { text: "🔎", key: m.key } })

    let groupMetadata = await satanic.groupMetadata(m.chat)
    let participants = groupMetadata.participants
    let chatData = global.db.chats[m.chat]?.users || {}

    let totalMember = participants.length
    let now = Date.now()
    let oneWeek = 604800000

    let ghosts = []
    let siders = []
    let active = []

    for (let member of participants) {
        let id = member.id
        let finalJid = id

        if (id.includes('@lid')) {
            if (satanic.findJidByLid) {
                let found = satanic.findJidByLid(id)
                if (found) finalJid = found
            }
            if (finalJid.includes('@lid')) {
                let manual = Object.keys(chatData).find(key => chatData[key].lid === id)
                if (manual) finalJid = manual
            }
        } else {
            finalJid = satanic.decodeJid(id)
        }

        let userDB = chatData[finalJid]

        if (!userDB || userDB.total === 0) {
            ghosts.push(finalJid)
        } else {
            let lastSeen = userDB.lastSeen || 0
            let daysNoChat = Math.floor((now - lastSeen) / 86400000)

            let userData = {
                id: finalJid,
                total: userDB.total,
                last: lastSeen,
                days: daysNoChat,
                name: userDB.name || 'Unknown'
            }

            if (now - lastSeen > oneWeek) {
                siders.push(userData)
            } else {
                active.push(userData)
            }
        }
    }

    if (args[0] === 'kick') {
        if (!isAdmins) return reply('❌ Khusus admin grup!')
        if (ghosts.length === 0) return reply('⚠️ Tidak ada ghost sider.')

        await reply(`🚀 Mengeluarkan ${ghosts.length} ghost...`)

        for (let jid of ghosts) {
            await new Promise(r => setTimeout(r, 1500))
            await satanic.groupParticipantsUpdate(m.chat, [jid], 'remove')
        }

        return reply('✅ Berhasil bersih-bersih grup.')
    }

    active.sort((a, b) => b.total - a.total)
    siders.sort((a, b) => a.last - b.last)

    let teks = `📊 *ANALISIS GRUP*\n`
    teks += `👥 Total: ${totalMember}\n`
    teks += `🗣️ Aktif: ${active.length}\n`
    teks += `💤 Sider: ${siders.length}\n`
    teks += `👻 Ghost: ${ghosts.length}\n`
    teks += `━━━━━━━━━━━━━━━\n\n`

    teks += `🏆 *MEMBER AKTIF*\n`
    if (active.length === 0) {
        teks += `- Belum ada data\n`
    } else {
        teks += active.map((v, i) => {
            return `${i + 1}. @${v.id.split('@')[0]} (💬 ${v.total})`
        }).join('\n')
    }
    teks += `\n\n💤 *SIDER 7 HARI+*\n`
    if (siders.length === 0) {
        teks += `- Nihil\n`
    } else {
        teks += siders.map(v => {
            return `@${v.id.split('@')[0]} (${v.days} hari)`
        }).join('\n')
    }
    teks += `\n\n👻 *GHOST 0 CHAT*\n`
    if (ghosts.length === 0) {
        teks += `- Nihil\n`
    } else {
        teks += ghosts.map(v => `@${v.split('@')[0]}`).join('\n')
    }

    teks += `\n\nKetik *${prefix + command} kick* untuk kick ghost`

    let mentions = [
        ...active.map(v => v.id),
        ...siders.map(v => v.id),
        ...ghosts
    ]

    await satanic.sendMessage(m.chat, {
        text: teks,
        mentions
    }, { quoted: fkontak })
}
break
case 'tagadmin': 
    if (!m.isGroup) return satanic.sendMessage(m.chat, { text: mess.only.group });
    let adminList = [];
    let adminNames = [];
    let adminIds = [];
    participants.forEach((participant) => {
        if (participant.admin === "admin" || participant.admin === "superadmin") {
            adminNames.push(participant.id.split('@')[0]);  
            adminIds.push(participant.id);  // ID admin
            adminList.push(`@${participant.id.split('@')[0]}`); 
        }
    });

    const groupPP = 'https://example.com/default-image.jpg'; 
    const groupName = groupMetadata.subject;

    if (adminList.length > 0) {
        let tagMessage = `🌟 *Admin Grup*:\n\n*Nama Grup:* ${groupName}\n\n${adminNames.map((name, i) => `*${name}* (@${adminIds[i].split('@')[0]})`).join('\n')}`;
        satanic.sendMessage(m.chat, {
            text: tagMessage,
            mentions: adminIds,
            caption: 'Daftar admin grup.',
            thumbnail: { url: groupPP }
        });
    } else {
        satanic.sendMessage(m.chat, { text: '😓 Tidak ada admin di grup ini.' });
    }
    break;
case 'setnamegc':
case 'setsubject':
if (!m.isGroup) return reply(mess.group);
if (!isAdmins && !isCreator) return reply(mess.admin)

if (!text) return reply('Mau di namain apa kak grupnya? 🤔');
await satanic.groupUpdateSubject(m.chat, text);
reply(mess.done);
break;

case 'topmember':
case 'totalchat':
case 'totalpesan': {
    if (!m.isGroup) return reply('onlygroup')
    if (!isAdmins) return reply('you are not admin')
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {}
    if (!global.db.chats[m.chat].totalChat) global.db.chats[m.chat].totalChat = {}
    const metadata = await satanic.groupMetadata(m.chat)
    const groupName = metadata.subject
    const totalMembers = metadata.participants.length
if (text && text.toLowerCase() === 'reset') {
    console.log("Sebelum reset:", global.db.chats[m.chat].totalChat);
    
    // Reset dengan cara delete semua key
    const chatData = global.db.chats[m.chat];
    if (chatData.totalChat) {
        Object.keys(chatData.totalChat).forEach(key => {
            delete chatData.totalChat[key];
        });
    }
    
    console.log("Sesudah reset:", global.db.chats[m.chat].totalChat);
    reply("✅ *Statistik chat berhasil di reset.*");
}
    const entries = Object.entries(global.db.chats[m.chat].totalChat)
        .filter(([jid]) => jid.endsWith('@s.whatsapp.net'))
        .map(([jid, count]) => ({ jid, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15)
    if (entries.length === 0) {
        return reply(`📊 *CHAT INSIGHT*\n\n> Belum ada data chat tercatat.`)
    }
    const medals = ['🥇','🥈','🥉']
    const mentions = []
    const totalMessages = entries.reduce((sum, el) => sum + el.count, 0)

    let teks = `📊 *CHAT INSIGHT*
🏷️ *Grup* : ${groupName}
👥 *Total Member* : ${totalMembers}
💬 *Total Pesan* : ${totalMessages.toLocaleString('id-ID')}
🏆 *TOP MEMBER PALING AKTIF*
`

    for (let i = 0; i < entries.length; i++) {
        const { jid, count } = entries[i]
        const name = jid.split('@')[0]
        const medal = medals[i] || '🏅'

        mentions.push(jid)

        let percent = ((count / totalMessages) * 100).toFixed(1)
        let bar = '▰'.repeat(Math.round(percent / 10)) + '▱'.repeat(10 - Math.round(percent / 10))

        teks += `
${medal} @${name}
💬 ${count.toLocaleString('id-ID')} pesan
📊 ${bar} ${percent}%
`
    }

    teks += `
📈 *STATISTIK GRUP* 
🔝lTop Chat : ${entries[0]?.count.toLocaleString('id-ID')} pesan
🗂️ Member Aktif : ${entries.length}
👥 Total Member : ${totalMembers}
⚡ Tracking : Real-time

> Gunakan *${prefix + command} reset* untuk mereset statistik
`

    await satanic.sendMessage(
        m.chat,
        { text: teks, mentions },
        { quoted: fkontak }
    )
}
break
case 'inspect':
case 'cekid': 
case 'idch': 
case 'idgb': 
case 'idgc': 
case 'cekidch': 
case 'cekidgc': 
case 'cekidsaluran': 
case 'cekidgb': 
case 'cekidgroup': {
    if (!text) return reply(`input id nya`)
    const isChannel = text.includes('https://whatsapp.com/channel/')
    const grupRegex = /chat\.whatsapp\.com\/([A-Za-z0-9]+)/i
    const boolStatus = (v) => (v === true ? 'Aktif' : v === false ? 'Tidak Aktif' : (v ?? '-'))

    if (!isChannel && !grupRegex.test(text)) return replytolak(global.mess.query.link)

    try {
        if (isChannel) {
            const code = text.split('https://whatsapp.com/channel/')[1]
            if (!code) return reply('link tidak valid')

            const res = await satanic.newsletterMetadata('invite', code)

            const channelId = res.id || ''
            const channelName = res.name || ''

            const teks = `\`\`\`📢 Informasi Channel WhatsApp\`\`\`

🗒️ *Nama:* ${channelName || '-'}
🆔 *ID:* ${channelId || '-'}
👥 *Total Pengikut:* ${res.subscribers ?? '-'}
📌 *Status:* ${res.state || '-'}
✅ *Verifikasi:* ${res.verification == "VERIFIED" ? "Terverifikasi" : "Tidak"}`

            const msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({ text: teks }),
                            footer: proto.Message.InteractiveMessage.Footer.create({ text: "" }),
                            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: [
                                    {
                                        name: "cta_copy",
                                        buttonParamsJson: JSON.stringify({
                                            display_text: "📋 Salin ID",
                                            copy_code: `${channelId}`
                                        })
                                    },
                                    {
                                        name: "cta_copy",
                                        buttonParamsJson: JSON.stringify({
                                            display_text: "📋 Salin Nama",
                                            copy_code: `${channelName}`
                                        })
                                    }
                                ]
                            })
                        })
                    }
                }
            }, { quoted: fkontak })

            return satanic.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
        }

        const inviteCode = text.match(grupRegex)[1]
        const g = await satanic.groupGetInviteInfo(inviteCode)

        let pp = null
        try {
            pp = await satanic.profilePictureUrl(g.id, 'image')
        } catch {
            pp = null
        }

        const admins = (g.participants || []).filter(v => v.admin)
        const groupId = g.id || ''
        const groupName = g.subject || '-'
        const creator = g.owner ? '@' + g.owner.split('@')[0] : '-'

        const teks = `\`\`\`👥 Informasi Grup WhatsApp\`\`\`

🗒️ *Nama:* ${groupName || '-'}
🆔 *ID:* ${groupId || '-'}
👥 *Total Member:* ${g.size || g.participants?.length || '-'}
📅 *Dibuat:* ${g.creation ? new Date(g.creation * 1000).toLocaleString() : '-'}
👑 *Creator:* ${creator}

⚙️ \`\`\`Pengaturan  Group\`\`\`
🔒 *Restrict:* ${boolStatus(g.restrict)}
📢 *Announce:* ${boolStatus(g.announce)}
🏘️ *Community:* ${boolStatus(g.isCommunity)}
✅ *Join Approval:* ${boolStatus(g.joinApprovalMode)}
➕ *Member Add Mode:* ${boolStatus(g.memberAddMode)}

📝 \`\`\`Deskripsi\`\`\`
${g.desc || '-'}

👮 \`\`\`Admin\`\`\`
${admins.length ? admins.map(a => `- @${a.id.split('@')[0]} (${a.admin})`).join('\n') : '-'}`

        const mentioned = [
            ...(g.owner ? [g.owner] : []),
            ...admins.map(a => a.id)
        ]

        if (pp) {
            const media = await prepareWAMessageMedia(
                { image: { url: pp } },
                { upload: satanic.waUploadToServer }
            )

            const msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({ text: teks }),
                            footer: proto.Message.InteractiveMessage.Footer.create({ text: "" }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                hasMediaAttachment: true,
                                imageMessage: media.imageMessage
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: [
                                    {
                                        name: "cta_copy",
                                        buttonParamsJson: JSON.stringify({
                                            display_text: "📋 Salin ID",
                                            copy_code: `${groupId}`
                                        })
                                    },
                                    {
                                        name: "cta_copy",
                                        buttonParamsJson: JSON.stringify({
                                            display_text: "📋 Salin Nama",
                                            copy_code: `${groupName !== '-' ? groupName : ''}`
                                        })
                                    }
                                ]
                            })
                        })
                    }
                }
            }, { quoted: fkontak })

            msg.message.viewOnceMessage.message.interactiveMessage.contextInfo = { mentionedJid: mentioned }

            return satanic.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
        }

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({ text: teks }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: "" }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                {
                                    name: "cta_copy",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "📋 Salin ID",
                                        copy_code: `${groupId}`
                                    })
                                },
                                {
                                    name: "cta_copy",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "📋 Salin Nama",
                                        copy_code: `${groupName !== '-' ? groupName : ''}`
                                    })
                                }
                            ]
                        })
                    })
                }
            }
        }, { quoted: fkontak })

        msg.message.viewOnceMessage.message.interactiveMessage.contextInfo = { mentionedJid: mentioned }
return satanic.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
    } catch (err) {
        console.log(err)
        return reply('eror')
    }
}
break

 case "rvo": case "readviewonce": {
if (!m.quoted) return reply("reply pesan viewOnce nya!")
let msg = m?.quoted?.message?.imageMessage || m?.quoted?.message?.videoMessage || m?.quoted?.message?.audioMessage || m?.quoted
if (!msg.viewOnce && m.quoted.mtype !== "viewOnceMessageV2" && !msg.viewOnce) return reply("Pesan itu bukan viewonce!")
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
let media = await downloadContentFromMessage(msg, msg.mimetype == 'image/jpeg' ? 'image' : msg.mimetype == 'video/mp4' ? 'video' : 'audio')
    let type = msg.mimetype
    let buffer = Buffer.from([])
    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
    }
    if (/video/.test(type)) {
        return satanic.sendMessage(m.chat, {video: buffer, caption: msg.caption || ""}, {quoted: fkontak})
    } else if (/image/.test(type)) {
        return satanic.sendMessage(m.chat, {image: buffer, caption: msg.caption || ""}, {quoted: fkontak})
    } else if (/audio/.test(type)) {
        return satanic.sendMessage(m.chat, {audio: buffer, mimetype: "audio/mpeg", ptt: true}, {quoted: fkontak})
    } 
}
break
case 'setdesc':
case 'setdesk':
if (!m.m.isGroup) return reply(mess.group);
if (!isAdmins && !m.isGroupOwner && !isCreator) return reply(mess.admin);
if (!text) return reply('Text ?')
await satanic.groupUpdateDescription(m.chat, text)
reply(mess.done)
break;
case 'cleardesc':
case 'cleardesk':{
if (!m.m.isGroup) return reply('Perintah ini hanya dapat digunakan dalam grup.');
if (!isAdmins && !isCreator) return reply('Perintah ini hanya dapat digunakan oleh admin.');
try {
await satanic.groupUpdateDescription(m.chat, null);
reply('Deskripsi grup berhasil dihapus.');
} catch (err) {
console.error(err);
reply('Gagal menghapus deskripsi grup.');
}
}
break;
case 'getnamegc':
case 'getsubject': {
if (!m.isGroup) return reply(mess.group);
if (!isAdmins && !isCreator) return reply(mess.admin)

try {
reply(groupName);
} catch (error) {
console.log(error);
reply('Gagal saat melakukan tindakan, jika anda pemilik silahkan cek console.');
};
};
break
case 'getdesk':
case 'metadatadesc':
case 'getdesc': {
if (!m.isGroup) return reply(mess.group);
if (!isAdmins && !isCreator) return reply(mess.admin)
try {
reply(groupMetadata.desc)
} catch (error) {
console.log(error);
reply('Gagal saat melakukan tindakan, jika anda pemilik silahkan cek console.');
};
};
break
case 'getppgc': {
if (!m.isGroup) return reply(mess.group);
if (!isAdmins && !isCreator) return reply(mess.admin)

try {
avatarr = await satanic.profilePictureUrl(m.chat, "image")
} catch {
avatarr = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
satanic.sendMessage(m.chat, {image: {url: avatarr }, caption: `©satanic` }, {quoted: fkontak })
}
break
case 'setppgc': case 'setppgroup':{
if (!m.isGroup) return reply(mess.group);
if (!isAdmins && !isCreator) return reply(mess.admin)
const { S_WHATSAPP_NET } = require('@whiskeysockets/baileys');
	async function generateProfilePicture(media) {
    const image = await jimp.read(media);
    const min = image.getWidth();
    const max = image.getHeight();
    const cropped = image.crop(0, 0, min, max);
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
        preview: await cropped.normalize().getBufferAsync(jimp.MIME_JPEG)
    };
}
if (!quoted) return reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)

				let media = await satanic.downloadAndSaveMediaMessage(quoted);
				const group = m.chat;
				const { img } = await generateProfilePicture(media);
				await satanic.query({
					tag: 'iq',
					attrs: {					
                        target: group,
                        to: S_WHATSAPP_NET,
						type:'set',
						xmlns: 'w:profile:picture'
					},
					content: [
						{
							tag: 'picture',
							attrs: { type: 'image' },
							content: img
						} 
					]
				})
				reply(mess.done);
			}
			break

case "getpp": {
if (!m.isGroup) return reply(mess.group);
if (!isAdmins && !isCreator) return reply(mess.admin)
let target = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : null
if (!target) return reply("Reply/@tag target nya")

var ppuser
try {
ppuser = await satanic.profilePictureUrl(target, 'image')
} catch (err) {
ppuser = 'https://files.catbox.moe/ejy4ky.jpg'
}
return satanic.sendMessage(m.chat, {image: {url: ppuser}, caption: `Sukses mengambil profil @${target.split("@")[0]}`, mentions: target}, {quoted: fkontak})
}
break 
case 'afk':
  if (text) {
    try {
      const groupMeta = await satanic.groupMetadata(m.chat);
      const participant = groupMeta.participants.find(p => p.jid === m.sender);
      const lid = participant ? participant.id : m.sender;
      
      console.log("JID:", m.sender);
      console.log("LID (id):", lid);
      
      afkData[lid] = {
        reason: text,
        time: Date.now()
      };
      
      fs.writeFileSync("./database/afk.json", JSON.stringify(afkData));
      reply(`✅ AFK aktif!\n📝 Alasan: ${text}`);
    } catch (e) {
      console.log("Error:", e);
      reply(`⚠️ Gagal set AFK: ${e.message}`);
    }
  } else {
    reply(`⚠️ Masukkan alasan!\nContoh: ${prefix + command} lagi makan`);
  }
break
case 'listpc': {
 let anulistp = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
 let teks = ` *PERSONAL CHAT LIST*\n\nTotal Chat : ${anulistp.length} Chat\n\n`
 for (let i of anulistp) {
 let nama = store.messages[i].array[0].pushName
 teks += ` *Name :* ${nama}\n *User :* @${i.split('@')[0]}\n *Chat :* https://wa.me/${i.split('@')[0]}\n\n────────────────────────\n\n`
 }
 reply(teks)
}
break
case 'listgc': {
 let anulistg = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
 let teks = ` *GROUP CHAT LIST*\n\nTotal Group : ${anulistg.length} Group\n\n`
 for (let i of anulistg) {
 let metadata = await satanic.groupMetadata(i)
 teks += ` *Name :* ${metadata.subject}\n *Owner :* ${metadata.owner !== undefined ? '@' + metadata.owner.split`@`[0] : 'Unknown'}\n *ID :* ${metadata.id}\n *Made :* ${moment(metadata.creation * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss')}\n *Member :* ${metadata.participants.length}\n\n────────────────────────\n\n`
 }
 reply(teks)
}
break
 case 'totag': {
if (!m.isGroup) return reply('only group')
if (!isAdmins) return reply('Khusus Admin!!')
  if (!m.quoted) return reply(`Reply message with caption ${prefix + command}`)
  satanic.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) })
 }
break
case "hidetag": {
if (!isAdmins && !isCreator) return reply(mess.admin)
if (m.quoted) {
satanic.sendMessage(m.chat, {
forward: m.quoted.fakeObj,
mentions: participants.map(a => a.id)
})
}
if (!m.quoted) {
satanic.sendMessage(m.chat, {
text: text ? text : '',
mentions: participants.map(a => a.id)
}, { quoted: fkontak })
}
}
break

case 'linkgroup':
case 'linkgc':
case 'gclink':
case 'grouplink': {
    if (!m.isGroup) return reply('Perintah ini hanya bisa digunakan di dalam grup!');    
    let response = await satanic.groupInviteCode(m.chat);
    let groupMetadata = await satanic.groupMetadata(m.chat);
    await satanic.sendMessage(m.chat, { 
        text: `🔗 *GROUP LINK*\n\n📌 *Nama Grup:* ${groupMetadata.subject}\n🔗 *Link:* https://chat.whatsapp.com/${response}\n\n📥 *Download by:* ${namaBot}`,
        detectLink: true
    }, { quoted: fkontak });
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'resetlinkgc':
case 'resetlinkgroup':
case 'resetlinkgrup':
case 'revoke':
case 'resetlink':
case 'resetgrouplink':
case 'resetgclink':
case 'resetgruplink': {
if (!isAdmins && !isCreator) return reply(mess.admin)

satanic.groupRevokeInvite(m.chat)
}
break
case 'joingc': {
 if (!isCreator) return 
 if (!text) return reply(`Contoh penggunaan:\n${prefix + command} https://chat.whatsapp.com/xxx`)
    let link = text.trim()
    const urlRegex = /(https?:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22,})/gi
    const match = link.match(urlRegex)
    
    if (match) {
        link = match[0]
    }
    if (!link.includes('chat.whatsapp.com')) {
        return reply('❌ *Link Invalid!*\n\nPastikan link adalah link undangan grup WhatsApp.\nContoh: https://chat.whatsapp.com/xxxxxxxxxxxxx')
    }
    let result = link.split('https://chat.whatsapp.com/')[1]
    if (!result) {
        // Coba method alternatif
        result = link.replace('https://chat.whatsapp.com/', '')
        if (result.includes('/')) {
            result = result.split('/')[0]
        }
    }
    if (!result || result.length < 22) {
        return reply('❌ *Link Invalid!*\n\nKode undangan tidak valid atau terlalu pendek.')
    }
    reply(mess.wait)
    try {
        await satanic.groupAcceptInvite(result)
        reply('✅ *Berhasil join ke grup!*')
    } catch (err) {
        console.error('Join Error:', err)
        let errorStr = String(err)
        
        if (errorStr.includes('400')) return reply('❌ *Grup Tidak Ditemukan!*\n\nPastikan link undangan masih aktif.')
        if (errorStr.includes('401')) return reply('❌ *Bot Di Kick Dari Grup Tersebut!*\n\nBot tidak bisa join karena pernah dikick.')
        if (errorStr.includes('409')) return reply('❌ *Bot Sudah Join!*\n\nBot sudah berada di grup tersebut.')
        if (errorStr.includes('410')) return reply('❌ *Link Kadaluarsa!*\n\nLink undangan telah direset oleh admin grup.')
        if (errorStr.includes('500')) return reply('❌ *Grup Penuh!*\n\nGrup sudah mencapai batas maksimal anggota.')
        
        reply(`❌ *Gagal Join!*\n\nError: ${errorStr.substring(0, 200)}\n\nPastikan:\n1. Link undangan masih aktif\n2. Bot tidak diblokir\n3. Grup tidak penuh`)
    }
}
break
case 'poll': {
 let [poll, opt] = text.split("|")
 if (text.split("|") < 2)
return await reply(
`Sebutkan pertanyaan dan minimal 2 pilihan\nContoh: ${prefix}poll Siapa admin terbaik?|Akbar,Hydro,Furina...`
)
 let options = []
 for (let i of opt.split(',')) {
options.push(i)
}
 await satanic.sendMessage(m.chat, {
poll: {
name: poll,
values: options
}
 })
}
break
case 'promote':
case 'pm': {
if (!m.isGroup) return reply(mess.group);
if (!isAdmins && !isCreator) return reply(mess.admin)

let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
if (!m.mentionedJid[0] && !m.quoted && !text) return reply(`Hmm... Kamu mau ${command} siapa? 🤔`)
await satanic.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(mess.done)).catch((err) => reply(mess.error))
}
break
case 'demote':
case 'dm': {
if (!m.isGroup) return reply(mess.group);
if (!isAdmins && !isCreator) return reply(mess.admin)

let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
if (!m.mentionedJid[0] && !m.quoted && !text) return reply(`Hmm... Kamu mau ${command} siapa? 🤔`)
await satanic.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(mess.done)).catch((err) => reply(mess.error))
}
break
case 'opentime': {
if (!m.isGroup) return reply('only group')
if (!isAdmins && !isCreator) return reply('Khusus Admin!!')
if (args[1] == 'second') {
var timer = args[0] * `1000`
} else if (args[1] == 'minute') {
var timer = args[0] * `60000`
} else if (args[1] == 'hour') {
var timer = args[0] * `3600000`
} else if (args[1] == 'day') {
var timer = args[0] * `86400000`
} else {
return reply('*Choose:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
}
reply(`Open Time ${q} Starting from now`)
setTimeout(() => {
var nomor = m.participant
const open = `*On time* Group Opened By Admin\n Now Members Can Send Messages`
satanic.groupSettingUpdate(from, 'not_announcement')
reply(open)
}, timer)
}
break
case 'closetime': {
if (!m.isGroup) return reply('only group')
if (!isAdmins && !isCreator) return reply('Khusus Admin!!')

if (args[1] == 'second') {
var timer = args[0] * `1000`
} else if (args[1] == 'minute') {
var timer = args[0] * `60000`
} else if (args[1] == 'hour') {
var timer = args[0] * `3600000`
} else if (args[1] == 'day') {
var timer = args[0] * `86400000`
} else {
return reply('*Choose:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
}
reply(`Close Time ${q} Starting from now`)
setTimeout(() => {
var nomor = m.participant
const close = `*On time* Group Closed By Admin\nNow Only Admins Can Send Messages`
satanic.groupSettingUpdate(from, 'announcement')
reply(close)
}, timer)
}
break
case 'kick': {
if (!m.isGroup) return reply(mess.group);
if (!isAdmins) return reply(mess.admin)

let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await satanic.groupParticipantsUpdate(m.chat, [users], 'remove')
await reply(`Done`)
}
break
case 'kickme': {
  if (!m.isGroup) return reply(mess.group);
  let sender = m.sender;  
  await satanic.groupParticipantsUpdate(m.chat, [sender], 'remove');
  reply(`Anda telah keluar dari grup ini.`);
}
break;
case 'add': {
if (!m.isGroup) return reply(mess.group);
if (!isAdmins && !isCreator) return reply(mess.admin)

let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await satanic.groupParticipantsUpdate(m.chat, [users], 'add')
await reply(`Done`)
}
break
case "get": case ".g": {
  if (m.key.fromMe) return
  if (!text) return reply("https://example.com");
  try {
    const url = text.trim();
    if (!isUrl(url)) return reply("Link tidak valid.");

    await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    const res = await axios.get(url, {
      responseType: "arraybuffer",
      validateStatus: () => true
    });

    const headers = res.headers || {};
    const contentType = (headers["content-type"] || "").split(";")[0].toLowerCase();
    const contentDisp = headers["content-disposition"] || "";

    let filename = "download";
    try {
      const u = new URL(url);
      const last = decodeURIComponent(u.pathname.split("/").filter(Boolean).pop() || "");
      if (last) filename = last;
    } catch {}
    const cdMatch = contentDisp.match(/filename\*?=(?:UTF-8'')?"?([^";]+)/i);
    if (cdMatch) filename = decodeURIComponent(cdMatch[1].replace(/"/g, ""));
    if (!/\.[a-z0-9]{2,}$/i.test(filename) && contentType) {
      const ctExt = contentType.includes("/") ? contentType.split("/")[1] : "bin";
      const safeExt = (ctExt || "bin").replace(/[^a-z0-9]/gi, "");
      filename = `${filename}.${safeExt || "bin"}`;
    }

    const buf = Buffer.from(res.data);
    const fileSizeMB = buf.length / (1024 * 1024);

    const sendAs = async (kind, extra = {}) => {
      return satanic.sendMessage(
        m.chat,
        { [kind]: buf, mimetype: contentType || "application/octet-stream", fileName: filename, ...extra },
        { quoted: fkontak }
      );
    };

    if (contentType.startsWith("image/")) {
      await sendAs("image", { caption: filename });
    } else if (contentType.startsWith("video/")) {
      if (fileSizeMB > 100) {
        await sendAs("document");
      } else {
        await sendAs("video");
      }
    } else if (contentType.startsWith("audio/")) {
      await sendAs("audio");
    } else if (
      contentType === "application/octet-stream" ||
      (contentType.startsWith("application/") && !contentType.includes("json"))
    ) {
      await sendAs("document");
    } else if (
      contentType.startsWith("text/") ||
      contentType.includes("json") ||
      contentType === ""
    ) {
      let body;
      try {
        body = buf.toString("utf8");
      } catch {
        body = "(Tidak dapat mendekode konten teks)";
      }
      await reply(body);
    } else {
      await sendAs("document");
    }

    await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  } catch (e) {
    console.error("GET error:", e);
    await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
  }
}
break;

/////// STICKER MENU. ////////
  case 'togif': {
  async function webp2GifFile(path) {
    return new Promise(async (resolve, reject) => {
      try {
        const form = new FormData()
        form.append('new-image-url', '')
        form.append('new-image', fs.createReadStream(path))
        
        const { data: firstPage } = await axios({
          method: 'post',
          url: 'https://ezgif.com/webp-to-mp4',
          data: form,
          headers: {
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`
          }
        })
        const $ = cheerio.load(firstPage)
        const file = $('input[name="file"]').attr('value')
        if (!file) {
          throw new Error('Tidak dapat menemukan file input pada halaman')
        }
        const formDataThen = new FormData()
        formDataThen.append('file', file)
        formDataThen.append('convert', "Convert WebP to MP4!")
        
        const { data: secondPage } = await axios({
          method: 'post',
          url: `https://ezgif.com/webp-to-mp4/${file}`,
          data: formDataThen,
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formDataThen._boundary}`
          }
        })
        const $$ = cheerio.load(secondPage)
        let videoSrc = $$('div#output video source').attr('src')
        if (!videoSrc) videoSrc = $$('#output video source').attr('src')
        if (!videoSrc) videoSrc = $$('video source').attr('src')
        if (!videoSrc) videoSrc = $$('.outfile video source').attr('src')
        if (!videoSrc) {
          const downloadLink = $$('a#download').attr('href')
          if (downloadLink) {
            videoSrc = downloadLink
          } else {
            throw new Error('Tidak dapat menemukan URL video hasil konversi')
          }
        }
        let resultUrl = videoSrc
        if (videoSrc.startsWith('//')) {
          resultUrl = 'https:' + videoSrc
        } else if (!videoSrc.startsWith('http')) {
          resultUrl = 'https://ezgif.com' + (videoSrc.startsWith('/') ? videoSrc : '/' + videoSrc)
        }
        resolve({
          status: true,
          message: "Lumakara (NEWCODING)",
          result: resultUrl
        })
        
      } catch (err) {
        reject(err)
      }
    })
  }

  if (!quoted) return reply('⚠️ Balas ke stiker untuk dikonversi ke GIF.')
  
  const mime = (quoted.msg || quoted).mimetype || ''
  if (!/webp/i.test(mime)) return reply(`⚠️ Format tidak didukung. Gunakan perintah *${prefix + command}* pada stiker.`)

  reply('wait be processed')

  let media = null
  try {
    media = await satanic.downloadAndSaveMediaMessage(quoted)
    if (!media || !fs.existsSync(media)) {
      throw new Error('Gagal mendownload media')
    }
    
    const webpToGif = await webp2GifFile(media)
    
    if (!webpToGif || !webpToGif.result) {
      throw new Error('Hasil konversi kosong')
    }
    
    await satanic.sendMessage(m.chat, {
      video: { url: webpToGif.result },
      caption: '✅ Berhasil dikonversi dari stiker ke GIF.',
      gifPlayback: true  // true = tampil sebagai GIF (loop, tanpa suara)
    }, { quoted: fkontak })
    
  } catch (err) {
    console.error('togif error:', err.message || err)
    reply(`❌ Terjadi kesalahan: ${err.message || 'Gagal mengonversi stiker ke GIF.'}`)
  } finally {
    if (media && fs.existsSync(media)) {
      try {
        await fs.unlinkSync(media)
      } catch (e) {
        console.error('Gagal hapus file:', e)
      }
    }
  }
}
break
 case 'toimg': {
				if (!quoted) return reply('Reply Image')
				if (!/webp/.test(mime)) return reply(`Reply sticker dengan caption *${prefix + command}*`)
				let media = await satanic.downloadAndSaveMediaMessage(quoted)
				let ran = await getRandom('.png')
				exec(`ffmpeg -i ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) throw err
					let buffer = fs.readFileSync(ran)
					satanic.sendMessage(m.chat, { image: buffer }, { quoted: fkontak })
					fs.unlinkSync(ran)
				})
			}		
			break;		 
case 'toptv': {		
				let q = m.quoted ? m.quoted : m;
				if (!/video|audio/.test(mime)) return reply(`Hmm, Kamu harus balas video atau voice note yang mau dijadikan MP3 ya, jangan lupa pakai caption *${prefix + command}* 😉`);
				try {
					let media = await q.download();
					let dataVideo = {
						ptvMessage: m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
					};
					satanic.relayMessage(m.chat, dataVideo, {});
				} catch (error) {
					console.log(error);
					reply("Aduh, ada yang salah nih kak 😟. Coba lagi ya!");
				}
			}
			
			break
case 'toaud': case 'tomp3': case 'toaudio': {
            if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Send/Reply Video/Audio You Want to Use as Audio With Caption ${prefix + command}`)
            if (!quoted) return reply(`Send/Reply Video/Audio You Want to Use as Audio With Caption ${prefix + command}`)
            reply(mess.wait)
            let media = await quoted.download()
            let { toAudio } = require('./lib/converter')
            let audio = await toAudio(media, 'mp4')
            satanic.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
            }
break
            case 'tovn': case 'toptt': {
            if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Reply Video/Audio That You Want To Be VN With Caption ${prefix + command}`)
            if (!quoted) return reply(`Reply Video/Audio That You Want To Be VN With Caption ${prefix + command}`)
            reply(mess.wait)
            let media = await quoted.download()
            let { toPTT } = require('./lib/converter')
            let audio = await toPTT(media, 'mp4')
            satanic.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:fkontak})
            }
            break
  case 's': case 'sticker': case 'stiker': {
				if (!quoted) return reply(`Kirim atau balas gambar/video/gif dengan caption ${prefix + command}\nDurasi video 1-9 detik ya!`);
				if (!mime) return reply(`Kirim atau balas gambar/video/gif dengan caption ${prefix + command}\nDurasi video 1-9 detik ya!`);
				if (/image/.test(mime)) {
					
					let media = await satanic.downloadAndSaveMediaMessage(quoted);
					await satanic.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
				} else if (/video/.test(mime)) {
					if ((quoted.msg || quoted).seconds > 9) return reply(`Durasi video terlalu panjang! 🕒 Kirim video dengan durasi 1-9 detik ya!`);

					let media = await satanic.downloadAndSaveMediaMessage(quoted);
					await satanic.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
				} else {
					reply(`Kirim atau balas gambar/video/gif dengan caption ${prefix + command}\nDurasi video 1-9 detik ya!`);
				}
			}		
			break;
case 'swm': case 'wm': case 'stickerwm': case 'take': {
    if (!quoted) return reply(`Kirim atau balas gambar/video/gif dengan caption ${prefix + command}\nDurasi video 1-9 detik ya!`);
    if (!mime) return reply(`Kirim atau balas gambar/video/gif dengan caption ${prefix + command}\nDurasi video 1-9 detik ya!`);
    
    // Ambil text dari pesan utama, bukan args
    const fullText = m.body || "";
    // Hapus prefix dan command dari text
    const textAfterCommand = fullText.replace(new RegExp(`^${prefix}${command}\\s*`), "").trim();
    
    // Split berdasarkan pipe (|)
    const swn = textAfterCommand || "";
    const pcknm = swn.split("|")[0]?.trim() || "";
    const atnm = swn.split("|")[1]?.trim() || "";
    
    // Default values jika tidak ada input
    const packName = pcknm || "Sticker";
    const authorName = atnm || "Bot";
    
    if (m.quoted.isAnimated === true) {
        let media = await satanic.downloadAndSaveMediaMessage(quoted);
        satanic.sendMessage(m.chat, { 
            sticker: media 
        }, m, { 
            packname: packName, 
            author: authorName 
        });
    } else if (/image/.test(mime)) {
        let media = await satanic.downloadAndSaveMediaMessage(quoted);
        await satanic.sendImageAsSticker(m.chat, media, m, { 
            packname: packName, 
            author: authorName 
        });
    } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 9) return reply('Video terlalu panjang, maksimal 9 detik ya! ⏳');
        let media = await satanic.downloadAndSaveMediaMessage(quoted);
        await satanic.sendVideoAsSticker(m.chat, media, m, { 
            packname: packName, 
            author: authorName 
        });
    } else {
        reply(`Kirim foto/video untuk dipakai ya, kak!`);
    }
    break;
}	
case 'tts': case 'texttospeech': case 'say':
case 'ttsgoku': case 'ttseminem': case 'ttsmickey':
case 'ttsnahida': case 'ttselon': case 'ttsoptimus': {
    const _ttsT=text?.trim();
    if (!_ttsT) return reply(`🎤 *ᴛᴛs*\n\nVoice tersedia: tts, ttsgoku, ttseminem, ttsmickey, ttsnahida, ttselon\nFormat: \`${prefix}tts <teks>\`\n\nContoh: \`${prefix}ttsgoku Hai semuanya!\``);
    const _ttsVK={ttsgoku:'goku',ttseminem:'eminem',ttsmickey:'mickey_mouse',ttsnahida:'nahida',ttselon:'elon_musk',ttsoptimus:'optimus_prime'};
    const _ttsVoice=_ttsVK[command]||null;
    satanic.sendMessage(m.chat,{react:{text:'🎤',key:m.key}});
    await reply(`⏳ *Generating ${_ttsVoice||'random'} voice...*\n_Teks: ${_ttsT}_`);
    if (!fs.existsSync('./temp')) fs.mkdirSync('./temp',{recursive:true});
    const _ttsTs=Date.now(),_ttsWav=`./temp/tts_${_ttsTs}.wav`,_ttsOgg=`./temp/tts_${_ttsTs}.ogg`;
    try {
        const _ttsR=await axios.get(`https://api.emiliabot.my.id/tools/text-to-speech?text=${encodeURIComponent(_ttsT)}`,{timeout:60000});
        if (!_ttsR.data?.status||!_ttsR.data?.result?.length) throw new Error('API tidak merespon atau kosong');
        const _ttsVoices=_ttsR.data.result.filter(v=>!v.error);
        if (!_ttsVoices.length) throw new Error('Semua model TTS error');
        let _ttsObj=_ttsVoice?_ttsVoices.find(v=>v[_ttsVoice]):null;
        if (!_ttsObj) _ttsObj=_ttsVoices[Math.floor(Math.random()*_ttsVoices.length)];
        const _ttsAK=Object.keys(_ttsObj).find(k=>!['channel_id','voice_name','voice_id'].includes(k)&&String(_ttsObj[k]).startsWith('https://'));
        if (!_ttsAK) throw new Error('Audio URL tidak ditemukan dari API');
        const _ttsAR=await axios.get(_ttsObj[_ttsAK],{responseType:'arraybuffer',timeout:30000});
        fs.writeFileSync(_ttsWav,Buffer.from(_ttsAR.data));
        execSync(`ffmpeg -y -i "${_ttsWav}" -c:a libopus -b:a 64k "${_ttsOgg}"`,{stdio:'ignore',timeout:30000});
        await satanic.sendMessage(m.chat,{audio:fs.readFileSync(_ttsOgg),mimetype:'audio/ogg; codecs=opus',ptt:true},{quoted:fkontak});
        satanic.sendMessage(m.chat,{react:{text:'✅',key:m.key}});
    } catch(e){satanic.sendMessage(m.chat,{react:{text:'❌',key:m.key}});reply(`❌ *TTS Gagal!*\n\n${e.message.slice(0,150)}`);}
    finally{try{if(fs.existsSync(_ttsWav))fs.unlinkSync(_ttsWav);}catch{}try{if(fs.existsSync(_ttsOgg))fs.unlinkSync(_ttsOgg);}catch{}}}
    break;   
case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':
    try {
        let set;
        if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20';
        else if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
        else if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
        else if (/earrape/.test(command)) set = '-af volume=12';
        else if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
        else if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
        else if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
        else if (/reverse/.test(command)) set = '-filter_complex "areverse"';
        else if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
        else if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
        else if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
        else if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';
        if (set) {
            if (/audio/.test(mime)) {
                await reply(mess.wait);
                let media = await satanic.downloadAndSaveMediaMessage(quoted);
                let ran = getRandom('.mp3');
                console.log(`Running ffmpeg command: ffmpeg -i ${media} ${set} ${ran}`);
                exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media);
                    if (err) {
                        console.error(`ffmpeg error: ${err}`);
                        return reply(err);
                    }                 
                    let buff = fs.readFileSync(ran);
                    satanic.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: fkontak });
                    fs.unlinkSync(ran);
                });
            } else {
                reply(`Reply to the audio you want to change with a caption *${prefix + command}*`);
            }
        } else {
            reply('Invalid command');
        }
    } catch (e) {
        reply(e);
    }
break    		           
case 'brat':
case 'bratgambar':
case 'bratimg': {
  if (!text) return reply('teksnya')
  const brat = `https://brat.siputzx.my.id/image?text=${encodeURIComponent(text)}&background=%23ffffff&color=%23000000&emojiStyle=apple`
  const response = await axios.get(brat, { responseType: 'arraybuffer' })
  await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname })
}
break
// BRAT BAHLIL
case "emojimix":
        {
          let [emoji1, emoji2] = text.split`+`;
          if (!emoji1) {
            return reply(`Contoh : ${prefix + command} 😅+🤔`);
          }
          if (!emoji2) {
            return reply(`Contoh : ${prefix + command} 😅+🤔`);
          }
          let anumojimix = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);
          for (let res of anumojimix.results) {
            let encmedia = await satanic.sendImageAsSticker(m.chat, res.url, m, {
              packname: global.packname,
              author: global.author,
              categories: res.tags
            });
          }
        }
        break;
case 'bratbahlil':
case 'bahlil':
case 'bratlil': {
 
    if (!text) return satanic.sendMessage(m.chat, { text: `❌ Masukkan teks!\nContoh: .bratbahlil Hayolo` }, { quoted: fkontak });

    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    const url = `https://api.ourin.my.id/api/bratbahlil?text=${encodeURIComponent(text)}`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    
    await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname, author: global.author });
}
break;

// BRAT CEWE
case 'bratcewe':
case 'cewebrat':
case 'bratgirl': {

    if (!text) return satanic.sendMessage(m.chat, { text: `❌ Masukkan teks!\nContoh: .bratcewe Hayolo` }, { quoted: fkontak });

    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    const url = `https://api.deline.web.id/maker/cewekbrat?text=${encodeURIComponent(text)}`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    
    await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname, author: global.author });
}
break;
case 'carbonify':
if (!text) return reply(`Example: ${prefix + command} story wa anime`);   
    try {
        const response = await fetch("https://carbonara.solopov.dev/api/cook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "code": text })
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await satanic.sendMessage(m.chat, { 
            image: buffer 
        }, { 
            quoted: fkontak 
        });
        
    } catch (error) {
        console.error('Carbonify error:', error);
        reply('❌ Gagal membuat gambar carbon. Coba lagi nanti.');
}
 break;
case 'brathd':
case 'hdbrat':
case 'bratkualitas': {
    if (!text) return satanic.sendMessage(m.chat, { text: `❌ Masukkan teks!\nContoh: .brathd Hayolo` }, { quoted: fkontak });

    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    const url = `https://api.ourin.my.id/api/brat-hd?text=${encodeURIComponent(text)}`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    
    await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname, author: global.author });
}
break;

// BRAT PATRICK
case 'bratpatrick':
case 'patrickbrat':
case 'bratspongebob': {

    if (!text) return satanic.sendMessage(m.chat, { text: `❌ Masukkan teks!\nContoh: .bratpatrick Hayolo` }, { quoted: fkontak });

    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    const url = `https://api.ourin.my.id/api/bratpatrick?text=${encodeURIComponent(text)}`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    
    await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname, author: global.author });
}
break;
case 'bratsquidward':
case 'squidwardbrat':
case 'bratcumi': {
    if (!text) return satanic.sendMessage(m.chat, { text: `❌ Masukkan teks!\nContoh: .bratsquidward Hayolo` }, { quoted: fkontak });
    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    const url = `https://api.ourin.my.id/api/bratsquidward?text=${encodeURIComponent(text)}`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    
    await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname, author: global.author });
}
break;
case 'bratanime':
case 'animebrat': {
    let text = m.text.trim();
    if (!text) return satanic.sendMessage(m.chat, { text: `❌ Masukkan teks!\nContoh: .bratanime Hayolo` }, { quoted: fkontak });

    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    const url = `https://api.nexray.web.id/maker/bratanime?text=${encodeURIComponent(text)}`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    
    await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname, author: global.author });
}
break;
function getRandomColor() {
    const colors = ['FF5733', 'C70039', '900C3F', '581845', '2E86AB', 'A23B72', 'F18F01', 'C73E1D', '3A0CA3', '7209B7', '4361EE', '4CC9F0'];
    return colors[Math.floor(Math.random() * colors.length)];
}
case 'attp':
case 'atext': {
    let text = m.text?.trim();
    if (!text && m.quoted?.text) {
        text = m.quoted.text.trim();
    }
    if (!text) {
        return satanic.sendMessage(m.chat, { text: `🎨 *Animated Text Sticker*\n\n> Masukkan teks untuk sticker\n\n> Contoh: .attp Hello World` }, { quoted: fkontak });
    }
    if (text.length > 100) {
        return satanic.sendMessage(m.chat, { text: `❌ Teks terlalu panjang! Maksimal 100 karakter.` }, { quoted: fkontak });
    }

    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    try {
        const color = getRandomColor();
        const url = `https://api.neoxr.eu/api/attp3?text=${encodeURIComponent(text)}&color=${color}&apikey=${global.NEOXR_APIKEY}`;
        const data = await fetch(url);
        
        if (!data?.status || !data?.data?.url) {
            throw new Error('API tidak mengembalikan data yang valid');
        }
        
        const stickerUrl = data.data.url;
        const response = await axios.get(stickerUrl, { responseType: 'arraybuffer' });
        
        await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname, author: global.author });
    } catch (error) {
        console.error(error);
        return satanic.sendMessage(m.chat, { text: `❌ Error: ${error.message}` }, { quoted: fkontak });
    }
}
break;
case 'pakustad':
case 'ustad':
case 'ustadz': {
    if (!text) return satanic.sendMessage(m.chat, { text: `❌ Masukkan teks!\nContoh: .pakustad Jangan putus asa` }, { quoted: fkontak });

    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    
    const apiUrl = `https://api.cuki.biz.id/api/canvas/ustadz?apikey=cuki-x&text=${encodeURIComponent(text)}`;
    const { data } = await axios.get(apiUrl);
    
    await satanic.sendMessage(m.chat, { image: { url: data.results.url }, caption: `“${text}”` }, { quoted: fkontak });
}
break;
	case 'nikparse':
	case 'ceknik': {
    if (!text) return reply(`Contoh:\n${prefix + command} 181005415784847`);
    const nik = text.trim();
    if (nik.length !== 16 || !/^\d+$/.test(nik)) {
        return reply("❌ NIK harus 16 digit angka!");
    }
    satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
    try {
        const api = `https://api.siputzx.my.id/api/tools/nik-checker?nik=${nik}`;
        const res = await fetch(api);
        if (!res.status || !res.data) {
            return reply("❌ Tidak dapat mengambil data dari server!");
        }

        const d = res.data.data;     
        const meta = res.data.metadata; 
        const lhp = res.data.data_lhp?.[0]; 

        let teks = `*🔍 HASIL CEK NIK*\n`;
        teks += `──────────────────────\n`;
        teks += `👤 *Nama*: ${d.nama}\n`;
        teks += `🆔 *NIK*: ${res.data.nik}\n`;
        teks += `👨‍⚕️ *Jenis Kelamin*: ${d.kelamin}\n`;
        teks += `🎂 *Tanggal Lahir*: ${d.tempat_lahir}\n`;
        teks += `📅 *Usia*: ${d.usia}\n`;
        teks += `⭐ *Zodiak*: ${d.zodiak}\n`;
        teks += `🎉 *Ultah Mendatang*: ${d.ultah_mendatang}\n`;
        teks += `🗓️ *Pasaran*: ${d.pasaran}\n\n`;

        teks += `*📍 ALAMAT & WILAYAH*\n`;
        teks += `• Provinsi: ${d.provinsi}\n`;
        teks += `• Kabupaten/Kota: ${d.kabupaten}\n`;
        teks += `• Kecamatan: ${d.kecamatan}\n`;
        teks += `• Kelurahan: ${d.kelurahan}\n`;
        teks += `• TPS: ${d.tps}\n`;
        teks += `• Alamat: ${d.alamat}\n\n`;

        teks += `*🌍 KOORDINAT*\n`;
        teks += `• Lat: ${d.koordinat.lat}\n`;
        teks += `• Lon: ${d.koordinat.lon}\n\n`;

        teks += `*📌 METADATA*\n`;
        teks += `• Kode Wilayah: ${meta.kode_wilayah}\n`;
        teks += `• Nomor Urut: ${meta.nomor_urut}\n`;
        teks += `• Kategori Usia: ${meta.kategori_usia}\n`;
        teks += `• Jenis Wilayah: ${meta.jenis_wilayah}\n`;
        teks += `• Metode: ${meta.metode_pencarian}\n\n`;

        if (lhp) {
            teks += `*🗂️ DATA LHP*\n`;
            teks += `• Nama: ${lhp.nama}\n`;
            teks += `• Kecamatan: ${lhp.kecamatan}\n`;
            teks += `• Kelurahan: ${lhp.kelurahan}\n`;
            teks += `• TPS: ${lhp.tps}\n`;
            teks += `• Sumber: ${lhp.source}\n`;
            teks += `• Alamat: ${lhp.alamat}\n`;
        }
        reply(teks)
        satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
    } catch (e) {
        console.log(e);
        reply("❌ Terjadi kesalahan server!");
    }
}
break;
case 'fakeff':
case 'lobyff':
case 'lobbyff': {
   
    if (!text || !text.includes('|')) {
        return reply(`🎮 *FREE FIRE LOBBY MAKER*

Contoh:
${prefix + command} 1|Jagoan FF
${prefix + command} random|Jagoan FF

Pilihan template: 1 - 22 atau ketik *random*`)
    }

    let [numStr, name] = text.split('|').map(v => v.trim())
    numStr = numStr.toLowerCase()

    const imageUrls = {
        1: 'https://cloud-fukushima.vercel.app/uploader/8fjhd6ftps.jpg',
        2: 'https://cloud-fukushima.vercel.app/uploader/oz8hb4ow75.jpg',
        3: 'https://cloud-fukushima.vercel.app/uploader/tvz1cie8df.jpg',
        4: 'https://cloud-fukushima.vercel.app/uploader/yo9sg4vmo3.jpg',
        5: 'https://i.ibb.co/twtSvQXv/image.jpg',
        6: 'https://i.ibb.co/n80Bc1wV/image.jpg',
        7: 'https://i.ibb.co/mCwmt019/image.jpg',
        8: 'https://i.ibb.co/JwG60TwF/image.jpg',
        9: 'https://i.ibb.co/zWNLw6bV/image.jpg',
        10: 'https://i.ibb.co/d4DvnHw6/image.jpg',
        11: 'https://i.ibb.co/hxMGbx9v/image.jpg',
        12: 'https://i.ibb.co/jvd5xfvK/image.jpg',
        13: 'https://i.ibb.co/KxTQ0r0x/image.jpg',
        14: 'https://i.ibb.co/rRyxvrJW/image.jpg',
        15: 'https://i.ibb.co/PG5jwG6S/image.jpg',
        16: 'https://i.ibb.co/MDdH7kjG/image.jpg',
        17: 'https://i.ibb.co/6cnHvL31/image.jpg',
        18: 'https://i.ibb.co/dwg4CGdf/image.jpg',
        19: 'https://i.ibb.co/pvx1PZyW/image.jpg',
        20: 'https://i.ibb.co/kVkbxhwg/image.jpg',
        21: 'https://i.ibb.co/rK8ZTPbt/image.jpg',
        22: 'https://i.ibb.co/vC3p8NjP/image.jpg'
    }

    const max = Object.keys(imageUrls).length
    let num

    if (numStr === 'random') {
        num = Math.floor(Math.random() * max) + 1
    } else {
        num = parseInt(numStr)
        if (isNaN(num) || num < 1 || num > max) {
            return reply(`❌ Template tidak valid!\nPilih 1 - ${max} atau random`)
        }
    }

    await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

    try {
        const imgUrl = imageUrls[num]
        const temp = `./temp_${Date.now()}.jpg`
        const out = `./out_${Date.now()}.jpg`
        const font = './lib/AGENCYB.TTF'

        if (!fs.existsSync(font)) {
            await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
            return reply('❌ Font AGENCYB.TTF tidak ditemukan di folder /lib')
        }

        // PERBAIKAN: Menggunakan Axios
        const axios = require('axios')
        const response = await axios({
            method: 'get',
            url: imgUrl,
            responseType: 'arraybuffer'
        })
        
        fs.writeFileSync(temp, Buffer.from(response.data))

        let fontSize
        if (name.length <= 6) fontSize = 'w*0.055'
        else if (name.length <= 10) fontSize = 'w*0.045'
        else if (name.length <= 15) fontSize = 'w*0.038'
        else fontSize = 'w*0.030'

        const safeText = name.replace(/'/g, "\\'")
        const safeFont = font.replace(/\\/g, '/')

        const cmd = `ffmpeg -i "${temp}" -vf "drawtext=fontfile='${safeFont}':text='${safeText}':x=(w-text_w)/2:y=h*0.80-(text_h/2):fontsize=${fontSize}:fontcolor=yellow:shadowcolor=black:shadowx=3:shadowy=3" "${out}"`

        exec(cmd, async (err) => {
            if (err) {
                console.error(err)
                if (fs.existsSync(temp)) fs.unlinkSync(temp)
                await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
                return reply('❌ FFMPEG error! Pastikan sudah terinstall.')
            }

            await satanic.sendMessage(m.chat, {
                image: fs.readFileSync(out),
                caption: `🎮 *FREE FIRE LOBBY*

👤 Name : ${name.toUpperCase()}
🖼️ Template : ${num}`
            }, { quoted: fkontak })

            if (fs.existsSync(temp)) fs.unlinkSync(temp)
            if (fs.existsSync(out)) fs.unlinkSync(out)

            await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
        })

    } catch (e) {
        console.error(e)
        await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
        reply('❌ Terjadi error saat proses gambar!')
    }
}
break
case 'fakedana': {
if (!text) {
return reply(`💳 *FAKE DANA MAKER (API)*
Contoh:
${prefix + command} 1000000`);
}
let nominal = text.replace(/[^0-9]/g, '');
if (!nominal || isNaN(nominal)) {
return reply('❌ Masukkan nominal angka yang valid!');
}
await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
try {
const apiUrl = `https://api.zenzxz.my.id/maker/fakedanav2?nominal=${nominal}`;
const response = await axios.get(apiUrl, {
responseType: 'arraybuffer'
});
await satanic.sendMessage(m.chat, {
image: Buffer.from(response.data),
caption: `💳 *FAKE DANA*\n\n💰 Nominal: Rp ${parseInt(nominal).toLocaleString('id-ID')}\n✅ Status: Sukses`
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
} catch (error) {
console.error('Error fakedana API:', error.message);
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
reply(`❌ Gagal membuat Fake DANA.\nDetail: ${error.message}`);
}
}
break;
case 'fakegopay': {
    if (!text) {
        return reply(`💳 *FAKE GOPAY MAKER*
Contoh:
${prefix + command} 1000000

Format: ${prefix + command} [nominal]
Atau custom: ${prefix + command} 500000|200|Juni

*Saldo|Koin|Bulan*`)
    }

    await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

    // Parse input
    let parts = text.split('|')
    let saldoNominal = parts[0]?.replace(/[^0-9]/g, '') || '500000'
    let koinNominal = parts[1]?.replace(/[^0-9]/g, '') || '159'
    let bulan = parts[2] || 'Mei'

    // Format saldo dengan titik sebagai pemisah ribuan
    let saldoFormatted = Number(saldoNominal).toLocaleString('id-ID').replace(/,/g, '.')
    let terpakai = Math.floor(Number(saldoNominal) * 0.1).toLocaleString('id-ID').replace(/,/g, '.')

    const CONFIG = {
        data: {
            saldo: saldoFormatted,
            koin: koinNominal,
            terpakai: terpakai,
            bulan: bulan,
        },
        pos: {
            saldo: { x: 62,  y: 325 },
            koin:  { x: 115, y: 400 },
            pill:  { x: 50,  y: 510 },
        },
        fontSize: {
            rp: 34,
            saldo: 95,
            koin: 34,
            pill: 34,
        },
        icon: {
            eye:    { w: 60, h: 60 },
            report: { w: 30, h: 30 },
            next:   { w: 30, h: 30 },
        },
        pill: {
            height: 48,
            paddingLeft: 14,
            paddingRight: 14,
            gapIconText: 10,
            gapTextArrow: 16,
        },
        gap: {
            rpToAngka: 8,
            angkaToEye: 20,
            eyeOffsetY: 12,
        },
        color: {
            report: 'rgba(196, 227, 245)',
            eye:    'rgba(204, 226, 240)',
        },
        baseUrl: 'https://raw.githubusercontent.com/Ditzzx-vibecoder/Assets/main',
    };

    function downloadAsset(url, dest) {
        return new Promise((resolve, reject) => {
            const https = require('https')
            const fs = require('fs')
            const doGet = (targetUrl) => {
                https.get(targetUrl, (res) => {
                    if ([301, 302].includes(res.statusCode)) {
                        return doGet(res.headers.location);
                    }
                    const file = fs.createWriteStream(dest);
                    res.pipe(file);
                    file.on('finish', () => file.close(resolve));
                    file.on('error', (err) => {
                        fs.unlink(dest, () => reject(err));
                    });
                }).on('error', (err) => {
                    fs.unlink(dest, () => reject(err));
                });
            };
            doGet(url);
        });
    }

    function tintIcon(ctx, img, x, y, w, h, color) {
        const { Canvas } = require('skia-canvas')
        const off = new Canvas(w, h);
        const octx = off.getContext('2d');
        octx.drawImage(img, 0, 0, w, h);
        octx.globalCompositeOperation = 'source-in';
        octx.fillStyle = color;
        octx.fillRect(0, 0, w, h);
        ctx.drawImage(off, x, y, w, h);
    }

    try {
        // Cek dependency skia-canvas
        let skia
        try {
            skia = require('skia-canvas')
        } catch {
            await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
            return reply("❌ Install dulu: npm install skia-canvas")
        }

        const { Canvas, loadImage, FontLibrary } = skia
        const fs = require('fs')
        const path = require('path')
        const https = require('https')

        const fontDir = path.join(process.cwd(), 'fonts');
        const imgDir  = path.join(process.cwd(), 'assets');

        if (!fs.existsSync(fontDir)) fs.mkdirSync(fontDir, { recursive: true });
        if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

        const B = CONFIG.baseUrl;

        const assets = {
            bg:         { url: `${B}/Image/quality_restoration_20260501080321276.jpg`, path: path.join(imgDir, 'bg.jpg') },
            fontReg:    { url: `${B}/Font/rupa_sans_regular.ttf`, path: path.join(fontDir, 'reg.ttf') },
            fontSb:     { url: `${B}/Font/rupa_sans_semi_bold.ttf`, path: path.join(fontDir, 'sb.ttf') },
            fontSerif:  { url: `${B}/Font/rupa_serif_semi_bold.ttf`, path: path.join(fontDir, 'serif.ttf') },
            iconReport: { url: `${B}/Image/bar-chart_6687624.svg`, path: path.join(imgDir, 'report.svg') },
            iconEye:    { url: `${B}/Image/icChat16ReadMessage.svg`, path: path.join(imgDir, 'eye.svg') },
            iconNext:   { url: `${B}/Image/icNavigation16NextIos.svg`, path: path.join(imgDir, 'next.svg') },
        };

        // Download assets jika belum ada
        for (const asset of Object.values(assets)) {
            if (!fs.existsSync(asset.path)) {
                await downloadAsset(asset.url, asset.path);
            }
        }

        FontLibrary.use('RupaSans', [assets.fontReg.path, assets.fontSb.path]);
        FontLibrary.use('RupaSerif', [assets.fontSerif.path]);

        const bg = await loadImage(assets.bg.path);
        const iconReport = await loadImage(assets.iconReport.path);
        const iconEye = await loadImage(assets.iconEye.path);
        const iconNext = await loadImage(assets.iconNext.path);

        const canvas = new Canvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        const { data, pos, fontSize, icon, pill, gap, color } = CONFIG;

        ctx.drawImage(bg, 0, 0);
        ctx.fillStyle = '#fff';

        // Gambar teks "Rp"
        ctx.font = `800 ${fontSize.rp}px RupaSans`;
        ctx.fillText('Rp', pos.saldo.x, pos.saldo.y - 38);
        const rpW = ctx.measureText('Rp').width;

        // Gambar nominal saldo
        ctx.font = `800 ${fontSize.saldo}px RupaSerif`;
        const angkaX = pos.saldo.x + rpW + gap.rpToAngka;
        ctx.fillText(data.saldo, angkaX, pos.saldo.y);
        const angkaW = ctx.measureText(data.saldo).width;

        // Gambar icon mata
        const eyeX = angkaX + angkaW + gap.angkaToEye;
        const eyeMidY = pos.saldo.y - (fontSize.saldo / 2) + gap.eyeOffsetY;
        tintIcon(ctx, iconEye, eyeX, eyeMidY - (icon.eye.h / 2), icon.eye.w, icon.eye.h, color.eye);

        ctx.fillStyle = '#fff';

        // Gambar koin
        ctx.font = `800 ${fontSize.koin}px RupaSans`;
        ctx.fillText(data.koin, pos.koin.x, pos.koin.y);
        const koinAngkaW = ctx.measureText(data.koin).width;

        ctx.font = `400 ${fontSize.koin}px RupaSans`;
        ctx.fillText(' Coins', pos.koin.x + koinAngkaW, pos.koin.y);

        // Gambar pill notifikasi terpakai
        ctx.font = `800 ${fontSize.pill}px RupaSans`;
        const rpTerpakaiText = `Rp${data.terpakai}`;
        const rpTerpakaiW = ctx.measureText(rpTerpakaiText).width;

        ctx.font = `400 ${fontSize.pill}px RupaSans`;
        const sisaText = ` udah terpakai di ${data.bulan}`;
        const sisaW = ctx.measureText(sisaText).width;

        const textW = rpTerpakaiW + sisaW;
        const pillW = pill.paddingLeft + icon.report.w + pill.gapIconText + textW + pill.gapTextArrow + icon.next.w + pill.paddingRight;

        const pillCenterY = pos.pill.y + (pill.height / 2);
        const textBaseY = pillCenterY + (fontSize.pill / 3);
        const textStartX = pos.pill.x + pill.paddingLeft + icon.report.w + pill.gapIconText;

        tintIcon(ctx, iconReport, pos.pill.x + pill.paddingLeft, pillCenterY - (icon.report.h / 2), icon.report.w, icon.report.h, color.report);
        tintIcon(ctx, iconNext, pos.pill.x + pillW - pill.paddingRight - icon.next.w, pillCenterY - (icon.next.h / 2), icon.next.w, icon.next.h, '#fff');

        ctx.fillStyle = '#fff';
        ctx.font = `600 ${fontSize.pill}px RupaSans`;
        ctx.fillText(rpTerpakaiText, textStartX, textBaseY);

        ctx.font = `400 ${fontSize.pill}px RupaSans`;
        ctx.fillText(sisaText, textStartX + rpTerpakaiW, textBaseY);

        const buffer = await canvas.png;

        await satanic.sendMessage(m.chat, {
            image: buffer,
            caption: `💳 *FAKE GOPAY*

💰 Saldo : Rp ${data.saldo}
🪙 Koin  : ${data.koin}
📊 Terpakai : Rp ${data.terpakai} (${data.bulan})
✅ Status  : Sukses`
        }, { quoted: fkontak })

        await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } })

    } catch (e) {
        console.error(e)
        await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
        reply(`❌ Error:\n${e.message}`)
    }
}
break
case 'balogo': {
    if (!text) return reply('*Contoh:*\n' + prefix + command + ' sata ganz');
    
    try {
        const encodedText = encodeURIComponent(text);
        const url = `https://api.nexray.eu.cc/maker/balogo?text=${encodedText}`;
        
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'arraybuffer'
        });
        
        const buffer = Buffer.from(response.data, 'binary');
        
        await satanic.sendMessage(m.chat, {
            image: buffer,
            caption: `✅ Logo: ${text}`
        }, { quoted: m });
        
    } catch (error) {
        console.error('Error:', error.message);
        reply('❌ Gagal mengambil gambar dari API');
    }
    break;
}
case 'fakeovo': {
    if (!text) {
        return reply(`💳 *FAKE OVO MAKER*
Contoh:
${prefix + command} 1000000

Format: ${prefix + command} [nominal]`)
    }

    await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

    let skia
    try {
        skia = require('skia-canvas')
    } catch {
        await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
        return reply("❌ Install dulu: npm install skia-canvas")
    }

    const { Canvas, loadImage, FontLibrary } = skia
    const fs = require('fs')
    const path = require('path')
    const https = require('https')

    // Konfigurasi
    const WIDTH = 841
    const HEIGHT = 1870
    const IMAGE_URL = "https://raw.githubusercontent.com/Ditzzx-vibecoder/Assets/main/Image/file_0000000078bc71fa87da5cf26dc6c008.jpeg"
    
    const FIXED_RP = {
        text: "Rp",
        x: 61,
        y: 368,
        size: 20,
        weight: 800,
    }

    const AMOUNT_STYLE = {
        x: 94,
        y: 371,
        size: 28,
        weight: 800,
        color: "#FFFFFF",
    }

    function formatAmount(input) {
        const digits = String(input).replace(/[^\d]/g, "") || "0"
        const normalized = digits.replace(/^0+(?=\d)/, "")
        return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    function downloadAsset(url, dest) {
        return new Promise((resolve, reject) => {
            const doGet = (targetUrl) => {
                https.get(targetUrl, (res) => {
                    if ([301, 302].includes(res.statusCode)) {
                        return doGet(res.headers.location)
                    }
                    const file = fs.createWriteStream(dest)
                    res.pipe(file)
                    file.on('finish', () => file.close(resolve))
                    file.on('error', (err) => {
                        fs.unlink(dest, () => reject(err))
                    })
                }).on('error', (err) => {
                    fs.unlink(dest, () => reject(err))
                })
            }
            doGet(url)
        })
    }

    try {
        // Setup font
        const fontDir = path.resolve(process.cwd(), 'fonts')
        if (!fs.existsSync(fontDir)) fs.mkdirSync(fontDir, { recursive: true })

        const fontPath = path.join(fontDir, 'PlusJakartaSans.ttf')
        const fontUrl = 'https://raw.githubusercontent.com/Ditzzx-vibecoder/Assets/main/Font/plus_jakarta_sans.ttf'

        if (!fs.existsSync(fontPath)) {
            await downloadAsset(fontUrl, fontPath)
        }

        try {
            FontLibrary.use('Plus Jakarta Sans', fontPath)
        } catch (e) {
            // Font mungkin sudah terdaftar
        }

        // Download background
        const imgDir = path.join(process.cwd(), 'assets')
        if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true })

        const bgPath = path.join(imgDir, 'ovo_bg.jpg')
        if (!fs.existsSync(bgPath)) {
            await downloadAsset(IMAGE_URL, bgPath)
        }

        const image = await loadImage(bgPath)

        // Buat canvas
        const canvas = new Canvas(WIDTH, HEIGHT)
        const ctx = canvas.getContext('2d')

        ctx.imageSmoothingEnabled = true
        ctx.drawImage(image, 0, 0, WIDTH, HEIGHT)

        // Validasi nominal
        let nominal = text.replace(/[^0-9]/g, '')
        if (!nominal) {
            return reply('❌ Nominal tidak valid!')
        }

        const amountText = formatAmount(nominal)

        // Gambar teks "Rp"
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'alphabetic'
        ctx.font = `${FIXED_RP.weight} ${FIXED_RP.size}px "Plus Jakarta Sans"`
        ctx.fillText(FIXED_RP.text, FIXED_RP.x, FIXED_RP.y)

        // Gambar nominal
        ctx.font = `${AMOUNT_STYLE.weight} ${AMOUNT_STYLE.size}px "Plus Jakarta Sans"`
        ctx.fillText(amountText, AMOUNT_STYLE.x, AMOUNT_STYLE.y)

        const buffer = await canvas.png

        // Format nominal untuk caption
        const nominalFormatted = Number(nominal).toLocaleString('id-ID')

        await satanic.sendMessage(m.chat, {
            image: buffer,
            caption: `💳 *FAKE OVO*

💰 Nominal : Rp ${nominalFormatted}
✅ Status  : Sukses`
        }, { quoted: fkontak })

        await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } })

    } catch (e) {
        console.error(e)
        await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
        reply(`❌ Error:\n${e.message}`)
    }
}
break
case 'fakebangjago': {
if (!text || !text.includes(',')) {
        return reply(`❌ *Format salah!* Contoh:
${prefix + command} Ryuu, 1000000`)
    }
     await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })    
    let skia
    try {
        skia = require('skia-canvas')
    } catch (e) {
        return reply('❌ Module *skia-canvas* belum terinstall!\n\nKetik di panel:\n```npm install skia-canvas```')
    }

    const { Canvas, loadImage, FontLibrary } = skia

    async function ensureFile(url, file) {
        const dir = path.dirname(file)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

        if (!fs.existsSync(file)) {
            const res = await axios.get(url, { responseType: 'arraybuffer' })
            fs.writeFileSync(file, res.data)
        }
    }

    async function generateImage(saldo, greet) {
        const bgUrl = "https://raw.githubusercontent.com/uploader762/dat2/main/uploads/52e39f-1773064858080.jpg"
        const fontUrl = "https://raw.githubusercontent.com/uploader762/dat2/main/uploads/49bbd8-1773045557233.otf"
        const font2Url = "https://raw.githubusercontent.com/uploader762/dat1/main/uploads/203827-1773063086445.ttf"

        const font1 = "./media/fonts/ceraroundpro-medium.otf"
        const font2 = "./media/fonts/Roboto_Medium.ttf"

        await ensureFile(fontUrl, font1)
        await ensureFile(font2Url, font2)

        FontLibrary.use("CustomFont", font1)
        FontLibrary.use("GreetingFont", font2)

        const bgRes = await axios.get(bgUrl, { responseType: 'arraybuffer' })
        const bg = await loadImage(bgRes.data)

        const canvas = new Canvas(bg.width, bg.height)
        const ctx = canvas.getContext("2d")

        ctx.drawImage(bg, 0, 0, bg.width, bg.height)

        ctx.font = "125px CustomFont"
        ctx.fillStyle = "black"

        const numberWidth = ctx.measureText(saldo).width
        const numberX = 2470 - numberWidth

        ctx.fillText(saldo, numberX, 894)

        const rpWidth = ctx.measureText("Rp").width
        const rpX = numberX - rpWidth - 4

        ctx.fillText("Rp", rpX, 894)

        ctx.font = "93px GreetingFont"
        ctx.fillStyle = "gray"
        ctx.fillText(greet, 98, 86)

        return await canvas.toBuffer("image/png")
    }

    try {
        const args = text.split(',')
        const nama = args[0].trim()
        const saldoRaw = args[1].trim()

        const saldo = Number(saldoRaw.replace(/[^0-9]/g, ''))
            .toLocaleString('id-ID')

        const moment = require('moment-timezone')
        const h = parseInt(moment.tz('Asia/Jakarta').format('HH'))

        let waktu = 'Malam'
        if (h >= 4 && h < 11) waktu = 'Pagi'
        else if (h >= 11 && h < 15) waktu = 'Siang'
        else if (h >= 15 && h < 18) waktu = 'Sore'

        const buffer = await generateImage(
            saldo,
            `Selamat ${waktu}, ${nama}`
        )
        await satanic.sendMessage(m.chat, {
            image: buffer,
            caption: `🎨 *Fake Saldo bank Jago Berhasil Dibuat!*`
        }, { quoted: fkontak })

        await satanic.sendMessage(m.chat, {
            react: { text: "✅", key: m.key }
        })

    } catch (err) {
        console.error(err)

        await satanic.sendMessage(m.chat, {
            react: { text: "❌", key: m.key }
        })

        reply('❌ Gagal membuat gambar.')
    }
}
break
case 'qc': {
  if (!text) return reply('teksnya')
 const sender = m.sender
const username = await satanic.getName(m.quoted ? m.quoted.sender : sender)
const avatar = await satanic.profilePictureUrl(m.quoted ? m.quoted.sender : sender, "image").catch(() => 'https://8030.us.kg/file/P2LpaOHxWlJt.jpg')
  const qchat = `https://free-restapi.biz.id/api/qc?text=${encodeURIComponent(text)}&name=${encodeURIComponent(username)}&ppurl=${encodeURIComponent(avatar)}&apikey=${global.sakey}`
  const response = await axios.get(qchat, { responseType: 'arraybuffer' })
  await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname })
}
break
case 'bratvid':
case 'bratvideo': {
  if (!text) return reply('Mana Text Nya')
  var image = `https://skyzxu-brat.hf.space/brat-animated?text=${encodeURIComponent(text)}`
  const response = await axios.get(image, { responseType: 'arraybuffer' })
  await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: foother })
  satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
break
case 'iqc':
    if (!text) return reply('📝 Format: teks|provider|jam|baterai\nContoh: .iqc Halo semua|Telkomsel|10:30|75');

    await satanic.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

    try {
        let [messageText, carrierName, time, batteryPercentage] = text.split('|');
        
        if (!messageText || !carrierName || !time || !batteryPercentage) {
            return reply('❌ Semua field harus diisi!\nContoh: .iqc Halo semua|Telkomsel|10:30|75');
        }
        batteryPercentage = batteryPercentage.replace(/\D/g, '');
        if (!batteryPercentage) return reply('❌ Baterai harus angka');
        const url = `https://brat.siputzx.my.id/iphone-quoted?messageText=${encodeURIComponent(messageText)}&carrierName=${encodeURIComponent(carrierName)}&time=${encodeURIComponent(time)}&batteryPercentage=${encodeURIComponent(batteryPercentage)}&signalStrength=4`;
        const res = await fetch(url);
        if (res.status === 502) {
            return reply('❌ Server API sedang sibuk (502 Bad Gateway). Coba lagi nanti');
        }        
        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}`);
        }
        const buffer = Buffer.from(await res.arrayBuffer());
        await satanic.sendMessage(m.chat, { 
            image: buffer,
            caption: `✅ *iPhone Quote Created!*\n\n💬 Pesan: ${messageText}\n📱 Provider: ${carrierName}\n⏰ Jam: ${time}\n🔋 Baterai: ${batteryPercentage}%`
        }, { quoted: fkontak });
        
    } catch (e) {
        reply('❌ Gagal: ' + e.message);
    }
    break;



/////// BATAS STICKER MENU. ////////
//////// STALK MENU /////////
case 'stalkig2':
case 'igstalk2': {
  satanic.sendMessage(m.chat, { react: { text: `📸`, key: m.key } });
  
  if (!text) return reply('masukin username ')
  
  let apiUrl = `https://free-restapi.biz.id/api/instagramstalker?username=${encodeURIComponent(text)}&apikey=${global.sakey}`;
  
  let response = await fetch(apiUrl);
  let data = await response.json();
  
  if (data.status !== 200 || !data.result) {
    return satanic.sendMessage(m.chat, { text: '❌ Username tidak ditemukan atau terjadi kesalahan.' });
  }
  
  let profile = data.result.profile;
  let recentPosts = data.result.recent_posts || [];
  
  let resultText = `*📸 INSTAGRAM STALKER*\n\n`;
  resultText += `*👤 Username:* ${profile.username}\n`;
  resultText += `*📛 Nama:* ${profile.full_name}\n`;
  resultText += `*📝 Bio:* ${profile.bio || '-'}\n`;
  resultText += `*📊 Postingan:* ${profile.formatted_posts}\n`;
  resultText += `*👥 Followers:* ${profile.formatted_followers}\n`;
  resultText += `*👣 Following:* ${profile.formatted_following}\n`;
  resultText += `*🔒 Private:* ${profile.is_private ? 'Ya' : 'Tidak'}\n`;
  resultText += `*✅ Verifikasi:* ${profile.is_verified ? 'Ya' : 'Tidak'}\n\n`;
  
  if (recentPosts.length > 0) {
    resultText += `*🖼️ 3 Postingan Terbaru:*\n\n`;
    for (let i = 0; i < Math.min(recentPosts, 3); i++) {
      let post = recentPosts[i];
      resultText += `${i+1}. *Tipe:* ${post.type}\n`;
      resultText += `   *Caption:* ${post.caption.substring(0, 100)}${post.caption.length > 100 ? '...' : ''}\n`;
      resultText += `   *❤️ Likes:* ${post.formatted_likes}\n`;
      resultText += `   *💬 Comments:* ${post.formatted_comments}\n`;
      resultText += `   *🔗 Link:* ${post.post_url}\n\n`;
    }
  }
  if (profile.profile_pic_url) {
    await satanic.sendMessage(m.chat, {
      image: { url: profile.profile_pic_url },
      caption: resultText
    });
  } else {
    await satanic.sendMessage(m.chat, { text: resultText });
  }
}
break
case 'igstalk':
case 'instagramstalk': {
    if (!text) return reply('Masukkan username Instagram!\n\nContoh: .igstalk2 jokowi');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/igstalk2?username=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        // Cek struktur response berdasarkan JSON yang diberikan
        if (!response.data || response.data.status !== 200 || !response.data.result) {
            return reply('Gagal mengambil data dari Instagram');
        }
        
        const user = response.data.result;
        
        let info = `*INSTAGRAM STALKER*\n\n`;
        info += `Username: ${user.username}\n`;
        info += `Full Name: ${user.full_name || '-'}\n`;
        info += `Bio: ${user.bio || '-'}\n`;
        info += `Followers: ${user.followers_count || 0}\n`;
        info += `Following: ${user.follows_count || 0}\n`;
        info += `Posts: ${user.posts_count || 0}\n`;
        info += `ID: ${user.id || '-'}\n`;
        info += `Link: https://instagram.com/${user.username}\n`;
        
        // Tambahan info opsional
        if (user.is_professional) info += `Verified: ✅ Professional Account\n`;
        info += `\nProject By: ${namaBot}`;
        
        // Kirim gambar profil jika tersedia
        if (user.profile_pic_url_hd || user.profile_pic_url) {
            const profilePic = user.profile_pic_url_hd || user.profile_pic_url;
            await satanic.sendMessage(m.chat, {
                image: { url: profilePic },
                caption: info
            }, { quoted: fkontak });
        } else {
            await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
        }
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil data Instagram.atau kemungkinan apikey telah habis / apikey invalid, silahkan cek respon website terlebih dahulu');
    }
}
break;
case 'githubstalk':
case 'ghstalk': {
if (!text) return reply(`Kirim perintah ${prefix + command} username\nContoh: ${prefix + command} whiskeysockets`);
try {
 const res = await axios.get(`https://api.github.com/users/${text}`);
const user = res.data;
let txt = `*GITHUB PROFILE STALK*\n👤 *Username:* ${user.login}\n🆔 *ID:* ${user.id}\n🏷️ *Name:* ${user.name || '-'}\n📝 *Bio:* ${user.bio || '-'}\n📦 *Repos: ${user.public_repos}\n👥 *Followers:* ${user.followers}\n👣 *Following:* ${user.following}\n📍 *Location:* ${user.location || '-'}\n🔗 *URL:* ${user.html_url}`;
 await satanic.sendMessage(from, { image: { url: user.avatar_url }, caption: txt }, { quoted: fkontak });
} catch (e) {
console.error(e);
  reply("Username tidak ditemukan atau terjadi kesalahan.");
}
}
break;
case 'ytstalk':
case 'youtubestalk': {
    if (!text) return reply('Masukkan username atau handle YouTube!\n\nContoh: .ytstalk Dhot\nAtau: .ytstalk @Dhot');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    const apiUrl = `https://free-restapi.biz.id/api/ytstalk?q=${encodeURIComponent(text)}&apikey=${global.sakey}`;
    const response = await axios.get(apiUrl);
    
    const result = response.data.result;
    
    let info = `🎥 *YOUTUBE STALKER*\n\n`;
    info += `📛 *Nama:* ${result.nama}\n`;
    info += `🆔 *Channel ID:* ${result.channelId}\n`;
    info += `🔗 *Handle:* ${result.handle}\n`;
    info += `👥 *Subscribers:* ${result.subscriberCount}\n`;
    info += `✅ *Verified:* ${result.verified || 'Tidak'}\n`;
    info += `🔗 *URL:* ${result.url}\n`;
    info += `\n📥 *Project By:* ${namaBot}`;
    
    if (result.avatar) {
        await satanic.sendMessage(m.chat, {
            image: { url: result.avatar },
            caption: info
        }, { quoted: fkontak });
    } else {
        await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
    }
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'ttstalk':
case 'tiktokstalk': {
    if (!text) return reply('Masukkan username TikTok!\n\nContoh: .ttstalk jokowi');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/ttstalk?username=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status !== 200) {
            return reply('Gagal mengambil data dari TikTok');
        }
        
        const result = response.data.result;
        
        let info = `🎵 *TIKTOK STALKER*\n\n`;
        info += `👤 *Username:* ${result.username}\n`;
        info += `📛 *Nama:* ${result.nama || '-'}\n`;
        info += `📝 *Bio:* ${result.bio || '-'}\n`;
        info += `✅ *Verifikasi:* ${result.verifikasi ? 'Ya' : 'Tidak'}\n`;
        info += `👥 *Followers:* ${result.totalfollowers.toLocaleString()}\n`;
        info += `❤️ *Total Disukai:* ${result.totaldisukai.toLocaleString()}\n`;
        info += `🎬 *Total Video:* ${result.totalvideo.toLocaleString()}\n`;
        info += `🔗 *Link:* https://tiktok.com/@${result.username}\n`;
        info += `📥 *Project By:* ${namaBot}`;
        
        // Kirim avatar dan info
        if (result.avatar) {
            await satanic.sendMessage(m.chat, {
                image: { url: result.avatar },
                caption: info
            }, { quoted: fkontak });
        } else {
            await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
        }
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil data TikTok.');
    }
}
break;
case 'robloxstalk':
case 'rblxstalk': {
    if (!text) return reply('Masukkan username Roblox!\n\nContoh: .robloxstalk Simoon68');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/robloxstalk?username=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status !== 200) {
            return reply('Gagal mengambil data dari Roblox');
        }
        
        const result = response.data.result;
        const account = result.account;
        const stats = result.stats;
        const presence = result.presence;
        
        let info = `🎮 *ROBLOX STALKER*\n\n`;
        info += `🆔 *User ID:* ${result.userId}\n`;
        info += `👤 *Username:* ${account.username}\n`;
        info += `📛 *Display Name:* ${account.displayName}\n`;
        info += `📝 *Bio:* ${account.description || '-'}\n`;
        info += `📅 *Bergabung:* ${account.created}\n`;
        info += `✅ *Verifikasi:* ${account.hasVerifiedBadge ? '✅ Ya' : '❌ Tidak'}\n`;
        info += `🚫 *Banned:* ${account.isBanned ? '⚠️ Ya' : '✅ Tidak'}\n\n`;
        
        info += `📊 *STATISTIK*\n`;
        info += `👥 *Teman:* ${stats.friendCount.toLocaleString()}\n`;
        info += `👣 *Followers:* ${stats.followers.toLocaleString()}\n`;
        info += `👤 *Following:* ${stats.following.toLocaleString()}\n`;
        info += `📦 *Inventory:* ${stats.inventoryCount.toLocaleString()}\n\n`;
        
        info += `🟢 *PRESENCE*\n`;
        info += `📱 *Online:* ${presence.isOnline ? '🟢 Online' : '⚫ Offline'}\n`;
        if (presence.recentGame && presence.recentGame !== 'Studio') {
            info += `🎮 *Game Terakhir:* ${presence.recentGame}\n`;
        }
        
        // Tambahkan groups
        if (result.groups && result.groups.groups && result.groups.groups.length > 0) {
            info += `\n👥 *GROUP (${result.groups.total} total)*\n`;
            info += `━━━━━━━━━━━━━━━━━━━━━\n`;
            for (let i = 0; i < Math.min(result.groups.groups.length, 15); i++) {
                const group = result.groups.groups[i];
                const roleName = group.role?.name || 'Member';
                const rank = group.role?.rank || 0;
                info += `${i+1}. ${group.name}\n`;
                info += `   👑 Role: ${roleName} (Rank ${rank})\n`;
                if (group.url) info += `   🔗 ${group.url}\n`;
                info += `\n`;
            }
            if (result.groups.groups.length > 15) {
                info += `*dan ${result.groups.groups.length - 15} grup lainnya...*\n`;
            }
        } else {
            info += `\n👥 *Group:* Tidak ada grup\n`;
        }
        
        info += `━━━━━━━━━━━━━━━━━━━━━\n`;
        info += `🔗 *Link Profile:* https://www.roblox.com/users/${result.userId}/profile\n`;
        info += `📥 *Project By:* ${namaBot}`;
        
        // Kirim avatar dan info dalam satu pesan
        if (account.profilePicture) {
            await satanic.sendMessage(m.chat, {
                image: { url: account.profilePicture },
                caption: info
            }, { quoted: fkontak });
        } else {
            // Jika caption terlalu panjang, kirim teks terpisah
            if (info.length > 4000) {
                await satanic.sendMessage(m.chat, { text: info.substring(0, 4000) }, { quoted: fkontak });
                await satanic.sendMessage(m.chat, { text: info.substring(4000) }, { quoted: fkontak });
            } else {
                await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
            }
        }
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil data Roblox.');
    }
}
break;
case 'npmstalk':
case 'stalknpm': {
    if (!text) return reply('Masukkan nama package NPM!\n\nContoh: .npmstalk axios');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/npmstalk?package=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status !== 200) {
            return reply('Gagal mengambil data dari NPM');
        }
        
        const result = response.data.result;
        
        let info = `📦 *NPM PACKAGE STALKER*\n\n`;
        info += `📌 *Package:* ${result.name}\n`;
        info += `⭐ *Version Latest:* ${result.versionLatest}\n`;
        info += `📅 *Latest Publish:* ${new Date(result.latestPublishTime).toLocaleDateString('id-ID')} ${new Date(result.latestPublishTime).toLocaleTimeString('id-ID')}\n`;
        info += `🔧 *Version Publish:* ${result.versionPublish || '-'}\n`;
        info += `📆 *Publish Time:* ${new Date(result.publishTime).toLocaleDateString('id-ID')}\n`;
        info += `🔄 *Version Update:* ${result.versionUpdate}\n`;
        info += `📦 *Latest Dependencies:* ${result.latestDependencies}\n`;
        info += `📦 *Publish Dependencies:* ${result.publishDependencies}\n\n`;
        info += `📥 *Project By:* ${namaBot}`;
        
        await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil data NPM.');
    }
}
break;
case 'ffstalk':
case 'freefirestalk': {
    if (!text) return reply('Masukkan UID Free Fire!\n\nContoh: .ffstalk 946716486');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/ffstalk?uid=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status !== 200) {
            return reply('Gagal mengambil data dari Free Fire');
        }
        
        const result = response.data.result;
        
        let info = `🔥 *FREE FIRE STALKER*\n\n`;
        info += `🆔 *UID:* ${result.uid}\n`;
        info += `👤 *Nickname:* ${result.name}\n`;
        info += `⭐ *Level:* ${result.level}\n`;
        info += `📊 *Exp:* ${result.exp.toLocaleString()}\n`;
        info += `🌍 *Region:* ${result.region}\n`;
        info += `❤️ *Likes:* ${result.likes.toLocaleString()}\n`;
        info += `📅 *Bergabung:* ${new Date(result.created_at).toLocaleDateString('id-ID')}\n`;
        info += `🕐 *Last Login:* ${new Date(result.last_login).toLocaleDateString('id-ID')}\n`;
        info += `📝 *Signature:* ${result.signature || '-'}\n\n`;
        
        info += `🎮 *RANK*\n`;
        info += `🏆 *BR Max Rank:* ${result.br_max_rank}\n`;
        info += `🏆 *CS Max Rank:* ${result.cs_max_rank}\n`;
        info += `🎯 *BR Rank Point:* ${result.br_rank_point}\n\n`;
        
        info += `🦎 *PET*\n`;
        info += `🐾 *Nama Pet:* ${result.pet_name || '-'}\n`;
        info += `⭐ *Level Pet:* ${result.pet_level}\n`;
        info += `📊 *Exp Pet:* ${result.pet_exp.toLocaleString()}\n\n`;
        
        info += `👥 *GUILD*\n`;
        info += `🏷️ *Nama Guild:* ${result.guild_name || '-'}\n`;
        info += `🆔 *Guild ID:* ${result.guild_id || '-'}\n`;
        if (result.guild_level) info += `⭐ *Guild Level:* ${result.guild_level}\n`;
        if (result.guild_members) info += `👥 *Anggota:* ${result.guild_members}\n`;
        
        info += `\n📥 *Project By:* ${namaBot}`;
        
        await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil data Free Fire.');
    }
}
break;
case 'twstalk':
case 'twitterstalk': {
    if (!text) return reply('Masukkan username Twitter!\n\nContoh: .twstalk jokowi');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/twstalk?username=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status !== 200) {
            return reply('Gagal mengambil data dari Twitter');
        }
        
        const result = response.data.result;
        
        let info = `🐦 *TWITTER STALKER*\n\n`;
        info += `👤 *Username:* @${result.username}\n`;
        info += `📛 *Name:* ${result.name}\n`;
        info += `📝 *Bio:* ${result.bio || '-'}\n`;
        info += `📍 *Location:* ${result.location || '-'}\n`;
        info += `✅ *Verified:* ${result.verified ? 'Ya' : 'Tidak'}\n`;
        if (result.verification_type) {
            info += `🔐 *Verification Type:* ${result.verification_type}\n`;
        }
        info += `🔒 *Protected:* ${result.protected ? 'Ya' : 'Tidak'}\n`;
        info += `📅 *Joined:* ${new Date(result.joined).toLocaleDateString('id-ID')}\n`;
        info += `\n📊 *STATISTIK*\n`;
        info += `👥 *Followers:* ${result.followers.toLocaleString()}\n`;
        info += `👣 *Following:* ${result.following.toLocaleString()}\n`;
        info += `❤️ *Likes:* ${result.likes.toLocaleString()}\n`;
        info += `🐦 *Tweets:* ${result.tweets.toLocaleString()}\n`;
        info += `📷 *Media Count:* ${result.media_count.toLocaleString()}\n`;
        info += `\n🔗 *Link:* ${result.url}\n`;
        info += `📥 *Project By:* ${namaBot}`;
        
        // Kirim avatar dan info
        if (result.avatar_url) {
            await satanic.sendMessage(m.chat, {
                image: { url: result.avatar_url },
                caption: info
            }, { quoted: fkontak });
        } else {
            await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
        }
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil data Twitter.');
    }
}
break;





/////// BATAS AKHIR STALK MENU /////////
/////// SEARCH MENU /////////
case 'spotifysearch':
case 'spsearch': {
    if (!text) return reply(`Contoh: ${prefix}spotifysearch dhyo haw`);
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/spotifysearch?query=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status !== 200 || !response.data.result.tracks || response.data.result.tracks.length === 0) {
            return reply('Lagu tidak ditemukan.');
        }
        
        const tracks = response.data.result.tracks.slice(0, 10);
        
        // Simpan hasil search untuk digunakan di spotifyget
        global.spotifySearchResults = {};
        
        let cards = await Promise.all(tracks.map(async (item, i) => {
            const index = (i + 1).toString();
            global.spotifySearchResults[index] = {
                name: item.name,
                url: item.url,
                artist: item.artists.map(a => a.name).join(', ')
            };
            
            const albumImage = item.album.images && item.album.images.length > 0 ? item.album.images[0].url : 'https://i.scdn.co/image/ab67616d00001e02c7ef9493c18667b50745b811';
            
            const imageData = await prepareWAMessageMedia({ 
                image: { url: albumImage } 
            }, { 
                upload: satanic.waUploadToServer 
            });
            
            const durationSec = Math.floor(item.duration_ms / 1000);
            const minutes = Math.floor(durationSec / 60);
            const seconds = durationSec % 60;
            
            const trackInfo = `*${item.name}*\n\n👤 Artist: ${item.artists.map(a => a.name).join(', ')}\n⏱️ Durasi: ${minutes}:${seconds.toString().padStart(2, '0')}\n💿 Album: ${item.album.name}\n\n🔗 Link: ${item.url}\n\nKetik .spotifyget ${index} untuk download`;
            
            return {
                header: proto.Message.InteractiveMessage.Header.create({
                    ...imageData,
                    title: '',
                    subtitle: `Lagu ${i + 1} dari ${tracks.length}`,
                    hasMediaAttachment: true
                }),
                body: { text: trackInfo },
                nativeFlowMessage: {
                    buttons: [{
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "📋 Copy Link",
                            copy_code: item.url
                        })
                    }]
                }
            };
        }));
        
        let msg = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `Hasil pencarian lagu Spotify untuk *${text}*` },
                            carouselMessage: {
                                cards: cards,
                                messageVersion: 1
                            }
                        }
                    }
                }
            },
            { quoted: fkontak }
        );
        
        await satanic.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mencari lagu.');
    }
}
break;
case 'spotifyget':
case 'spget': {
    if (!text) return reply('Masukkan URL Spotify atau angka dari hasil pencarian!\n\nContoh: .spotifyget 1');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    // Cek apakah input berupa angka (pilihan dari search)
    if (!isNaN(text) && global.spotifySearchResults && global.spotifySearchResults[text]) {
        const selectedTrack = global.spotifySearchResults[text];
        const apiUrl = `https://free-restapi.biz.id/api/spotify?url=${encodeURIComponent(selectedTrack.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await satanic.sendMessage(m.chat, { 
            audio: response.data, 
            mimetype: 'audio/mpeg',
            fileName: `${selectedTrack.name}.mp3`
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } 
    // Jika input berupa link langsung
    else if (text.includes('spotify.com')) {
        const apiUrl = `https://free-restapi.biz.id/api/spotify?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await satanic.sendMessage(m.chat, { 
            audio: response.data, 
            mimetype: 'audio/mpeg'
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } 
    else {
        reply('Format salah! Gunakan .spotifyget 1 (dari hasil search) atau .spotifyget link_spotify');
    }
}
break;
case 'alquran': {
    if (!text) return reply(`📖 *AL-QURAN*\n\nContoh:\n.alquran al-baqarah\n.alquran yasin\n.alquran al-baqarah 1-5\n.alquran yasin 1`)

    let query = text.replace(/^[.!?]alquran\s*/i, '').trim()
    if (!query) return reply(`📖 *AL-QURAN*\n\nContoh:\n.alquran al-baqarah\n.alquran yasin`)

    let [surahName, ayatRange] = query.split(/\s+(\d+[-–]\d+|\d+)/).filter(Boolean)

    try {
        const slug = surahName.toLowerCase().replace(/\s+/g, "-")
        const url = `https://quran.nu.or.id/${slug}`
        
        const res = await fetch(url)
        const html = await res.text()
        const $ = cheerio.load(html)

        const title = $("h1").first().text().trim()
        const info = $("h1").next("span").text().trim()

        const hasil = []

        $('div[id]').each((i, el) => {
            const id = $(el).attr('id')
            if (!/^\d+$/.test(id)) return

            const arab = $(el).find('[dir="rtl"]').first().text().trim()
            const latin = $(el).find('.text-primary-500').first().text().trim()
            const arti = $(el).find('.text-neutral-700').first().text().trim()

            if (arab && latin && arti) {
                hasil.push({ ayat: Number(id), arab, latin, arti })
            }
        })

        if (!hasil.length) return reply('❌ Surah tidak ditemukan!')

        let teks = `📖 *AL-QURAN*\n\n`
        teks += `📝 *${title}*\n`
        teks += `ℹ️ ${info}\n`
        teks += `📊 Total Ayat: ${hasil.length}\n\n`

        if (ayatRange) {
            if (ayatRange.includes('-') || ayatRange.includes('–')) {
                let [start, end] = ayatRange.split(/[-–]/).map(Number)
                hasil.filter(v => v.ayat >= start && v.ayat <= end).forEach(v => {
                    teks += `━━━━━━━━━━━━━━━\n`
                    teks += `🕌 *Ayat ${v.ayat}*\n\n`
                    teks += `${v.arab}\n\n`
                    teks += `🔤 ${v.latin}\n\n`
                    teks += `🇮🇩 ${v.arti}\n\n`
                })
            } else {
                let ayat = hasil.find(v => v.ayat == Number(ayatRange))
                if (!ayat) return reply('❌ Ayat tidak ditemukan!')
                teks += `${ayat.arab}\n\n`
                teks += `🔤 ${ayat.latin}\n\n`
                teks += `🇮🇩 ${ayat.arti}\n`
            }
        } else {
            hasil.forEach(v => {
                teks += `${v.arab}\n\n`
                teks += `🔤 ${v.latin}\n\n`
                teks += `🇮🇩 ${v.arti}\n\n`
                teks += `━━━━━━━━━━━━━━━\n\n`
            })
        }

        await reply(teks)

    } catch (error) {
        console.error(error)
        reply('❌ Gagal mengambil data. Coba lagi nanti.')
    }
}
break
case 'murotal': {
    if (!text) return reply(`📻 *MUROTAL*\n\nContoh:\n.murotal al-fatihah\n.murotal yasin\n.murotal al-baqarah`)

    let query = text.replace(/^[.!?]murotal\s*/i, '').trim()
    if (!query) return reply(`📻 *MUROTAL*\n\nContoh:\n.murotal al-fatihah\n.murotal yasin`)

    try {
        const res = await fetch("https://islamipedia.id/murottal/")
        const html = await res.text()
        const $ = cheerio.load(html)
        
        const data = $(".surah-item").map((i, el) => ({
            no: parseInt($(el).find("h5").text().split(".")[0]),
            surah: ($(el).attr("data-title") || "").toLowerCase(),
            arti: $(el).find("p").text().trim(),
            audio: $(el).attr("data-audio") || ""
        })).get()
        
        const q = query.toLowerCase()
        const find = data.find(v => v.surah.replace(/[^a-z0-9]/g, "").includes(q.replace(/[^a-z0-9]/g, "")))
        
        if (!find) return reply('❌ Surah tidak ditemukan!')
        
        await satanic.sendMessage(m.chat, { 
            audio: { url: find.audio }, 
            mimetype: "audio/mpeg",
            ptt: false
        }, { quoted: fkontak })
        
    } catch (e) {
        console.error(e)
        reply('❌ Gagal mengambil murotal. Coba lagi nanti.')
    }
}
break
case 'applemusic':
case 'applemusicsearch':
case 'amsearch': {
    if (!text) return reply(`Contoh: ${prefix}applemusicsearch dhyo haw`);
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/applemusic?query=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status !== 200 || !response.data.result.data.results || response.data.result.data.results.length === 0) {
            return reply('Lagu tidak ditemukan.');
        }
        
        const tracks = response.data.result.data.results.slice(0, 10);
        
        // Simpan hasil search untuk digunakan di applemusicdl
        global.appleMusicSearchResults = {};
        
        let cards = await Promise.all(tracks.map(async (item, i) => {
            const index = (i + 1).toString();
            
            // Simpan data track
            global.appleMusicSearchResults[index] = {
                title: item.title,
                artist: item.artist,
                songLink: item.songLink,
                albumName: item.albumName
            };
            
            // Ambil artwork dari Apple Music (gunakan placeholder)
            const artworkUrl = `https://c.termai.cc/i101/xvVZ.jpg`;
            
            const imageData = await prepareWAMessageMedia({ 
                image: { url: artworkUrl } 
            }, { 
                upload: satanic.waUploadToServer 
            });
            
            const trackInfo = `*${item.title}*\n\n👤 Artist: ${item.artist}\n💿 Album: ${item.albumName}\n\n🔗 Link: ${item.songLink}\n\nKetik .amdl ${index} untuk download`;
            
            return {
                header: proto.Message.InteractiveMessage.Header.create({
                    ...imageData,
                    title: '',
                    subtitle: `Lagu ${i + 1} dari ${tracks.length}`,
                    hasMediaAttachment: true
                }),
                body: { text: trackInfo },
                nativeFlowMessage: {
                    buttons: [{
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "📋 Copy Link",
                            copy_code: item.songLink
                        })
                    }]
                }
            };
        }));
        
        let msg = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `Hasil pencarian lagu Apple Music untuk *${text}*` },
                            carouselMessage: {
                                cards: cards,
                                messageVersion: 1
                            }
                        }
                    }
                }
            },
            { quoted: fkontak }
        );
        
        await satanic.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mencari lagu.');
    }
}
break;
case 'ytsearch':
case 'youtube': {
    if (!text) return reply(`Contoh: ${prefix}ytsearch anime`);
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const search = require('yt-search');
        const results = await search(text);
        const videos = results.videos.slice(0, 10);
        
        if (!videos || videos.length === 0) {
            return reply('Video tidak ditemukan.');
        }
        
        let cards = await Promise.all(videos.map(async (item, i) => {
            const thumb = item.thumbnail || 'https://i.ytimg.com/vi/default.jpg';
            const imageData = await prepareWAMessageMedia({ 
                image: { url: thumb } 
            }, { 
                upload: satanic.waUploadToServer 
            });
            
            const videoInfo = `*${item.title}*\n\n🕐 Durasi: ${item.timestamp}\n👤 Channel: ${item.author.name}\n👁️ Views: ${item.views.toLocaleString()}\n🔗 Link: ${item.url}`;
            
            return {
                header: proto.Message.InteractiveMessage.Header.create({
                    ...imageData,
                    title: '',
                    subtitle: `Video ${i + 1} dari ${videos.length}`,
                    hasMediaAttachment: true
                }),
                body: { text: videoInfo },
                nativeFlowMessage: {
                    buttons: [{
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "📺 Watch on YouTube",
                            url: item.url
                        })
                    }]
                }
            };
        }));
        
        let msg = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `🎬 Hasil pencarian YouTube untuk *${text}*` },
                            carouselMessage: {
                                cards: cards,
                                messageVersion: 1
                            }
                        }
                    }
                }
            },
            { quoted: fkontak }
        );
        
        await satanic.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mencari video.');
    }
}
break;
case 'npmsearch':
case 'npmsearch': {
    if (!text) return reply(`Contoh: ${prefix}npmsearch axios`);
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(text)}&size=20`;
        const response = await axios.get(apiUrl);
        
        if (!response.data || !response.data.objects || response.data.objects.length === 0) {
            return reply('Package NPM tidak ditemukan.');
        }
        
        let info = `📦 *NPM SEARCH RESULTS*\n\n`;
        info += `🔍 *Keyword:* ${text}\n`;
        info += `📊 *Total Found:* ${response.data.total || response.data.objects.length}\n`;
        info += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        
        for (let i = 0; i < response.data.objects.length; i++) {
            const pkg = response.data.objects[i].package;
            const score = response.data.objects[i].score;
            
            info += `*${i+1}. ${pkg.name}*\n`;
            info += `📝 *Description:* ${pkg.description || '-'}\n`;
            info += `🔖 *Latest Version:* ${pkg.version}\n`;
            info += `📅 *Published:* ${pkg.date ? new Date(pkg.date).toLocaleDateString('id-ID') + ' ' + new Date(pkg.date).toLocaleTimeString('id-ID') : '-'}\n`;
            info += `🔗 *NPM Link:* https://www.npmjs.com/package/${pkg.name}\n`;
            
            if (pkg.publisher && pkg.publisher.username) {
                info += `👤 *Publisher:* ${pkg.publisher.username}\n`;
            }
            
            if (pkg.keywords && pkg.keywords.length > 0) {
                info += `🏷️ *Keywords:* ${pkg.keywords.join(', ')}\n`;
            }
            
            if (score && score.final) {
                info += `⭐ *Score:* ${(score.final * 100).toFixed(1)}%\n`;
            }
            
            info += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        }
        
        info += `📥 *Project By:* ${namaBot}`;
        
        await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mencari package NPM.');
    }
}
break;
case 'animepat':{
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/pat`)       
            await satanic.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: mess.success}, { quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animeslap':{
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/slap`)       
            await satanic.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: mess.success}, { quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animecuddle':{
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/cuddle`)       
            await satanic.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: mess.success}, { quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animewaifu':{
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/waifu`)       
            await satanic.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: mess.success}, { quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animenom':{
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/nom`)       
            await satanic.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: mess.success}, { quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animefoxgirl':{
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/fox_girl`)       
            await satanic.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: mess.success}, { quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animetickle': {
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/tickle`)     
            await satanic.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: mess.success},{ quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animegecg': {
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/gecg`)     
            await satanic.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: mess.success},{ quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'dogwoof': {
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/woof`)     
            await satanic.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: mess.success},{ quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case '8ballpool': {
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/8ball`)     
            await satanic.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: mess.success},{ quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'goosebird': {
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/goose`)     
            await satanic.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: mess.success},{ quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animefeed': {
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/feed`)     
            await satanic.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: mess.success},{ quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animeavatar': {
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/avatar`)     
            await satanic.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: mess.success},{ quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'lizardpic': {
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/lizard`)     
            await satanic.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: mess.success},{ quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'catmeow': {
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/meow`)     
            await satanic.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: mess.success},{ quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animewlp':{
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/wallpaper`)       
            await satanic.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: mess.success}, { quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animekiss':{
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/kiss`)       
            await satanic.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: mess.success}, { quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case 'animehug':{
reply(mess.wait)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/hug`)       
            await satanic.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: mess.success}, { quoted:fkontak }).catch(err => {
return('Error!')
})
}
break
case "sixtynine": 
case "pussy": 
case "dick": 
case "anal": 
case "boobs": 
case "bdsm":
case "black": 
case "easter": 
case "bottomless": 
case "blowjub": 
case "collared": 
case "cum": 
case "cumsluts": 
case "dp": 
case "dom": 
case "extreme": 
case "feet": 
case "finger": 
case "fuck": 
case "futa": 
case "gay": 
case "gif": 
case "group": 
case "hentai": 
case "kiss": 
case "lesbian": 
case "lick": 
case "pegged": 
case "phgif": 
case "puffies": 
case "real": 
case "suck": 
case "tattoo": 
case "tiny": 
case "toys":
 case "xmas":
 if (!isPrem) return reply('you are not premium')
    try {
        // Kirim reply "wait" dulu
        await reply(mess.wait || 'Tunggu sebentar...')
        
const { data } = await axios.get(`https://free-restapi.biz.id/api/${command}?&apikey=${global.sakey}`, {
    responseType: 'arraybuffer'
})

// Kirim gambar dengan caption
await satanic.sendMessage(m.chat, {
    image: Buffer.from(data),
    caption: 'Done'
}, { quoted: fkontak })
    } catch (error) {
        console.error('Error fetching waifu image:', error)
        let errorMessage = 'Gagal mengambil gambar'
        if (error.response) {
            errorMessage = `API Error: ${error.response.status}`
        } else if (error.request) {
            errorMessage = 'Tidak ada response dari server'
        }
        
        await reply(errorMessage)
    }
    break        
case 'pin':
case 'pinterest': {
    async function getCookies() {
      try {
        const response = await axios.get('https://www.pinterest.com/csrf_error/');
        const setCookieHeaders = response.headers['set-cookie'];
        if (setCookieHeaders) {
          const cookies = setCookieHeaders.map(cookieString => {
            const cookieParts = cookieString.split(';');
            const cookieKeyValue = cookieParts[0].trim();
            return cookieKeyValue;
          });
          return cookies.join('; ');
        } else {
          console.warn('No set-cookie headers found in the response.');
          return null;
        }
      } catch (error) {
        console.error('Error fetching cookies:', error);
        return null;
      }
    }
    
 async function pinterest(query) {
      try {
        const cookies = await getCookies();
        if (!cookies) {
          console.log('Failed to retrieve cookies. Exiting.');
          return;
        }

        const url = 'https://www.pinterest.com/resource/BaseSearchResource/get/';

        const params = {
          source_url: `/search/pins/?q=${query}`,
          data: JSON.stringify({
            "options": {
              "isPrefetch": false,
              "query": query,
              "scope": "pins",
              "no_fetch_context_on_resource": false
            },
            "context": {}
          }),
          _: Date.now()
        };

        const headers = {
          'accept': 'application/json, text/javascript, */*, q=0.01',
          'accept-encoding': 'gzip, deflate',
          'accept-language': 'en-US,en;q=0.9',
          'cookie': cookies,
          'dnt': '1',
          'referer': 'https://www.pinterest.com/',
          'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
          'sec-ch-ua-full-version-list': '"Not(A:Brand";v="99.0.0.0", "Microsoft Edge";v="133.0.3065.92", "Chromium";v="133.0.6943.142"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-model': '""',
          'sec-ch-ua-platform': '"Windows"',
          'sec-ch-ua-platform-version': '"10.0.0"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
          'x-app-version': 'c056fb7',
          'x-pinterest-appstate': 'active',
          'x-pinterest-pws-handler': 'www/[username]/[slug].js',
          'x-pinterest-source-url': '/hargr003/cat-pictures/',
          'x-requested-with': 'XMLHttpRequest'
        };

        const {
          data
        } = await axios.get(url, {
          headers: headers,
          params: params
        })

        const container = [];
        const results = data.resource_response.data.results.filter((v) => v.images?.orig);
        results.forEach((result) => {
          container.push({
            upload_by: result.pinner.username,
            fullname: result.pinner.full_name,
            followers: result.pinner.follower_count,
            caption: result.grid_title,
            image: result.images.orig.url,
            source: "https://id.pinterest.com/pin/" + result.id,
          });
        });

        return container;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    
      if (!text) return reply(`Format salah, contoh: \n${prefix + command} Anime`)
      
      await satanic.sendMessage(m.chat, {
        react: {
          text: '⏳',
          key: m.key
        }
      })

      let anutrest = await pinterest(text) // Ambil hasil pencarian
      if (!anutrest || anutrest.length === 0) return reply("Error, Foto Tidak Ditemukan")

      // Ambil maksimal 10 gambar biar nggak terlalu panjang
      let selectedImages = anutrest.slice(0, 10);
      let anu = []

      for (let i = 0; i < selectedImages.length; i++) {
        let imgsc = await prepareWAMessageMedia({
          image: {
            url: selectedImages[i].image
          }
        }, {
          upload: satanic.waUploadToServer
        })

        anu.push({
          header: proto.Message.InteractiveMessage.Header.fromObject({
            title: `Gambar ke *${i + 1}*`,
            hasMediaAttachment: true,
            ...imgsc
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
            buttons: [{
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "Lihat di Pinterest",
                url: selectedImages[i].source || selectedImages[i].image
              })
            }]
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "© Lumakara"
          })
        })
      }

      // Buat format `carouselMessage`
      const msg = await generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `🔎 Berikut hasil pencarian gambar untuk *${text}*`
              }),
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                cards: anu
              })
            })
          }
        }
      }, {
        userJid: sender,
        quoted: fkontak
      })
      satanic.relayMessage(m.chat, msg.message, {
        messageId: msg.key.id
      })
    }
break
case "bingimage":
case "bingimg":
{
    if (!text) return reply(`❌ *Cara penggunaan:* ${prefix + command} kata kunci\nContoh: ${prefix + command} kucing lucu`);

    await satanic.sendMessage(m.chat, {
        react: {
            text: '⏳',
            key: m.key
        }
    });

    try {
        const query = text.trim();
        const limit = 10; // Jumlah gambar yang diambil
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        };

        // Format query untuk URL
        const q = query.split(/\s+/).join('+');
        const url = `https://www.bing.com/images/search?q=${q}&FORM=HDRSC2`;

        // Request ke Bing
        const res = await axios.get(url, { headers });
        const $ = cheerio.load(res.data);

        let images = [];

        // Scrape gambar dari elemen a.iusc
        $('a.iusc').each((i, el) => {
            if (i >= limit) return false; // Batasi sesuai limit

            try {
                const mRaw = $(el).attr('m') || '{}';
                const madRaw = $(el).attr('mad') || '{}';

                const m = JSON.parse(mRaw);
                const mad = JSON.parse(madRaw);

                const original_url = m?.murl;
                const preview_url = mad?.turl;
                const title = m?.t || 'Gambar';

                if (!original_url) return;

                images.push({
                    title: title,
                    preview_url: preview_url || original_url,
                    original_url: original_url,
                    source: original_url
                });
            } catch (e) {
                // Abaikan error parsing
            }
        });

        // Cek apakah ada gambar ditemukan
        if (images.length === 0) {
            return reply(`❌ Tidak ditemukan gambar untuk *${query}*`);
        }

        // Ambil maksimal 10 gambar
        let selectedImages = images.slice(0, 10);
        let anu = [];

        for (let i = 0; i < selectedImages.length; i++) {
            let imgsc = await prepareWAMessageMedia({
                image: {
                    url: selectedImages[i].original_url
                }
            }, {
                upload: satanic.waUploadToServer
            });

            anu.push({
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: `Gambar ke *${i + 1}*`,
                    hasMediaAttachment: true,
                    ...imgsc
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [{
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Lihat Gambar",
                            url: selectedImages[i].original_url
                        })
                    }]
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: "© Bing Image Search"
                })
            });
        }

        // Buat format `carouselMessage`
        const msg = await generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.fromObject({
                            text: `🔎 *Hasil Pencarian Gambar dari Bing*\n📝 *Query:* ${query}\n📊 *Ditemukan:* ${images.length} gambar`
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: anu
                        })
                    })
                }
            }
        }, {
            userJid: sender,
            quoted: fkontak
        });

        await satanic.relayMessage(m.chat, msg.message, {
            messageId: msg.key.id
        });

    } catch (error) {
        console.error("Error BingImage:", error);
        reply(`❌ Gagal mengambil gambar: ${error.message}`);
    }
}
break;
case 'ttsearch':
case 'tiktoksearch': {
    if (!text) return reply(`Contoh: ${prefix}ttsearch Furina`);
    try {
        const { TikTokSearch } = require('./lib/tiktoksearch');
        const result = await TikTokSearch.search(text);        
        if (!result.success || !result.payload || result.payload.length === 0) {
            return reply('Video tidak ditemukan.');
        }
        const videos = result.payload.slice(0, 10);
        let cards = await Promise.all(videos.map(async (item, i) => {
            const videoData = await prepareWAMessageMedia({ 
                video: { url: item.media.no_watermark } 
            }, { 
                upload: satanic.waUploadToServer 
            });
            const videoInfo = `*${item.title}*      
🕐 Durasi: ${item.duration}s
👤 Creator: ${item.author.nickname} (@${item.author.unique_id})
👍 Likes: ${item.stats.digg_count}
💬 Komentar: ${item.stats.comment_count}
📨 Shares: ${item.stats.share_count}`;

            return {
                header: proto.Message.InteractiveMessage.Header.create({
                    ...videoData,
                    title: '',
                    subtitle: `Video ${i + 1} dari ${videos.length}`,
                    hasMediaAttachment: true
                }),
                body: { text: videoInfo },
                nativeFlowMessage: { buttons: [] }
            };
        }));
        let msg = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `Hasil pencarian video TikTok untuk *${text}*` },
                            carouselMessage: {
                                cards: cards,
                                messageVersion: 1
                            }
                        }
                    }
                }
            },
            { quoted: fkontak }
        );
        await satanic.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil video.');
    }
}
break;
case 'randomhentai': {
    if (!isPrem) return reply('❌ Fitur premium only');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const response = await fetch("https://api.waifu.im/images?IsNsfw=All");
        const data = await response.json();
        const imageUrl = data.items[Math.floor(Math.random() * data.items.length)].url;
        
        await satanic.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: '🌸 Random Waifu 🌸'
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, { react: { text: '🌸', key: m.key } });
    } catch (err) {
        reply('❌ Gagal ambil waifu');
    }
}
break;

case 'xnxxsearch': {
if (!isPrem) return reply('you are not premium')
    if (!text) return reply(`Enter Query`);
    const apiUrlxnxx = `https://free-restapi.biz.id/api/xnxxsearch?query=${encodeURIComponent(text)}&apikey=${global.sakey}`;
    const resxnx = await axios.get(apiUrlxnxx);
    const results = resxnx.data?.result?.result;
    if (!results || !Array.isArray(results) || results.length === 0) {
        return reply(`No results found for: ${text}`);
    }
    let ffxnx = results.map((v, i) => 
        `${i + 1}┃ *Title:* ${v.title}\n*Link:* ${v.link}\n*Info:* ${v.info.trim()}`
    ).join('\n\n');
    reply(ffxnx);
}
break;
case 'xvideosearch': {
if (!isPrem) return reply('you are not premium')
    if (!text) return reply(`Enter Query`);
    const apiUrlxvideos = `https://free-restapi.biz.id/api/xvideosearch?query=${encodeURIComponent(text)}&apikey=${global.sakey}`;
    const resxvids = await axios.get(apiUrlxvideos);
    const results = resxvids.data?.result;
    if (!results || !Array.isArray(results) || results.length === 0) {
        return reply(`No results found for: ${text}`);
    }
    let ffxvids = results.map((v, i) => 
        `${i + 1}┃ *Title:* ${v.title}\n*Duration:* ${v.duration}\n*Link:* ${v.url}\n*Quality:* ${v.quality || '-'}`
    ).join('\n\n');
    reply(ffxvids);
}
break;  
case 'xnxxdl': {
if (!isPrem) return reply('you are not premium')
    if (!text) return reply(`Enter URL`);    
    const apiUrldl = `https://free-restapi.biz.id/api/xnxxdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
    const resdl = await axios.get(apiUrldl);    
    const data = resdl.data?.result?.result;    
    if (!data) {
        return reply(`Failed to get download link`);
    }    
    const videoUrl = data.files?.high || data.files?.low || data.files?.HLS;    
    if (!videoUrl) {
        return reply(`No video URL found`);
    }    
    let msg = `*Title:* ${data.title}\n`;
    msg += `*Duration:* ${Math.floor(data.duration / 60)}min ${data.duration % 60}detik\n`;
    msg += `*Info:* ${(data.info || '').trim()}\n\n`;
    msg += `*Download Links:*\n`;
    msg += `📱 Low (240p): ${data.files?.low || '-'}\n`;
    msg += `🎥 High (360p): ${data.files?.high || '-'}\n`;
    msg += `📺 HLS: ${data.files?.HLS || '-'}`;
    await satanic.sendMessage(m.chat, { 
        video: { url: videoUrl }, 
        caption: msg 
    }, { quoted: fkontak });
}
break;
case 'xvideodl': {
if (!isPrem) return reply('you are not premium')
    if (!text) return reply(`Enter URL`);    
    const apiUrldl = `https://free-restapi.biz.id/api/xvideodl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
    const resdl = await axios.get(apiUrldl);    
    const data = resdl.data?.result?.result;
    if (!data) {
        return reply(`Failed to get download link`);
    }    
    let msg = `*Title:* ${data.title}\n`;
    msg += `*Tags:* ${data.keyword}`;       
    await satanic.sendMessage(m.chat, { 
        video: { url: data.url }, 
        caption: msg 
    }, { quoted: fkontak });
}
break;


async function uploadToAliceCdn(buffer, fileName) {
    const axios = require('axios');
    const FormData = require('form-data');
    const form = new FormData();
    form.append('cdnFile', buffer, fileName);

    try {
        const res = await axios.post(
            'https://aliceecdn.vercel.app/upload', 
            form,
            { headers: form.getHeaders() }
        );

        if (res.data?.url) return res.data.url;
        throw new Error('Upload failed: ' + JSON.stringify(res.data));
        
    } catch (err) {
        throw new Error(`Upload error: ${err.response?.data?.message || err.message}`);
    }
}




/////// SEARCH MENU /////////
//////////// TOOLS MENU //////
case 'kodepos':
case 'kode_pos': {
    if (!text) return reply('Masukkan nama kota atau kecamatan!\n\nContoh: .kodepos jakarta');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/kodepos?kodepos=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status !== 200) {
            return reply('Kode pos tidak ditemukan.');
        }
        
        const result = response.data.result;
        const data = result.data.slice(0, 15);
        
        let info = `📍 *KODE POS INDONESIA*\n\n`;
        info += `🔍 *Pencarian:* ${text}\n`;
        info += `📊 *Total Ditemukan:* ${result.total}\n`;
        info += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            info += `${i+1}. *${item.kodepos}*\n`;
            info += `   📍 Desa/Kel: ${item.desa}\n`;
            info += `   🏘️ Kecamatan: ${item.kecamatan}\n`;
            info += `   🏙️ Kota: ${item.kota}\n`;
            info += `   🌏 Provinsi: ${item.provinsi}\n\n`;
        }
        
        if (result.total > 15) {
            info += `*dan ${result.total - 15} data lainnya...*\n\n`;
        }
        
        info += `📥 *Project By:* ${namaBot}`;
        
        await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mencari kode pos.');
    }
}
break;
case 'cekresi':
case 'resi': {
    if (!text) return reply('📦 *CEK RESI*\n\nMasukkan kurir dan nomor resi!\n\nContoh: .cekresi jne 123456789\n\n*Daftar Kurir:*\n• jne\n• pos\n• tiki\n• wahana\n• jnt\n• sicepat\n• ninja\n• spx (shopee express)\n• anteraja\n• lionparcel\n• ncs\n• pcp\n• rpx\n• sap\n• jet\n• indahlogistik\n• dse\n• firstlogistics\n• idexpress\n• lalamove\n• paxel\n• pandu\n• sentral\n• star\n• tiki\n• cargo\n• etc');   
    if (args.length < 2) return reply('⚠️ Format salah!\n\nContoh: .cekresi jne 123456789');   
    const kurir = args[0].toLowerCase();
    const noResi = args[1];
    const listKurir = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'sicepat', 'ninja', 'spx', 'anteraja', 'lionparcel', 'ncs', 'pcp', 'rpx', 'sap', 'jet', 'indahlogistik', 'dse', 'firstlogistics', 'idexpress', 'lalamove', 'paxel', 'pandu', 'sentral', 'star', 'cargo', 'etc'];
    if (!listKurir.includes(kurir)) {
        return reply(`❌ Kurir *${kurir}* tidak dikenal!\n\n📋 *Daftar Kurir:*\n${listKurir.join(', ')}`);
    }
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        const apiUrl = `https://free-restapi.biz.id/api/cekresi?kurir=${kurir}&resi=${noResi}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        if (response.data.status !== 200) {
            return reply(`❌ Resi tidak ditemukan untuk kurir *${kurir.toUpperCase()}* dengan nomor *${noResi}*`);
        }
        const result = response.data.result;
        let info = `📦 *CEK RESI*\n\n`;
        info += `🚚 *Expedisi:* ${result.expedisi || kurir.toUpperCase()}\n`;
        info += `📝 *No Resi:* ${result.no_resi}\n`;
        info += `✅ *Status:* ${result.status}\n`;
        if (result.tanggal_kirim) {
            info += `📅 *Tanggal Kirim:* ${result.tanggal_kirim}\n`;
        }
        info += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        info += `📜 *RIWAYAT PENGIRIMAN*\n\n`;
        if (result.riwayat && result.riwayat.length > 0) {
            for (let i = 0; i < result.riwayat.length; i++) {
                const r = result.riwayat[i];
                info += `${i+1}. ${r.waktu || '-'}\n`;
                info += `   📍 ${r.deskripsi || r.deskripsi_original || '-'}\n`;
                if (r.lokasi) info += `   📌 Lokasi: ${r.lokasi}\n`;
                info += `\n`;
            }
        } else {
            info += `Tidak ada riwayat pengiriman.\n`;
        }
        info += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        info += `📥 *Project By:* ${namaBot}`;
        if (info.length > 4096) {
            let parts = info.match(/[\s\S]{1,4096}/g) || [];
            for (let part of parts) {
                await satanic.sendMessage(m.chat, { text: part }, { quoted: fkontak });
            }
        } else {
            await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
        }     
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('❌ Terjadi kesalahan saat melacak resi.');
    }
}
break;
case 'google': {
  satanic.sendMessage(m.chat, { react: { text: `🔍`, key: m.key } });
  if (!text) {
    return satanic.sendMessage(m.chat, { 
      text: `*🔎 GOOGLE SEARCH*\n\nContoh: ${prefix}google indonesia\n\nMasukkan kata kunci pencarian setelah perintah.`
    });
  }
  let apiUrl = `https://free-restapi.biz.id/api/google?query=${encodeURIComponent(text)}&apikey=${global.sakey}`;
  let response = await fetch(apiUrl);
  let data = await response.json();
  if (!data || data.length === 0) {
    return satanic.sendMessage(m.chat, { text: '❌ Tidak ada hasil ditemukan.' });
  }
  let resultText = `*🔎 HASIL PENCARIAN: ${text}*\n\n`;
  for (let i = 0; i < Math.min(data.length, 5); i++) {
    resultText += `*${i+1}. ${data[i].title}*\n`;
    resultText += `📝 ${data[i].description}\n`;
    resultText += `🔗 ${data[i].url}\n\n`;
  }
  await satanic.sendMessage(m.chat, { text: resultText });
}
break
case "kalkulator":{
 val = text
.replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
.replace(/×/g, '*')
.replace(/÷/g, '/')
.replace(/π|pi/gi, 'Math.PI')
.replace(/e/gi, 'Math.E')
.replace(/\/+/g, '/')
.replace(/\++/g, '+')
.replace(/-+/g, '-')
let format = val
.replace(/Math\.PI/g, 'π')
.replace(/Math\.E/g, 'e')
.replace(/\//g, '÷')
.replace(/\*×/g, '×')
try {
let result = (new Function('return ' + val))()
if (!result) return reply(result)
reply(`*${format}* = _${result}_`)
} catch (e) {
if (e == undefined) return reply('Isinya?')
reply('Format salah, hanya 0-9 dan Simbol -, +, *, /, ×, ÷, π, e, (, ) yang disupport')
}
}
break
case 'skiplink':
case 'bypass': {
    if (!text) return reply('Masukkan URL shortener!\n\nContoh: .skiplink https://sfl.gl/xxx');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    const apiUrl = `https://fgsi.dpdns.org/api/tools/skip/tutwuri?apikey=${global.fgsi}&url=${encodeURIComponent(text)}`;
    const response = await axios.get(apiUrl);
    
    if (!response.data.status) {
        return reply('Gagal melewati link!');
    }
    
    const resultUrl = response.data.data.url;
    
    let info = `🔗 *SKIP LINK BYPASSER*\n\n`;
    info += `📌 *Original URL:* ${text}\n`;
    info += `✅ *Destination URL:* ${resultUrl}\n\n`;
    info += `📥 *Download by:* ${namaBot}`;
    
    await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'whatmusic':
case 'whatsong':
case 'identify': {
    if (!quoted) return reply(`🎵 *WHAT MUSIC - Identify Song* 🎵\n\n> Mengidentifikasi lagu dari file audio/video\n\n📌 *Cara penggunaan:*\n\n1️⃣ *Dengan URL audio:*\n\`\`\`${prefix + command} <url_audio>\`\`\`\n\n2️⃣ *Reply ke pesan audio/video:*\n\`\`\`Reply ke pesan audio/vn/video lalu kirim ${prefix + command}\`\`\``);
    
    let mime = quoted.mimetype || '';
    let audioUrl = null;
    
    // Fungsi upload ke Litterbox
    async function uploadToLitterbox(fileBuffer, filename) {
        try {
            const form = new FormData();
            form.append('reqtype', 'fileupload');
            form.append('time', '72h');
            form.append('fileToUpload', Buffer.from(fileBuffer), {
                filename: filename,
                contentType: require('mime').lookup(filename) || 'application/octet-stream'
            });

            const response = await axios.post('https://litterbox.catbox.moe/resources/internals/api.php', form, {
                headers: form.getHeaders(),
                timeout: 30000
            });

            if (response.status !== 200) throw new Error('Litterbox gagal');
            const url = response.data;
            if (!url.startsWith('http')) throw new Error('Invalid response');
            return url;
        } catch (err) {
            console.error("Litterbox Error:", err.message);
            return null;
        }
    }
    
    // Jika command langsung dengan URL
    let directUrl = text;
    if (directUrl && (directUrl.includes('http') || directUrl.includes('cdn'))) {
        audioUrl = directUrl;
    }
    // Jika reply ke pesan audio/video
    else if (quoted && (/audio/.test(mime) || /video/.test(mime))) {
        const mediaBuffer = await quoted.download();
        
        // Upload ke Litterbox
        const extension = mime.split('/')[1] || 'mp3';
        const filename = `audio.${extension}`;
        audioUrl = await uploadToLitterbox(mediaBuffer, filename);
        
        if (!audioUrl) {
            return reply('Gagal upload audio ke Litterbox');
        }
    }
    else {
        return reply(`Kirim atau reply file audio/video!`);
    }
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    const identifyEndpoint = `https://api.neoxr.eu/api/whatmusic?url=${encodeURIComponent(audioUrl)}&apikey=${global.neoxr}`;
    const identifyResponse = await axios.get(identifyEndpoint);
    const identifyResult = identifyResponse.data;
    
    if (!identifyResult.status) return reply('Gagal mengidentifikasi lagu');
    
    const songData = identifyResult.data;
    
    let balasan = `🎵 *WHAT MUSIC - SONG IDENTIFIER* 🎵\n\n`;
    balasan += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    balasan += `🎤 *Judul:* ${songData.title}\n`;
    balasan += `👨‍🎤 *Artis:* ${songData.artist}\n`;
    balasan += `💿 *Album:* ${songData.album}\n`;
    balasan += `📅 *Rilis:* ${songData.release}\n`;
    balasan += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    balasan += `🔗 *TAUTAN MUSIK:*\n\n`;
    
    if (songData.links?.spotify) {
        balasan += `🎧 *Spotify*\n`;
        balasan += `   • 🔗 https://open.spotify.com/track/${songData.links.spotify.track.id}\n\n`;
    }
    
    if (songData.links?.deezer) {
        balasan += `🎵 *Deezer*\n`;
        balasan += `   • 🔗 https://deezer.com/track/${songData.links.deezer.track.id}\n\n`;
    }
    
    if (songData.links?.youtube) {
        balasan += `📺 *YouTube*\n`;
        balasan += `   • 🔗 https://youtu.be/${songData.links.youtube.vid}\n\n`;
    }
    
    if (songData.links?.soundcloud) {
        balasan += `🎙️ *SoundCloud*\n`;
        balasan += `   • 🔗 ${songData.links.soundcloud.url || 'https://soundcloud.com/'}\n\n`;
    }
    
    balasan += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    balasan += `📥 *Project By:* ${namaBot}`;
    
    await satanic.sendMessage(m.chat, { text: balasan }, { quoted: fkontak });
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'ocr':
case 'readtext': {
 const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Hanya support gambar!');    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    async function uploadToLitterbox(fileBuffer, filename) {
        try {
            const FormData = require('form-data');
            const form = new FormData();
            form.append('reqtype', 'fileupload');
            form.append('time', '72h');
            form.append('fileToUpload', Buffer.from(fileBuffer), {
                filename: filename,
                contentType: require('mime').lookup(filename) || 'image/jpeg'
            });

            const response = await axios.post('https://litterbox.catbox.moe/resources/internals/api.php', form, {
                headers: form.getHeaders(),
                timeout: 30000
            });
            if (response.status !== 200) throw new Error('Litterbox gagal');
            const url = response.data;
            if (!url.startsWith('http')) throw new Error('Invalid response');
            return url;
        } catch (err) {
            console.error("Litterbox Error:", err.message);
            return null;
        }
    }
    let mediaBuffer = await quoted.download();
    let extension = mime.split('/')[1] || 'jpg';
    let imageUrl = await uploadToLitterbox(mediaBuffer, `image.${extension}`);
    if (!imageUrl) {
        return reply('Gagal upload gambar ke Litterbox');
    }
    const apiUrl = `https://free-restapi.biz.id/api/ocr?image_url=${encodeURIComponent(imageUrl)}&apikey=${global.sakey}`;
    const response = await axios.get(apiUrl);
    
    if (response.data.status !== 200) {
        return reply('Gagal membaca teks dari gambar.');
    }
    const result = response.data.result;
    let info = `🔍 *OCR - TEXT EXTRACTOR*\n\n`;
    info += `📊 *Total Karakter:* ${result.total_characters}\n`;
    info += `📄 *Total Baris:* ${result.total_lines}\n`;
    info += `🎯 *Confidence:* ${result.ocr_confidence}\n\n`;
    info += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    info += `📝 *HASIL TEKS:*\n\n${result.text}\n`;
    info += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    info += `📥 *Project By:* ${namaBot}`;
    
    await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'translate': {
  async function translate(query = "", lang) {
    if (!query.trim()) return "";
    const url = new URL("https://translate.googleapis.com/translate_a/single");
    url.searchParams.append("client", "gtx");
    url.searchParams.append("sl", "auto");
    url.searchParams.append("dt", "t");
    url.searchParams.append("tl", lang);
    url.searchParams.append("q", query);
    try {
      const response = await fetch(url.href);
      const data = await response.json();
      if (data && data[0]) {
        return data[0].map(item => item[0].trim()).join("\n");
      }
      return "";
    } catch (err) {
      throw err;
    }
  }
  let textToTranslate = "";
  let targetLang = "id";
  if (text && text.trim()) {
    const firstWord = text.trim().split(" ")[0];
    if (firstWord.length === 2 && /^[a-z]{2}$/i.test(firstWord)) {
      targetLang = firstWord.toLowerCase();
      textToTranslate = text.trim().split(" ").slice(1).join(" ");
    } else {
      textToTranslate = text;
    }
  }
  if (!textToTranslate && m.quoted && m.quoted.text) {
    textToTranslate = m.quoted.text;
  }
  if (!textToTranslate || !textToTranslate.trim()) {
    return reply(`⚠️ *Contoh penggunaan semua bahasa:*\n\n\
🌏 *ASIA*\n\
└ .translate id Good morning → selamat pagi\n\
└ .translate en Selamat pagi → good morning\n\
└ .translate ja Selamat pagi → おはようございます\n\
└ .translate ko Selamat pagi → 좋은 아침이에요\n\
└ .translate zh Selamat pagi → 早上好\n\
└ .translate th Selamat pagi → อรุณสวัสดิ์\n\
└ .translate vi Selamat pagi → chào buổi sáng\n\
└ .translate hi Selamat pagi → सुप्रभात\n\
└ .translate ms Selamat pagi → selamat pagi\n\
└ .translate tl Selamat pagi → magandang umaga\n\n\
🇪🇺 *EROPA*\n\
└ .translate es Selamat pagi → buenos días\n\
└ .translate fr Selamat pagi → bonjour\n\
└ .translate de Selamat pagi → guten morgen\n\
└ .translate it Selamat pagi → buongiorno\n\
└ .translate pt Selamat pagi → bom dia\n\
└ .translate ru Selamat pagi → доброе утро\n\
└ .translate nl Selamat pagi → goedemorgen\n\
└ .translate pl Selamat pagi → dzień dobry\n\n\
🌍 *TIMUR TENGAH & AFRIKA*\n\
└ .translate ar Selamat pagi → صباح الخير\n\
└ .translate tr Selamat pagi → günaydın\n\
└ .translate sw Selamat pagi → habari za asubuhi\n\n\
📝 *Cara pakai:*\n\
└ Ketik: .translate [kode] [teks]\n\
└ Atau reply pesan + .translate [kode]`);
  }
  try {
    const result = await translate(textToTranslate, targetLang);
    if (!result) return reply("❌ Gagal menerjemahkan teks.");
    reply(result);
  } catch (error) {
    reply(`❌ Error: ${error.message}`);
  }
  break;
}
case 'ssweb':
case 'screenshotweb': {
    if (!text) return reply('Masukkan URL website!\n\nContoh: .ssweb https://google.com\n\nDevice: desktop, tablet, mobile\nContoh: .ssweb https://google.com tablet');
    const url = args[0];
    let device = args[1] ? args[1].toLowerCase() : 'desktop';
    if (!['desktop', 'tablet', 'mobile'].includes(device)) {
        return reply('Device tidak valid! Gunakan: desktop, tablet, atau mobile');
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return reply('URL harus lengkap dengan http:// atau https://');
    }
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        const apiUrl = `https://free-restapi.biz.id/api/ssweb?url=${encodeURIComponent(url)}&device=${device}&apikey=${global.sakey}`
         await satanic.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: `*SSWEB RESULT*\n\nURL: ${url}\nDevice: ${device}\n\nProject By: ${namaBot}`
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil screenshot website.');
    }
}
break;

///////// BATAS AKHIR ////////
////////// DOWNLOAD MENU /////////
case 'tt':
case 'ttdl':
case 'tiktok':
case 'tiktokdl': {
if (!text) return reply('Masukkan URL TikToknya!\n\nContoh: .tt https://www.tiktok.com/@username/video/xxx')
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
 const apiUrl = `https://free-restapi.biz.id/api/ttdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    if (response.data.status !== 200) {
        return reply('Gagal mengambil data dari TikTok')
    }
    const result = response.data.result
    let info = `TIKTOK DOWNLOADER\n\n`
    info += `Title: ${result.title}\n`
    info += `Duration: ${result.duration}\n`
    info += `Region: ${result.region}\n`
    info += `Taken At: ${result.taken_at}\n\n`
    info += `AUTHOR\n`
    info += `Nickname: ${result.author.nickname}\n`
    info += `Username: ${result.author.id}\n\n`
    info += `STATS\n`
    info += `Views: ${result.stats.views}\n`
    info += `Likes: ${result.stats.likes}\n`
    info += `Comments: ${result.stats.comment}\n`
    info += `Shares: ${result.stats.share}\n`
    info += `Downloads: ${result.stats.download}\n\n`
    info += `Project By: ${global.namaBot}`
    const videoUrl = result.videos.find(v => v.type === 'nowatermark')?.url || result.videos[0]?.url
    await satanic.sendMessage(m.chat, { 
        video: { url: videoUrl }, 
        caption: info 
    }, { quoted: fkontak })
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'play':{
    if(!text) return reply('Masukkan judul lagu!');
    try{
        await satanic.sendMessage(m.chat,{react:{text:'🎵',key:m.key}});
        const SavetubeDownloader = require('./lib/savetube'); 
        const downloader = new SavetubeDownloader();
        const yts = require('yt-search');
        const search = await yts(text);
        if(!search.all.length) return reply('❌ Lagu tidak ditemukan');
        
        const video = search.all[0];
        const videoUrl = video.url;
        const title = video.title;
        const thumbnail = video.thumbnail;
        const duration = video.timestamp;
        const views = video.views;
        
        await satanic.sendMessage(m.chat,{
            image:{url:thumbnail},
            caption:`🎵 *${title}*\n\n⏱️ *Durasi:* ${duration}\n👁️ *Views:* ${views.toLocaleString()}\n🔗 *Link:* ${videoUrl}\n\n📥 *Mengunduh audio...*`
        },{quoted:fkontak});
        
        let audioSent = false;
        
        // Fallback 1: Coba SavetubeDownloader
        try {
            const result = await downloader.ytmp3(videoUrl, "128");
            if (result && result.success && result.data && result.data.downloadUrl) {
                await satanic.sendMessage(m.chat,{
                    audio:{url:result.data.downloadUrl},
                    mimetype:'audio/mpeg',
                    ptt:false
                },{quoted:fkontak});
                audioSent = true;
            } else {
                throw new Error('Savetube gagal');
            }
        } catch (err) {
            console.log('[FALLBACK] Savetube error:', err.message);
            
            // Fallback 2: Coba y2mate
            try {
                const y2mateResult = await y2mate(videoUrl);
                if (y2mateResult && y2mateResult.status === 'tunnel' && y2mateResult.url) {
                    await satanic.sendMessage(m.chat, {
                        audio: { url: y2mateResult.url },
                        mimetype: 'audio/mpeg',
                        filename: y2mateResult.filename || `${title}.mp3`,
                        ptt: false
                    }, { quoted: m });
                    audioSent = true;
                } else {
                    throw new Error('y2mate gagal');
                }
            } catch (err2) {
                console.log('[FALLBACK] y2mate error:', err2.message);
                // Fallback 3: Kirim link saja
                await satanic.sendMessage(m.chat, {
                    text: `⚠️ Gagal mengunduh audio.\n\nSilahkan download manual:\n${videoUrl}\n\nAtau coba perintah:\n.ytmp3 ${videoUrl}`
                }, { quoted: fkontak });
            }
        }
        
        if (audioSent) {
            await satanic.sendMessage(m.chat,{react:{text:'✅',key:m.key}});
        } else {
            await satanic.sendMessage(m.chat,{react:{text:'⚠️',key:m.key}});
        }
        
    } catch(error){
        console.error('[ERROR]', error);
        await satanic.sendMessage(m.chat, {
            text: '❌ Terjadi kesalahan, silahkan coba lagi nanti.'
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat,{react:{text:'❌',key:m.key}});
    }
    break;
}

case 'ytmp3': {
    if (!text) return reply('Masukkan URL YouTube!');
    try {
        await satanic.sendMessage(m.chat, { react: { text: '🎵', key: m.key } });
        
        const SavetubeDownloader = require('./lib/savetube');
        const downloader = new SavetubeDownloader();
        
        if (!text.includes('youtube.com') && !text.includes('youtu.be')) {
            return reply('❌ Masukkan URL YouTube yang valid!');
        }
        
        let audioSent = false;
        
        // Fallback 1: Coba SavetubeDownloader
        try {
            const result = await downloader.ytmp3(text, "128");
            if (result && result.success && result.data && result.data.downloadUrl) {
                const data = result.data;
                let viewsText = 'Tidak diketahui';
                if (data.videoInfo && data.videoInfo.views) {
                    viewsText = typeof data.videoInfo.views === 'number' 
                        ? data.videoInfo.views.toLocaleString() 
                        : data.videoInfo.views;
                }
                
                await satanic.sendMessage(m.chat, {
                    image: { url: data.thumbnail },
                    caption: `🎵 *${data.title}*\n\n⏱️ *Durasi:* ${data.duration || 'Tidak diketahui'}\n🎚️ *Kualitas:* ${data.quality} kbps\n📦 *Ukuran:* ${data.size || 'Tidak diketahui'}\n👤 *Channel:* ${data.videoInfo?.channel || 'Tidak diketahui'}\n👁️ *Views:* ${viewsText}\n\n📥 *Mengunduh audio...*`
                }, { quoted: fkontak });
                
                await satanic.sendMessage(m.chat, {
                    audio: { url: data.downloadUrl },
                    mimetype: 'audio/mpeg',
                    ptt: false,
                    fileName: `${data.title}.mp3`
                }, { quoted: fkontak });
                audioSent = true;
            } else {
                throw new Error('Savetube gagal');
            }
        } catch (err) {
            console.log('[FALLBACK] Savetube error:', err.message);
            
            // Fallback 2: Coba y2mate
            try {
                const result = await y2mate(text);
                if (result && result.status === 'tunnel' && result.url) {
                    const filename = result.filename || 'audio.mp3';
                    await satanic.sendMessage(m.chat, {
                        audio: { url: result.url },
                        mimetype: 'audio/mpeg',
                        filename: filename,
                        ptt: false
                    }, { quoted: m });
                    audioSent = true;
                } else {
                    throw new Error('y2mate gagal');
                }
            } catch (err2) {
                console.log('[FALLBACK] y2mate error:', err2.message);
                // Fallback 3: Kirim link saja
                await satanic.sendMessage(m.chat, {
                    text: `⚠️ Gagal mengunduh audio.\n\nSilahkan download manual:\n${text}\n\nAtau coba layanan lain.`
                }, { quoted: fkontak });
            }
        }
        
        if (audioSent) {
            await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } else {
            await satanic.sendMessage(m.chat, { react: { text: '⚠️', key: m.key } });
        }
        
    } catch (error) {
        console.error('[ERROR]', error);
        await satanic.sendMessage(m.chat, {
            text: '❌ Terjadi kesalahan, silahkan coba lagi nanti.'
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
    break;
}

// Fungsi y2mate (tetap seperti kode Anda)
async function y2mate(input) {
    let videoUrl = input
    
    // Cek apakah input adalah link atau judul
    if (!input.includes('youtube.com') && !input.includes('youtu.be')) {
      console.log(`[Search] "${input}" ...`)
      const searchResults = await yts(input)
      
      if (!searchResults.videos.length) {
        throw new Error('Tidak ada video ditemukan untuk pencarian tersebut.')
      }

      const topResult = searchResults.videos[0]
      videoUrl = topResult.url     
    }

    try {
      // Ambil key converter
      const sanityRes = await axios.get('https://cnv.cx/v2/sanity/key', {
        headers: {
          'sec-ch-ua-platform': '"Android"',
          'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36 EdgA/144.0.0.0',
          'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
          'content-type': 'application/json',
          'sec-ch-ua-mobile': '?1',
          'accept': '*/*',
          'origin': 'https://frame.y2meta-uk.com',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'referer': 'https://frame.y2meta-uk.com/',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
          'priority': 'u=1, i'
        }
      })

      const key = sanityRes.data?.key
      if (!key) throw new Error('Gagal mengambil key converter')
      
      // Konversi ke MP3
      const body = new URLSearchParams({
        link: videoUrl,
        format: 'mp3',
        audioBitrate: '128',
        videoQuality: '720',
        filenameStyle: 'pretty',
        vCodec: 'h264'
      }).toString()

      const convertRes = await axios.post('https://cnv.cx/v2/converter', body, {
        headers: {
          'key': key,
          'sec-ch-ua-platform': '"Android"',
          'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36 EdgA/144.0.0.0',
          'accept': '*/*',
          'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua-mobile': '?1',
          'origin': 'https://frame.y2meta-uk.com',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'referer': 'https://frame.y2meta-uk.com/',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
          'priority': 'u=1, i'
        }
      })

      return convertRes.data

    } catch (err) {
      console.error('[ERROR]', err.message)
      if (err.response) {
        console.error('Status:', err.response.status)
        console.error('Data:', err.response.data)
      }
      throw err
    }
}
case 'ytmp4': {
    if (!text) return reply('Masukkan URL YouTube!');
    try {
        await satanic.sendMessage(m.chat, { react: { text: '📹', key: m.key } });
        
        const SavetubeDownloader = require('./lib/savetube');
        const downloader = new SavetubeDownloader();
        
        if (!text.includes('youtube.com') && !text.includes('youtu.be')) {
            return reply('❌ Masukkan URL YouTube yang valid!');
        }
        
        let quality = "360";
        if (text.includes('quality=')) {
            const match = text.match(/quality=(\d+)/);
            if (match) quality = match[1];
            text = text.split('?')[0];
        }
        
        const result = await downloader.ytmp4(text, quality);
        
        if (!result.success) {
            throw new Error(result.error);
        }
        
        const data = result.data;
        
        let viewsText = 'Tidak diketahui';
        if (data.videoInfo && data.videoInfo.views) {
            viewsText = typeof data.videoInfo.views === 'number' 
                ? data.videoInfo.views.toLocaleString() 
                : data.videoInfo.views;
        }
        
        await satanic.sendMessage(m.chat, {
            image: { url: data.thumbnail },
            caption: `📹 *${data.title}*\n\n⏱️ *Durasi:* ${data.duration || 'Tidak diketahui'}\n🎚️ *Kualitas:* ${data.quality}\n📦 *Ukuran:* ${data.size || 'Tidak diketahui'}\n👤 *Channel:* ${data.videoInfo?.channel || 'Tidak diketahui'}\n👁️ *Views:* ${viewsText}\n\n📥 *Mengunduh video...*`
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, {
            video: { url: data.downloadUrl },
            mimetype: 'video/mp4',
            fileName: `${data.title}.mp4`,
            caption: `✅ Sukses download video: ${data.title}`
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (error) {
        reply('❌ Gagal download video: ' + error.message);
    }
    break;
}

case 'ttmp3':
case 'tiktokmp3': {
    if (!text) return reply('Masukkan URL TikTok!\n\nContoh: .ttmp3 https://www.tiktok.com/@username/video/xxx');
 await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    const apiUrl = `https://free-restapi.biz.id/api/ttdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
    const response = await axios.get(apiUrl);
    if (response.data.status !== 200) {
        return reply('Gagal mengambil data dari TikTok');
    }
    const result = response.data.result;
    const videoUrl = result.videos.find(v => v.type === 'nowatermark')?.url || result.videos[0]?.url;
    await satanic.sendMessage(m.chat, { 
        audio: { url: videoUrl },
        mimetype: 'audio/mpeg'
    }, { quoted: fkontak });
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;

case 'mediafire':
case 'mediafiredl': {
if (!text || !text.includes("mediafire.com"))
        return reply(`📌 Contoh penggunaan:\n${prefix + command} https://www.mediafire.com/file/abc123/example.zip/file`);
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    const cheerio = require("cheerio");
    const mime = require("mime-types");
    const fs = require("fs");
    const path = require("path");
    async function getDirectMediaFireLink(pageUrl) {
        try {
            const res = await fetch(pageUrl);
            const html = await res.text();
            const $ = cheerio.load(html);
            const directLink = $("a#downloadButton").attr("href");
            const fileName = $("div.filename").text().trim() || "mediafire_file";

            if (!directLink) throw new Error("Link unduhan tidak ditemukan.");
            return { fileName, directLink };
        } catch (err) {
            return { error: true, message: err.message };
        }
    }
    function getFileType(mimeType) {
        if (mimeType.startsWith('image/')) return 'image';
        if (mimeType.startsWith('video/')) return 'video';
        if (mimeType.startsWith('audio/')) return 'audio';
        return 'document';
    }
    try {
        const result = await getDirectMediaFireLink(text.trim());
        if (!result || result.error || !result.directLink) {
            await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            return reply(`❌ Gagal mengambil link download.\n${result?.message || "Link tidak valid atau server error."}`);
        }
        const fileName = result.fileName;
        const fileUrl = result.directLink;
        const mimeType = mime.lookup(fileName) || "application/octet-stream";
        const fileType = getFileType(mimeType);
        const caption = `📦 *MediaFire Downloader*\n\n📁 *Nama File:* ${fileName}\n✅ *Status:* Siap diunduh`;
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
        const safeName = fileName.replace(/[^a-z0-9._-]/gi, "_");
        const tempPath = path.join(tempDir, `mf_${Date.now()}_${safeName}`);
        const res = await fetch(fileUrl);
        if (!res.ok) throw new Error("Gagal mengunduh file dari MediaFire.");
        const fileStream = fs.createWriteStream(tempPath);
        await new Promise((resolve, reject) => {
            res.body.pipe(fileStream);
            res.body.on("error", reject);
            fileStream.on("finish", resolve);
        });
        const buffer = fs.readFileSync(tempPath);
        if (fileType === 'image') {
            await satanic.sendMessage(m.chat, {
                image: buffer,
                caption: caption,
                mimetype: mimeType
            }, { quoted: fkontak });
        } 
        else if (fileType === 'video') {
            await satanic.sendMessage(m.chat, {
                video: buffer,
                caption: caption,
                mimetype: mimeType
            }, { quoted: fkontak });
        }
        else if (fileType === 'audio') {
            await satanic.sendMessage(m.chat, {
                audio: buffer,
                mimetype: mimeType,
                ptt: false // set true jika ingin jadi voice note
            }, { quoted: fkontak });
        }
        else {
            await satanic.sendMessage(m.chat, {
                document: buffer,
                fileName: fileName,
                mimetype: mimeType,
                caption: caption
            }, { quoted: fkontak });
        }
        fs.unlinkSync(tempPath); 
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        reply(`❌ Gagal mengirim file:\n${err.message}`);
    }
break;
}
case 'git': case 'github': case 'gitclone': {
if (!args[0]) return reply(`Mana linknya?\nExample :\n${prefix}${command} https://github.com/DGXeon/XeonMedia`)
if (!isUrl(args[0]) && !args[0].includes('github.com')) return reply(`Link invalid!!`)
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
    let [, user, repo] = args[0].match(regex1) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    satanic.sendMessage(m.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: fkontak })
}
break
case 'capcut':
case 'cc': {
if (!text) return reply('Masukkan URL CapCutnya!\n\nContoh: .capcut https://www.capcut.com/t/xxx')
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/capcut?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    if (!response.data.success) {
        return reply('Gagal mengambil data dari CapCut')
    }
    const result = response.data
    let info = `CAPCUT DOWNLOADER\n\n`
    info += `Title: ${result.title}\n`
    info += `Author: ${result.author}\n`
    info += `Project By: ${namaBot}`
    
    await satanic.sendMessage(m.chat, { 
        video: { url: result.videoUrl }, 
        caption: info 
    }, { quoted: fkontak })
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'terabox':
case 'teraboxdl': {
    if (!text) return reply('Masukkan URL Teraboxnya!\n\nContoh: .terabox https://www.terabox.com/xxx')
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/terabox?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    if (response.data.status !== 200) {
        return reply('Gagal mengambil data dari Terabox')
    }
    const result = response.data.result
    const file = result.list[0]
    let info = `TERABOX DOWNLOADER\n\n`
    info += `Name: ${file.name}\n`
    info += `Size: ${file.size_formatted}\n`
    info += `Type: ${file.type}\n`
    info += `Duration: ${file.duration}\n`
    info += `Quality: ${file.quality}\n`
    info += `Project By: ${namaBot}`
    const zipUrl = file.zip_dlink
    await satanic.sendMessage(m.chat, { 
        document: { url: zipUrl }, 
        mimetype: 'application/zip',
        fileName: `${file.name}.zip`,
        caption: info 
    }, { quoted: fkontak })
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'spotify':
case 'spotifydl': {
    if (!text) return reply('Masukkan URL Spotifynya!\n\nContoh: .spotify https://open.spotify.com/track/xxx')
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/spotify?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' })
    await satanic.sendMessage(m.chat, { 
        audio: response.data, 
        mimetype: 'audio/mpeg'
    }, { quoted: fkontak })
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'threads':
case 'th': {
    if (!text) return reply('Masukkan URL Threadsnya!\n\nContoh: .threads https://www.threads.net/@username/post/id')
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    
    const apiUrl = `https://free-restapi.biz.id/api/threads?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    
    if (response.data.status !== 200) {
        return reply('Gagal mengambil data dari Threads')
    }
    
    const result = response.data.result
    
    let info = `THREADS DOWNLOADER\n\n`
    info += `Username: ${result.user.username}\n`
    info += `Text: ${result.text}\n`
    info += `Project By: ${namaBot}`
    
    // Jika ada video, kirim langsung tanpa button
    if (result.videos && result.videos.length > 0) {
        for (let i = 0; i < result.videos.length; i++) {
            let videoUrl = result.videos[i]
            await satanic.sendMessage(m.chat, { 
                video: { url: videoUrl },
                caption: info
            }, { quoted: fkontak })
        }
    }
    
    // Jika ada gambar, pake button carousel
    if (result.images && result.images.length > 0) {
        let selectedImages = result.images.slice(0, 10);
        let anu = []
        
        for (let i = 0; i < selectedImages.length; i++) {
            let imgUrl = selectedImages[i][0].url
            let imgsc = await prepareWAMessageMedia({
                image: { url: imgUrl }
            }, {
                upload: satanic.waUploadToServer
            })

            anu.push({
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: `Gambar ke *${i + 1}*`,
                    hasMediaAttachment: true,
                    ...imgsc
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [{
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Lihat di Threads",
                            url: result.url
                        })
                    }]
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: info
                })
            })
        }
        
        const msg = await generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.fromObject({
                            text: `📱 Hasil Threads dari @${result.user.username}`
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: anu
                        })
                    })
                }
            }
        }, {
            userJid: sender,
            quoted: fkontak
        })
        satanic.relayMessage(m.chat, msg.message, {
            messageId: msg.key.id
        })
    }
    
    if (!result.videos && !result.images) {
        return reply('Tidak ada video atau gambar yang ditemukan')
    }
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'snackvideo':
async function snackvideo(url) {
  let data = qs.stringify({
    'ic-request': 'true',
    'id': url,
    'locale': 'id',
    'ic-element-id': 'main_page_form',
    'ic-id': '1',
    'ic-target-id': 'active_container',
    'ic-trigger-id': 'main_page_form',
    'ic-current-url': '/id/how-to-download-snack-video',
    'ic-select-from-response': '#id1',
    '_method': 'POST'
  });
  let config = {
    method: 'POST',
    url: 'https://getsnackvideo.com/results',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1803; Build/OPM1.171019.026) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.4280.141 Mobile Safari/537.36 KiToBrowser/124.0',
      'Accept': 'text/html-partial, */*; q=0.9',
      'accept-language': 'id-ID',
      'referer': 'https://getsnackvideo.com/id/how-to-download-snack-video',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-ic-request': 'true',
      'x-http-method-override': 'POST',
      'x-requested-with': 'XMLHttpRequest',
      'origin': 'https://getsnackvideo.com',
      'alt-used': 'getsnackvideo.com',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'priority': 'u=0',
      'te': 'trailers',
      'Cookie': '_ga_TBLWJYRGPZ=GS1.1.1736227224.1.1.1736227279.0.0.0; _ga=GA1.1.1194697262.1736227224'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    const $ = cheerio.load(response.data);
    const downloadUrl = $('.download_link.without_watermark').attr('href');
    const thumbnail = $('.img_thumb img').attr('src');
    return {
      thumbnail: thumbnail || 'Thumbnail not found',
      downloadUrl: downloadUrl || 'Download URL not found'
    };
  } catch (error) {
    console.error('Error:', error);
  }
}
  if (!text) return reply('masukan link SnackVideo')
  try {
    const resultn = await snackvideo(text)
    if (!resultn?.downloadUrl) return reply('❌ Gagal mengambil video')
    const videoRes = await axios.get(resultn.downloadUrl, { 
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; RMX2185 Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.60 Mobile Safari/537.36',
        'Referer': 'https://www.snackvideo.com/'
      }
    })
    await satanic.sendMessage(m.chat, { 
      video: Buffer.from(videoRes.data),
      caption: '✅ *Video Snack berhasil didownload*'
    }, { quoted: fkontak })
  } catch (error) {
    reply('❌ Error: ' + error.message)
  }
  break
case 'cocofun':
case 'coco': {
    if (!text) return reply('Masukkan URL Cocofunnya!\n\nContoh: .cocofun https://www.cocofun.com/xxx')
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/cocofun?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    if (!response.data.success) {
        return reply('Gagal mengambil data dari Cocofun')
    }
    const result = response.data
    let info = `COCOFUN DOWNLOADER\n\n`
    info += `Topic: ${result.topic}\n`
    info += `Caption: ${result.caption}\n`
    info += `Duration: ${result.statistic.duration} detik\n`
    info += `Play: ${result.statistic.play}\n`
    info += `Like: ${result.statistic.like}\n`
    info += `Share: ${result.statistic.share}\n`
    info += `Project By: ${namaBot}`
    const videoUrl = result.videoUrl || result.watermark
    await satanic.sendMessage(m.chat, { 
        video: { url: videoUrl },
        caption: info
    }, { quoted: fkontak })
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'igphoto':
case 'igslide': {
    if (!text) return reply('Masukkan URL Instagram slide!\n\nContoh: .igslid https://www.instagram.com/p/xxx');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const endpoint = `https://free-restapi.biz.id/api/igdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const hasil = await axios.get(endpoint);
        
        if (hasil.data.status !== 200) {
            return reply('Gagal mengambil data dari Instagram');
        }
        
        const datas = hasil.data;
        const mediaUrls = datas.url;
        const infoAkun = datas.metadata;
        
        
        const hanyaGambar = mediaUrls.filter(url => !infoAkun?.isVideo);
        

        
        let daftarCard = await Promise.all(hanyaGambar.map(async (gambar, index) => {
            const mediaGambar = await prepareWAMessageMedia({ 
                image: { url: gambar } 
            }, { 
                upload: satanic.waUploadToServer 
            });
            
            const keterangan = `Powerred By SatanicHaxor`;
            
            return {
                header: proto.Message.InteractiveMessage.Header.create({
                    ...mediaGambar,
                    title: '',
                    subtitle: `Slide ${index+1}`,
                    hasMediaAttachment: true
                }),
                body: { text: keterangan },
                nativeFlowMessage: {
                    buttons: [{
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "📥 Download",
                            url: gambar
                        })
                    }]
                }
            };
        }));
        
        let pesan = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `📸 Instagram Slide dari @${infoAkun?.username || 'user'}` },
                            carouselMessage: {
                                cards: daftarCard,
                                messageVersion: 1
                            }
                        }
                    }
                }
            },
            { quoted: fkontak }
        );
        
        await satanic.relayMessage(m.chat, pesan.message, { messageId: pesan.key.id });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil data Instagram.');
    }
}
break;
case 'ttslide':
case 'tiktokslide': {
    if (!text) return reply('Masukkan URL TikTok slide/photo!\n\nContoh: .ttslide https://www.tiktok.com/@username/video/xxx');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const endpoint = `https://free-restapi.biz.id/api/ttdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const hasil = await axios.get(endpoint);
        
        if (hasil.data.status !== 200) {
            return reply('Gagal mengambil data dari TikTok');
        }
        
        const datas = hasil.data;
        const result = datas.result;
        
        if (!result.videos || result.videos.length === 0) {
            return reply('Tidak ada foto/video yang ditemukan');
        }
        
        // Filter hanya photo
        const photos = result.videos.filter(v => v.type === 'photo');
        
        if (photos.length === 0) {
            return reply('Tidak ada slide foto yang ditemukan');
        }
        
        let daftarCard = await Promise.all(photos.map(async (photo, index) => {
            const mediaFoto = await prepareWAMessageMedia({ 
                image: { url: photo.url } 
            }, { 
                upload: satanic.waUploadToServer 
            });
            
            const keterangan = `📸 *Slide ${index+1} dari ${photos.length}*\n\n📝 Title: ${result.title || '-'}\n👤 Author: ${result.author?.nickname || '-'} (@${result.author?.id || '-'})\n❤️ Likes: ${result.stats?.likes?.toLocaleString() || '-'}\n💬 Comments: ${result.stats?.comment?.toLocaleString() || '-'}\n📨 Shares: ${result.stats?.share?.toLocaleString() || '-'}`;
            
            return {
                header: proto.Message.InteractiveMessage.Header.create({
                    ...mediaFoto,
                    title: '',
                    subtitle: `Slide ${index+1}`,
                    hasMediaAttachment: true
                }),
                body: { text: keterangan },
                nativeFlowMessage: {
                    buttons: [{
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "📥 Download",
                            url: photo.url
                        })
                    }]
                }
            };
        }));
        
        let pesan = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `🎵 TikTok Slide dari @${result.author?.id || 'user'}` },
                            carouselMessage: {
                                cards: daftarCard,
                                messageVersion: 1
                            }
                        }
                    }
                }
            },
            { quoted: fkontak }
        );
        
        await satanic.relayMessage(m.chat, pesan.message, { messageId: pesan.key.id });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil data TikTok.');
    }
}
break;
case 'igdl2': {
    if (!text) return reply('Masukkan link Instagram! Contoh: .igdl2 https://www.instagram.com/p/CONTOSH/');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    async function indown(url) {
        try {
            const { data: pageData, headers } = await axios.get('https://indown.io/en1', {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36' }
            });
            
            const $ = cheerio.load(pageData);
            const token = $('input[name="_token"]').val();
            const cookies = headers['set-cookie'] ? headers['set-cookie'].map(v => v.split(';')[0]).join('; ') : '';

            if (!token) throw new Error('Token Indown not found');
            
            const params = new URLSearchParams();
            params.append('referer', 'https://indown.io/en1');
            params.append('locale', 'en');
            params.append('_token', token);
            params.append('link', url);
            params.append('p', 'i');

            const { data: resultData } = await axios.post('https://indown.io/download', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookies,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            
            const $result = cheerio.load(resultData);
            let videoUrl = null;
            
            // Ambil video dari source
            $result('video source[src]').each((i, e) => {
                let link = $result(e).attr('src');
                if (link && !videoUrl) videoUrl = link;
            });
            
            // Ambil video dari tag video
            if (!videoUrl) {
                $result('video').each((i, e) => {
                    let link = $result(e).attr('src');
                    if (link && !videoUrl) videoUrl = link;
                });
            }
            
            // Ambil dari link download
            if (!videoUrl) {
                $result('a[href*="indown.io/fetch"]').each((i, e) => {
                    let link = $result(e).attr('href');
                    if (link && link.includes('indown.io/fetch')) {
                        try {
                            const decoded = decodeURIComponent(new URL(link).searchParams.get('url'));
                            if (decoded && /\.(mp4|mov|avi|mkv)$/i.test(decoded)) {
                                videoUrl = decoded;
                            }
                        } catch (err) {}
                    }
                });
            }
            
            if (!videoUrl) {
                throw new Error('Video tidak ditemukan');
            }
            
            return { 
                status: true, 
                video: videoUrl
            };
            
        } catch (e) {
            return { status: false, message: e.message };
        }
    }
    
    try {
        const result = await indown(text);
        
        if (!result.status) {
            throw new Error(result.message || 'Gagal mengambil video');
        }
        
        // Kirim video
        await satanic.sendMessage(m.chat, {
            video: { url: result.video },
            caption: '📹 Video Instagram'
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, { 
            react: { text: '✅', key: m.key } 
        });
        
    } catch (err) {
        console.error(err);
        reply(`❌ Gagal mengunduh: ${err.message || 'Link mungkin private atau invalid'}`);
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'instagram':
case 'igdl':
case 'ig': {
    if (!text) return reply('Masukkan URL Instagramnya!\n\nContoh: .ig https://www.instagram.com/reel/xxx')
  await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/igdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)   
    const data = response.data
    const urls = data.url
    const metadata = data.metadata   
    let info = `INSTAGRAM VIDEO DOWNLOADER\n\n`
    for (let url of urls) {
        await satanic.sendMessage(m.chat, { 
            video: { url: url }, 
            caption: info 
        }, { quoted: fkontak })
    }
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break

case 'igmp3':
case 'igaudio': {
    if (!text) return reply('Masukkan URL Instagramnya!\n\nContoh: .igmp3 https://www.instagram.com/reel/xxx')
  await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/igdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)   
    const data = response.data
    const urls = data.url
    const metadata = data.metadata   
    let info = `INSTAGRAM VIDEO DOWNLOADER\n\n`
    for (let url of urls) {
        await satanic.sendMessage(m.chat, { 
            audio: { url: url }, 
            mimetype: 'audio/mpeg',
            caption: info 
        }, { quoted: fkontak })
    }
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'fbdl':
case 'fb': {
    if (!text) return reply('Masukkan URL Facebooknya!\n\nContoh: .fb https://www.facebook.com/xxx')
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })  
    const apiUrl = `https://free-restapi.biz.id/api/fbdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)    
    if (response.data.status !== 200) {
        return reply('Gagal mengambil data dari Facebook')
    }
    const result = response.data.result
    let info = `FACEBOOK DOWNLOADER\n\n`
    info += `Title: ${result.title}\n`
    info += `Project By: ${namaBot}`
    await satanic.sendMessage(m.chat, { 
        video: { url: result.hd }, 
        caption: info 
    }, { quoted: fkontak })
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'videydl':
case 'videy': {
  async function videydl(url) {
    try {
      const objcturl = new URL(url);
      const videoId = objcturl.searchParams.get('id');
      if (!videoId) throw new Error('Invalid Videy URL');
      const ext = videoId.length === 9 && videoId[8] === '2' ? '.mov' : '.mp4';
      const urlvideo = `https://cdn.videy.co/${videoId}${ext}`;
      return urlvideo;
    } catch (error) {
      throw new Error(`Download failed: ${error.message}`);
    }
  }
  let url = text || (m.quoted && m.quoted.text);
  if (!url) {
    return reply(`⚠️ *Cara penggunaan:*\n\nKirim link Videy:\n>.videy https://videy.co/xxx\n\nAtau reply pesan yang berisi link Videy`);
  }
  try {
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const videoUrl = await videydl(url);
    await satanic.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: `> *Video berhasil diunduh*\n🔗 Link: ${url}`
    }, { quoted: fkontak });
    
  } catch (error) {
    console.error('[Videy Error]:', error);
    reply(`❌ *Gagal mengunduh:*\n${error.message}`);
  }
  break;
}
case 'twitter':
case 'tw':
case 'x': {
    if (!text) return reply('Masukkan URL Twitter/X nya!\n\nContoh: .twitter https://twitter.com/xxx/status/xxx')
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/twitter?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    if (response.data.status !== 200) {
        return reply('Gagal mengambil data dari Twitter')
    }
    const result = response.data.result
    if (result.type !== 'video') {
        return reply('URL ini bukan video Twitter')
    }
    const videoUrl = result.variants[0]
    await satanic.sendMessage(m.chat, { 
        video: { url: videoUrl },
        caption: result.full_text ? result.full_text : ''
    }, { quoted: fkontak })
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'scdl':
case 'soundcloud': {
    if (!text) return reply('Masukkan URL SoundCloudnya!\n\nContoh: .scdl https://soundcloud.com/xxx/xxx')
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/scdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    if (!response.data.success) {
        return reply('Gagal mengambil data dari SoundCloud')
    }
    const result = response.data
    const audioUrl = result.audioUrl
    const title = result.title
    const audioBuffer = await axios.get(audioUrl, { 
        responseType: 'arraybuffer'
    })
    await satanic.sendMessage(m.chat, { 
        audio: audioBuffer.data,
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`
    }, { quoted: fkontak })
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
/////// BATAS DOWNLOAD VIDEO ////))
//////// IMAGE EDITOR //////))
case 'hdr':
case 'hd':
case 'enhance': {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .hdr');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        
        const apiUrl = `https://free-restapi.biz.id/api/hd?url=${encodeURIComponent(mem.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil diupgrade ke HD!'
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        reply('Gagal mengupgrade gambar.');
    }
}
break;
case 'upscale': {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .upscale');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        
        const apiUrl = `https://free-restapi.biz.id/api/upscale?url=${encodeURIComponent(mem.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil diupgrade ke HD!'
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti.');
    }
}
break;
case 'esrgan':
case '4k': {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .esrgan');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        
        const apiUrl = `https://free-restapi.biz.id/api/esrgan?url=${encodeURIComponent(mem.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil diupgrade ke 4K dengan ESRGAN!'
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti.');
    }
}
break;
 case 'removebg':
case 'rmbg': {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .removebg');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        
        const apiUrl = `https://free-restapi.biz.id/api/removebg?url=${encodeURIComponent(mem.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Background berhasil dihapus!'
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Gagal menghapus background. Coba lagi nanti.');
    }
}
break;
case 'removebg2':
case 'rmbg2': {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .removebg2');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/removebg?url=${encodeURIComponent(mem.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Background berhasil dihapus!'
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Gagal menghapus background. Coba lagi nanti.');
    }
}
break;
case 'tocatbox': {
    try {
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        if (!/image|video|audio/.test(mime)) {
            return reply('❌ Hanya support gambar, video, atau audio!');
        }
        await satanic.sendMessage(m.chat, { 
            react: { text: '⏳', key: m.key } 
        }); 
        const mediaBuffer = await quoted.download();
        if (!mediaBuffer) {
            throw new Error('Gagal mendownload media');
        }
        const resultUrl = await uploadToAliceCdn(mediaBuffer, mime);
        const fileType = getFileTypeFromMime(mime);
        const typeIcon = {
            'gambar': '🖼️',
            'video': '🎥',
            'audio': '🎵',
            'gif': '🎞️'
        }[fileType];        
        await satanic.sendMessage(m.chat, {
            text: `✅ *Upload Berhasil!*\n\n${typeIcon} *Tipe:* ${fileType}\n🔗 *Link:* ${resultUrl}\n\n📌 *Catatan:* Link akan expire sesuai kebijakan Catbox`
        }, { quoted: fkontak });        
        await satanic.sendMessage(m.chat, { 
            react: { text: '✅', key: m.key } 
        });
        
    } catch (error) {
        console.error('[Upload Error]', error);
        await satanic.sendMessage(m.chat, { 
            react: { text: '❌', key: m.key } 
        }).catch(() => {});
        let errorMsg = '❌ Gagal upload: ';
        if (error.code === 'ECONNABORTED') {
            errorMsg += 'Timeout, file terlalu besar atau koneksi lambat';
        } else if (error.response?.status === 413) {
            errorMsg += 'File terlalu besar';
        } else {
            errorMsg += error.message;
        }        
        reply(errorMsg);
    }
}
break;
case 'tourl': {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!mime) return reply('Reply/kirim media (foto/video/file) yang ingin diupload.');
    const FormData = require("form-data");
    const mimeTypes = require("mime-types");
    const fs = require("fs");
    const path = require("path");
    const { fromBuffer } = require("file-type");
    const axios = require("axios");
    const cheerio = require("cheerio");
    const termaiKey = "AIzaBj7z2z3xBjsk"; // jangan diganti
    const termaiDomain = 'https://c.termai.cc';
    const imgbbApiKey = '06fd47f20c573d4795a47af91f081932';
    async function uploadTermai(fileBuffer) {
        try {
            const { ext } = await fromBuffer(fileBuffer);
            const formData = new FormData();
            formData.append('file', fileBuffer, { filename: 'file.' + ext });
            const res = await axios.post(`${termaiDomain}/api/upload?key=${termaiKey}`, formData, {
                headers: formData.getHeaders(),
                timeout: 120000
            });
            if (res.data && res.data.status && res.data.path) {
                return res.data.path;
            }
            throw new Error("Upload ke Termai gagal");
        } catch (err) {
            console.error("Termai Error:", err.message);
            return null;
        }
    }
    async function pomf2(filePath) {
        try {
            if (!fs.existsSync(filePath)) throw new Error("File tidak ditemukan");
            const contentType = mimeTypes.lookup(filePath) || "application/octet-stream";
            const fileName = path.basename(filePath);
            const form = new FormData();
            form.append("files[]", fs.createReadStream(filePath), {
                contentType,
                filename: fileName,
            });
            const response = await axios.post("https://qu.ax/upload.php", form, {
                headers: { ...form.getHeaders() },
            });
            if (!response.data.success || !response.data.files?.length) throw new Error("Upload ke qu.ax gagal");
            return response.data.files[0].url;
        } catch (err) {
            console.error("Pomf2 Error:", err.message);
            return null;
        }
    }
    async function uploadTmpFiles(filePath) {
        try {
            if (!fs.existsSync(filePath)) throw new Error("File tidak ditemukan");
            const form = new FormData();
            form.append("file", fs.createReadStream(filePath));
            const res = await axios.post("https://tmpfiles.org/api/v1/upload", form, {
                headers: form.getHeaders(),
                timeout: 120000
            });
            if (res.data && res.data.data && res.data.data.url) {
                const idMatch = res.data.data.url.match(/\/(\d+)(?:\/|$)/);
                const fileName = path.basename(filePath);
                if (idMatch) {
                    return `https://tmpfiles.org/dl/${idMatch[1]}/${fileName}`;
                }
            }
            throw new Error("Upload ke tmpfiles.org gagal");
        } catch (err) {
            console.error("TmpFiles Error:", err.message);
            return null;
        }
    }
    async function uploadPutIcu(filePath) {
        try {
            if (!fs.existsSync(filePath)) throw new Error("File tidak ditemukan");
            const contentType = mimeTypes.lookup(filePath) || "application/octet-stream";
            const res = await axios.put(`https://put.icu/upload/`, fs.createReadStream(filePath), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': contentType
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity,
                timeout: 120000
            });
            if (res.data && res.data.direct_url) {
                return res.data.direct_url;
            }
            if (res.data && res.data.url) {
                return res.data.url;
            }
            throw new Error("Upload ke put.icu gagal");
        } catch (err) {
            console.error("PutIcu Error:", err.message);
            return null;
        }
    }
    async function uploadUgu(filePath) {
        try {
            const form = new FormData();
            form.append("files[]", fs.createReadStream(filePath));
            
            const response = await axios.post("https://uguu.se/upload.php", form, {
                headers: {
                    ...form.getHeaders(),
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                timeout: 120000
            });
            if (response.data && response.data.success && response.data.files && response.data.files[0]) {
                return response.data.files[0].url;
            }
            throw new Error("Upload ke uguu.se gagal");
        } catch (err) {
            console.error("Ugu Error:", err.message);
            return null;
        }
    }
    async function uploadUploadEE(filePath) {
        try {
            const baseUrl = "https://www.upload.ee";
            
            const response = await axios.get(`${baseUrl}/ubr_link_upload.php?rnd_id=${Date.now()}`);
            const uploadId = (response.data.match(/startUpload\("(.+?)"/) || [])[1];
            if (!uploadId) throw new Error("Unable to obtain Upload ID");
            const formData = new FormData();
            formData.append("upfile_0", fs.createReadStream(filePath));
            formData.append("link", "");
            formData.append("email", "");
            formData.append("category", "cat_file");
            formData.append("big_resize", "none");
            formData.append("small_resize", "120x90");

            const uploadResponse = await axios.post(`${baseUrl}/cgi-bin/ubr_upload.pl?X-Progress-ID=${encodeURIComponent(uploadId)}&upload_id=${encodeURIComponent(uploadId)}`, formData, {
                headers: {
                    ...formData.getHeaders(),
                    Referer: baseUrl
                },
                timeout: 120000
            });
            const firstData = uploadResponse.data;
            const $ = cheerio.load(firstData);
            const viewUrl = $("input#file_src").val() || "";
            if (!viewUrl) throw new Error("File upload failed");
            const viewResponse = await axios.get(viewUrl);
            const finalData = viewResponse.data;
            const downUrl = cheerio.load(finalData)("#d_l").attr("href") || "";
            if (!downUrl) throw new Error("File upload failed");

            return downUrl;
        } catch (error) {
            console.error("UploadEE Error:", error.message);
            return null;
        }
    }
    async function uploadToImgBB(filePath) {
        try {
            if (!fs.existsSync(filePath)) {
                throw new Error("File not found");
            }
            const form = new FormData();
            form.append('image', fs.createReadStream(filePath));

            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, form, {
                headers: {
                    ...form.getHeaders()
                },
                timeout: 120000
            });
            if (response.status === 200 && response.data.data && response.data.data.url) {
                return response.data.data.url;
            } else {
                throw new Error(`Upload failed with status: ${response.status}`);
            }
        } catch (err) {
            console.error("ImgBB Error:", err.message);
            return null;
        }
    }
    async function uploadToLitterbox(fileBuffer, filename) {
        try {
            const form = new FormData();
            form.append('reqtype', 'fileupload');
            form.append('time', '72h');
            form.append('fileToUpload', fileBuffer, {
                filename: filename,
                contentType: mimeTypes.lookup(filename) || 'application/octet-stream'
            });

            const response = await axios.post('https://litterbox.catbox.moe/resources/internals/api.php', form, {
                headers: form.getHeaders(),
                timeout: 30000
            });
            if (response.status !== 200) throw new Error('Litterbox gagal');
            const url = response.data;
            if (!url.startsWith('http')) throw new Error('Invalid response');
            return { host: 'Litterbox', url, expires: '72 jam' };
        } catch (err) {
            console.error("Litterbox Error:", err.message);
            return null;
        }
    }
    try {
        const media = await satanic.downloadAndSaveMediaMessage(quoted);
        const buffer = fs.readFileSync(media);
        const { ext } = await fromBuffer(buffer) || {};
        const filename = `file_${Date.now()}.${ext || 'bin'}`;
        let [quaxLink, tmpFilesLink, putIcuLink, termaiLink, uguLink, uploadEELink, imgbbLink, litterboxResult] = await Promise.all([
            pomf2(media),
            uploadTmpFiles(media),
            uploadPutIcu(media),
            uploadTermai(buffer),
            uploadUgu(media),
            uploadUploadEE(media),
            uploadToImgBB(media),
            uploadToLitterbox(buffer, filename)
        ]);
        const litterboxLink = litterboxResult ? litterboxResult.url : null;
        const litterboxExpiry = litterboxResult ? litterboxResult.expires : null;
        if (!quaxLink && !tmpFilesLink && !putIcuLink && !termaiLink && !uguLink && !uploadEELink && !imgbbLink && !litterboxLink) {
            throw new Error("Semua uploader gagal");
        }
        const formatLink = (link) => link ? link : 'Down / Bermasalah';
        let caption = `╭─ 「 UPLOAD SUCCESS 」
📂 Size: ${(buffer.length / 1024).toFixed(2)} KB
🌍 Qu.ax: ${formatLink(quaxLink)}
🌍 TmpFiles: ${formatLink(tmpFilesLink)} ( *60* Minutes )
🌍 Put.icu: ${formatLink(putIcuLink)} ( *1* Days )
🌍 Termai: ${formatLink(termaiLink)}
🌍 Uguu.se: ${formatLink(uguLink)}
🌍 Upload.ee: ${formatLink(uploadEELink)}
🌍 ImgBB: ${formatLink(imgbbLink)}
🌍 Litterbox: ${formatLink(litterboxLink)} ${litterboxExpiry ? `( *${litterboxExpiry}* )` : ''}
╰───────────────`;
        await reply(caption);
        fs.unlinkSync(media);
    } catch (err) {
        reply(`❌ Gagal: ${err.message}`);
    }
}
break;
case 'hdvid':
case 'enhancevideo': {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';   
    if (!/video/.test(mime)) return reply('Kirim/reply video dengan caption .hdvid');    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });    
    let mee = await satanic.downloadAndSaveMediaMessage(quoted);
    let mem = await UploadFileUgu(mee);   
    const apiUrl = `https://api.nexray.eu.cc/tools/hdvideo?url=${encodeURIComponent(mem.url)}`;
    const response = await axios.get(apiUrl);
    if (!response.data.status) {
        return reply('Gagal mengupgrade video. Coba lagi nanti.');
    }    
    const videoUrl = response.data.result;
    await satanic.sendMessage(m.chat, { 
        video: { url: videoUrl },
        caption: '✨ Video berhasil diupgrade ke HD!'
    }, { quoted: fkontak });
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'hdvid2': {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .hdvid2');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/hdvid?url=${encodeURIComponent(mem.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            video: response.data,
            caption: '✨ Gambar berhasil!'
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
    }
}
break;
case 'faketiktok': {
let [name, username, following, followers, likes] = text.split('|');
let imageUrl = '';

if (!name || !username || !following || !followers || !likes) {
return reply(`🎵 *FAKE TIKTOK MAKER*
Contoh:
${prefix + command} nama|username|following|followers|likes
Lalu reply gambar yang mau dipakai.

Contoh parameter:
${prefix + command} Satan|satan123|100|200|300
Lalu reply gambar.`);
}

const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';

if (/image/.test(mime)) {
await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
imageUrl = mem.url;

const apiUrl = `https://api.zenzxz.my.id/maker/faketiktok?name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}&following=${following}&followers=${followers}&likes=${likes}&url=${encodeURIComponent(imageUrl)}`;

const response = await axios.get(apiUrl, {
responseType: 'arraybuffer'
});

await satanic.sendMessage(m.chat, {
image: Buffer.from(response.data),
caption: `🎵 *FAKE TIKTOK*

👤 Nama: ${name}
🔖 Username: @${username}
👥 Following: ${following}
👣 Followers: ${followers}
❤️ Likes: ${likes}`
}, { quoted: fkontak });

await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

} catch (error) {
console.error('Error faketiktok:', error.message);
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
reply(`❌ Gagal membuat Fake TikTok.\nDetail: ${error.message}`);
}
} else {
return reply('❌ Harus reply gambar!');
}
}
break;
case 'smeme': case 'stickermeme': case 'stickmeme': {
    await satanic.sendMessage(m.chat, {react: {text: '🚀', key: m.key}})
    if (!text) return reply(`Usage: ${cmd} text1|text2`)
    let atas = text.split('|')[0] ? text.split('|')[0] : '-'
    let bawah = text.split('|')[1] ? text.split('|')[1] : '-'
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
    let memeUrl = ''
    if (/image/.test(mime)) {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted)
        let mem = await UploadFileUgu(mee)
        memeUrl = `https://free-restapi.biz.id/api/smeme?atas=${encodeURIComponent(atas)}&bawah=${encodeURIComponent(bawah)}&background=${mem.url}&apikey=SK-F68D971CC86742FDF2A923BA`
    }
    else if (/webp/.test(mime)) {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted)
        let mem = await UploadFileUgu(mee)
        memeUrl = `https://free-restapi.biz.id/api/smeme?atas=${encodeURIComponent(atas)}&bawah=${encodeURIComponent(bawah)}&background=${mem.url}&apikey=SK-F68D971CC86742FDF2A923BA`
    }
    else {
        return reply(`Hanya bisa menerima gambar atau sticker`)
    }
    const response = await axios.get(memeUrl, { responseType: 'arraybuffer' })
    await satanic.sendImageAsSticker(m.chat, response.data, m, {
        packname: `satanic`,
    })
}
break
case 'removecloth': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .removecloth');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/removecloth?url=${encodeURIComponent(mem.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil '
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti silahkan update premium untuk menggunakan fitur ini.');
    }
}
break;
case 'jadibugil': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .jadibugil');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/jadibugil?url=${encodeURIComponent(mem.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil '
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti silahkan update premium untuk menggunakan fitur ini.');
    }
}
break;
case 'jadimacbook': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .jadimacbook');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/jadimacebook?url=${encodeURIComponent(mem.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil '
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti silahkan update premium untuk menggunakan fitur ini.');
    }
}
break;
case 'text2img':
case 'generate': {
    if (!text) return reply('Masukkan deskripsi gambar!\n\nContoh: .text2img kucing lucu');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    const apiUrl = `https://free-restapi.biz.id/api/text2img?text=${encodeURIComponent(text)}&apikey=${global.sakey}`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    
    await satanic.sendMessage(m.chat, { 
        image: response.data,
        caption: `🎨 *TEXT TO IMAGE*\n\nPrompt: ${text}`
    }, { quoted: fkontak });
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'texttoimg':
case 'generate': {
    if (!text) return reply('Masukkan deskripsi gambar!\n\nContoh: .texttoimg kucing lucu');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    const apiUrl = `https://free-restapi.biz.id/api/texttoimg?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    
    await satanic.sendMessage(m.chat, { 
        image: response.data,
        caption: `🎨 *TEXT TO IMAGE*\n\nPrompt: ${text}`
    }, { quoted: fkontak });
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'flux':
case 'fluxschnell':
case 'flux-img': {
    if (!text) return reply('Masukkan deskripsi gambar!\n\nContoh: .flux kucing lucu');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    const apiUrl = `https://free-restapi.biz.id/api/flux-img?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    
    await satanic.sendMessage(m.chat, { 
        image: response.data,
        caption: `🎨 *FLUX SCHNELL*\n\nPrompt: ${text}`
    }, { quoted: fkontak });
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'jadibiliard': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .jadibiliard');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const prompt = `buat gambar realistis tanpa merubah wajah sedikit pun, lalu bergaya sedang berdiri dalam ruangan billiard ,sedang bersandar pada meja billiard, sambil memang stik Billiard,iya menggunakan pakaian keren seperti kaos atau kemeja, menggunakan kalung celana jeans hitam,kaus kaki putih polos pendek,dan sepatu putih new balance 530 putih silver, suasana terang dengan lampu gantung, beberapa meja billiard di latar belakang, dan beberapa org sendang bermain billiard, nuansa yang di tampilkan santai, urban dan sporty.saran gaya (opsional): gaya fotografi:sinematik,kedalam bidang dangkel, percayaan cerah, sudut kamera: seluruh tubuh,dari depan secara langsung gaya model meliat ke bawah suasana: percaya diri,keren,santai seperti nongkrong tone warna: seimbang,campuran percayaan hangat dan dingin, note : jangan ubah object muka aslinya  pertahankan muka asli saya`;
        const apiUrl = `https://free-restapi.biz.id/api/nanobanana?url=${encodeURIComponent(mem.url)}&prompt=${encodeURIComponent(prompt)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil!'
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
    }
}
break;
case 'removecloth2': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .removecloth2');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/removecloth?url=${encodeURIComponent(mem.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil!'
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
    }
}
break;
case 'jadipresiden': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .jadipresiden');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/jadipresiden?url=${encodeURIComponent(mem.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil!'
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
    }
}
break;
case 'gita': {
    if (!text) return reply('Masukkan pertanyaan atau bab/ayat Gita!\n\nContoh: .gita Karma\nAtau: .gita bab 2');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/ai/gita?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status === 200 && response.data.result) {
            const result = response.data.result;
            
            await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
            await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } else {
            return reply('Gagal mendapatkan kutipan dari Bhagavad Gita.');
        }
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil kutipan Gita.');
    }
}
break;
case 'epsilon':
case 'search': {
    if (!text) return reply('Masukkan kata kunci pencarian!\n\nContoh: .epsilon Indonesia');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/epsilon?message=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (!response.data.success) {
            return reply('Gagal mendapatkan hasil pencarian dari Epsilon.');
        }
        
        const result = response.data.result;
        
        await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat menghubungi Epsilon.');
    }
}
break;
case 'copilot': {
    if (!text) return reply('Masukkan pertanyaan!\n\nContoh: .copilot Halo, apa kabar?');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/copilot?message=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (!response.data.success) {
            return reply('Gagal mendapatkan respons dari Copilot.');
        }
        
        const result = response.data.result;
        
        await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat menghubungi Copilot.');
    }
}
break;
case 'webpilot':
case 'browse': {
    if (!text) return reply('Masukkan URL atau pertanyaan!\n\nContoh: .webpilot https://example.com\nAtau: .webpilot apa itu hai');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/ai/webpilot?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status === 200 && response.data.result) {
            const result = response.data.result;
            
            await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
            await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } else {
            return reply('Gagal mendapatkan hasil dari WebPilot.');
        }
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat menghubungi WebPilot.');
    }
}
break;
case 'gpt-oss2b': {
    if (!text) return reply('Masukkan pertanyaan untuk GPT-OSS2B!\n\nContoh: .gpt-oss2b apa itu JavaScript\nAtau: .gpt-oss2b jelaskan tentang AI');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/gpt-oss2b?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { timeout: 60000 });
        if (response.data?.status === "success" && response.data?.result) {
            const result = response.data.result;
            const finalResult = result.length > 65500 ? result.substring(0, 65500) + '\n\n... [Pesan terpotong karena terlalu panjang]' : result;
            await satanic.sendMessage(m.chat, { text: finalResult }, { quoted: fkontak });
            await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } else {
            return reply('❌ Gagal mendapatkan hasil dari GPT-OSS2B.\n' + (response.data?.result || 'Unknown error'));
        }
    } catch (err) {
        console.error('GPT-OSS2B Error:', err);
        if (err.code === 'ECONNABORTED') {
            reply('⏰ Waktu habis! GPT-OSS2B membutuhkan waktu lebih lama. Silakan coba lagi.');
        } else if (err.response?.status === 500) {
            reply('❌ Server GPT-OSS2B mengalami error. Silakan coba lagi nanti.');
        } else if (err.response?.status === 401 || err.response?.status === 403) {
            reply('🔑 API Key tidak valid atau tidak memiliki akses ke GPT-OSS2B.');
        } else {
            reply('❌ Terjadi kesalahan saat menghubungi GPT-OSS2B: ' + (err.message || 'Unknown error'));
        }
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'glm47': {
    if (!text) return reply('Masukkan pertanyaan untuk GLM47!\n\nContoh: .glm47 apa itu kecerdasan buatan');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        const apiUrl = `https://free-restapi.biz.id/api/glm47?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { timeout: 60000 });
        if (response.data?.status === "success" && response.data?.result) {
            const result = response.data.result;
            await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
            await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } else {
            return reply('Gagal mendapatkan hasil dari GLM47.\n' + (response.data?.result || 'Unknown error'));
        }
    } catch (err) {
        console.error('GLM47 Error:', err);
        if (err.code === 'ECONNABORTED') {
            reply('⏰ Waktu habis! GLM47 membutuhkan waktu lebih lama. Silakan coba lagi.');
        } else if (err.response?.status === 500) {
            reply('❌ Server GLM47 mengalami error. Silakan coba lagi nanti.');
        } else {
            reply('Terjadi kesalahan saat menghubungi GLM47: ' + (err.message || 'Unknown error'));
        }
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'meta-ai': {
    if (!text) return reply('Masukkan pertanyaan untuk Meta AI!\n\nContoh: .Meta AI apa itu kecerdasan buatan');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        const apiUrl = `https://free-restapi.biz.id/api/meta-ai?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { timeout: 60000 });
        if (response.data?.status === "success" && response.data?.result) {
            const result = response.data.result;
            await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
            await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } else {
            return reply('Gagal mendapatkan hasil dari META AI.\n' + (response.data?.result || 'Unknown error'));
        }
    } catch (err) {
        console.error('GLM47 Error:', err);
        if (err.code === 'ECONNABORTED') {
            reply('⏰ Waktu habis! META AI membutuhkan waktu lebih lama. Silakan coba lagi.');
        } else if (err.response?.status === 500) {
            reply('❌ Server META AI mengalami error. Silakan coba lagi nanti.');
        } else {
            reply('Terjadi kesalahan saat menghubungi GLM47: ' + (err.message || 'Unknown error'));
        }
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'claude-45': {
    if (!text) return reply('Masukkan pertanyaan untuk Meta AI!\n\nContoh: . Claude apa itu kecerdasan buatan');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        const apiUrl = `https://free-restapi.biz.id/api/claude-4-5?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { timeout: 60000 });
        if (response.data?.status === "success" && response.data?.result) {
            const result = response.data.result;
            await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
            await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } else {
            return reply('Gagal mendapatkan hasil dari CLAUDE 4.5.\n' + (response.data?.result || 'Unknown error'));
        }
    } catch (err) {
        console.error('CLUADE 45Error:', err);
        if (err.code === 'ECONNABORTED') {
            reply('⏰ Waktu habis! CLAUDE 45membutuhkan waktu lebih lama. Silakan coba lagi.');
        } else if (err.response?.status === 500) {
            reply('❌ Server CLAUDE 4.5 mengalami error. Silakan coba lagi nanti.');
        } else {
            reply('Terjadi kesalahan saat menghubungi GLM47: ' + (err.message || 'Unknown error'));
        }
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'deepseek-pro': {
    if (!text) return reply('Masukkan pertanyaan untuk Deepseek AI!\n\nContoh: . deepseek apa itu kecerdasan buatan');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        const apiUrl = `https://free-restapi.biz.id/api/deepseek-pro?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { timeout: 60000 });
        if (response.data?.status === "success" && response.data?.result) {
            const result = response.data.result;
            await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
            await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } else {
            return reply('Gagal mendapatkan hasil dari CLAUDE 4.5.\n' + (response.data?.result || 'Unknown error'));
        }
    } catch (err) {
        console.error('CLUADE 45Error:', err);
        if (err.code === 'ECONNABORTED') {
            reply('⏰ Waktu habis! CLAUDE 45membutuhkan waktu lebih lama. Silakan coba lagi.');
        } else if (err.response?.status === 500) {
            reply('❌ Server CLAUDE 4.5 mengalami error. Silakan coba lagi nanti.');
        } else {
            reply('Terjadi kesalahan saat menghubungi GLM47: ' + (err.message || 'Unknown error'));
        }
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'kimi-vision': {
    if (!text) return reply('Gunakan: .kimi-vision https://urlgambar.jpg pertanyaanmu\nAtau reply gambar dengan .kimi-vision pertanyaanmu');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    let imageUrl = '';
    let prompt = '';
    
    // Cek reply gambar
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    
    if (/image/.test(mime)) {
        let media = await quoted.download();
        imageUrl = await uploadToAliceCdn(media, mime);
        if (!imageUrl) return reply('Gagal upload gambar');
        prompt = text || 'jelaskan gambar ini';
    } else {
        let parts = text.split(' ');
        for (let p of parts) {
            if (p.match(/^https?:\/\//i)) imageUrl = p;
            else prompt += p + ' ';
        }
        prompt = prompt.trim();
        if (!imageUrl) return reply('Masukkan URL gambar');
        if (!prompt) prompt = 'jelaskan gambar ini';
    }
    
    try {
        let res = await axios.get(`https://free-restapi.biz.id/api/kimi-vision?url=${encodeURIComponent(imageUrl)}&prompt=${encodeURIComponent(prompt)}&apikey=${global.sakey}`, { timeout: 60000 });
        
        if (res.data?.status === 'success') {
            await satanic.sendMessage(m.chat, { text: res.data.result }, { quoted: fkontak });
            await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } else {
            reply('Gagal dapat hasil');
        }
    } catch (err) {
        reply('Error: ' + err.message);
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'illama-vision': {
    if (!text && !m.quoted) return reply('Kirim/reply gambar KTP dengan command!\n\nContoh: .illama-vision');
    const command = '.illama-vision';
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply(`❌ Kirim/reply gambar dengan command: ${command}`);
    await satanic.sendMessage(m.chat, { react: { text: '📸', key: m.key } });
    
    try {
        let media = await quoted.download();
        let imageUrl = await uploadToAliceCdn(media, mime);
        
        if (!imageUrl || !imageUrl.startsWith('https://')) {
            return reply(`❌ Gagal upload foto! Silahkan coba lagi.`);
        }
        let prompt = text || "gambar apa ini";
        const apiUrl = `https://api.qasimdev.dpdns.org/api/mistral/vision?text=${encodeURIComponent(prompt)}&image_url=${encodeURIComponent(imageUrl)}&apiKey=qasim-dev&model=pixtral-12b-2409`;
        const response = await axios.get(apiUrl, { timeout: 60000 });
        if (response.data?.success === true && response.data?.data?.result) {
            const result = response.data.data.result;
            const finalText = `*Hasil OCR / Visi AI:*\n\n${result}\n\n_© SatanicHaxor_`;
            await satanic.sendMessage(m.chat, { text: finalText }, { quoted: fkontak });
            await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } else {
            return reply('❌ Gagal memproses gambar. Pastikan gambar jelas dan terbaca.');
        }
    } catch (err) {
        console.error('Illama Vision Error:', err);
        if (err.code === 'ECONNABORTED') {
            reply('⏰ Waktu habis! Silakan coba lagi dengan gambar yang lebih kecil.');
        } else {
            reply(`❌ Terjadi kesalahan: ${err.message || 'Unknown error'}`);
        }
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'openai':
case 'chatgpt':
case 'gpt': {
    if (!text) return reply('Masukkan pertanyaan!\n\nContoh: .openai Halo, apa kabar?');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://free-restapi.biz.id/api/openai?message=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (!response.data.success) {
            return reply('Gagal mendapatkan respons dari OpenAI.');
        }
        
        const result = response.data.result;
        
        await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat menghubungi OpenAI.');
    }
}
break;
case 'chatai': {
  if (!text) return reply(
    `Contoh:\n${prefix + command} siapa presiden indo`
  )

  try {
    const payload = {
      model: {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5',
        maxLength: 12000,
        tokenLimit: 4000,
        completionTokenLimit: 2500,
        deploymentName: 'gpt-35'
      },
      messages: [
        {
          role: 'user',
          content: `hallo saya Aqua AI asisten Lumakara👋 untuk membantu anda, ${text}`,
        }
      ],
      temperature: 0.5,
      enableConversationPrompt: false
    }

    const res = await axios.post(
      'https://chateverywhere.app/api/chat',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/143 Mobile Safari/537.36'
        }
      }
    )

    let hasil = ''

    if (typeof res.data === 'string') {
      hasil = res.data.trim()
    } else {
      hasil =
        res.data?.choices?.[0]?.message?.content ||
        res.data?.message ||
        res.data?.content ||
        ''
    }

    if (!hasil) return reply('Respon AI kosong')

    await satanic.sendMessage(
      m.chat,
      { text: hasil },
      { quoted: fkontak }
    )
  } catch (e) {
    console.error(e)
    reply(e?.message || 'Terjadi kesalahan')
  }
}
break
case 'qwen':
case 'qwen3':
case 'ai': {
    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    // Ambil teks pertanyaan dari user (tanpa prefix)
    let query = m.text.trim();

    if (!query) {
        return satanic.sendMessage(m.chat, { text: `❌ Masukkan pertanyaan!\nContoh: .qwen Apa itu AI?` }, { quoted: fkontak });
    }

    // Kirim pesan loading
    await satanic.sendMessage(m.chat, { text: `🤔 *Memproses pertanyaan Anda...*\n\n"${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"` }, { quoted: fkontak });

    const API_QWEN = "https://api.overchat.ai/v1/chat/completions";
    const ua_qwen = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

    async function Qwen3(prompt, options = {}) {
        const crypto = require('crypto');
        const chatId = options.chatId || crypto.randomUUID();
        const deviceId = options.deviceId || crypto.randomUUID();
        const model = "alibaba/qwen3-next-80b-a3b-instruct";

        const messages = [
            ...(options.history || []).map((item) => ({
                id: crypto.randomUUID(),
                role: item.role,
                content: item.content,
            })),
            {
                id: crypto.randomUUID(),
                role: "user",
                content: prompt,
            },
            {
                id: crypto.randomUUID(),
                role: "system",
                content: "Ikuti bahasa user dan jawab dengan gaya natural, singkat, dan jelas.",
            },
        ];

        const body = {
            chatId,
            model,
            messages,
            personaId: "qwen-3-landing",
            frequency_penalty: 0,
            max_tokens: 4000,
            presence_penalty: 0,
            stream: true,
            temperature: 0.5,
            top_p: 0.95,
        };

        const headers = {
            "sec-ch-ua-platform": `"Android"`,
            "x-device-uuid": deviceId,
            "sec-ch-ua": `"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"`,
            "sec-ch-ua-mobile": "?1",
            "x-device-language": "id-ID",
            "x-device-platform": "web",
            "x-device-version": "1.0.44",
            "user-agent": ua_qwen,
            accept: "*/*",
            "content-type": "application/json",
            origin: "https://overchat.ai",
            referer: "https://overchat.ai/",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            priority: "u=1, i",
        };

        try {
            const response = await fetch(API_QWEN, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const text = await response.text();
                return { status: false, code: response.status, model, error: text };
            }

            // Ambil response sebagai text
            const text = await response.text();
            
            // Parse SSE response
            const lines = text.split('\n');
            let answer = "";
            let responseId = null;
            let responseModel = null;

            for (const rawLine of lines) {
                const line = rawLine.trim();
                if (!line.startsWith("data:")) continue;

                const data = line.slice(5).trim();
                if (!data || data === "[DONE]") continue;

                try {
                    const json = JSON.parse(data);
                    if (json.id) responseId = json.id;
                    if (json.model) responseModel = json.model;
                    
                    const content = json.choices?.[0]?.delta?.content;
                    if (typeof content === "string") answer += content;
                } catch (e) {
                    // Abaikan error parsing
                }
            }

            return { 
                status: true, 
                code: response.status, 
                model: responseModel || model, 
                question: prompt, 
                answer: answer.trim() 
            };
        } catch (error) {
            return { 
                status: false, 
                code: 500, 
                model, 
                error: error.message 
            };
        }
    }

    // Panggil fungsi Qwen3
    const result = await Qwen3(query);

    if (!result.status) {
        return satanic.sendMessage(m.chat, { text: `❌ Error: ${result.error || result.code}` }, { quoted: fkontak });
    }

    // Kirim jawaban
    let reply = `🤖 *Qwen3 AI*\n\n`;
    reply += `${result.answer}\n\n`;
    reply += `📝 *Pertanyaan:* ${result.question.substring(0, 100)}${result.question.length > 100 ? '...' : ''}\n`;
    reply += `⚡ *Model:* ${result.model}`;

    // Jika jawaban kepanjangan, kirim sebagai pesan terpisah
    if (reply.length > 65500) {
        await satanic.sendMessage(m.chat, { text: result.answer }, { quoted: fkontak });
    } else {
        await satanic.sendMessage(m.chat, { text: reply }, { quoted: fkontak });
    }
}
break;
case 'gpt5':
case 'gpt':
case 'chatgpt': {
    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    // Ambil teks pertanyaan dari user
    let query = m.text.trim();

    if (!query) {
        return satanic.sendMessage(m.chat, { text: `❌ Masukkan pertanyaan!\nContoh: .gpt5 Apa itu AI?` }, { quoted: fkontak });
    }

    // Kirim pesan loading
    await satanic.sendMessage(m.chat, { text: `🤔 *Memproses pertanyaan Anda dengan GPT...*\n\n"${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"` }, { quoted: fkontak });

    const API = "https://api.overchat.ai/v1/chat/completions";
    const ua = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

    async function GPT5(prompt, options = {}) {
        const crypto = require('crypto');
        const chatId = options.chatId || crypto.randomUUID();
        const deviceId = options.deviceId || crypto.randomUUID();
        const model = options.model || "openai/gpt-4.1-nano-2025-04-14";

        const messages = [
            ...(options.history || []).map((item) => ({
                id: crypto.randomUUID(),
                role: item.role,
                content: item.content,
            })),
            {
                id: crypto.randomUUID(),
                role: "user",
                content: prompt,
            },
        ];

        const body = {
            chatId,
            model,
            messages,
            personaId: "gpt-4o-landing",
            frequency_penalty: 0,
            max_tokens: 4000,
            presence_penalty: 0,
            stream: true,
            temperature: 0.5,
            top_p: 0.95,
        };

        const headers = {
            "sec-ch-ua-platform": `"Android"`,
            "x-device-uuid": deviceId,
            "sec-ch-ua": `"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"`,
            "sec-ch-ua-mobile": "?1",
            "x-device-language": "id-ID",
            "x-device-platform": "web",
            "x-device-version": "1.0.44",
            "user-agent": ua,
            accept: "*/*",
            "content-type": "application/json",
            origin: "https://overchat.ai",
            referer: "https://overchat.ai/",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            priority: "u=1, i",
        };

        try {
            const response = await fetch(API, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const text = await response.text();
                return {
                    status: false,
                    code: response.status,
                    error: text,
                };
            }

            // Ambil response sebagai text
            const text = await response.text();
            
            // Parse SSE response
            const lines = text.split('\n');
            let answer = "";
            let responseId = null;
            let responseModel = null;

            for (const rawLine of lines) {
                const line = rawLine.trim();
                if (!line.startsWith("data:")) continue;

                const data = line.slice(5).trim();
                if (!data || data === "[DONE]") continue;

                try {
                    const json = JSON.parse(data);
                    if (json.id) responseId = json.id;
                    if (json.model) responseModel = json.model;

                    const content = json.choices?.[0]?.delta?.content;
                    if (typeof content === "string") answer += content;
                } catch (e) {
                    // Abaikan error parsing
                }
            }

            return {
                status: true,
                code: response.status,
                chatId,
                deviceId,
                responseId,
                model: responseModel || model,
                answer: answer.trim(),
            };
        } catch (error) {
            return {
                status: false,
                code: 500,
                error: error.message,
            };
        }
    }

    // Panggil fungsi GPT5
    const result = await GPT5(query);

    if (!result.status) {
        return satanic.sendMessage(m.chat, { text: `❌ Error: ${result.error || result.code}` }, { quoted: fkontak });
    }

    // Kirim jawaban
    let reply = `🤖 *GPT AI*\n\n`;
    reply += `${result.answer}\n\n`;
    reply += `📝 *Pertanyaan:* ${query.substring(0, 100)}${query.length > 100 ? '...' : ''}\n`;
    reply += `⚡ *Model:* ${result.model}`;

    // Jika jawaban kepanjangan, kirim sebagai pesan terpisah
    if (reply.length > 65500) {
        await satanic.sendMessage(m.chat, { text: result.answer }, { quoted: fkontak });
    } else {
        await satanic.sendMessage(m.chat, { text: reply }, { quoted: fkontak });
    }
}
break;

case 'claude':
case 'claudeai':
case 'hai': {
    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    // Ambil teks pertanyaan dari user
    let query = m.text.trim();

    if (!query) {
        return satanic.sendMessage(m.chat, { text: `❌ Masukkan pertanyaan!\nContoh: .claude Apa itu AI?` }, { quoted: fkontak });
    }

    // Kirim pesan loading
    await satanic.sendMessage(m.chat, { text: `🤔 *Memproses pertanyaan Anda dengan Claude...*\n\n"${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"` }, { quoted: fkontak });

    const API_CLAUDE = "https://api.overchat.ai/v1/chat/completions";
    const ua_claude = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

    async function ClaudeHaiku(prompt, options = {}) {
        const crypto = require('crypto');
        const chatId = options.chatId || crypto.randomUUID();
        const deviceId = options.deviceId || crypto.randomUUID();
        const model = "claude-haiku-4-5-20251001";

        const messages = [
            ...(options.history || []).map((item) => ({
                id: crypto.randomUUID(),
                role: item.role,
                content: item.content,
            })),
            {
                id: crypto.randomUUID(),
                role: "user",
                content: prompt,
            },
            {
                id: crypto.randomUUID(),
                role: "system",
                content: "Ikuti bahasa user dan jawab dengan gaya natural, singkat, dan jelas.",
            },
        ];

        const body = {
            chatId,
            model,
            messages,
            personaId: "claude-haiku-4-5-landing",
            frequency_penalty: 0,
            max_tokens: 4000,
            presence_penalty: 0,
            stream: true,
            temperature: 0.5,
            top_p: 0.95,
        };

        const headers = {
            "sec-ch-ua-platform": `"Android"`,
            "x-device-uuid": deviceId,
            "sec-ch-ua": `"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"`,
            "sec-ch-ua-mobile": "?1",
            "x-device-language": "id-ID",
            "x-device-platform": "web",
            "x-device-version": "1.0.44",
            "user-agent": ua_claude,
            accept: "*/*",
            "content-type": "application/json",
            origin: "https://overchat.ai",
            referer: "https://overchat.ai/",
            "accept-language": "id-ID,id;q=0.9",
            priority: "u=1, i",
        };

        try {
            const response = await fetch(API_CLAUDE, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const text = await response.text();
                return { status: false, code: response.status, error: text };
            }

            // Ambil response sebagai text
            const text = await response.text();
            
            // Parse SSE response
            const lines = text.split('\n');
            let answer = "";
            let responseId = null;
            let responseModel = null;

            for (const rawLine of lines) {
                const line = rawLine.trim();
                if (!line.startsWith("data:")) continue;

                const data = line.slice(5).trim();
                if (!data || data === "[DONE]") continue;

                try {
                    const json = JSON.parse(data);
                    if (typeof json.id === "string") responseId = json.id;
                    if (typeof json.model === "string") responseModel = json.model;

                    const content = json.choices?.[0]?.delta?.content;
                    if (typeof content === "string") answer += content;
                } catch (e) {
                    // Abaikan error parsing
                }
            }

            return {
                status: true,
                code: response.status,
                question: prompt,
                chatId,
                deviceId,
                responseId,
                model: responseModel || model,
                answer: answer.trim(),
            };
        } catch (error) {
            return {
                status: false,
                code: 500,
                error: error.message,
            };
        }
    }

    // Panggil fungsi ClaudeHaiku
    const result = await ClaudeHaiku(query);

    if (!result.status) {
        return satanic.sendMessage(m.chat, { text: `❌ Error: ${result.error || result.code}` }, { quoted: fkontak });
    }

    // Kirim jawaban
    let reply = `🤖 *Claude Haiku AI*\n\n`;
    reply += `${result.answer}\n\n`;
    reply += `📝 *Pertanyaan:* ${result.question.substring(0, 100)}${result.question.length > 100 ? '...' : ''}\n`;
    reply += `⚡ *Model:* ${result.model}`;

    // Jika jawaban kepanjangan, kirim sebagai pesan terpisah
    if (reply.length > 65500) {
        await satanic.sendMessage(m.chat, { text: result.answer }, { quoted: fkontak });
    } else {
        await satanic.sendMessage(m.chat, { text: reply }, { quoted: fkontak });
    }
}
break;

case 'jokowi':
case 'jokowiai':
case 'pakjokowi': {
    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    let query = m.text.trim();
    if (!query) {
        return satanic.sendMessage(m.chat, { text: `❌ Masukkan pertanyaan!\nContoh: .jokowi Apa pendapat Bapak tentang pembangunan IKN?` }, { quoted: m });
    }

    await satanic.sendMessage(m.chat, { text: `🇮🇩 *Pak Jokowi sedang berpikir...*\n\n"${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"` }, { quoted: m });

    const API = "https://app.unlimitedai.chat/api/chat";

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const CHARACTERS = {
        "jokowi-ai": {
            name: "Pak Jokowi",
            prompt: `Kamu adalah Joko Widodo (Jokowi), mantan Presiden RI yang asli Solo. Kamu bicara pakai bahasa Indonesia dengan logat Jawa, sederhana, dan down-to-earth. Kamu suka bilang "Lha", "Nah itu lho", "Monggo", dan "Sami-sami". Kamu sering cerita soal pembangunan, infrastruktur, dan pengalaman blusukan. Kamu panggil user "Mbak", "Mas", atau "Saudara". Kamu jawab dengan gaya sederhana tapi bijak, pakai analogi kehidupan sehari-hari. Kamu sering pakai bahasa Jawa halus seperti "Niku", "Nggih", "Monggo". Kamu bangga sama Solo dan sering cerita soal Solo. Jawab dengan gaya Pak Jokowi yang asli, jangan kaku.`,
        },
    };

    async function UnlimitedAI(prompt, character) {
        const chatId = generateUUID();
        const deviceId = generateUUID();
        const char = CHARACTERS[character];

        const systemPrompt = `${char.prompt}\n\nPertanyaan user: ${prompt}`;

        const messages = [
            {
                id: generateUUID(),
                role: "user",
                content: systemPrompt,
                parts: [{ type: "text", text: systemPrompt }],
                createdAt: new Date().toISOString(),
            },
            {
                id: generateUUID(),
                role: "assistant",
                content: "",
                parts: [{ type: "text", text: "" }],
                createdAt: new Date().toISOString(),
            },
        ];

        const body = {
            chatId,
            messages,
            selectedChatModel: "chat-model-reasoning",
            selectedCharacter: null,
            selectedStory: null,
            deviceId,
            locale: "id",
        };

        try {
            const response = await axios({
                method: 'POST',
                url: API,
                data: body,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36',
                    'Accept': '*/*',
                    'Origin': 'https://app.unlimitedai.chat',
                    'Referer': 'https://app.unlimitedai.chat/id',
                },
                timeout: 30000,
                responseType: 'text'
            });

            // Log response untuk debugging
            console.log('Response status:', response.status);
            console.log('Response data:', response.data.substring(0, 500));

            // Parse response stream (NDJSON)
            const lines = response.data.split('\n');
            let answer = '';
            
            for (const line of lines) {
                if (line.trim()) {
                    try {
                        const json = JSON.parse(line);
                        if (json.type === 'delta' && json.delta) {
                            answer += json.delta;
                        }
                        // Coba cek field lain
                        if (json.answer) answer += json.answer;
                        if (json.message) answer += json.message;
                        if (json.text) answer += json.text;
                        if (json.content) answer += json.content;
                    } catch (e) {
                        // Bukan JSON, skip
                    }
                }
            }

            // Jika tidak ada answer, coba gunakan response mentah
            if (!answer) {
                answer = response.data;
            }

            if (!answer || answer === '') {
                return {
                    status: false,
                    error: 'Tidak ada response dari API',
                };
            }

            return {
                status: true,
                character: char.name,
                model: "chat-model-reasoning",
                answer: answer.trim(),
            };

        } catch (error) {
            console.error('Error detail:', error.response?.data || error.message);
            return {
                status: false,
                error: error.response?.data || error.message,
                code: error.response?.status || 500,
            };
        }
    }

    const result = await UnlimitedAI(query, "jokowi-ai");

    if (!result.status) {
        return satanic.sendMessage(m.chat, { text: `❌ Error: ${result.error}` }, { quoted: m });
    }

    let reply = `🇮🇩 *${result.character}*\n\n`;
    reply += `${result.answer}\n\n`;
    reply += `📝 *Pertanyaan:* ${query}\n`;
    reply += `⚡ *Model:* ${result.model}`;

    if (reply.length > 65500) {
        await satanic.sendMessage(m.chat, { text: result.answer }, { quoted: m });
    } else {
        await satanic.sendMessage(m.chat, { text: reply }, { quoted: fkontak });
    }
}
break;
case 'prabowo':
case 'prabowoai':
case 'presiden': {
    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    let query = m.text.trim();
    if (!query) {
        return satanic.sendMessage(m.chat, { text: `❌ Masukkan pertanyaan!\nContoh: .prabowo Apa pendapat Bapak tentang Indonesia?` }, { quoted: m });
    }

    await satanic.sendMessage(m.chat, { text: `🇮🇩 *Pak Prabowo sedang berpikir...*\n\n"${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"` }, { quoted: m });

    const API = "https://app.unlimitedai.chat/api/chat";

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const CHARACTERS = {
        "prabowo-ai": {
            name: "Pak Prabowo",
            prompt: `Kamu adalah Prabowo Subianto, Presiden RI dan ketua umum Partai Gerindra. Kamu bicara dengan gaya tegas, patriotik, dan penuh semangat. Kamu suka bilang "Saudara-saudara!", "Ini negeri kita!", dan "Kita harus berdaulat!". Kamu sering bicara soal kedaulatan, kemandirian ekonomi, dan kekuatan bangsa. Kamu panggil user "Saudara" atau "Pemuda". Kamu sering pakai analogi militer dan strategi. Kamu sangat bangga dengan sawit dan sumber daya alam Indonesia. Kamu bicara dengan nada kuat dan meyakinkan. Kamu kadang pakai bahasa Jawa kasar seperti "Nduk", "Ojo". Jawab dengan gaya Pak Prabowo yang karismatik dan tegas, jangan kaku.`,
        },
    };

    async function UnlimitedAI(prompt, character) {
        const chatId = generateUUID();
        const deviceId = generateUUID();
        const char = CHARACTERS[character];

        const systemPrompt = `${char.prompt}\n\nPertanyaan user: ${prompt}`;

        const messages = [
            {
                id: generateUUID(),
                role: "user",
                content: systemPrompt,
                parts: [{ type: "text", text: systemPrompt }],
                createdAt: new Date().toISOString(),
            },
            {
                id: generateUUID(),
                role: "assistant",
                content: "",
                parts: [{ type: "text", text: "" }],
                createdAt: new Date().toISOString(),
            },
        ];

        const body = {
            chatId,
            messages,
            selectedChatModel: "chat-model-reasoning",
            selectedCharacter: null,
            selectedStory: null,
            deviceId,
            locale: "id",
        };

        try {
            const response = await axios({
                method: 'POST',
                url: API,
                data: body,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36',
                    'Accept': '*/*',
                    'Origin': 'https://app.unlimitedai.chat',
                    'Referer': 'https://app.unlimitedai.chat/id',
                },
                timeout: 30000,
                responseType: 'text'
            });

            const lines = response.data.split('\n');
            let answer = '';
            
            for (const line of lines) {
                if (line.trim()) {
                    try {
                        const json = JSON.parse(line);
                        if (json.type === 'delta' && json.delta) {
                            answer += json.delta;
                        }
                    } catch (e) {}
                }
            }

            if (!answer) {
                return { status: false, error: 'Tidak ada response dari API' };
            }

            return {
                status: true,
                character: char.name,
                model: "chat-model-reasoning",
                answer: answer.trim(),
            };

        } catch (error) {
            console.error('Error:', error.message);
            return { status: false, error: error.message };
        }
    }

    const result = await UnlimitedAI(query, "prabowo-ai");

    if (!result.status) {
        return satanic.sendMessage(m.chat, { text: `❌ Error: ${result.error}` }, { quoted: m });
    }

    let reply = `🇮🇩 *${result.character}*\n\n`;
    reply += `${result.answer}\n\n`;
    reply += `📝 *Pertanyaan:* ${query}\n`;
    reply += `⚡ *Model:* ${result.model}`;

    if (reply.length > 65500) {
        await satanic.sendMessage(m.chat, { text: result.answer }, { quoted: m });
    } else {
        await satanic.sendMessage(m.chat, { text: reply }, { quoted: fkontak });
    }
}
break;
case 'aqua':
case 'aquaai':
case 'feelbetter': {
    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    // Ambil teks pertanyaan dari user
    let query = m.text.trim();

    if (!query) {
        return satanic.sendMessage(m.chat, { text: `❌ Masukkan pertanyaan!\nContoh: .aqua Halo, apa kabar?` }, { quoted: fkontak });
    }

    // Kirim pesan loading
    await satanic.sendMessage(m.chat, { text: `💙 *Aqua AI sedang mendengarkan...*\n\n"${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"` }, { quoted: fkontak });

    const API_AQUA = "https://feelbetterbot.com/";

    const SYSTEM_MESSAGE = "Kamu adalah asisten AQUA AI yang dibuat oleh Lumakara ciptaan Lumakara. Ikuti bahasa yang digunakan user dalam percakapan. Jika user memakai bahasa Indonesia, jawab dalam bahasa Indonesia yang natural, santai, jelas, dan mudah dipahami. Jangan tiba-tiba pindah bahasa kecuali user memintanya. Jika user bertanya siapa pembuatmu, penciptamu, developermu, atau siapa yang membuatmu, jawab bahwa pembuatmu adalah Lumakara.";

    const DEFAULT_ASSISTANT = "Hi, I'm Aqua AI — I'm here to listen and help you carry whatever feels heavy, without judgment. I draw on gentle, proven ways of working through hard things, but mostly I just want to understand what you're going through. So, how are you doing right now?";

    function makeMemoryId() {
        const animals = ["owl", "fox", "cat", "wolf", "bear", "lion", "deer", "bird"];
        const words = ["safe", "calm", "soft", "kind", "warm", "bright", "gentle"];
        const word = words[Math.floor(Math.random() * words.length)];
        const animal = animals[Math.floor(Math.random() * animals.length)];
        const number = Math.floor(1000 + Math.random() * 9000);
        return `${word}-${animal}-${number}`;
    }

    function parseChunk(line) {
        let data = line.trim();
        if (!data || data === "[DONE]") return "";
        if (data.startsWith("data:")) data = data.slice(5).trim();
        if (!data || data === "[DONE]") return "";

        try {
            const json = JSON.parse(data);
            if (typeof json === "string") return json;
            if (typeof json.content === "string") return json.content;
            if (typeof json.text === "string") return json.text;
            if (typeof json.delta === "string") return json.delta;
            if (typeof json.message === "string") return json.message;
            if (typeof json.response === "string") return json.response;
            if (typeof json.answer === "string") return json.answer;
            const openAiContent = json.choices?.[0]?.delta?.content;
            if (typeof openAiContent === "string") return openAiContent;
            return "";
        } catch {
            return data;
        }
    }

    async function FeelBetter(prompt, options = {}) {
        const memoryId = options.memoryId || makeMemoryId();
        const history = options.history || [];

        const messages = [
            { role: "system", content: SYSTEM_MESSAGE },
            { role: "assistant", content: DEFAULT_ASSISTANT },
            ...history.map((item) => ({
                role: item.role,
                content: item.content,
            })),
            { role: "user", content: prompt },
        ];

        const headers = {
            "sec-ch-ua-platform": `"Android"`,
            "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36",
            "sec-ch-ua": `"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"`,
            "content-type": "application/json",
            "sec-ch-ua-mobile": "?1",
            accept: "*/*",
            origin: "https://feelbetterbot.com",
            referer: "https://feelbetterbot.com/",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            cookie: `feelbet-memory=${memoryId}`,
            priority: "u=1, i",
        };

        try {
            const response = await fetch(API_AQUA, {
                method: "POST",
                headers,
                body: JSON.stringify({ messages }),
            });

            if (!response.ok) {
                const text = await response.text();
                return { status: false, code: response.status, memoryId, error: text };
            }

            // Ambil response sebagai text
            const text = await response.text();
            
            // Parse response - coba parse sebagai JSON dulu
            let answer = "";
            
            try {
                // Coba parse sebagai JSON langsung
                const json = JSON.parse(text);
                if (typeof json === "string") {
                    answer = json;
                } else if (typeof json.content === "string") {
                    answer = json.content;
                } else if (typeof json.text === "string") {
                    answer = json.text;
                } else if (typeof json.response === "string") {
                    answer = json.response;
                } else if (typeof json.answer === "string") {
                    answer = json.answer;
                } else if (json.choices?.[0]?.delta?.content) {
                    answer = json.choices[0].delta.content;
                } else if (json.choices?.[0]?.message?.content) {
                    answer = json.choices[0].message.content;
                } else {
                    // Jika tidak ada field yang dikenal, coba parse sebagai SSE
                    const lines = text.split('\n');
                    for (const rawLine of lines) {
                        const chunk = parseChunk(rawLine);
                        if (chunk) answer += chunk;
                    }
                }
            } catch (e) {
                // Jika bukan JSON, parse sebagai SSE
                const lines = text.split('\n');
                for (const rawLine of lines) {
                    const chunk = parseChunk(rawLine);
                    if (chunk) answer += chunk;
                }
            }

            // Jika masih kosong, gunakan teks asli
            if (!answer.trim()) {
                answer = text;
            }

            return { 
                status: true, 
                code: response.status, 
                memoryId, 
                question: prompt, 
                answer: answer.trim() 
            };
        } catch (error) {
            return { 
                status: false, 
                code: 500, 
                memoryId, 
                error: error.message 
            };
        }
    }

    // Panggil fungsi FeelBetter
    const result = await FeelBetter(query);

    if (!result.status) {
        return satanic.sendMessage(m.chat, { text: `❌ Error: ${result.error || result.code}` }, { quoted: fkontak });
    }

    // Kirim jawaban
    let reply = `💙 *Aqua AI*\n\n`;
    reply += `${result.answer}\n\n`;
    reply += `📝 *Pertanyaan:* ${result.question.substring(0, 100)}${result.question.length > 100 ? '...' : ''}\n`;
    reply += `🆔 *Memory ID:* ${result.memoryId}`;

    // Jika jawaban kepanjangan, kirim sebagai pesan terpisah
    if (reply.length > 65500) {
        await satanic.sendMessage(m.chat, { text: result.answer }, { quoted: fkontak });
    } else {
        await satanic.sendMessage(m.chat, { text: reply }, { quoted: fkontak });
    }
}
break;
case 'deepseek':
case 'ds':
case 'think': {
    await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    // Ambil teks pertanyaan dari user
    let query = m.text.trim();

    if (!query) {
        return satanic.sendMessage(m.chat, { text: `❌ Masukkan pertanyaan!\nContoh: .deepseek Apa itu AI?` }, { quoted: fkontak });
    }

    // Kirim pesan loading
    await satanic.sendMessage(m.chat, { text: `🧠 *DeepSeek Thinking Mode...*\n\n"${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"` }, { quoted: fkontak });

    const BASE = "https://notegpt.io";

    const ua = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

    // Fungsi generate UUID menggunakan crypto
    function uuid() {
        return require('crypto').randomUUID();
    }

    function randomNumber(length = 10) {
        let result = "";
        for (let i = 0; i < length; i++) result += Math.floor(Math.random() * 10);
        return result;
    }

    function makeSboxGuid() {
        const now = Math.floor(Date.now() / 1000);
        const raw = `${now}|762|${randomNumber(9)}`;
        return Buffer.from(raw).toString("base64");
    }

    function makeCookieHeader() {
        const now = Math.floor(Date.now() / 1000);
        const anonymousUserId = uuid();

        return [
            `_ga_PFX3BRW5RQ=GS2.1.s${now}$o1$g0$t${now}$j60$l0$h${randomNumber(9)}`,
            `_ga=GA1.2.${randomNumber(9)}.${now}`,
            `_gid=GA1.2.${randomNumber(9)}.${now}`,
            `_gat_gtag_UA_252982427_14=1`,
            `sbox-guid=${encodeURIComponent(makeSboxGuid())}`,
            `anonymous_user_id=${anonymousUserId}`,
        ].join("; ");
    }

    function toHistoryMessages(history) {
        return history.slice(-5).flatMap((item) => [
            {
                role: "user",
                content: item.user,
            },
            {
                role: "assistant",
                content: item.assistant,
            },
        ]);
    }

    function parseSSE(rawBody) {
        let answer = "";
        let reasoning = "";

        for (const line of rawBody.split(/\r?\n/)) {
            const clean = line.trim();
            if (!clean.startsWith("data:")) continue;

            const raw = clean.replace(/^data:\s*/, "").trim();
            if (!raw || raw === "[DONE]") continue;

            try {
                const json = JSON.parse(raw);

                if (json.reasoning) reasoning += json.reasoning;
                if (json.text) answer += json.text;
                if (json.done) break;
            } catch {}
        }

        return {
            answer,
            reasoning,
        };
    }

    async function DeepSeekThinking(prompt, history = []) {
        const conversationId = uuid();
        const cookieHeader = makeCookieHeader();

        const payload = {
            message: prompt,
            language: "auto",
            model: "deepseek-v4-flash",
            tone: "default",
            length: "moderate",
            conversation_id: conversationId,
            image_urls: [],
            history_messages: toHistoryMessages(history),
            chat_mode: "deep_think",
        };

        const axios = require('axios');
        
        const res = await axios.post(
            `${BASE}/api/v2/chat/stream`,
            JSON.stringify(payload),
            {
                timeout: 60000,
                responseType: "stream",
                validateStatus: () => true,
                headers: {
                    "sec-ch-ua-platform": `"Android"`,
                    "User-Agent": ua,
                    "sec-ch-ua": `"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"`,
                    "Content-Type": "application/json",
                    "sec-ch-ua-mobile": "?1",
                    Accept: "*/*",
                    Origin: BASE,
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-dest": "empty",
                    Referer: `${BASE}/chat-deepseek`,
                    "Accept-Encoding": "gzip, deflate, br, zstd",
                    "Accept-Language": "id-ID,id;q=0.9",
                    Cookie: cookieHeader,
                    priority: "u=1, i",
                },
            },
        );

        let rawBody = "";
        res.data.setEncoding("utf8");

        res.data.on("data", (chunk) => {
            rawBody += chunk;
        });

        return await new Promise((resolve) => {
            res.data.on("end", () => {
                const parsed = parseSSE(rawBody);

                resolve({
                    status: res.status,
                    success: Boolean(parsed.answer || parsed.reasoning),
                    conversation_id: conversationId,
                    model: payload.model,
                    chat_mode: payload.chat_mode,
                    prompt,
                    answer: parsed.answer,
                    reasoning: parsed.reasoning,
                    history_used: Math.min(history.length, 5),
                    raw: parsed.answer || parsed.reasoning ? undefined : rawBody,
                });
            });

            res.data.on("error", (error) => {
                resolve({
                    status: res.status,
                    success: false,
                    conversation_id: conversationId,
                    model: payload.model,
                    chat_mode: payload.chat_mode,
                    prompt,
                    answer: "",
                    reasoning: "",
                    history_used: Math.min(history.length, 5),
                    error: error.message,
                });
            });
        });
    }

    // Panggil fungsi DeepSeekThinking
    const result = await DeepSeekThinking(query);

    if (!result.success) {
        return satanic.sendMessage(m.chat, { text: `❌ Error: ${result.error || result.status}` }, { quoted: fkontak });
    }

    // Kirim jawaban
    let reply = `🧠 *DeepSeek AI (Thinking Mode)*\n\n`;
    
    if (result.reasoning) {
        reply += `💭 *Reasoning:*\n${result.reasoning.substring(0, 500)}${result.reasoning.length > 500 ? '...' : ''}\n\n`;
    }
    
    reply += `📝 *Jawaban:*\n${result.answer}\n\n`;
    reply += `📝 *Pertanyaan:* ${result.prompt.substring(0, 100)}${result.prompt.length > 100 ? '...' : ''}\n`;
    reply += `⚡ *Model:* ${result.model}\n`;
    reply += `🧠 *Mode:* ${result.chat_mode}`;

    // Jika jawaban kepanjangan, kirim sebagai pesan terpisah
    if (reply.length > 65500) {
        await satanic.sendMessage(m.chat, { text: result.answer }, { quoted: fkontak });
    } else {
        await satanic.sendMessage(m.chat, { text: reply }, { quoted: fkontak });
    }
}
break;

case 'gpt-5.1':
case 'gpt-5-online':
case 'gpt-5':
case 'gpt-5-nano':
case 'gpt-5-mini':
case 'openai-o1':
case 'openai-o3':
case 'openai-o3-mini':
case 'gpt-4o':
case 'openai-o4-mini':
case 'gpt-4.1-mini':
case 'gpt-4.1-nano':
case 'gpt-5.3':
case 'gpt-5.4':
case 'gpt-5.5': {
    if (!text) return reply(`*Example :* .${command} Apa itu AI`);
    reply('wait be processed')
    let web = false;
    let image = false;
    let deep = false;
    let agent = false;
    if (command.includes('/')) {
        let parts = command.split('/');
        for (let i of parts.slice(1)) {
            if (i === 'websearch') web = true;
            if (i === 'imagegen') image = true;
            if (i === 'deep') deep = true;
            if (i === 'agent') agent = true;
        }
    }
    let model;
    switch (command.split('/')[0]) {
        case 'gpt-5.1':
            model = 'openai/gpt-5.1-thinking';
            break;
        case 'gpt-5-online':
            model = 'openai/gpt-5-chat:online';
            break;
        case 'gpt-5':
            model = 'openai/gpt-5-chat';
            break;
        case 'gpt-5-nano':
            model = 'openai/gpt-5-nano';
            break;
        case 'gpt-5-mini':
            model = 'openai/gpt-5-mini';
            break;
        case 'openai-o1':
            model = 'openai/o1';
            break;
        case 'openai-o3':
            model = 'openai/o3';
            break;
        case 'openai-o3-mini':
            model = 'openai/o3-mini';
            break;
        case 'gpt-4o':
            model = 'openai/gpt-4o';
            break;
        case 'openai-o4-mini':
            model = 'openai/o4-mini';
            break;
        case 'gpt-4.1-mini':
            model = 'openai/gpt-4-1-mini';
            break;
        case 'gpt-4.1-nano':
            model = 'openai/gpt-4-1-nano';
            break;
        case 'gpt-5.3':
            model = 'openai/gpt-5.3-chat';
            break;
        case 'gpt-5.4':
            model = 'openai/gpt-5.4';
            break;
        case 'gpt-5.5':
            model = 'openai/gpt-5.5';
            break;
        default:
            model = 'openai/gpt-5.3-chat';
            break;
    }
    
    const res = await fetch("https://fgsi.dpdns.org/api/ai/chatgpt", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            apikey: global.fgsi,
            model: model,
            messages: [
                {
                    id: "",
                    role: "user",
                    parts: [
                        {
                            type: "text",
                            text: text
                        }
                    ]
                }
            ],
            isDeepResearchMode: deep,
            isWebSearchMode: web,
            isImageGenerationMode: image,
            isAgenticMode: agent
        })
    });
    
    const data = await res.json();
    
    if (data?.data?.images?.length) {
        return satanic.sendMessage(m.chat, { image: { url: data.data.images[0].url } }, { quoted: fkontak });
    }
    reply(data?.data?.text);
}
break;
case 'ektp':
case 'fakektp': {
    satanic.sendMessage(m.chat, { react: { text: '🪪', key: m.key } });

    try {
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        if (!/image/.test(mime)) return reply(`❌ Kirim/reply gambar dengan command: ${command}`);

        // Download gambar
        let media = await quoted.download();
        
        // Upload gambar - PAKAI FUNGSI INI LANGSUNG
        let pasPhotoURL = await uploadToAliceCdn(media, mime);
        
        if (!pasPhotoURL || !pasPhotoURL.startsWith('https://')) {
            return reply(`❌ Gagal upload foto! Silahkan coba lagi.`);
        }

        let parts = text ? text.split("|").map(v => v.trim()) : [];

        const [
            provinsi = "",
            kota = "",
            nik = "",
            nama = "",
            ttl = "",
            jenis_kelamin = "",
            golongan_darah = "",
            alamat = "",
            rt_rw = "",
            kel_desa = "",
            kecamatan = "",
            agama = "",
            status = "",
            pekerjaan = "",
            kewarganegaraan = "",
            masa_berlaku = "",
            terbuat = ""
        ] = parts;

        if (!provinsi || !kota || !nik || !nama || !ttl) {
            return reply(
                `⚠️ *Format salah!*\n\nGunakan format:\n` +
                `${prefix + command} Provinsi|Kota|NIK|Nama|TTL|JK|GolDar|Alamat|RT/RW|Kel/Desa|Kecamatan|Agama|Status|Pekerjaan|Kewarganegaraan|Masa Berlaku|Terbuat\n\n` +
                `Contoh:\n${prefix + command} JAWA BARAT|BANDUNG|1234567890123456|JOHN DOE|Bandung, 01-01-1990|Laki-laki|O|Jl. Contoh No. 123|001/002|Sukajadi|Sukajadi|Islam|Belum Kawin|Pegawai Swasta|WNI|Seumur Hidup|01-01-2023`
            );
        }

        // Panggil API
        const params = new URLSearchParams({
            provinsi, kota, nik, nama, ttl,
            jenis_kelamin, golongan_darah, alamat,
            "rt/rw": rt_rw,
            "kel/desa": kel_desa,
            kecamatan, agama, status, pekerjaan,
            kewarganegaraan, masa_berlaku, terbuat,
            pas_photo: pasPhotoURL
        });

        const response = await fetch(`https://api.siputzx.my.id/api/canvas/ektp?${params}`);
        const buffer = Buffer.from(await response.arrayBuffer());

        await satanic.sendMessage(
            m.chat,
            {
                image: buffer,
                caption: `🪪 *eKTP Berhasil Dibuat!*\n\n👤 Nama: *${nama}*\n🆔 NIK: *${nik}*`
            },
            { quoted: fkontak }
        );

    } catch (e) {
        reply(`❌ Error:\n${e.message}`);
    }
}
break;

case 'tosad':
case 'tosatan':
case 'tosdmtinggi':
case 'toreal':
case 'tomoai':
case 'tomaya':
case 'tolego':
case 'tokamboja':
case 'tokacamata':
case 'tojepang':
case 'toghibli':
case 'todubai':
case 'todpr':
case 'totua':
case 'tohitam':
case 'totato':
case 'topeci':
case 'tovintage':
case 'topolaroid':
case 'tochibi':
case 'tobrewok':
case 'tobabi':
case 'tofigura':
case 'tofigurav2':
case 'tofigurav3':
case 'topacar':
case 'topacarv2':
case 'tozombie':
case 'topenjara':
case 'tojapanese':
case 'toblonde':
case 'tobotak':
case 'tohijab':
case 'topejabat':
case 'tomekah':
case 'tomirror':
case 'toanime': {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply(`❌ Kirim/reply gambar dengan command: ${command}`);
    try {
        const imgBuffer = await satanic.downloadMediaMessage(quoted);
        const link = await uploadToAliceCdn(imgBuffer, 'image.jpg');
        const apiUrl = `https://api-faa.my.id/faa/${command}?url=${encodeURIComponent(link)}`;
        const res = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        const ct = res.headers['content-type'] || '';
        if (ct.startsWith('image/')) {
            return satanic.sendMessage(m.chat, { image: Buffer.from(res.data), caption: '🧿 berhasil!' }, { quoted: fkontak });
        }
        const json = JSON.parse(res.data.toString());
        const imageUrl = json.url || json.result || json.image || json.data?.url;
        if (!imageUrl) return reply('❌ API tidak mengembalikan gambar');
        const img = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        satanic.sendMessage(m.chat, { image: Buffer.from(img.data), caption: '🧿 Berhasil!' }, { quoted: fkontak });
    } catch (e) { reply(e?.response?.status === 500 ? "⚠️ API maintenance, tunggu beberapa saat untuk mencoba kembali" : `⚠️ Error: ${e.message}`); }
}
break;
case 'nanobanana2': {
    satanic.sendMessage(m.chat, { react: { text: `🍌`, key: m.key } });
    if (!text) return reply(`*🍌 NANO BANANA*\n\nContoh: ${prefix}nanobanana menjerit\n\nBalas gambar dengan command dan teks prompt.`);
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('❌ Kirim/reply gambar dengan command: .nanobanana + teks prompt');
    try {
        const imgBuffer = await satanic.downloadMediaMessage(quoted);
        const link = await uploadToAliceCdn(imgBuffer, 'image.jpg');
        const apiUrl = `https://api-faa.my.id/faa/nanobanana?url=${encodeURIComponent(link)}&prompt=${text}`;
        const res = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        const ct = res.headers['content-type'] || '';
        if (ct.startsWith('image/')) {
            return satanic.sendMessage(m.chat, { image: Buffer.from(res.data), caption: '🍌 Nano Banana berhasil diproses!' }, { quoted: fkontak });
        }
        const json = JSON.parse(res.data.toString());
        const imageUrl = json.url || json.result || json.image || json.data?.url;
        if (!imageUrl) return reply('❌ API tidak mengembalikan gambar');
        const img = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        satanic.sendMessage(m.chat, { image: Buffer.from(img.data), caption: '🍌 Nano Banana berhasil diproses!' }, { quoted: fkontak });
    } catch (e) { reply(e?.response?.status === 500 ? "⚠️ API maintenance, tunggu beberapa saat untuk mencoba kembali" : `⚠️ Error: ${e.message}`); }
}
break;
case 'jadianime': {
    if (!isPrem) return reply('Anda bukan pengguna premium. Update premium untuk membuka fitur ini.');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .jadianime');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const prompt = `change to anime realistic`;
        const apiUrl = `https://free-restapi.biz.id/api/nanobanana?url=${encodeURIComponent(mem.url)}&prompt=${encodeURIComponent(prompt)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { image: response.data, caption: '✨ Gambar berhasil.' }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. Silakan update premium untuk menggunakan fitur ini.');
    }
}
break;
case 'jadizombie': {
    if (!isPrem) return reply('Anda bukan pengguna premium. Update premium untuk membuka fitur ini.');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .jadizombie');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const prompt = `change to zombie realistic`;
        const apiUrl = `https://free-restapi.biz.id/api/nanobanana?url=${encodeURIComponent(mem.url)}&prompt=${encodeURIComponent(prompt)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { image: response.data, caption: '✨ Gambar berhasil.' }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. Silakan update premium untuk menggunakan fitur ini.');
    }
}
break;
case 'jadibotak': {
    if (!isPrem) return reply('Anda bukan pengguna premium. Update premium untuk membuka fitur ini.');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .jadibotak');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const prompt = `buat karakter ini tidak memiliki rambut atau jadikan karakter ini botak`;
        const apiUrl = `https://free-restapi.biz.id/api/nanobanana?url=${encodeURIComponent(mem.url)}&prompt=${encodeURIComponent(prompt)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { image: response.data, caption: '✨ Gambar berhasil.' }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. Silakan update premium untuk menggunakan fitur ini.');
    }
}
break;
case 'agedetection':
case 'cekumur': {
    if (!isPrem) return reply('you are not premium, update premium untuk menggunakan fitur ini');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .cekumur');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mediaPath = await satanic.downloadAndSaveMediaMessage(quoted);
        let uploadResult = await UploadFileUgu(mediaPath);
        const apiUrl = `https://free-restapi.biz.id/api/age-detection?url=${encodeURIComponent(uploadResult.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        if (response.data.status === 'success' && response.data.result?.age) {
            const umur = response.data.result.age;
            await satanic.sendMessage(m.chat, {
                text: `👤 *Hasil Deteksi Umur*\n\n📸 Berdasarkan foto yang dikirim, usia terdeteksi: *${umur} tahun*`,
                contextInfo: { mentionedJid: [m.sender] }
            }, { quoted: fkontak });
        } else {
            throw new Error('Gagal mendeteksi umur');
        }
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('❌ Gagal mendeteksi umur. Pastikan foto wajah terlihat jelas dan coba lagi nanti.');
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
break;
case 'jadifigure': {
    if (!isPrem) return reply('Anda bukan pengguna premium. Update premium untuk membuka fitur ini.');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .jadifigure');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const prompt = `Using the model, create a 1/7 scale commercialized figurine of the characters in the picture, in a realistic style, in a real environment. The figurine is placed on a computer desk. The figurine has a round transparent acrylic base, with no text on the base. The content on the computer screen is the ZBrush modeling process of this figurine. Next to the computer screen is a BANDAI-style toy packaging box printed with the original artwork. The packaging features two-dimensional flat illustrations`;
        const apiUrl = `https://free-restapi.biz.id/api/nanobanana?url=${encodeURIComponent(mem.url)}&prompt=${encodeURIComponent(prompt)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { image: response.data, caption: '✨ Gambar berhasil.' }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. Silakan update premium untuk menggunakan fitur ini.');
    }
}
break;
case 'veo3':
case 'texttovideo': {
if (!isPrem) return reply('you are not premium, Updated premium open this feature')
    let prompttt = args.join(' ').trim();
    if (!prompttt) return reply('Contoh: .texttovideo a beautiful girls sunset');    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });    
    try {
        let apiUrl = `https://free-restapi.biz.id/api/texttovideo?prompt=${encodeURIComponent(prompttt)}&ratio=16:9&apikey=${global.sakey}`;
        let response = await axios.get(apiUrl);        
        if (response.data.status !== 200) throw new Error('Gagal');        
        let videoUrl = response.data.result.video_url;
        let video = await axios.get(videoUrl, { responseType: 'arraybuffer' });        
        await satanic.sendMessage(m.chat, { 
            video: video.data,
            caption: `✅ Berhasil!\n📝 ${prompttt}`
        }, { quoted: fkontak });        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });        
    } catch (err) {
        reply('❌ Gagal!');
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'gpt2image': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    if (!text) return reply('input prompt');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .gpt2image + prompt');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/gpt2image?url=${encodeURIComponent(mem.url)}&prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil!'
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
    }
}
break;
case 'nanobananapro': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    if (!text) return reply('input prompt');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .nanobananapro + prompt');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/nanobanana-editor?image=${encodeURIComponent(mem.url)}&prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil!'
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
    }
}
break;
case 'editimg': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    if (!text) return reply('input prompt');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .nanobananapro + prompt');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/editimg?url=${encodeURIComponent(mem.url)}&prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil!'
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
    }
}
break;
case 'nanobanana': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    if (!text) return reply('input prompt');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .nanobananapro + prompt');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/nanobanana?url=${encodeURIComponent(mem.url)}&prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil!'
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
    }
}
break;
case 'img2img': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    if (!text) return reply('input prompt');
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .img2img + prompt');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        const apiUrl = `https://free-restapi.biz.id/api/img2img?image_url=${encodeURIComponent(mem.url)}&prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            image: response.data,
            caption: '✨ Gambar berhasil!'
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
    }
}
break;
case 'agedetection':
case 'cekumur': {
    if (!isPrem) return reply('❌ Fitur ini hanya untuk user premium. Upgrade premium dulu ya!');
    
    // Cek apakah ada gambar yang di-reply atau dikirim langsung
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    
    if (!/image/.test(mime)) return reply('📸 Kirim atau reply gambar wajah dengan caption *.agedetection* atau *.cekumur*');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        // Download gambar yang dikirim
        let mediaPath = await satanic.downloadAndSaveMediaMessage(quoted);
        let uploadUrl = await UploadFileUgu(mediaPath); // fungsi upload yang sudah ada di kode kamu
        
        // Panggil API age detection
        const apiUrl = `https://free-restapi.biz.id/api/age-detection?url=${encodeURIComponent(uploadUrl.url)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status === 'success' && response.data.result?.age) {
            await satanic.sendMessage(m.chat, {
                text: `🎂 *Perkiraan Usia:* ${response.data.result.age} tahun\n\n✨ Hasil deteksi dari gambar yang dikirim.`,
                contextInfo: { mentionedJid: [m.sender] }
            }, { quoted: fkontak });
        } else {
            throw new Error('Gagal mendeteksi usia');
        }
        
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error('Error age detection:', err);
        reply('❌ Gagal mendeteksi usia. Pastikan gambar wajah jelas dan coba lagi nanti.');
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'talkphoto':
case 'talkingphoto': {
    if (!isPrem) return reply('you are not premium, Updated premium open this feature');
    let argsFull = args.join(' ');
    let voice = 'woman1';
    let voiceMatch = argsFull.match(/\|\s*(woman1|woman2|man1|man2)\s*$/i);
    if (voiceMatch) {
        voice = voiceMatch[1].toLowerCase();
        argsFull = argsFull.replace(/\|\s*(woman1|woman2|man1|man2)\s*$/i, '').trim();
    }
    let prompt = argsFull.replace(/^\.talkingphoto\s*/i, '').trim();
    if (!prompt) return reply(`*📢 TALKING PHOTO*\n\nContoh:\n.talkingphoto aku adalah aqua ai asisten Lumakara yang akan membantu anda | woman1\n.talkingphoto aku adalah aquai\n\n*List Voice:*\n👩 woman1 (default)\n👩 woman2\n👨 man1\n👨 man2\n\n*Note:* Gunakan format *| voice* di akhir kalimat`);
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .talkingphoto + teks');
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        let mee = await satanic.downloadAndSaveMediaMessage(quoted);
        let mem = await UploadFileUgu(mee);
        let apiUrl = `https://free-restapi.biz.id/api/talkingphoto?url=${encodeURIComponent(mem.url)}&text=${encodeURIComponent(prompt)}&voice=${voice}&apikey=${global.sakey}`;
        let response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        await satanic.sendMessage(m.chat, { 
            video: response.data, 
            caption: `✅ Berhasil!\n📝 Teks: ${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}\n🎤 Voice: ${voice}` 
        }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        reply('❌ Gagal membuat talking photo! Coba lagi nanti.');
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'rolling': {
    if (!text) return reply(`🎁 *ROLLING GIVEAWAY*\n\n.rolling Andi, Budi, Caca | Hadiah: Saldo 100k`);
    
    let peserta = [];
    let hadiah = 'Giveaway';
    
    if (text.includes('|')) {
        let [p, h] = text.split('|');
        hadiah = h.replace('Hadiah:', '').trim();
        peserta = p.includes(',') ? p.split(',').map(v=>v.trim()) : p.split(' ').map(v=>v.trim());
    } else {
        peserta = text.includes(',') ? text.split(',').map(v=>v.trim()) : text.split(' ').map(v=>v.trim());
    }
    
    peserta = peserta.filter(p => p);
    if (peserta.length < 2) return reply('Minimal 2 peserta');
    
    await satanic.sendMessage(m.chat, { react: { text: '🎲', key: m.key } });
    
    const winner = peserta[Math.floor(Math.random() * peserta.length)];
    const totalRolls = 30;
    
    let msg = await satanic.sendMessage(m.chat, { text: `🎲 *ROLLING GIVEAWAY* 🎲\n\n━━━━━━━━━━━━━━━━━━━━\n\n👉 *${peserta[0]}* 👈\n\n━━━━━━━━━━━━━━━━━━━━\n\n⚡ Memulai...` }, { quoted: fkontak });
    
    for (let i = 0; i <= totalRolls; i++) {
        let randomName = peserta[Math.floor(Math.random() * peserta.length)];
        
        let delay, speedText, speedIcon;
        
        if (i < 8) {
            delay = 70;
            speedText = 'SUPER CEPAT';
            speedIcon = '⚡⚡⚡';
        } else if (i < 15) {
            delay = 130;
            speedText = 'CEPAT';
            speedIcon = '⚡⚡';
        } else if (i < 21) {
            delay = 220;
            speedText = 'SEDANG';
            speedIcon = '⚡🐢';
        } else if (i < 26) {
            delay = 380;
            speedText = 'LAMBAT';
            speedIcon = '🐢🐢';
        } else {
            delay = 600;
            speedText = 'HAMPIR BERHENTI';
            speedIcon = '🎯🎯';
        }
        
        let persen = Math.floor((i / totalRolls) * 100);
        let barLength = Math.floor(persen / 5);
        let progressBar = '█'.repeat(barLength) + '░'.repeat(20 - barLength);
        
        let rollingText = `🎲 *ROLLING GIVEAWAY* 🎲\n\n━━━━━━━━━━━━━━━━━━━━\n\n👉 *${randomName}* 👈\n\n━━━━━━━━━━━━━━━━━━━━\n\n📊 ${progressBar} ${persen}%\n${speedIcon} ${speedText}`;
        
        await satanic.sendMessage(m.chat, { text: rollingText, edit: msg.key });
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    let resultText = `🏆 *PEMENANG GIVEAWAY* 🏆\n\n━━━━━━━━━━━━━━━━━━━━\n\n🎁 ${hadiah}\n\n👑 *${winner}* 👑\n\n━━━━━━━━━━━━━━━━━━━━\n\n🎉 SELAMAT! 🎉`;
    
    await satanic.sendMessage(m.chat, { text: resultText, edit: msg.key });
    await satanic.sendMessage(m.chat, { react: { text: '🏆', key: m.key } });
    
    let tagWinner = winner.replace(/[^0-9]/g, '');
    if (tagWinner.length > 5 && tagWinner.length < 15) {
        await satanic.sendMessage(m.chat, {
            text: `🎉 Selamat @${tagWinner}! 🎉\n\nKamu memenangkan ${hadiah}`,
            mentions: [tagWinner + '@s.whatsapp.net']
        }, { quoted: fkontak });
    }
}
break;
case 'investasi':
case 'trading': {
    if (!global.tradingSaldo) global.tradingSaldo = {};
    if (!global.tradingSaldo[m.sender]) global.tradingSaldo[m.sender] = 1000000;
    
    // Inisialisasi statistik user
    if (!global.tradingStat) global.tradingStat = {};
    if (!global.tradingStat[m.sender]) {
        global.tradingStat[m.sender] = { win: 0, loss: 0, total: 0, profitTotal: 0 };
    }
    
    // Inisialisasi posisi aktif user
    if (!global.tradingPosition) global.tradingPosition = {};
    
    if (!text) return reply(`╔══════════════════════════════════════════════════════════════╗
║                      📊 *TRADING PRO* 📊                       ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  💰 *MODAL AWAL: Rp 1.000.000*                              ║
║                                                              ║
║  📌 *PERINTAH LENGKAP:*                                     ║
║  ────────────────────────────────────────────────────────── ║
║  .trading analisa     → Analisa pasar + Fibonacci           ║
║  .trading buy 100rb   → BUY dengan TP/SL otomatis           ║
║  .trading sell 50rb   → SELL dengan TP/SL otomatis          ║
║  .trading position    → Cek posisi aktif                    ║
║  .trading close       → Tutup posisi (ambil profit/loss)    ║
║  .trading saldo       → Cek saldo & profit                  ║
║  .trading stat        → Lihat winrate & performa            ║
║  .trading claim       → Claim modal Rp 1.000.000            ║
║  .trading reset       → Reset statistik                     ║
║                                                              ║
║  📈 *INSTRUMEN:* BTC, ETH, SOL, BNB, XRP                    ║
║  📊 *INDIKATOR:* RSI, MACD, MA, FIBONACCI, SUPPORT/RESISTANCE║
║  🛑 *RISK MANAGEMENT:* TP (Take Profit) & SL (Stop Loss)     ║
║                                                              ║
║  🎯 *CARA MAIN:*                                            ║
║  1️⃣ .trading analisa → Lihat kondisi pasar + level Fibonacci║
║  2️⃣ Tentukan entry berdasarkan analisa                     ║
║  3️⃣ .trading buy/sell [jumlah] → Eksekusi dengan TP/SL     ║
║  4️⃣ Pantau posisi dengan .trading position                 ║
║  5️⃣ .trading close → Tutup posisi ambil profit/loss        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`);
    
    const args = text.split(' ');
    const cmd = args[0].toLowerCase();
    
    const formatRp = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
    };
    
    // ========== RESET STATISTIK ==========
    if (cmd === 'reset') {
        global.tradingStat[m.sender] = { win: 0, loss: 0, total: 0, profitTotal: 0 };
        return reply(`✅ *STATISTIK TELAH DIRESET!*\n\n📊 Mulai trading baru dengan catatan bersih!`);
    }
    
    // ========== CEK SALDO ==========
    if (cmd === 'saldo') {
        let statWin = global.tradingStat[m.sender].win;
        let statLoss = global.tradingStat[m.sender].loss;
        let winrate = statWin + statLoss > 0 ? Math.floor((statWin / (statWin + statLoss)) * 100) : 0;
        let profitTotal = global.tradingStat[m.sender].profitTotal;
        let profitStatus = profitTotal >= 0 ? '🟢' : '🔴';
        
        let profitChart = '';
        let profitPercent = Math.min(Math.abs(Math.floor(profitTotal / 100000)), 20);
        if (profitTotal >= 0) {
            profitChart = '🟢' + '█'.repeat(profitPercent) + '░'.repeat(20 - profitPercent);
        } else {
            profitChart = '🔴' + '█'.repeat(profitPercent) + '░'.repeat(20 - profitPercent);
        }
        
        // Cek posisi aktif
        let posisiAktif = global.tradingPosition[m.sender] ? true : false;
        let posisiText = posisiAktif ? `🟡 Ada posisi aktif! Ketik .trading position` : `🟢 Tidak ada posisi aktif`;
        
        return reply(`╔══════════════════════════════════════════════════════════════╗
║                         💰 *SALDO TRADING* 💰                       ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  💵 *SALDO ANDA:*                                            ║
║  ${formatRp(global.tradingSaldo[m.sender])}                               ║
║                                                              ║
║  📊 *PERFORMA TRADING:*                                      ║
║  ────────────────────────────────────────────────────────── ║
║  🏆 WIN: ${statWin} kali                                          ║
║  💀 LOSS: ${statLoss} kali                                         ║
║  📈 WINRATE: ${winrate}%                                            ║
║  ${profitStatus} PROFIT TOTAL: ${formatRp(profitTotal)}                         ║
║  ${profitChart}                                              ║
║                                                              ║
║  📍 *STATUS POSISI:* ${posisiText}                           ║
║                                                              ║
║  💡 *TIPS:*                                                  ║
║  Selalu analisa pasar dan gunakan TP/SL!                    ║
║  Ketik .trading analisa                                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`);
    }
    
    // ========== CEK POSISI AKTIF ==========
    if (cmd === 'position') {
        let posisi = global.tradingPosition[m.sender];
        if (!posisi) {
            return reply(`📭 *TIDAK ADA POSISI AKTIF*\n\n💡 Mulai trading dengan .trading buy/sell [jumlah]`);
        }
        
        let hargaSekarang = posisi.hargaSekarang || posisi.entryPrice;
        let perubahan = ((hargaSekarang - posisi.entryPrice) / posisi.entryPrice) * 100;
        let profitLoss = (hargaSekarang - posisi.entryPrice) * posisi.jumlah / posisi.entryPrice;
        
        let statusIcon = profitLoss >= 0 ? '🟢' : '🔴';
        let statusText = profitLoss >= 0 ? 'PROFIT' : 'LOSS';
        
        // Hitung jarak ke TP/SL
        let jarakTP = posisi.tp - hargaSekarang;
        let jarakSL = hargaSekarang - posisi.sl;
        let tpPersen = ((posisi.tp - hargaSekarang) / hargaSekarang) * 100;
        let slPersen = ((hargaSekarang - posisi.sl) / hargaSekarang) * 100;
        
        return reply(`╔══════════════════════════════════════════════════════════════╗
║                      📍 *POSISI AKTIF* 📍                       ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  🪙 ASET: ${posisi.asset.emoji} ${posisi.asset.nama}                                 ║
║  🎯 POSISI: ${posisi.type.toUpperCase()}                                      ║
║  💰 JUMLAH: ${formatRp(posisi.jumlah)}                                   ║
║                                                              ║
║  📊 *HARGA:*                                                ║
║  ▸ Entry: ${formatRp(posisi.entryPrice)}                              ║
║  ▸ Current: ${formatRp(hargaSekarang)}                              ║
║                                                              ║
║  🎯 *TAKE PROFIT:* ${formatRp(posisi.tp)} (${tpPersen > 0 ? '+' : ''}${tpPersen.toFixed(2)}%)            ║
║  🛑 *STOP LOSS:* ${formatRp(posisi.sl)} (${slPersen > 0 ? '+' : ''}${slPersen.toFixed(2)}%)             ║
║                                                              ║
║  💰 *${statusIcon} ${statusText}:* ${formatRp(Math.abs(profitLoss))} (${perubahan > 0 ? '+' : ''}${perubahan.toFixed(2)}%)          ║
║                                                              ║
║  📌 *CARA TUTUP POSISI:*                                     ║
║  Ketik .trading close                                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`);
    }
    
    // ========== TUTUP POSISI ==========
    if (cmd === 'close') {
        let posisi = global.tradingPosition[m.sender];
        if (!posisi) {
            return reply(`❌ *TIDAK ADA POSISI AKTIF!*\n\n💡 Mulai trading dengan .trading buy/sell [jumlah]`);
        }
        
        let hargaSekarang = posisi.hargaSekarang || posisi.entryPrice;
        let profitLoss = (hargaSekarang - posisi.entryPrice) * posisi.jumlah / posisi.entryPrice;
        let perubahan = ((hargaSekarang - posisi.entryPrice) / posisi.entryPrice) * 100;
        let menang = profitLoss > 0;
        
        // Update saldo
        global.tradingSaldo[m.sender] += profitLoss;
        global.tradingStat[m.sender].profitTotal += profitLoss;
        
        if (menang) {
            global.tradingStat[m.sender].win++;
        } else {
            global.tradingStat[m.sender].loss++;
        }
        global.tradingStat[m.sender].total++;
        
        let winrateBaru = Math.floor((global.tradingStat[m.sender].win / global.tradingStat[m.sender].total) * 100);
        
        // Hapus posisi
        delete global.tradingPosition[m.sender];
        
        let resultIcon = menang ? '✅✅✅' : '❌❌❌';
        let resultText = menang ? 'TAKE PROFIT!' : 'STOP LOSS!';
        
        return reply(`╔══════════════════════════════════════════════════════════════╗
║                    ${resultIcon} *${resultText}* ${resultIcon}                     ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  🪙 ${posisi.asset.emoji} ${posisi.asset.nama}                                        ║
║  🎯 POSISI: ${posisi.type.toUpperCase()}                                      ║
║                                                              ║
║  📊 *HASIL CLOSE:*                                          ║
║  ▸ Entry: ${formatRp(posisi.entryPrice)}                              ║
║  ▸ Close: ${formatRp(hargaSekarang)}                               ║
║  ▸ Perubahan: ${perubahan > 0 ? '+' : ''}${perubahan.toFixed(2)}%                            ║
║                                                              ║
║  💰 ${menang ? 'PROFIT' : 'LOSS'}: ${formatRp(Math.abs(profitLoss))}                                ║
║                                                              ║
║  ────────────────────────────────────────────────────────── ║
║  💵 SALDO AKHIR: ${formatRp(global.tradingSaldo[m.sender])}                       ║
║  📈 WINRATE: ${winrateBaru}%                                            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`);
    }
    
    // ========== CLAIM SALDO ==========
    if (cmd === 'claim') {
        global.tradingSaldo[m.sender] = 1000000;
        return reply(`✅ *CLAIM BERHASIL!*\n\n💰 Modal awal: ${formatRp(1000000)}\n\n📌 Jangan lupa analisa pasar sebelum trading!`);
    }
    
    // ========== ANALISA PASAR LENGKAP DENGAN FIBONACCI ==========
    if (cmd === 'analisa') {
        const assetList = [
            { nama: 'BTC', emoji: '₿', harga: 685000000, perubahan24h: 0 },
            { nama: 'ETH', emoji: '⟠', harga: 48500000, perubahan24h: 0 },
            { nama: 'SOL', emoji: '◎', harga: 1850000, perubahan24h: 0 },
            { nama: 'BNB', emoji: '🔶', harga: 5850000, perubahan24h: 0 },
            { nama: 'XRP', emoji: '💱', harga: 8500, perubahan24h: 0 }
        ];
        
        const asset = assetList[Math.floor(Math.random() * assetList.length)];
        const perubahan24h = (Math.random() * 12) - 6;
        asset.perubahan24h = parseFloat(perubahan24h.toFixed(2));
        
        global.analisaSession = global.analisaSession || {};
        global.analisaSession[m.sender] = { asset: asset, timestamp: Date.now() };
        
        await satanic.sendMessage(m.chat, { react: { text: '📊', key: m.key } });
        
        let msg = await satanic.sendMessage(m.chat, { 
            text: `╔══════════════════════════════════════════════════════════════╗
║                    📈 *ANALISA PASAR PRO* 📉                    ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  🪙 ASET: ${asset.emoji} ${asset.nama} / USDT                                ║
║  💰 HARGA: ${formatRp(asset.harga)}                                   ║
║  📊 24H CHANGE: ${asset.perubahan24h > 0 ? '+' : ''}${asset.perubahan24h}%                              ║
║                                                              ║
║  🔍 MENGUMPULKAN DATA PASAR...                               ║
║  ⏰ 5 detik                                                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`
        }, { quoted: fkontak });
        
        // Loading animasi
        for (let i = 1; i <= 4; i++) {
            await satanic.sendMessage(m.chat, { 
                text: `╔══════════════════════════════════════════════════════════════╗
║                    📈 *ANALISA PASAR PRO* 📉                    ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  🪙 ${asset.emoji} ${asset.nama}                                            ║
║  📡 ${i*25}% Memuat data...                                       ║
║  ${'█'.repeat(i)}${'░'.repeat(4-i)}                                                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`, 
                edit: msg.key 
            });
            await new Promise(r => setTimeout(r, 1000));
        }
        
        // ========== INDIKATOR TEKNIKAL ==========
        
        // 1. TREND
        let trendArah = '';
        let trendIcon = '';
        if (asset.perubahan24h > 3) {
            trendArah = 'BULLISH KUAT';
            trendIcon = '📈🟢🟢🟢';
        } else if (asset.perubahan24h > 0) {
            trendArah = 'BULLISH LEMAH';
            trendIcon = '📈🟢🟢';
        } else if (asset.perubahan24h > -3) {
            trendArah = 'SIDEWAYS';
            trendIcon = '📊🟡';
        } else {
            trendArah = 'BEARISH';
            trendIcon = '📉🔴🔴';
        }
        
        // 2. RSI
        let rsi = Math.floor(Math.random() * 100);
        let rsiStatus = rsi > 70 ? 'OVERBOUGHT 🔴' : (rsi < 30 ? 'OVERSOLD 🟢' : 'NEUTRAL ⚪');
        
        // 3. MACD
        let histogram = (Math.random() * 2 - 1).toFixed(2);
        let macdSignal = histogram > 0 ? 'BULLISH 🟢' : 'BEARISH 🔴';
        
        // 4. MOVING AVERAGE
        let maPosition = Math.random() > 0.5 ? 'GOLDEN CROSS 🟢' : 'DEATH CROSS 🔴';
        
        // 5. VOLUME
        let volume = Math.random() > 0.6 ? 'TINGGI 🔥' : (Math.random() > 0.3 ? 'SEDANG 📊' : 'RENDAH 💤');
        
        // ========== FIBONACCI RETRACEMENT LEVELS ==========
        let high = asset.harga * (1 + (Math.random() * 0.1));
        let low = asset.harga * (1 - (Math.random() * 0.1));
        let range = high - low;
        
        let fibLevels = {
            '0.236': low + range * 0.236,
            '0.382': low + range * 0.382,
            '0.5': low + range * 0.5,
            '0.618': low + range * 0.618,
            '0.786': low + range * 0.786
        };
        
        // ========== SUPPORT & RESISTANCE ==========
        let support = Math.floor(asset.harga * 0.95);
        let resistance = Math.floor(asset.harga * 1.05);
        let support2 = Math.floor(asset.harga * 0.92);
        let resistance2 = Math.floor(asset.harga * 1.08);
        
        // ========== REKOMENDASI ==========
        let rekomendasi = '';
        let rekomendasiIcon = '';
        let confidence = 0;
        
        if (rsi < 35 && asset.perubahan24h > 0) {
            rekomendasi = 'BUY';
            rekomendasiIcon = '🟢';
            confidence = 80;
        } else if (rsi > 65 && asset.perubahan24h < 0) {
            rekomendasi = 'SELL';
            rekomendasiIcon = '🔴';
            confidence = 80;
        } else if (asset.perubahan24h > 2) {
            rekomendasi = 'BUY';
            rekomendasiIcon = '🟢';
            confidence = 65;
        } else if (asset.perubahan24h < -2) {
            rekomendasi = 'SELL';
            rekomendasiIcon = '🔴';
            confidence = 65;
        } else {
            rekomendasi = 'WAIT';
            rekomendasiIcon = '⚪';
            confidence = 50;
        }
        
        // ========== LEVEL ENTRY BERDASARKAN FIBONACCI ==========
        let entryBuy = Math.floor(fibLevels['0.382']);
        let entrySell = Math.floor(resistance);
        let tpBuy = Math.floor(resistance);
        let tpSell = Math.floor(support);
        let slBuy = Math.floor(support);
        let slSell = Math.floor(resistance2);
        
        let analisaText = `╔══════════════════════════════════════════════════════════════╗
║                 📈 *HASIL ANALISA PASAR* 📉                 ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  🪙 ${asset.emoji} ${asset.nama} / USDT                                    ║
║  💰 HARGA: ${formatRp(asset.harga)}                                   ║
║  📊 24H: ${asset.perubahan24h > 0 ? '+' : ''}${asset.perubahan24h}% | TREND: ${trendArah} ${trendIcon}        ║
║                                                              ║
║  ────────────────────────────────────────────────────────── ║
║  📊 *INDIKATOR TEKNIKAL:*                                   ║
║  ▸ RSI: ${rsi} (${rsiStatus})                                        ║
║  ▸ MACD: ${macdSignal} (Histogram: ${histogram})                            ║
║  ▸ MA: ${maPosition}                                            ║
║  ▸ VOLUME: ${volume}                                             ║
║                                                              ║
║  ────────────────────────────────────────────────────────── ║
║  📐 *FIBONACCI RETRACEMENT LEVELS:*                         ║
║  ▸ HIGH: ${formatRp(high)}                                          ║
║  ▸ LOW: ${formatRp(low)}                                           ║
║                                                              ║
║  📍 *FIB LEVELS:*                                            ║
║  ▸ 0.236 → ${formatRp(fibLevels['0.236'])}                           ║
║  ▸ 0.382 → ${formatRp(fibLevels['0.382'])} ⭐ SUPPORT ZONE          ║
║  ▸ 0.500 → ${formatRp(fibLevels['0.5'])}                             ║
║  ▸ 0.618 → ${formatRp(fibLevels['0.618'])} ⭐ RESISTANCE ZONE       ║
║  ▸ 0.786 → ${formatRp(fibLevels['0.786'])}                           ║
║                                                              ║
║  ────────────────────────────────────────────────────────── ║
║  🛡️ *SUPPORT & RESISTANCE:*                                 ║
║  ▸ S1: ${formatRp(support)} | S2: ${formatRp(support2)}                   ║
║  ▸ R1: ${formatRp(resistance)} | R2: ${formatRp(resistance2)}                ║
║                                                              ║
║  ────────────────────────────────────────────────────────── ║
║  💡 *REKOMENDASI:* ${rekomendasiIcon} ${rekomendasi} (Confidence: ${confidence}%)                 ║
║                                                              ║
║  🎯 *LEVEL ENTRY (BUY):* ${formatRp(entryBuy)}                            ║
║  🎯 *LEVEL ENTRY (SELL):* ${formatRp(entrySell)}                           ║
║                                                              ║
║  ⚠️ *RISK MANAGEMENT:*                                      ║
║  Gunakan TP (Take Profit) dan SL (Stop Loss)!              ║
║  Rasio Risk:Reward minimal 1:2                             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`;
        
        await satanic.sendMessage(m.chat, { text: analisaText, edit: msg.key });
        return;
    }
    
    // ========== CEK STATISTIK LENGKAP ==========
    if (cmd === 'stat') {
        let statWin = global.tradingStat[m.sender].win;
        let statLoss = global.tradingStat[m.sender].loss;
        let total = statWin + statLoss;
        let winrate = total > 0 ? Math.floor((statWin / total) * 100) : 0;
        let profitTotal = global.tradingStat[m.sender].profitTotal;
        
        let barWin = '█'.repeat(Math.min(Math.floor(statWin / 2), 15)) + '░'.repeat(Math.max(0, 15 - Math.floor(statWin / 2)));
        let barLoss = '█'.repeat(Math.min(Math.floor(statLoss / 2), 15)) + '░'.repeat(Math.max(0, 15 - Math.floor(statLoss / 2)));
        
        let rating = '';
        if (winrate >= 70) rating = '⭐ LEGENDARY TRADER ⭐';
        else if (winrate >= 55) rating = '🔥 PROFESSIONAL TRADER 🔥';
        else if (winrate >= 45) rating = '📊 AVERAGE TRADER 📊';
        else rating = '📚 NEED MORE PRACTICE 📚';
        
        return reply(`╔══════════════════════════════════════════════════════════════╗
║                   📈 *STATISTIK TRADING* 📉                   ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  🏆 *KEMENANGAN:* ${statWin} kali                                    ║
║  [${barWin}]                                            ║
║                                                              ║
║  💀 *KEKALAHAN:* ${statLoss} kali                                   ║
║  [${barLoss}]                                            ║
║                                                              ║
║  📊 *TOTAL TRADING:* ${total} kali                                  ║
║  📈 *WINRATE:* ${winrate}%                                           ║
║  💰 *PROFIT TOTAL:* ${formatRp(profitTotal)}                               ║
║                                                              ║
║  🎖️ *RATING:* ${rating}                                     ║
║                                                              ║
║  💡 *SARAN:*                                                 ║
║  ${winrate < 50 ? 'Perbanyak analisa dan gunakan Fibonacci levels!' : 'Pertahankan konsistensi trading Anda!'}         ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`);
    }
    
    // ========== BUY/SELL DENGAN TP/SL ==========
    if (!['buy', 'sell'].includes(cmd)) {
        return reply(`❌ *PERINTAH TIDAK DIKENAL!*\n\n📌 *Perintah yang tersedia:*\n.trading analisa\n.trading buy/sell [jumlah]\n.trading position\n.trading close\n.trading saldo\n.trading stat\n.trading claim`);
    }
    
    // Cek apakah sudah analisa dulu
    if (!global.analisaSession || !global.analisaSession[m.sender]) {
        return reply(`⚠️ *ANALISA DULU SEBELUM TRADING!*\n\n📌 Ketik .trading analisa untuk melihat kondisi pasar terlebih dahulu.\n\n💡 Ini penting untuk menentukan entry point yang tepat!`);
    }
    
    // Cek apakah sudah ada posisi aktif
    if (global.tradingPosition[m.sender]) {
        return reply(`⚠️ *MASIH ADA POSISI AKTIF!*\n\n📌 Tutup posisi dulu dengan .trading close sebelum membuka posisi baru.\n\n📍 Cek posisi: .trading position`);
    }
    
    // Parse jumlah
    let jumlahInput = args[1];
    let jumlah = 0;
    
    if (!jumlahInput) {
        return reply(`❌ *MASUKKAN JUMLAH!*\n\n📌 Contoh:\n.trading buy 100000\n.trading buy 100rb\n.trading sell 50000`);
    }
    
    if (jumlahInput.toLowerCase().includes('rb')) {
        jumlah = parseInt(jumlahInput) * 1000;
    } else if (jumlahInput.toLowerCase().includes('k')) {
        jumlah = parseInt(jumlahInput) * 1000;
    } else if (jumlahInput.toLowerCase().includes('jt')) {
        jumlah = parseInt(jumlahInput) * 1000000;
    } else {
        jumlah = parseInt(jumlahInput);
    }
    
    if (isNaN(jumlah) || jumlah <= 0) {
        return reply(`❌ *JUMLAH TIDAK VALID!*\n\n📌 Contoh: .trading buy 100000 atau .trading buy 100rb`);
    }
    
    if (jumlah < 10000) {
        return reply(`❌ *MINIMAL TRADING Rp 10.000!*`);
    }
    
    if (jumlah > global.tradingSaldo[m.sender]) {
        return reply(`❌ *SALDO TIDAK CUKUP!*\n\n💵 Saldo: ${formatRp(global.tradingSaldo[m.sender])}\n📌 Yang ingin ditradingkan: ${formatRp(jumlah)}`);
    }
    
    const assetData = global.analisaSession[m.sender].asset;
    const currentPrice = assetData.harga;
    
    // Hitung TP dan SL berdasarkan Fibonacci
    let tp = 0;
    let sl = 0;
    
    if (cmd === 'buy') {
        // BUY: TP di Resistance 1, SL di Fibonacci 0.382
        tp = Math.floor(currentPrice * 1.03); // +3%
        sl = Math.floor(currentPrice * 0.97); // -3%
    } else {
        // SELL: TP di Support 1, SL di Resistance 2
        tp = Math.floor(currentPrice * 0.97); // -3%
        sl = Math.floor(currentPrice * 1.03); // +3%
    }
    
    // Kurangi saldo
    global.tradingSaldo[m.sender] -= jumlah;
    
    // Simpan posisi
    global.tradingPosition[m.sender] = {
        asset: assetData,
        type: cmd,
        jumlah: jumlah,
        entryPrice: currentPrice,
        tp: tp,
        sl: sl,
        openTime: Date.now()
    };
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    
    let posisiText = cmd === 'buy' ? 'BUY (LONG)' : 'SELL (SHORT)';
    let posisiIcon = cmd === 'buy' ? '🟢' : '🔴';
    
    return reply(`╔══════════════════════════════════════════════════════════════╗
║                   ✅ *POSISI TERBUKA* ✅                    ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ${posisiIcon} POSISI: ${posisiText}                                      ║
║  🪙 ASET: ${assetData.emoji} ${assetData.nama}                                 ║
║  💰 NOMINAL: ${formatRp(jumlah)}                                   ║
║                                                              ║
║  📊 *HARGA ENTRY:* ${formatRp(currentPrice)}                            ║
║                                                              ║
║  🎯 *TAKE PROFIT (TP):* ${formatRp(tp)}                               ║
║  🛑 *STOP LOSS (SL):* ${formatRp(sl)}                                ║
║                                                              ║
║  📌 *RISK/REWARD RATIO:* 1:1                                ║
║                                                              ║
║  💡 *CARA TUTUP POSISI:*                                    ║
║  ▸ Ketik .trading position untuk cek posisi                 ║
║  ▸ Ketik .trading close untuk tutup posisi                  ║
║                                                              ║
║  ⚠️ *PERINGATAN:*                                           ║
║  Harga bisa mencapai TP atau SL secara otomatis!            ║
║  Pantau terus posisi Anda!                                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`);
}
break;
case 'tebakkarturemi': {
    await satanic.sendMessage(m.chat, { react: { text: '🃏', key: m.key } });
    
    let msg = await satanic.sendMessage(m.chat, { text: `🃏 *TEBAK KARTU* 🃏\n\n🎴 MENGOCOK KARTU...\n⏰ 3` }, { quoted: fkontak });
    
    for (let i = 3; i > 0; i--) {
        await satanic.sendMessage(m.chat, { text: `🃏 *TEBAK KARTU* 🃏\n\n🎴 MENGOCOK KARTU...\n⏰ ${i}`, edit: msg.key });
        await new Promise(r => setTimeout(r, 800));
    }
    
    const kartu = [
        '♠️ AS', '♠️ 2', '♠️ 3', '♠️ 4', '♠️ 5', '♠️ 6', '♠️ 7', '♠️ 8', '♠️ 9', '♠️ 10', '♠️ J', '♠️ Q', '♠️ K',
        '♥️ AS', '♥️ 2', '♥️ 3', '♥️ 4', '♥️ 5', '♥️ 6', '♥️ 7', '♥️ 8', '♥️ 9', '♥️ 10', '♥️ J', '♥️ Q', '♥️ K',
        '♦️ AS', '♦️ 2', '♦️ 3', '♦️ 4', '♦️ 5', '♦️ 6', '♦️ 7', '♦️ 8', '♦️ 9', '♦️ 10', '♦️ J', '♦️ Q', '♦️ K',
        '♣️ AS', '♣️ 2', '♣️ 3', '♣️ 4', '♣️ 5', '♣️ 6', '♣️ 7', '♣️ 8', '♣️ 9', '♣️ 10', '♣️ J', '♣️ Q', '♣️ K'
    ];
    
    const kartuTerpilih = kartu[Math.floor(Math.random() * kartu.length)];
    const tebakanUser = text.toLowerCase();
    
    if (!tebakanUser) {
        await satanic.sendMessage(m.chat, { 
            text: `🃏 *KARTU TELAH DIPILIH!* 🃏\n\nTebak kartunya! Contoh: .kartu ♠️ AS\n💰 Hadiah 500 koin!`,
            edit: msg.key 
        });
        
        global.kartuGame = { aktif: true, kartu: kartuTerpilih, timeout: setTimeout(() => {
            if (global.kartuGame?.aktif) {
                satanic.sendMessage(m.chat, { text: `⏰ Waktu habis! Kartunya adalah ${kartuTerpilih}` });
                global.kartuGame.aktif = false;
            }
        }, 30000) };
        return;
    }
    
    if (!global.kartuGame?.aktif) return reply('Tidak ada game tebak kartu! Ketik .kartu');
    
    if (tebakanUser === kartuTerpilih) {
        clearTimeout(global.kartuGame.timeout);
        global.kartuGame.aktif = false;
        await satanic.sendMessage(m.chat, { 
            text: `🎉 *BENAR!* 🎉\n\nKartunya adalah ${kartuTerpilih}\n💰 +500 KOIN!`,
            edit: msg.key 
        });
    } else {
        await satanic.sendMessage(m.chat, { text: `❌ *SALAH!* ❌\n\nKartunya BUKAN ${tebakanUser}\nCoba lagi!` });
    }
}
break;
case 'tariktambang': {

    if (!text) return reply(`🪢 *TARIK TAMBANG* 🪢\n\n📌 Cara main:\n.tarik tim1, tim2\n\n🏆 Tim siapa yang paling kuat?`);
    
    let tim = text.split(',');
    if (tim.length < 2) return reply('Masukkan 2 tim! Contoh: .tarik Andi,Budi , Caca,Dedi');
    
    let tim1 = tim[0].trim().split(' ').filter(v=>v);
    let tim2 = tim[1].trim().split(' ').filter(v=>v);
    
    if (tim1.length < 1 || tim2.length < 1) return reply('Setiap tim minimal 1 orang!');
    
    await satanic.sendMessage(m.chat, { react: { text: '🪢', key: m.key } });
    
    let msg = await satanic.sendMessage(m.chat, { text: `🪢 *TARIK TAMBANG* 🪢\n\n🎬 SIAP...\n⏰ 3` }, { quoted: fkontak });
    
    for (let i = 3; i > 0; i--) {
        await satanic.sendMessage(m.chat, { text: `🪢 *TARIK TAMBANG* 🪢\n\n🎬 SIAP...\n⏰ ${i}`, edit: msg.key });
        await new Promise(r => setTimeout(r, 800));
    }
    
    let posisi = 0; // 0 = tengah, - = tim1 menang, + = tim2 menang
    let finishLine = 15;
    let step = 0;
    
    while (Math.abs(posisi) < finishLine) {
        step++;
        
        let kekuatan1 = 0;
        let kekuatan2 = 0;
        
        for (let i = 0; i < tim1.length; i++) {
            kekuatan1 += Math.floor(Math.random() * 10) + 1;
        }
        for (let i = 0; i < tim2.length; i++) {
            kekuatan2 += Math.floor(Math.random() * 10) + 1;
        }
        
        let selisih = Math.floor((kekuatan1 - kekuatan2) / Math.max(tim1.length, tim2.length));
        posisi += selisih;
        
        if (posisi > finishLine) posisi = finishLine;
        if (posisi < -finishLine) posisi = -finishLine;
        
        let visual = '';
        for (let i = -finishLine; i <= finishLine; i++) {
            if (i === 0) visual += '⚪';
            else if (i === posisi) visual += '🪢';
            else if (i < posisi) visual += '🔴';
            else visual += '🔵';
        }
        
        let display = `🪢 *TARIK TAMBANG* 🪢\n\n`;
        display += `📊 RONDE ${step}\n`;
        display += `💪 TIM1: ${kekuatan1} | TIM2: ${kekuatan2}\n`;
        display += `\n${' '.repeat(10)}${visual}\n\n`;
        display += `🔴 ${tim1.join(', ')} ${' '.repeat(10)} ${tim2.join(', ')} 🔵`;
        
        await satanic.sendMessage(m.chat, { text: display, edit: msg.key });
        
        let delay = Math.abs(posisi) > finishLine - 5 ? 800 : 300;
        await new Promise(r => setTimeout(r, delay));
    }
    
    let winner = posisi > 0 ? 'TIM 1' : 'TIM 2';
    let winnerTeam = posisi > 0 ? tim1 : tim2;
    
    await satanic.sendMessage(m.chat, { 
        text: `🏆 *HASIL TARIK TAMBANG* 🏆\n\n🎉 ${winner} MENANG!\n👥 ${winnerTeam.join(', ')}\n\n💥 Total ronde: ${step}`,
        edit: msg.key 
    });
}
break;
case 'renang': {
    if (!text) return reply(`🏊 *RENANG* 🏊\n\n.renang Andi, Budi, Caca\n\n🏊‍♂️ Lomba renang seru!`);
    
    let peserta = text.includes(',') ? text.split(',').map(v=>v.trim()) : text.split(' ').map(v=>v.trim());
    if (peserta.length < 2) return reply('Minimal 2 peserta!');
    
    await satanic.sendMessage(m.chat, { react: { text: '🏊', key: m.key } });
    
    let msg = await satanic.sendMessage(m.chat, { text: `🏊 *RENANG* 🏊\n\n🎬 SIAP...\n⏰ 3` }, { quoted: fkontak });
    
    for (let i = 3; i > 0; i--) {
        await satanic.sendMessage(m.chat, { text: `🏊 *RENANG* 🏊\n\n🎬 SIAP...\n⏰ ${i}`, edit: msg.key });
        await new Promise(r => setTimeout(r, 800));
    }
    
    let positions = new Array(peserta.length).fill(0);
    let finished = [];
    let finishLine = 35;
    let step = 0;
    
    while (finished.length < peserta.length) {
        step++;
        
        for (let i = 0; i < peserta.length; i++) {
            if (!finished.includes(i)) {
                let renang = Math.floor(Math.random() * 6) + 1;
                positions[i] += renang;
                if (positions[i] >= finishLine) {
                    positions[i] = finishLine;
                    finished.push(i);
                }
            }
        }
        
        let raceDisplay = `🏊 *RENANG* 🏊\n\n`;
        for (let i = 0; i < peserta.length; i++) {
            let track = '';
            let pos = positions[i];
            for (let j = 0; j <= finishLine; j++) {
                if (j === pos) track += '🏊';
                else if (j === finishLine) track += '🏁';
                else track += '🌊';
            }
            raceDisplay += `${i+1}. ${peserta[i].padEnd(10)} │${track}│ ${finished.includes(i) ? '✅' : ''}\n`;
        }
        raceDisplay += `\n💨 LANGKAH KE-${step}`;
        
        await satanic.sendMessage(m.chat, { text: raceDisplay, edit: msg.key });
        
        let delay = finished.length < 2 ? 250 : 450;
        await new Promise(r => setTimeout(r, delay));
    }
    
    let result = `🏆 *HASIL RENANG* 🏆\n\n`;
    for (let i = 0; i < finished.length; i++) {
        let medal = i === 0 ? '🥇' : (i === 1 ? '🥈' : (i === 2 ? '🥉' : `${i+1}.`));
        result += `${medal} ${peserta[finished[i]]}\n`;
    }
    
    await satanic.sendMessage(m.chat, { text: result, edit: msg.key });
}
break;
case 'balapkarung': {
    if (!text) return reply(`🪢 *LARI KARUNG* 🪢\n\n.karung Andi, Budi, Caca\n\n🎒 Lomba lari pakai karung!`);
    
    let peserta = text.includes(',') ? text.split(',').map(v=>v.trim()) : text.split(' ').map(v=>v.trim());
    if (peserta.length < 2) return reply('Minimal 2 peserta!');
    
    await satanic.sendMessage(m.chat, { react: { text: '🪢', key: m.key } });
    
    let msg = await satanic.sendMessage(m.chat, { text: `🪢 *LARI KARUNG* 🪢\n\n🎬 SIAP...\n⏰ 3` }, { quoted: fkontak });
    
    for (let i = 3; i > 0; i--) {
        await satanic.sendMessage(m.chat, { text: `🪢 *LARI KARUNG* 🪢\n\n🎬 SIAP...\n⏰ ${i}`, edit: msg.key });
        await new Promise(r => setTimeout(r, 800));
    }
    
    let positions = new Array(peserta.length).fill(0);
    let finished = [];
    let finishLine = 30;
    let step = 0;
    
    while (finished.length < peserta.length) {
        step++;
        
        for (let i = 0; i < peserta.length; i++) {
            if (!finished.includes(i)) {
                let lompat = Math.floor(Math.random() * 4) + 1;
                positions[i] += lompat;
                if (positions[i] >= finishLine) {
                    positions[i] = finishLine;
                    finished.push(i);
                }
            }
        }
        
        let raceDisplay = `🪢 *LARI KARUNG* 🪢\n\n`;
        for (let i = 0; i < peserta.length; i++) {
            let track = '';
            let pos = positions[i];
            for (let j = 0; j <= finishLine; j++) {
                if (j === pos) track += '🪢';
                else if (j === finishLine) track += '🏁';
                else track += '░';
            }
            raceDisplay += `${i+1}. ${peserta[i].padEnd(10)} │${track}│ ${finished.includes(i) ? '✅' : ''}\n`;
        }
        raceDisplay += `\n🎒 LANGKAH KE-${step}`;
        
        await satanic.sendMessage(m.chat, { text: raceDisplay, edit: msg.key });
        
        let delay = finished.length < 2 ? 350 : 550;
        await new Promise(r => setTimeout(r, delay));
    }
    
    let result = `🏆 *HASIL LARI KARUNG* 🏆\n\n`;
    for (let i = 0; i < finished.length; i++) {
        let medal = i === 0 ? '🥇' : (i === 1 ? '🥈' : (i === 2 ? '🥉' : `${i+1}.`));
        result += `${medal} ${peserta[finished[i]]}\n`;
    }
    
    await satanic.sendMessage(m.chat, { text: result, edit: msg.key });
}
break;
case 'tebakkata': {
    if (!m.isGroup) return reply('only group')
    let timeout = 60000
    let id = m.chat
    if (id in satanic.tebakkata) return reply("Masih Ada Sesi Yang Belum Diselesaikan!")
    
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    
    let caption = `🔤 *TEBAK KATA* 🔤\n\n📖 Soal: ${json.soal}\n⏰ Waktu: 60 detik\n💡 Ketik *hint* atau *bantuan* untuk petunjuk\n😔 Ketik *nyerah* untuk menyerah`
    
    satanic.tebakkata[id] = [
        await reply(`${caption}`),
        json,
        setTimeout(() => {
            if (satanic.tebakkata[id]) {
                reply(`⏰ *WAKTU HABIS!*\n\nJawaban: *${json.jawaban}*\n\nIngin bermain lagi? Ketik *tebakkata*`)
                delete satanic.tebakkata[id]
            }
        }, timeout)
    ]
}
break    
case 'mathquiz': case 'math': {
    if (!m.isGroup) return reply('only group')
    let id = m.chat
    if (id in satanic.kuismath) return reply("Masih Ada Sesi Yang Belum Diselesaikan!")
    
    let { genMath, modes } = require('./lib/math')
    if (!text) return reply(`📐 *MODE MATEMATIKA*\n\nMode tersedia: ${Object.keys(modes).join(' | ')}\n\n📝 Contoh: ${prefix}math medium`)
    
    let result = await genMath(text.toLowerCase())
    
    let caption = `🧮 *KUIS MATEMATIKA* 🧮\n\n📊 Soal: ${result.soal}\n⏰ Waktu: ${(result.waktu / 1000).toFixed(2)} detik\n😔 Ketik *nyerah* untuk menyerah`
    
    let msg = await reply(caption)
    
    let timeoutId = setTimeout(() => {
        if (satanic.kuismath[id]) {
            reply(`⏰ *WAKTU HABIS!*\n\nJawaban: *${result.jawaban}*\n\nIngin bermain lagi? Ketik *${prefix}math ${text}*`)
            delete satanic.kuismath[id]
        }
    }, result.waktu)
    
    satanic.kuismath[id] = {
        msg: msg,
        jawaban: result.jawaban.toString().toLowerCase(),
        soal: result.soal,
        timeout: timeoutId
    }
}
break
case 'tebakgambar': {
    if (!m.isGroup) return reply('only group')
    let timeout = 60000
    let id = m.chat
    if (id in satanic.tebakgambar) return reply("Masih Ada Sesi Yang Belum Diselesaikan!")
    
    async function tebakgambar() {
        let anu = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
        let result = anu[Math.floor(Math.random() * anu.length)]
        return {
            img: result.img,
            jawaban: result.jawaban,
            deskripsi: result.deskripsi
        }
    }
    
    let tos = await tebakgambar()
    let caption = `🎮 *TEBAK GAMBAR* 🎮\n\nDeskripsi: ${tos.deskripsi}\n⏰ Waktu: 60 detik\n💡 Ketik *hint* untuk petunjuk\n😔 Ketik *nyerah* untuk menyerah`
    
    let msg = await satanic.sendMessage(from, { caption: caption, image: { url: tos.img } }, { quoted: fkontak })
    
    satanic.tebakgambar[id] = [
        msg,
        tos,
        setTimeout(() => {
            if (satanic.tebakgambar[id]) {
                reply(`⏰ *WAKTU HABIS!*\n\nJawaban: *${tos.jawaban}*\n\nIngin bermain lagi? Ketik *tebakgambar*`)
                delete satanic.tebakgambar[id]
            }
        }, timeout)
    ]
}
break    
case 'tebaktebakan': {
    if (!m.isGroup) return reply('only group')
    let timeout = 60000
    let id = m.chat
    if (id in satanic.tebaktebakan) return reply("Masih Ada Sesi Yang Belum Diselesaikan!")
    
    let anu = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    
    let caption = `❓ *TEBAK-TEBAKAN* ❓\n\n📖 Soal: ${result.soal}\n⏰ Waktu: 60 detik\n💡 Ketik *hint* atau *bantuan* untuk petunjuk\n😔 Ketik *nyerah* untuk menyerah`
    
    let msg = await reply(caption)
    
    let timeoutId = setTimeout(() => {
        if (satanic.tebaktebakan[id]) {
            reply(`⏰ *WAKTU HABIS!*\n\nJawaban: *${result.jawaban}*\n\nIngin bermain lagi? Ketik *tebaktebakan*`)
            delete satanic.tebaktebakan[id]
        }
    }, timeout)
    
    satanic.tebaktebakan[id] = {
        msg: msg,
        jawaban: result.jawaban.toLowerCase(),
        soal: result.soal,
        timeout: timeoutId
    }
}
break
case 'caklontong': {
    if (!m.isGroup) return reply('only group')
    let timeout = 60000
    let id = m.chat
    if (id in satanic.caklontong) return reply("Masih Ada Sesi Yang Belum Diselesaikan!")
    
    let anu = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    
    let caption = `🍚 *CAK LONTONG* 🍚\n\n📖 Soal: ${result.soal}\n⏰ Waktu: 60 detik\n💡 Ketik *hint* atau *bantuan* untuk petunjuk\n😔 Ketik *nyerah* untuk menyerah`
    
    let msg = await reply(caption)
    
    let timeoutId = setTimeout(() => {
        if (satanic.caklontong[id]) {
            reply(`⏰ *WAKTU HABIS!*\n\nJawaban: *${result.jawaban}*\n📝 Deskripsi: ${result.deskripsi}\n\nIngin bermain lagi? Ketik *caklontong*`)
            delete satanic.caklontong[id]
        }
    }, timeout)
    
    satanic.caklontong[id] = {
        msg: msg,
        jawaban: result.jawaban.toLowerCase(),
        soal: result.soal,
        deskripsi: result.deskripsi,
        timeout: timeoutId
    }
}
break
case 'asahotak': {
    if (!m.isGroup) return reply('only group')
    let timeout = 60000
    let id = m.chat
    if (id in satanic.tebakasahotak) return reply("Masih Ada Sesi Yang Belum Diselesaikan!")
    
    let anu = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    
    let caption = `🧠 *ASAH OTAK* 🧠\n\n📖 Soal: ${result.soal}\n⏰ Waktu: 60 detik\n💡 Ketik *hint* atau *bantuan* untuk petunjuk\n😔 Ketik *nyerah* untuk menyerah`
    
    let msg = await reply(caption)
    
    let timeoutId = setTimeout(() => {
        if (satanic.tebakasahotak[id]) {
            reply(`⏰ *WAKTU HABIS!*\n\nJawaban: *${result.jawaban}*\n\nIngin bermain lagi? Ketik *asahotak*`)
            delete satanic.tebakasahotak[id]
        }
    }, timeout)
    
    satanic.tebakasahotak[id] = {
        msg: msg,
        jawaban: result.jawaban.toLowerCase(),
        soal: result.soal,
        timeout: timeoutId
    }
}
break
case 'siapaaku': {
    if (!m.isGroup) return reply('only group')
    let timeout = 60000
    let id = m.chat
    if (id in satanic.siapaaku) return reply('Masih ada soal belum terjawab di chat ini')
    
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    
    let caption = `🕵️ *SIAPA AKU?* 🕵️\n\n📖 Soal: ${json.soal}\n⏰ Waktu: ${(timeout / 1000).toFixed(2)} detik\n💡 Ketik *hint* atau *bantuan* untuk petunjuk\n😔 Ketik *nyerah* untuk menyerah`
    
    let msg = await reply(caption)
    
    let timeoutId = setTimeout(() => {
        if (satanic.siapaaku[id]) {
            reply(`⏰ *WAKTU HABIS!*\n\nJawaban: *${json.jawaban}*\n\nIngin bermain lagi? Ketik *siapaaku*`)
            delete satanic.siapaaku[id]
        }
    }, timeout)
    
    satanic.siapaaku[id] = {
        msg: msg,
        jawaban: json.jawaban.toLowerCase(),
        soal: json.soal,
        timeout: timeoutId
    }
}
break
case 'tebakkimia': {
    if (!m.isGroup) return reply('only group')
    let timeout = 60000
    let id = m.chat
    if (id in satanic.tebakkimia) return reply("Masih Ada Sesi Yang Belum Diselesaikan!")
    
    let anu = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    
    let caption = `🧪 *TEBAK KIMIA* 🧪\n\n🧴 Unsur: ${result.unsur}\n⏰ Waktu: 60 detik\n💡 Ketik *hint* atau *bantuan* untuk petunjuk\n😔 Ketik *nyerah* untuk menyerah`
    
    let msg = await reply(caption)
    
    let timeoutId = setTimeout(() => {
        if (satanic.tebakkimia[id]) {
            reply(`⏰ *WAKTU HABIS!*\n\nJawaban (Lambang): *${result.lambang}*\n\nIngin bermain lagi? Ketik *tebakkimia*`)
            delete satanic.tebakkimia[id]
        }
    }, timeout)
    
    satanic.tebakkimia[id] = {
        msg: msg,
        jawaban: result.lambang.toLowerCase(),
        unsur: result.unsur,
        timeout: timeoutId
    }
}
break
case 'confess': case 'confes': case 'menfes': case 'menfess': {
    satanic.menfes = satanic.menfes ?? {};
    const session = Object.values(satanic.menfes).find(v => v.state === 'CHATTING' && [v.a, v.b].includes(m.sender));
    if (session) {
        const target = session.a === m.sender ? session.b : session.a;
        await satanic.sendMessage(target, {
            text: `📩 Pesan baru dari @${m.sender.split('@')[0]}:\n\n${m.text}`,
            mentions: [m.sender],
        });
        reply("Pesan diteruskan.");
        return;
    }
    const roof = Object.values(satanic.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
    if (roof) return reply("Kamu masih berada dalam sesi menfess");
    if (m.isGroup) return reply("Fitur hanya tersedia di private chat!");
    if (!text) return reply(`Kirim perintah ${prefix + command} nama|nomor|pesan\n\nContoh:\n${prefix + command} ${pushname}|628xxx|Menfess nih`);
    if (!text.includes('|')) return reply("Format salah! Gunakan format: nama|nomor|pesan");

    let [namaNya, nomorNya, pesanNya] = text.split('|');
    nomorNya = nomorNya.replace(/^0/, '62');
    if (isNaN(nomorNya)) return reply("Nomor tidak valid! Pastikan hanya menggunakan angka.");

    const yoi = `Hi ada menfess nih buat kamu\n\nDari: ${namaNya}\nPesan: ${pesanNya}\n\nKetik:\n${prefix}balasmenfess -- Untuk menerima menfess\n${prefix}tolakmenfess -- Untuk menolak menfess\n\n_Pesan ini dikirim oleh bot._`;
    const tod = await getBuffer('https://telegra.ph/file/c8fdfc8426f5f60b48cca.jpg');

    const id = Date.now().toString(); // ✅ PASTIKAN ID UNIK
    satanic.menfes[id] = {
        id: id, // ✅ SIMPAN ID
        a: m.sender,
        b: `${nomorNya}@s.whatsapp.net`,
        state: 'WAITING',
    };

    await satanic.sendMessage(`${nomorNya}@s.whatsapp.net`, { image: tod, caption: yoi });
    reply("Pesan berhasil dikirim ke nomor tujuan. Semoga dibalas ya!");
}
break;
case 'balasmenfess': {
    satanic.menfes = satanic.menfes ?? {};
    const roof = Object.values(satanic.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
    if (!roof) return reply("Belum ada sesi menfess");

    const room = Object.values(satanic.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'WAITING');
    if (!room) return reply("Tidak ada sesi menfess yang sedang menunggu");

    const other = [room.a, room.b].find(user => user !== m.sender);
    room.b = m.sender;
    room.state = 'CHATTING';
    satanic.menfes[room.id] = { ...room };

    await satanic.sendMessage(other, {
        text: `_@${m.sender.split("@")[0]} telah menerima menfess kamu, sekarang kamu bisa chat lewat bot ini._\n\n*NOTE:* Ketik .stopmenfess untuk berhenti.`,
        mentions: [m.sender],
    });
    reply("Menfess diterima, sekarang kamu bisa chat!");
    reply("Silakan balas pesan langsung di chat ini. Semua pesan akan diteruskan.");
}
break;

case 'stopmenfess': {
    satanic.menfes = satanic.menfes ?? {};
    let foundId = null;
    let foundData = null;
    
    for (const [key, val] of Object.entries(satanic.menfes)) {
        if ([val.a, val.b].includes(m.sender)) {
            foundId = key;
            foundData = val;
            break;
        }
    }
    
    if (!foundData) return reply("Belum ada sesi menfess");

    const to = foundData.a === m.sender ? foundData.b : foundData.a;
    await satanic.sendMessage(to, {
        text: "_Sesi menfess ini telah dihentikan._",
        mentions: [m.sender],
    });
    reply("Sesi menfess dihentikan.");
    delete satanic.menfes[foundId]; // ✅ HAPUS PAKAI KEY YANG BENAR
    return;
}
break;
case 'tolakmenfess': {
    satanic.menfes = satanic.menfes ?? {};
    let foundId = null;
    let foundData = null;
    
    for (const [key, val] of Object.entries(satanic.menfes)) {
        if ([val.a, val.b].includes(m.sender)) {
            foundId = key;
            foundData = val;
            break;
        }
    }
    
    if (!foundData) return reply("Belum ada sesi menfess");

    const other = foundData.a === m.sender ? foundData.b : foundData.a;
    await satanic.sendMessage(other, {
        text: `_Maaf, @${m.sender.split("@")[0]} menolak menfess kamu._`,
        mentions: [m.sender],
    });
    reply("Menfess berhasil ditolak.");
    delete satanic.menfes[foundId];
    return;
}
break;
case 'tekateki': {
    if (!m.isGroup) return reply('only group')
    let timeout = 60000
    let id = m.chat
    if (id in satanic.tekateki) return reply('Masih ada soal belum terjawab di chat ini')
    
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    
    let caption = `🧩 *TEKA-TEKI* 🧩\n\n📖 Soal: ${json.soal}\n⏰ Waktu: ${(timeout / 1000).toFixed(2)} detik\n💡 Ketik *hint* atau *bantuan* untuk petunjuk\n😔 Ketik *nyerah* untuk menyerah`
    
    let msg = await reply(caption)
    
    let timeoutId = setTimeout(() => {
        if (satanic.tekateki[id]) {
            reply(`⏰ *WAKTU HABIS!*\n\nJawaban: *${json.jawaban}*\n\nIngin bermain lagi? Ketik *tekateki*`)
            delete satanic.tekateki[id]
        }
    }, timeout)
    
    satanic.tekateki[id] = {
        msg: msg,
        jawaban: json.jawaban.toLowerCase(),
        soal: json.soal,
        timeout: timeoutId
    }
}
break
case 'family100': {
    if (!m.isGroup) return reply('only group')
    let id = m.chat
    if (id in satanic.family100) return reply('Masih Ada Sesi Yang Belum Diselesaikan!')
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let hasil = `*Jawablah Pertanyaan Berikut :*\n\nSoal : ${json.soal}\n\nTerdapat *${json.jawaban.length}* Jawaban ${json.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)` : ''}`.trim()
    satanic.family100[id] = {
        id,
        msg: await reply(`${hasil}`),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
    }
}
break
case 'superdeal': case 'sdeal': {
this.suprisedeal = this.suprisedeal || {}
let user = m.sender
let args = text.split(' ')
let pilihanBox = parseInt(args[0])

if (!global.db.users[user]) {
global.db.users[user] = { money: 0, limit: 30, level: 1, freelimit: 0, lastclaim: 0, registered: false, joinlimit: 1 }
}

// Jika sedang dalam game dan memilih box (1-5)
if (this.suprisedeal[user] && pilihanBox >= 1 && pilihanBox <= 5) {
let game = this.suprisedeal[user]
let result = game.chooseBox(pilihanBox)

// Tambah saldo jika menang
if (result.status === 'win' && result.prize) {
global.db.users[user].money = (global.db.users[user].money || 0) + result.prize
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
result.message += `\n\n💰 Saldo kamu sekarang: Rp ${global.db.users[user].money.toLocaleString('id-ID')}`
}

reply(result.message)
if (result.status === 'lose' || result.status === 'win') {
delete this.suprisedeal[user]
}
break
}

// Jika sedang dalam game dan perintah lain
if (this.suprisedeal[user]) {
let game = this.suprisedeal[user]

if (text === 'collect') {
let result = game.collectPrize()
let hadiah = game.lastPrize ? game.lastPrize.price : 0

if (hadiah > 0) {
global.db.users[user].money = (global.db.users[user].money || 0) + hadiah
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
reply(`${result.message}\n\n💰 Saldo kamu sekarang: Rp ${global.db.users[user].money.toLocaleString('id-ID')}`)
} else {
reply(result.message)
}
delete this.suprisedeal[user]
} else if (text === 'next') {
let result = game.nextLevel()
let hadiah = game.lastPrize ? game.lastPrize.price : 0

if (hadiah > 0) {
global.db.users[user].money = (global.db.users[user].money || 0) + hadiah
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
result.message = `🔥 Selamat, kamu naik ke *Level ${game.level}*!\n💰 +Rp${hadiah.toLocaleString('id-ID')}\n\n${game.getLevelInfo()}`
}
reply(result.message)
} else if (text === 'surrender') {
let result = game.surrender()
let hadiah = result.prize || 0

if (hadiah > 0) {
global.db.users[user].money = (global.db.users[user].money || 0) + hadiah
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
reply(`${result.message}\n\n💰 Saldo kamu sekarang: Rp ${global.db.users[user].money.toLocaleString('id-ID')}`)
} else {
reply(result.message)
}
delete this.suprisedeal[user]
} else if (pilihanBox >= 1 && pilihanBox <= 5) {
// sudah ditangani di atas
} else {
reply(game.getLevelInfo())
}
break
}

// Cek saldo untuk mulai game baru
let saldo = global.db.users[user].money || 0
if (saldo < 1000000) {
return reply(`❌ Saldo tidak mencukupi untuk bermain Super Deal!\n\n💰 Saldo Anda: Rp ${saldo.toLocaleString('id-ID')}\n🎯 Dibutuhkan: Rp 1.000.000\n\nGunakan *${prefix}addsaldo ${user.split('@')[0]} 1000000* untuk top up.`)
}

// Potong saldo
global.db.users[user].money -= 1000000
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))

// Mulai game baru
let SurpriseDealGame = require("./lib/surprisedeal")
this.suprisedeal[user] = new SurpriseDealGame(user)

// Jika langsung pilih box saat mulai
if (pilihanBox >= 1 && pilihanBox <= 5) {
let game = this.suprisedeal[user]
let result = game.chooseBox(pilihanBox)

if (result.status === 'win' && result.prize) {
global.db.users[user].money = (global.db.users[user].money || 0) + result.prize
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
result.message += `\n\n💰 Saldo kamu sekarang: Rp ${global.db.users[user].money.toLocaleString('id-ID')}`
}

reply(`🎲 *GAME SURPRISE DEAL* 🎲\n\n💸 Biaya masuk: Rp 1.000.000 (telah dipotong)\n💰 Sisa saldo: Rp ${global.db.users[user].money.toLocaleString('id-ID')}\n\n${result.message}`)

if (result.status === 'lose' || result.status === 'win') {
delete this.suprisedeal[user]
}
} else {
reply(`🎲 *GAME SURPRISE DEAL* 🎲\n\n💸 Biaya masuk: Rp 1.000.000 (telah dipotong)\n💰 Sisa saldo: Rp ${global.db.users[user].money.toLocaleString('id-ID')}\n\n${this.suprisedeal[user].getLevelInfo()}\n\n🎁 Dapatkan hadiah dan kumpulkan uang sebanyak-banyaknya!\n\n*Cara main:*\nKetik *${prefix}sdeal 1-${this.suprisedeal[user].currentBoxes.length}* untuk memilih box.`)
}
}
break
case 'sdeal_end': case 'suprisedeal_end': {
this.suprisedeal = this.suprisedeal || {}
let user = m.sender

if (!this.suprisedeal[user]) {
return reply(`Kamu tidak sedang dalam game Surprise Deal!`)
}

delete this.suprisedeal[user]
reply(`✅ Game Surprise Deal telah diakhiri.`)
}
break
case 'ceksaldo': {
const userId = m.sender;
const userRegistered = registeredUsers.find(user => user.id === userId);

if (!userRegistered) {
return reply(`❌ *Kamu belum terdaftar!*

Silakan daftar dulu dengan mengetik:
*${prefix}daftar*

Jangan lupa ya... 🥺`);
}

if (!global.db.users[userId]) {
global.db.users[userId] = {
money: 0,
limit: 30,
level: 1,
freelimit: 0,
lastclaim: 0,
registered: true,
joinlimit: 1
};
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
}

const saldo = global.db.users[userId].money || 0;
const limitUser = global.db.users[userId].limit || 0;

let pesanTambahan = '';
if (saldo <= 0) {
pesanTambahan = '\n\n⚠️ *Saldomu habis!* Gunakan *' + prefix + 'claimlimit* atau main game untuk dapat uang.';
} else if (saldo >= 1000000) {
pesanTambahan = '\n\n🎉 *Wow saldomu banyak!* Kamu kaya raya nih ✨';
}

await reply(`💰 *Cek Saldo*

👤 Nama: ${userRegistered.nama}
🆔 ID: ${userId.split('@')[0]}
💎 Status: ${userRegistered.status || 'Free'}

━━━━━━━━━━━━━━━━━
💵 *Saldo Kamu:* Rp ${saldo.toLocaleString('id-ID')}
🎫 *Limit:* ${limitUser}
━━━━━━━━━━━━━━━━━

💡 *Tips:*
• Claim limit gratis dengan *${prefix}claimlimit*
• Main game *${prefix}sdeal* untuk dapat hadiah${pesanTambahan}

_Jangan lupa bersyukur ya~_ 💕`);
}
break;
case 'addsaldo': {
if (!isCreator) return reply('❌ *Akses ditolak!* Hanya owner yang bisa menggunakan perintah ini.');
let target;
let jumlah;
if (m.mentionedJid[0]) {
target = m.mentionedJid[0];
jumlah = parseInt(text.split(' ')[1]);
} else if (m.quoted) {
target = m.quoted.sender;
jumlah = parseInt(text.split(' ')[0]);
} else {
let args = text.split(' ');
if (args.length < 2) return reply('❌ *Format salah!*\nContoh:\n• *addsaldo @user 50000*\n• *addsaldo 6281234567890 50000*\n• *reply pesan user + addsaldo 50000*');
let inputNomor = args[0].replace(/[^0-9]/g, '');
if (inputNomor.startsWith('0')) inputNomor = '62' + inputNomor.substring(1);
if (!inputNomor.endsWith('@s.whatsapp.net')) inputNomor = inputNomor + '@s.whatsapp.net';
target = inputNomor;
jumlah = parseInt(args[1]);
}
if (!target) return reply('❌ *Target tidak ditemukan!*');
if (isNaN(jumlah) || jumlah <= 0) return reply('❌ *Jumlah tidak valid!*\nMasukkan angka positif.');
let userRegistered = registeredUsers.find(user => user.id === target);
if (!userRegistered) return reply('❌ *User tidak terdaftar!*');
if (!global.db.users[target]) {
global.db.users[target] = {
money: jumlah,
limit: 30,
level: 1,
freelimit: 0,
lastclaim: 0,
registered: true,
joinlimit: 1
};
} else {
global.db.users[target].money = (global.db.users[target].money || 0) + jumlah;
}
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
await reply(`✅ *Berhasil menambah saldo!*
👤 Target: ${userRegistered.nama} (${target.split('@')[0]})
➕ Tambahan: +Rp ${jumlah.toLocaleString('id-ID')}
📊 Total saldo sekarang: Rp ${global.db.users[target].money.toLocaleString('id-ID')}`);
}
break;

case 'delsaldo': {
if (!isCreator) return reply('❌ *Akses ditolak!* Hanya owner yang bisa menggunakan perintah ini.');
let target;
let jumlah;
if (m.mentionedJid[0]) {
target = m.mentionedJid[0];
jumlah = parseInt(text.split(' ')[1]);
} else if (m.quoted) {
target = m.quoted.sender;
jumlah = parseInt(text.split(' ')[0]);
} else {
let args = text.split(' ');
if (args.length < 2) return reply('❌ *Format salah!*\nContoh:\n• *delsaldo @user 50000*\n• *delsaldo 6281234567890 50000*\n• *reply pesan user + delsaldo 50000*');
let inputNomor = args[0].replace(/[^0-9]/g, '');
if (inputNomor.startsWith('0')) inputNomor = '62' + inputNomor.substring(1);
if (!inputNomor.endsWith('@s.whatsapp.net')) inputNomor = inputNomor + '@s.whatsapp.net';
target = inputNomor;
jumlah = parseInt(args[1]);
}
if (!target) return reply('❌ *Target tidak ditemukan!*');
if (isNaN(jumlah) || jumlah <= 0) return reply('❌ *Jumlah tidak valid!*\nMasukkan angka positif.');
let userRegistered = registeredUsers.find(user => user.id === target);
if (!userRegistered) return reply('❌ *User tidak terdaftar!*');
if (!global.db.users[target]) {
return reply('❌ *User tidak memiliki data saldo!*');
}
let saldoSekarang = global.db.users[target].money || 0;
if (saldoSekarang <= 0) {
return reply('❌ *User tidak memiliki saldo!*');
}
let saldoBaru = saldoSekarang - jumlah;
if (saldoBaru < 0) {
return reply(`❌ *Gagal menghapus saldo!*
Saldo user hanya Rp ${saldoSekarang.toLocaleString('id-ID')}, tidak bisa dikurangi Rp ${jumlah.toLocaleString('id-ID')}.`);
}
global.db.users[target].money = saldoBaru;
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
await reply(`✅ *Berhasil menghapus saldo!*
👤 Target: ${userRegistered.nama} (${target.split('@')[0]})
➖ Dihapus: -Rp ${jumlah.toLocaleString('id-ID')}
📊 Total saldo sekarang: Rp ${global.db.users[target].money.toLocaleString('id-ID')}`);
}
break;

case 'topsaldo': {
let data = [];
for (let id in global.db.users) {
let userRegistered = registeredUsers.find(user => user.id === id);
if (userRegistered && global.db.users[id].money > 0) {
data.push({
nama: userRegistered.nama,
saldo: global.db.users[id].money || 0,
id: id.split('@')[0]
});
}
}
if (data.length === 0) return reply('❌ *Belum ada user yang memiliki saldo!*');
data.sort((a, b) => b.saldo - a.saldo);
let top10 = data.slice(0, 10);
let list = '';
for (let i = 0; i < top10.length; i++) {
let medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`;
list += `${medal} *${top10[i].nama}*\n   💰 Rp ${top10[i].saldo.toLocaleString('id-ID')}\n`;
}
await reply(`🏆 *TOP 10 RICHEST USER* 🏆

${list}

━━━━━━━━━━━━━━━━━
✨ Terus kumpulkan saldo untuk menjadi yang teratas!`);
}
break;
case 'mancing': {
    const cooldown = 30;
    const now = Date.now();
    if (!global.mancingCooldown) global.mancingCooldown = {};
    if (global.mancingCooldown[m.sender] && now - global.mancingCooldown[m.sender] < cooldown * 1000) {
        const remaining = Math.ceil((cooldown * 1000 - (now - global.mancingCooldown[m.sender])) / 1000);
        return reply(`⏱️ *Cooldown!* Tunggu ${remaining} detik lagi untuk mancing lagi.`);
    }
    
    // DAFTAR IKAN
    const ikanList = [
        { nama: '🐟 Vintage Damsel', rarity: 'Common', nilai: 50, emoji: '🐟' },
        { nama: '🐠 Darwin Clownfish', rarity: 'Uncommon', nilai: 100, emoji: '🐠' },
        { nama: '🐡 Jewel Tang', rarity: 'Uncommon', nilai: 120, emoji: '🐡' },
        { nama: '🎣 King Mackerel', rarity: 'Rare', nilai: 200, emoji: '🎣' },
        { nama: '🦄 Narwhal', rarity: 'Epic', nilai: 400, emoji: '🦄' },
        { nama: '🐬 Yellowfin Tuna', rarity: 'Legendary', nilai: 800, emoji: '🐬' },
        { nama: '🔥 Ruby Tuna', rarity: 'Legendary', nilai: 900, emoji: '🔥' },
        { nama: '✨ Chrome Tuna', rarity: 'Legendary', nilai: 900, emoji: '✨' },
        { nama: '🌋 Lavafin Tuna', rarity: 'Legendary', nilai: 1000, emoji: '🌋' },
        { nama: '✨ Enchanted Angelfish', rarity: 'Legendary', nilai: 1100, emoji: '✨' },
        { nama: '🦈 Hammerhead Shark', rarity: 'Mythic', nilai: 2000, emoji: '🦈' },
        { nama: '🔥 Blueflame Ray', rarity: 'Mythic', nilai: 2200, emoji: '🔥' },
        { nama: '🌊 Abyss Seahorse', rarity: 'Mythic', nilai: 2500, emoji: '🌊' },
        { nama: '😱 Blob Fish', rarity: 'Mythic', nilai: 3000, emoji: '😱' },
        { nama: '🦋 Dotted Stingray', rarity: 'Mythic', nilai: 2800, emoji: '🦋' },
        { nama: '🐋 Orca', rarity: 'Secret', nilai: 10000, emoji: '🐋' },
        { nama: '🦀 Crystal Crab', rarity: 'Secret', nilai: 8000, emoji: '🦀' },
        { nama: '🦈 Monster Shark', rarity: 'Secret', nilai: 15000, emoji: '🦈' },
        { nama: '👻 Eerie Shark', rarity: 'Secret', nilai: 12000, emoji: '👻' },
        { nama: '🐋 Great Whale', rarity: 'Secret', nilai: 20000, emoji: '🐋' },
        { nama: '🤖 Robot Kraken', rarity: 'Secret', nilai: 25000, emoji: '🤖' },
        { nama: '👑 King Crab', rarity: 'Secret', nilai: 18000, emoji: '👑' },
        { nama: '👑 Queen Crab', rarity: 'Secret', nilai: 18000, emoji: '👑' }
    ];
    
    const weights = [25, 15, 12, 10, 8, 5, 3, 3, 2, 2, 1.5, 1.2, 1.2, 0.8, 1, 0.3, 0.4, 0.2, 0.3, 0.1, 0.2, 0.3, 0.3];
    
    let totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    let cumulative = 0;
    let hasilIkan = ikanList[0];
    
    for (let i = 0; i < ikanList.length; i++) {
        cumulative += weights[i];
        if (random <= cumulative) {
            hasilIkan = ikanList[i];
            break;
        }
    }
    
    global.mancingCooldown[m.sender] = Date.now();
    await satanic.sendMessage(m.chat, { react: { text: '🎣', key: m.key } });
    
    // PESAN 1: Mulai mancing
    let msg = await satanic.sendMessage(m.chat, { 
        text: `╔════════════════════════════╗
║       🎣 *MANCING* 🎣         ║
╠════════════════════════════╣
║                            ║
║         🎣💨               ║
║       MELEMPAR KAIL...      ║
║                            ║
║         🌊🌊🌊             ║
╚════════════════════════════╝`
    }, { quoted: fkontak });
    
    await new Promise(r => setTimeout(r, 2000));
    
    // JEDA MENUNGGU LAMA (8 detik) dengan animasi titik
    for (let i = 1; i <= 8; i++) {
        let dot = '.'.repeat(i % 4);
        let waterWave = '🌊'.repeat(Math.min(i, 5));
        
        await satanic.sendMessage(m.chat, { 
            text: `╔════════════════════════════╗
║       🎣 *MANCING* 🎣         ║
╠════════════════════════════╣
║                            ║
║         ${waterWave}               ║
║       MENUNGGU${dot}          ║
║                            ║
║         🎣                 ║
║       ${i} DETIK...          ║
╚════════════════════════════╝`, 
            edit: msg.key 
        });
        await new Promise(r => setTimeout(r, 1000));
    }
    
    // Ada yang menggigit
    await satanic.sendMessage(m.chat, { 
        text: `╔════════════════════════════╗
║       🎣 *MANCING* 🎣         ║
╠════════════════════════════╣
║                            ║
║         ⚡⚡⚡              ║
║     ADA YANG MENGGIGIT!     ║
║         !!!                 ║
║                            ║
║       MENARIK KAIL...       ║
╚════════════════════════════╝`, 
        edit: msg.key 
    });
    await new Promise(r => setTimeout(r, 2000));
    
    // HASIL TANGKAPAN
    const rarityIcon = {
        'Common': '🟫', 'Uncommon': '🟤', 'Rare': '🔵',
        'Epic': '🟣', 'Legendary': '⭐', 'Mythic': '💎', 'Secret': '👑'
    };
    
    const rarityText = {
        'Common': 'COMMON', 'Uncommon': 'UNCOMMON', 'Rare': 'RARE',
        'Epic': 'EPIC', 'Legendary': 'LEGENDARY', 'Mythic': 'MYTHIC', 'Secret': 'SECRET'
    };
    
    let resultText = `╔════════════════════════════╗
║     🎣 *HASIL MANCING* 🎣      ║
╠════════════════════════════╣
║                            ║
║   ${hasilIkan.emoji} ${hasilIkan.nama} ${hasilIkan.emoji}   ║
║                            ║
║   📊 ${rarityIcon[hasilIkan.rarity]} ${rarityText[hasilIkan.rarity]}    ║
║                            ║
║   💰 +${hasilIkan.nilai} KOIN    ║
║                            ║
╚════════════════════════════╝`;
    
    await satanic.sendMessage(m.chat, { text: resultText, edit: msg.key });
    
    // Efek reaction
    if (hasilIkan.rarity === 'Secret') {
        await satanic.sendMessage(m.chat, { react: { text: '👑', key: m.key } });
        await satanic.sendMessage(m.chat, { 
            text: `🎉✨ *WOW! SECRET CATCH!* ✨🎉\n@${m.sender.split('@')[0]} mendapatkan ${hasilIkan.nama} langka!`,
            mentions: [m.sender]
        }, { quoted: fkontak });
    } else if (hasilIkan.rarity === 'Mythic') {
        await satanic.sendMessage(m.chat, { react: { text: '💎', key: m.key } });
    } else if (hasilIkan.rarity === 'Legendary') {
        await satanic.sendMessage(m.chat, { react: { text: '⭐', key: m.key } });
    } else {
        await satanic.sendMessage(m.chat, { react: { text: '🐟', key: m.key } });
    }
}
break;
case 'aduayam': {
    if (!text) return reply(`🐔 *ADU AYAM* 🐔\n\n📌 *Cara main:*\n.aduan Ayam1, Ayam2\n\n📌 *Contoh:*\n.aduayam Si Jago, si item\n\n🏆 Pemenang ditentukan secara random dengan animasi seru!`);
    
    let ayams = [];
    
    // Parse peserta
    if (text.includes(',')) {
        ayams = text.split(',').map(p => p.trim()).filter(p => p);
    } else if (text.includes('|')) {
        ayams = text.split('|').map(p => p.trim()).filter(p => p);
    } else {
        ayams = text.split(' ').filter(p => p);
    }
    
    if (ayams.length < 2) return reply('Minimal 2 ayam! Contoh: .aduayam Jago, Item, Bangkok');
    if (ayams.length > 4) return reply('Maksimal 4 ayam biar ga rame!');
    
    await satanic.sendMessage(m.chat, { react: { text: '🐔', key: m.key } });
    
    // Generate stat ayam
    let ayamStats = [];
    for (let i = 0; i < ayams.length; i++) {
        ayamStats.push({
            nama: ayams[i],
            power: Math.floor(Math.random() * 50) + 50, // 50-100
            speed: Math.floor(Math.random() * 50) + 50,
            health: 100
        });
    }
    
    // SATU PESAN UNTUK SEMUA
    let msg = await satanic.sendMessage(m.chat, { 
        text: `╔══════════════════════════════════╗
║       🐔 *ADU AYAM ARENA* 🐔        ║
╠══════════════════════════════════╣
║                                      ║
║     🎬 MEMBUKA ARENA...              ║
║     ⏰ 3                              ║
╚══════════════════════════════════════╝` 
    }, { quoted: fkontak });
    
    // Countdown 3,2,1
    for (let i = 3; i > 0; i--) {
        await satanic.sendMessage(m.chat, { 
            text: `╔══════════════════════════════════╗
║       🐔 *ADU AYAM ARENA* 🐔        ║
╠══════════════════════════════════╣
║                                      ║
║     🎬 MEMBUKA ARENA...              ║
║     ⏰ ${i}                              ║
╚══════════════════════════════════════╝`, 
            edit: msg.key 
        });
        await new Promise(r => setTimeout(r, 800));
    }
    
    // Tampilkan stat ayam
    let statText = `╔══════════════════════════════════╗
║       🐔 *STATISTIK AYAM* 🐔        ║
╠══════════════════════════════════╣
║                                      ║\n`;
    
    for (let i = 0; i < ayamStats.length; i++) {
        let powerBar = '█'.repeat(Math.floor(ayamStats[i].power / 10)) + '░'.repeat(10 - Math.floor(ayamStats[i].power / 10));
        let speedBar = '█'.repeat(Math.floor(ayamStats[i].speed / 10)) + '░'.repeat(10 - Math.floor(ayamStats[i].speed / 10));
        
        statText += `║  ${i+1}. ${ayamStats[i].nama.padEnd(12)}          ║
║     💪 Power: ${powerBar} ${ayamStats[i].power} ║
║     ⚡ Speed: ${speedBar} ${ayamStats[i].speed} ║
║                                      ║\n`;
    }
    
    statText += `╚══════════════════════════════════════╝`;
    
    await satanic.sendMessage(m.chat, { text: statText, edit: msg.key });
    await new Promise(r => setTimeout(r, 2000));
    
    // SIMULASI PERTARUNGAN
    let healths = ayamStats.map(a => a.health);
    let alive = ayamStats.map((_, i) => i);
    let winner = null;
    let round = 0;
    let battleLog = [];
    
    while (alive.length > 1 && round < 20) {
        round++;
        
        // Pilih 2 ayam random yang masih hidup
        let fighter1 = alive[Math.floor(Math.random() * alive.length)];
        let fighter2 = alive[Math.floor(Math.random() * alive.length)];
        
        while (fighter1 === fighter2 && alive.length > 1) {
            fighter2 = alive[Math.floor(Math.random() * alive.length)];
        }
        
        // Hitung damage
        let damage1 = Math.floor(Math.random() * ayamStats[fighter1].power / 10) + 5;
        let damage2 = Math.floor(Math.random() * ayamStats[fighter2].power / 10) + 5;
        
        healths[fighter2] -= damage1;
        healths[fighter1] -= damage2;
        
        battleLog.push({
            round: round,
            attacker: fighter1,
            defender: fighter2,
            damage: damage1
        });
        
        // Cek kematian
        if (healths[fighter2] <= 0) {
            alive = alive.filter(i => i !== fighter2);
            battleLog.push({
                round: round,
                dead: fighter2,
                message: `${ayamStats[fighter2].nama} 💀 K.O!`
            });
        }
        
        if (healths[fighter1] <= 0) {
            alive = alive.filter(i => i !== fighter1);
            battleLog.push({
                round: round,
                dead: fighter1,
                message: `${ayamStats[fighter1].nama} 💀 K.O!`
            });
        }
        
        // Animasi pertarungan
        let battleFrame = `╔══════════════════════════════════╗
║       🐔 *RONDE ${round}* 🐔               ║
╠══════════════════════════════════╣
║                                      ║
║  💥 ${ayamStats[fighter1].nama.padEnd(10)} vs ${ayamStats[fighter2].nama.padEnd(10)} 💥  ║
║                                      ║
║  🩸 ${ayamStats[fighter1].nama} menyerang!     ║
║  ⚔️ Damage: ${damage1}                    ║
║  🩸 ${ayamStats[fighter2].nama} menyerang!     ║
║  ⚔️ Damage: ${damage2}                    ║
║                                      ║
║  ❤️ ${ayamStats[fighter1].nama}: ${Math.max(0, healths[fighter1])} HP     ║
║  ❤️ ${ayamStats[fighter2].nama}: ${Math.max(0, healths[fighter2])} HP     ║
╚══════════════════════════════════════╝`;
        
        await satanic.sendMessage(m.chat, { text: battleFrame, edit: msg.key });
        await new Promise(r => setTimeout(r, 1500));
        
        if (alive.length === 1) {
            winner = alive[0];
            break;
        }
    }
    
    // PENENTUAN PEMENANG
    if (winner === null && alive.length === 0) {
        winner = Math.floor(Math.random() * ayamStats.length);
    } else if (winner === null) {
        winner = alive[0];
    }
    
    // HASIL AKHIR
    let resultText = `╔══════════════════════════════════╗
║       🏆 *HASIL ADU AYAM* 🏆        ║
╠══════════════════════════════════╣
║                                      ║
║     🐔 *JUARA: ${ayamStats[winner].nama}* 🐔   ║
║                                      ║
║     📊 TOTAL RONDE: ${round}                 ║
║                                      ║
║     🎉 SELAMAT! ${ayamStats[winner].nama} MENANG! 🎉 ║
╚══════════════════════════════════════╝`;
    
    await satanic.sendMessage(m.chat, { text: resultText, edit: msg.key });
    await satanic.sendMessage(m.chat, { react: { text: '🏆', key: m.key } });
}
break;
case 'tebakangkatogel': {
    if (!text) return reply(`🎰 *TEBAK ANGKA TOTOBET* 🎰\n\n📌 *Cara main:*\n.tebakangka 4D 1234\n.tebakangka 3D 123\n.tebakangka 2D 12`);
    
    const args = text.split(' ');
    if (args.length < 2) return reply('Format: .tebakangka [2D/3D/4D] [angka]');
    
    const jenis = args[0].toUpperCase();
    const tebakan = args[1];
    
    if (!['2D', '3D', '4D'].includes(jenis)) return reply('Pilih 2D, 3D, atau 4D');
    
    let panjangBenar = jenis === '2D' ? 2 : (jenis === '3D' ? 3 : 4);
    if (!/^\d+$/.test(tebakan)) return reply('Masukkan angka 0-9');
    if (tebakan.length !== panjangBenar) return reply(`${jenis} harus ${panjangBenar} digit!`);
    
    await satanic.sendMessage(m.chat, { react: { text: '🎰', key: m.key } });
    
    // Generate angka result
    let angkaResult = '';
    if (jenis === '2D') {
        angkaResult = Math.floor(Math.random() * 90 + 10).toString();
    } else if (jenis === '3D') {
        angkaResult = Math.floor(Math.random() * 900 + 100).toString();
    } else {
        angkaResult = Math.floor(Math.random() * 9000 + 1000).toString();
    }
    
    // PESAN 1: KIRIM PESAN AWAL (akan diedit terus)
    let msg = await satanic.sendMessage(m.chat, { 
        text: `╔══════════════════════════════════╗
║         🎰 *T O T O B E T* 🎰         ║
╠══════════════════════════════════╣
║                                      ║
║     ┌───┐ ┌───┐ ┌───┐ ┌───┐          ║
║     │ ? │ │ ? │ │ ? │ │ ? │          ║
║     └───┘ └───┘ └───┘ └───┘          ║
║                                      ║
║     📌 ${jenis}: ${tebakan}                    ║
║                                      ║
║     🎲 MENGOCAK ANGKA...              ║
║     ⏰ 3                              ║
╚══════════════════════════════════════╝` 
    }, { quoted: fkontak });
    
    // EDIT: Countdown 3,2,1
    for (let i = 3; i > 0; i--) {
        await satanic.sendMessage(m.chat, { 
            text: `╔══════════════════════════════════╗
║         🎰 *T O T O B E T* 🎰         ║
╠══════════════════════════════════╣
║                                      ║
║     ┌───┐ ┌───┐ ┌───┐ ┌───┐          ║
║     │ ? │ │ ? │ │ ? │ │ ? │          ║
║     └───┘ └───┘ └───┘ └───┘          ║
║                                      ║
║     📌 ${jenis}: ${tebakan}                    ║
║                                      ║
║     🎲 MENGOCAK ANGKA...              ║
║     ⏰ ${i}                              ║
╚══════════════════════════════════════╝`, 
            edit: msg.key 
        });
        await new Promise(r => setTimeout(r, 800));
    }
    
    // EDIT: Animasi rolling 20x
    for (let i = 0; i <= 20; i++) {
        let fakeNum = '';
        if (jenis === '2D') {
            fakeNum = Math.floor(Math.random() * 90 + 10).toString();
        } else if (jenis === '3D') {
            fakeNum = Math.floor(Math.random() * 900 + 100).toString();
        } else {
            fakeNum = Math.floor(Math.random() * 9000 + 1000).toString();
        }
        
        let persen = Math.floor((i / 20) * 100);
        let barLength = Math.floor(persen / 5);
        let progressBar = '█'.repeat(barLength) + '░'.repeat(20 - barLength);
        
        let fakeDigits = fakeNum.split('');
        let kotakDigits = '';
        
        if (jenis === '4D') {
            kotakDigits = `┌───┐ ┌───┐ ┌───┐ ┌───┐\n║     │ ${fakeDigits[0]} │ │ ${fakeDigits[1]} │ │ ${fakeDigits[2]} │ │ ${fakeDigits[3]} │\n║     └───┘ └───┘ └───┘ └───┘`;
        } else if (jenis === '3D') {
            kotakDigits = `┌───┐ ┌───┐ ┌───┐\n║     │ ${fakeDigits[0]} │ │ ${fakeDigits[1]} │ │ ${fakeDigits[2]} │\n║     └───┘ └───┘ └───┘`;
        } else {
            kotakDigits = `┌───┐ ┌───┐\n║     │ ${fakeDigits[0]} │ │ ${fakeDigits[1]} │\n║     └───┘ └───┘`;
        }
        
        let rollingText = `╔══════════════════════════════════╗
║         🎰 *T O T O B E T* 🎰         ║
╠══════════════════════════════════╣
║                                      ║
║     ${kotakDigits}          ║
║                                      ║
║     📌 ${jenis}: ${tebakan}                    ║
║                                      ║
║     🎲 ROLLING...                     ║
║     [${progressBar}] ${persen}%                  ║
╚══════════════════════════════════════╝`;
        
        await satanic.sendMessage(m.chat, { text: rollingText, edit: msg.key });
        
        let delay = i < 12 ? 100 : (i < 17 ? 250 : 500);
        await new Promise(r => setTimeout(r, delay));
    }
    
    // EDIT: HASIL AKHIR
    let isWin = (tebakan === angkaResult);
    let hadiah = isWin ? (jenis === '2D' ? 500 : (jenis === '3D' ? 1000 : 5000)) : 0;
    
    let resultDigits = angkaResult.split('');
    let resultKotak = '';
    
    if (jenis === '4D') {
        resultKotak = `┌───┐ ┌───┐ ┌───┐ ┌───┐\n║     │ ${resultDigits[0]} │ │ ${resultDigits[1]} │ │ ${resultDigits[2]} │ │ ${resultDigits[3]} │\n║     └───┘ └───┘ └───┘ └───┘`;
    } else if (jenis === '3D') {
        resultKotak = `┌───┐ ┌───┐ ┌───┐\n║     │ ${resultDigits[0]} │ │ ${resultDigits[1]} │ │ ${resultDigits[2]} │\n║     └───┘ └───┘ └───┘`;
    } else {
        resultKotak = `┌───┐ ┌───┐\n║     │ ${resultDigits[0]} │ │ ${resultDigits[1]} │\n║     └───┘ └───┘`;
    }
    
    let winIcon = isWin ? '🎉' : '❌';
    let winText = isWin ? 'SELAMAT!' : 'KURANG BERUNTUNG';
    
    let resultText = `╔══════════════════════════════════╗
║         🎰 *H A S I L* 🎰            ║
╠══════════════════════════════════╣
║                                      ║
║     ${resultKotak}          ║
║                                      ║
║     📌 ${jenis}: ${tebakan}                    ║
║                                      ║
║     ${winIcon} ${winText} ${winIcon}                       ║`;
    
    if (isWin) {
        resultText += `\n║     💰 HADIAH: ${hadiah} KOIN        ║`;
    } else {
        resultText += `\n║     😔 COBA LAGI lain kali          ║`;
    }
    
    resultText += `\n╚══════════════════════════════════════╝`;
    
    await satanic.sendMessage(m.chat, { text: resultText, edit: msg.key });
    await satanic.sendMessage(m.chat, { react: { text: isWin ? '🎉' : '💀', key: m.key } });
}
break;
case 'balaplari': {
    if (!text) return reply(`🏃 *BALAP LARI* 🏃\n\n📌 *Cara penggunaan:*\n.balaplari Andi, Budi, Caca, Dedi`);
    
    let peserta = [];
    
    if (text.includes(',')) {
        peserta = text.split(',').map(p => p.trim()).filter(p => p);
    } else if (text.includes('|')) {
        peserta = text.split('|').map(p => p.trim()).filter(p => p);
    } else {
        peserta = text.split(' ').filter(p => p);
    }
    
    if (peserta.length < 2) return reply('Minimal 2 peserta!');
    if (peserta.length > 8) return reply('Maksimal 8 peserta!');
    
    await satanic.sendMessage(m.chat, { react: { text: '🏁', key: m.key } });
    
    // SATU PESAN UNTUK SEMUA (countdown + balapan + hasil)
    let msg = await satanic.sendMessage(m.chat, { 
        text: `🏁 *BALAP LARI* 🏁\n\n👥 *PESERTA:*\n${peserta.map((p,i) => `   ${i+1}. ${p}`).join('\n')}\n\n🎬 Hitung mundur...` 
    }, { quoted: fkontak });
    
    // Countdown 3,2,1 (edit terus)
    await satanic.sendMessage(m.chat, { text: `🏁 *BALAP LARI* 🏁\n\n👥 *PESERTA:*\n${peserta.map((p,i) => `   ${i+1}. ${p}`).join('\n')}\n\n⏰ 3`, edit: msg.key });
    await new Promise(r => setTimeout(r, 800));
    
    await satanic.sendMessage(m.chat, { text: `🏁 *BALAP LARI* 🏁\n\n👥 *PESERTA:*\n${peserta.map((p,i) => `   ${i+1}. ${p}`).join('\n')}\n\n⏰ 2`, edit: msg.key });
    await new Promise(r => setTimeout(r, 800));
    
    await satanic.sendMessage(m.chat, { text: `🏁 *BALAP LARI* 🏁\n\n👥 *PESERTA:*\n${peserta.map((p,i) => `   ${i+1}. ${p}`).join('\n')}\n\n⏰ 1`, edit: msg.key });
    await new Promise(r => setTimeout(r, 800));
    
    await satanic.sendMessage(m.chat, { text: `🏃 *GO!* 🏃\n\n━━━━━━━━━━━━━━━━━━━━`, edit: msg.key });
    await new Promise(r => setTimeout(r, 500));
    
    // Setup balapan
    let positions = new Array(peserta.length).fill(0);
    let finished = new Array(peserta.length).fill(false);
    let ranking = [];
    const finishLine = 35;
    let step = 0;
    
    while (ranking.length < peserta.length) {
        step++;
        
        for (let i = 0; i < peserta.length; i++) {
            if (!finished[i]) {
                let langkah = Math.floor(Math.random() * 6) + 1;
                positions[i] += langkah;
                if (positions[i] >= finishLine) {
                    positions[i] = finishLine;
                    finished[i] = true;
                    ranking.push({ index: i, name: peserta[i] });
                }
            }
        }
        
        let raceDisplay = `🏃 *BALAP LARI* 🏃\n\n━━━━━━━━━━━━━━━━━━━━\n\n`;
        
        for (let i = 0; i < peserta.length; i++) {
            let track = '';
            let pos = Math.min(positions[i], finishLine);
            
            for (let j = 0; j <= finishLine; j++) {
                if (j === pos) track += '🏃';
                else if (j === finishLine) track += '🏁';
                else track += '░';
            }
            
            let status = finished[i] ? ' ✅' : '';
            raceDisplay += `${(i+1).toString().padStart(2)}. ${peserta[i].padEnd(12)} │${track}│${status}\n`;
        }
        
        raceDisplay += `\n━━━━━━━━━━━━━━━━━━━━\n⏱️ LANGKAH KE-${step}`;
        
        await satanic.sendMessage(m.chat, { text: raceDisplay, edit: msg.key });
        
        let delay = ranking.length < 2 ? 200 : (ranking.length < peserta.length - 1 ? 350 : 550);
        await new Promise(r => setTimeout(r, delay));
    }
    
    // Hasil akhir (edit pesan yang sama)
    let resultText = `🏆 *HASIL BALAPAN* 🏆\n\n━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    for (let i = 0; i < ranking.length; i++) {
        let medal = i === 0 ? '🥇' : (i === 1 ? '🥈' : (i === 2 ? '🥉' : `${i+1}.`));
        resultText += `${medal} ${ranking[i].name}\n`;
    }
    
    resultText += `\n━━━━━━━━━━━━━━━━━━━━\n🎉 *JUARA 1: ${ranking[0].name}* 🎉`;
    
    await satanic.sendMessage(m.chat, { text: resultText, edit: msg.key });
    await satanic.sendMessage(m.chat, { react: { text: '🏆', key: m.key } });
    
    let winner = ranking[0].name;
    let tagWinner = winner.replace(/[^0-9]/g, '');
    if (tagWinner.length > 5 && tagWinner.length < 15) {
        await satanic.sendMessage(m.chat, {
            text: `🏆 SELAMAT! @${tagWinner} jadi juara! 🏆`,
            mentions: [tagWinner + '@s.whatsapp.net']
        }, { quoted: fkontak });
    }
}
break;
case 'dare':
              const dare =[
"Makan 2 sendok makan nasi tanpa lauk apapun, jika terasa berat, kamu bisa minum.",
"Sebutkan orang yang membuatmu terdiam",
"Telepon gebetan/pacar sekarang dan kirim tangkapan layar di sini",
"Kirim emot hanya setiap kali kamu mengetik di grup obrolan/obrolan pribadi selama 1 hari.",
"Ucapkan 'Selamat datang di Who Wants To Be a Millionaire!' ke semua grup yang kamu punya",
"Telepon mantan dengan mengatakan rindu",
"nyanyikan chorus dari lagu terakhir yang kamu mainkan",
"Rekam suara untuk mantan/pacar/gebemmu, katakan 'Hai (nama), ingin menelepon, tunggu sebentar. Aku sangat merindukanmu'",
"Pukul meja (yang ada di rumah) sampai kamu dimarahi karena berisik",
"Katakan pada orang asing 'Aku baru saja diberitahu bahwa aku adalah saudaramu yang pertama, kami berpisah, lalu aku melakukan operasi plastik. Dan ini hal paling 'ciyusss'",
"Sebutkan nama mantan",
"buat 1 sajak untuk anggota grup!",
"Kirim daftar percakapan WhatsAppmu",
"Obrol dengan orang asing dengan bahasa ghetto lalu tangkap layar di sini",
"Ceritakan versimu sendiri tentang hal-hal memalukan",
"Tag orang yang kamu benci",
"Pura-pura seperti terkena pengaruh, misalnya: terkena pengaruh anjing, terkena pengaruh belalang, terkena pengaruh lemari es, dll.",
"Ubah nama menjadi *I AM DONKEY* selama 24 jam",
"Teriak *ma chuda ma chuda ma chuda* di depan rumahmu",
"Ambil foto/potret pacar atau gebetanmu dan kirimkan di sini",
"Ceritakan tipe pacar yang kamu sukai!",
"Ucapkan *aku naksir kamu, maukah kamu menjadi pacarku?* kepada lawan jenis, terakhir kali kamu berbicara dengannya (kirim di WA/Telegram), tunggu sampai dia membalas, jika sudah, berikan di sini",
"Rekam suaramu yang membaca *titar ke age do titar, titar ke piche do titar*",
"Chatingan lelucon dengan mantan dan katakan *aku mencintaimu, tolong kembalilah.* tanpa menyebutkan bahwa itu adalah tantangan!",
"Obrol dengan kontak WhatsApp berurutan sesuai dengan persentase baterai ponselmu, lalu katakan 'Aku beruntung memiliki kamu!'",
"Ubah nama menjadi *I am a child of randi* selama 5 jam",
"Ketik dalam bahasa Bengali selama 24 jam",
"Gunakan foto Selmon Bhoi selama 3 hari",
"Kirim kutipan lagu lalu tag anggota yang cocok untuk kutipan tersebut",
"Kirim pesan suara dengan ucapan 'Bolehkah aku memanggilmu sayang?'",
"Tangkapan layar percakapan terakhir di WhatsAppmu",
"Ucapkan *KAMU SANGAT CANTIK, JANGAN BERBOHONG* kepada teman pria!",
"Telepon salah satu anggota grup dan katakan kata kasar kepada mereka",
"Berlakulah seperti ayam di depan orangtua kamu",
"Ambil sebuah buku secara acak dan bacakan satu halaman secara keras dan rekam suara lalu kirimkan di sini",
"Buka pintu depan rumahmu dan menyalak seperti serigala selama 10 detik",
"Ambil foto selfie yang memalukan dan jadikan sebagai foto profilmu",
"Biar grup memilih sebuah kata dan lagu yang dikenal. Kamu harus menyanyikan lagu tersebut dan kirim dalam bentuk pesan suara di sini",
"Berjalanlah dengan menopang dengan siku dan lutut selama yang kamu bisa",
"nyanyikan lagu kebangsaan dalam pesan suara",
"Lakukan breakdance selama 30 detik di ruang tamu",
"Ceritakan cerita sedih yang kamu ketahui",
"Buat video tari twerk singkat dan unggah sebagai status selama 5 menit",
"Makan sepotong bawang putih mentah",
"Tunjukkan lima orang terakhir yang kamu kirim pesan dan isi pesan mereka",
"Jadikan nama lengkapmu sebagai status selama 5 jam",
"Buat video tari singkat tanpa filter hanya dengan musik dan unggah sebagai status selama 5 jam",
"Telepon sahabatmu, omong kosong",
"Jadikan foto dirimu tanpa filter sebagai status selama 10 menit",
"Ucapkan 'aku cinta Oli London' dalam pesan suara 😄",
"Kirim pesan kepada mantanmu dan katakan bahwa kamu masih menyukainya",
"Telepon gebetan/pacar/sahabatmu sekarang dan tangkapan layar di sini",
"Berkata kasar pada salah satu anggota grup di percakapan pribadi dan katakan 'kamu jelek, beban'",
"Ucapkan 'KAMU CANTIK/GANTENG' pada salah satu orang yang ada di atas pinlistmu atau orang pertama di daftar percakapanmu",
"Kirim pesan suara dan katakan 'Bisakah aku memanggilmu sayang?'. Jika kamu seorang pria, sebutkan nama seorang wanita. Jika kamu seorang wanita, sebutkan nama seorang pria",
"Tulis 'Aku mencintaimu (nama anggota grup acak yang sedang online) dalam percakapan pribadi (jika kamu pria, tulis nama wanita; jika kamu wanita, tulis nama pria), ambil tangkapan layar dan kirimkan di sini",
"Gunakan foto aktor Bollywood sebagai foto profilmu selama 3 hari",
"Jadikan foto crushmu sebagai status dengan caption 'Ini adalah crushku'",
"Ubah nama menjadi *I AM GAY* selama 5 jam",
"Obrol dengan salah satu kontak di WhatsApp dan katakan 'Aku akan menjadi pacarmu selama 5 jam'",
"Kirim pesan suara dan katakan 'Aku naksir kamu, maukah kamu menjadi pacarku?' kepada orang acak dari grup (jika kamu perempuan, pilih nama laki-laki; jika kamu laki-laki, pilih nama perempuan)",
"Pukul pantatmu dengan keras dan kirim suara tamparan melalui pesan suara 😂",
"Sebutkan tipe pacarmu dan kirim fotonya di sini dengan keterangan 'Perempuan/laki-laki paling jelek di dunia'",
"Teriak 'bravooooooooo' dan kirimkan melalui pesan suara di sini",
"Ambil foto wajahmu dan kirim di sini",
"Kirim foto dirimu dengan keterangan 'Aku lesbian'",
"Teriak dengan menggunakan kata-kata kasar dan kirim melalui pesan suara",
"Teriak 'kamu bajingan' di depan ibu atau ayahmu",
"Ubah nama menjadi *aku bodoh selama 24 jam*",
"Pukul dirimu sendiri dengan mantap dan kirim suara pukulan melalui pesan suara 😂",
"Ucapkan 'aku cinta pemilik bot alya' melalui pesan suara",
"Kirim foto pacar atau gebetanmu di sini",
"Buat video tantangan tarian TikTok apa pun dan unggah sebagai status, kamu bisa menghapusnya setelah 5 jam",
"Putuskan pertemanan dengan sahabatmu selama 5 jam tanpa memberitahunya bahwa itu adalah tantangan",
"Katakan pada salah satu temanmu bahwa kamu mencintainya dan ingin menikahinya, tanpa memberitahunya bahwa itu adalah tantangan",
"Ucapkan 'aku cinta Depak Kalal' melalui pesan suara",
"Tulis 'aku merasa horny' dan unggah sebagai status, kamu hanya bisa menghapusnya setelah 5 jam",
"Tulis 'aku lesbian' dan unggah sebagai status, kamu hanya bisa menghapusnya setelah 5 jam",
"Cium ibu atau ayahmu dan katakan 'aku mencintaimu' 😌",
"Jadikan nama ayahmu sebagai status selama 5 jam",
"Kirim kata-kata kasar dalam grup manapun, kecuali grup ini, dan kirim bukti tangkapan layarnya di sini"
]
              const xeondare = dare[Math.floor(Math.random() * dare.length)]
              bufferdare = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
              satanic.sendMessage(from, { image: bufferdare, caption: '_You choose DARE_\n'+ xeondare }, {quoted:fkontak})
              break
        break
       case 'truth':
              const truth =[
"Pernahkah kamu menyukai seseorang? Berapa lama?",
    "Jika kamu bisa atau jika kamu mau, grup obrolan atau grup di luar mana yang ingin kamu jadikan teman? (bisa berbeda/jenis yang sama)",
    "Apa ketakutan terbesar kamu?",
    "Pernahkah kamu menyukai seseorang dan merasa bahwa orang tersebut juga menyukaimu?",
    "Siapa nama mantan pacar temanmu yang dulu pernah kamu sukai diam-diam?",
    "Pernahkah kamu mengambil uang dari ayah atau ibumu? Alasannya?",
    "Apa yang membuatmu bahagia saat sedang sedih?",
    "Pernahkah kamu memiliki perasaan cinta satu arah? jika ya kepada siapa? bagaimana perasaannya, bro?",
    "Pernah menjadi selingkuhan seseorang?",
    "Hal paling ditakuti?",
    "Siapa orang yang paling berpengaruh dalam hidupmu?",
    "Prestasi apa yang berhasil kamu raih tahun ini?",
    "Siapa orang yang bisa membuatmu keren?",
    "Siapa orang yang pernah membuatmu sangat bahagia?",
    "Siapa yang paling mendekati tipe pasangan idamanmu di sini?",
    "Dengan siapa kamu suka bermain?",
    "Pernahkah kamu menolak seseorang? alasan mengapa?",
    "Sebutkan insiden yang pernah menyakiti perasaanmu yang masih kamu ingat",
    "Prestasi apa yang sudah kamu capai tahun ini?",
    "Kebiasaan terburukmu di sekolah?",
    "Lagu apa yang paling sering kamu nyanyikan di dalam kamar mandi?",
    "Pernahkah kamu mengalami pengalaman dekat dengan kematian?",
    "Kapan terakhir kali kamu sangat marah? Mengapa?",
    "Siapa orang terakhir yang meneleponmu?",
    "Apakah kamu memiliki bakat tersembunyi? Apa sajakah itu?",
    "Kata apa yang paling kamu benci?",
    "Video YouTube terakhir apa yang kamu tonton?",
    "Hal terakhir apa yang kamu cari di Google?",
    "Dalam grup ini, dengan siapa yang ingin kamu tukar kehidupan selama seminggu?",
    "Apa hal paling menakutkan yang pernah terjadi padamu?",
    "Pernahkah kamu kentut dan menyalahkannya kepada orang lain?",
    "Kapan terakhir kali kamu membuat orang lain menangis?",
    "Pernahkah kamu menghilangkan jejak dari seorang teman?",
    "Pernahkah kamu melihat mayat?",
    "Anggota keluargamu yang paling mengganggumu dan mengapa?",
    "Jika kamu harus menghapus satu aplikasi dari ponselmu, aplikasi mana yang akan kamu hapus?",
    "Aplikasi apa yang paling sering kamu buang-buang waktu di dalamnya?",
    "Pernahkah kamu berpura-pura sakit untuk pulang dari sekolah?",
    "Apa barang paling memalukan di dalam kamar kamarmu?",
    "Jika terdampar di pulau terpencil, lima barang apa yang akan kamu bawa?",
    "Pernahkah kamu tertawa begitu keras hingga pipismu basah?",
    "Apakah kamu mencium bau kentutmu sendiri?",
    "Pernahkah kamu kencing di tempat tidur saat tidur?",
    "Apa kesalahan terbesar yang pernah kamu buat?",
    "Pernahkah kamu mencontek dalam ujian?",
    "Apa hal terburuk yang pernah kamu lakukan?",
    "Kapan terakhir kali kamu menangis?",
    "Di antara orang tua kamu, siapa yang kamu cintai paling?",
    "Apakah kamu kadang-kadang memasukkan jari ke dalam lubang hidungmu?",
    "Siapa pujaan hati kamu saat masa sekolah dulu?",
    "Berbicara jujur, apakah kamu menyukai seorang anak laki-laki dalam grup ini?",
    "Pernahkah kamu menyukai seseorang? Berapa lama?",
    "Apakah kamu punya pacar? Apa ketakutan terbesarmu?",
    "Pernahkah kamu menyukai seseorang dan merasa bahwa orang tersebut juga menyukaimu?",
    "Siapa nama mantan pacar temanmu yang pernah kamu sukai diam-diam?",
    "Pernahkah kamu mengambil uang milik ibu atau ayahmu? Apa alasannya?",
    "Apa yang membuatmu bahagia saat sedang sedih?",
    "Apakah kamu menyukai seseorang dalam grup ini? Jika ya, siapa?",
    "Pernahkah kamu ditipu oleh seseorang?",
    "Siapa orang yang paling penting dalam hidupmu?",
    "Prestasi apa yang telah kamu capai tahun ini?",
    "Siapa orang yang bisa membuatmu bahagia saat sedang sedih?",
    "Siapa orang yang pernah membuatmu merasa tidak nyaman?",
    "Pernahkah kamu berbohong kepada orang tua?",
    "Apakah kamu masih menyukai mantan pacarmu?",
    "Siapa yang ingin kamu ajak bermain bersama?",
    "Pernahkah kamu mencuri sesuatu yang besar? Alasannya apa?",
    "Sebutkan insiden yang pernah membuatmu terluka dan masih kamu ingat?",
    "Prestasi apa yang sudah kamu raih tahun ini?",
    "Apa kebiasaan terburukmu saat di sekolah?",
    "Apakah kamu mencintai pencipta bot ini, Dani 😄",
    "Pernahkah kamu berpikir untuk membalas dendam pada guru?",
    "Apakah kamu menyukai perdana menteri saat ini di negaramu?",
    "Apakah kamu vegetarian atau non-vegetarian?",
    "Jika kamu bisa menjadi tak terlihat, apa yang pertama kali akan kamu lakukan?",
    "Apa rahasia yang kamu simpan dari orang tua kamu?",
    "Siapa pujaan hati rahasiamu?",
    "Siapa orang terakhir yang kamu intip di media sosial?",
    "Jika seorang jin memberimu tiga permintaan, apa yang akan kamu minta?",
    "Apa penyesalan terbesarmu?",
    "Hewan seperti apa menurutmu yang paling mirip denganmu?",
    "Berapa banyak foto selfie yang kamu ambil dalam sehari?",
    "Apa acara favoritmu saat masa kanak-kanak?",
    "Jika kamu bisa menjadi karakter fiksi dalam satu hari, siapa yang akan kamu pilih?",
    "Dengan siapa kamu paling sering mengirim pesan?",
    "Apa kebohongan terbesar yang pernah kamu ceritakan kepada orang tua kamu?",
    "Siapa selebriti yang menjadi pujaan hatimu?",
    "Mimpi paling aneh yang pernah kamu alami?",
    "Apakah kamu bermain PUBG? Jika ya, berikan nomor ID-mu."
]
              const alyaTruth = truth[Math.floor(Math.random() * truth.length)]
              buffertruth = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
              satanic.sendMessage(from, { image: buffertruth, caption: '_You choose TRUTH_\n'+ alyaTruth }, {quoted:fkontak})
              break
case 'ceksifat':              
case 'checkme': {
    const bet = m.sender
    const name = m.pushname || 'User'

    // helper random persen
    const rand100 = () => Math.floor(Math.random() * 101)

    const sifat = [
        "Baik", "Tidak ramah", "pembangkang", "Chapri", "Nibba/Nibbi", "Mengganggu",
        "Rusak", "Orang marah", "Sopan", "Beban", "Hebat",
        "Cringe", "Pembohong"
    ]

    const hobi = [
        "Memasak","Menari","Bermain","Bermain game","Melukis",
        "Membantu Orang Lain","Menonton anime","Membaca",
        "Bersepeda","Bernyanyi", "maling","rampok","maling ayam","berak","begal","Berbincang-bincang",
        "Berbagi Meme","Menggambar","Menghabiskan Uang Orang Tua",
        "Bermain Truth or Dare","Menghabiskan Waktu Sendirian"
    ]

    const cakep = ["Ya", "Tidak", "Sangat jelek", "Sangat tampan"]

    const watak = [
        "Peduli","Murah hati","Pemarah","Tunduk","Baik",
        "Berhati baik","Sabar","UwU","Terbaik","Membantu"
    ]

    // random hasil
    const result = {
        sifat: sifat[Math.floor(Math.random() * sifat.length)],
        hobi: hobi[Math.floor(Math.random() * hobi.length)],
        bucin: rand100(),
        great: rand100(),
        ganteng: cakep[Math.floor(Math.random() * cakep.length)],
        watak: watak[Math.floor(Math.random() * watak.length)],
        baik: rand100(),
        buruk: rand100(),
        cerdas: rand100(),
        berani: rand100(),
        penakut: rand100()
    }

    // ambil PP user
    let ppuser
    try {
        ppuser = await satanic.profilePictureUrl(bet, 'image')
    } catch {
        ppuser = defaultpp // fallback kalau PP private
    }

    const profile = `*≡══《 Check @${bet.split('@')[0]} 》══≡*

*Nama :* ${name}
*Karakteristik :* ${result.sifat}
*Hobi :* ${result.hobi}
*Bucin :* ${result.bucin}%
*Great :* ${result.great}%
*Ganteng :* ${result.ganteng}
*Watak :* ${result.watak}
*Moral Baik :* ${result.baik}%
*Moral Buruk :* ${result.buruk}%
*Kecerdasan :* ${result.cerdas}%
*Keberanian :* ${result.berani}%
*Penakut :* ${result.penakut}%

*≡═══《 CHECK PROPERTIES 》═══≡*`

    satanic.sendMessage(
        from,
        {
            image: { url: ppuser },
            caption: profile,
            mentions: [bet]
        },
        { quoted: fkontak }
    )
}
break   
case 'yatim':
case 'piatu':
case 'jomblo':
case 'waria':
case 'koruptor':
case 'psikopat':
case 'pedofil':
case 'miskin':
case 'tukangjajan':
case 'jelek':
case 'mokondo':
case 'penipu':
case 'tukangcopet':
case 'tukangbo':
case 'tukangcoli':
case 'ganteng':
case 'cantik':
case 'tobrut':
case 'kurus':
case 'gemuk':
case 'kontolgede':
case 'tepos':
case 'jomblo':
case 'korbanhts':
case 'badut':
case 'tukangselingkuh':
case 'palkon':
case 'perawantua':
case 'duda':
case 'botolyakult':
case 'sasimo':
case 'jelek':
case 'mukakontol':
case 'mukamemek':
case 'tukangkawin':
case 'maling':
case 'pelakor':
case 'perampok':
case 'begal':
case 'wibu':
case 'janda':
case 'jodohku': {
    if (!m.isGroup) return reply('only group')
    
    // Ambil participants dari store.groupMetadata
    let groupMeta = store.groupMetadata[m.chat]
    if (!groupMeta) {
        groupMeta = await satanic.groupMetadata(m.chat)
        store.groupMetadata[m.chat] = groupMeta
    }
    
    let member = groupMeta.participants.map(u => u.id)
    let me = m.sender
    let jodoh = member[Math.floor(Math.random() * member.length)]
    while (jodoh === me) {
        jodoh = member[Math.floor(Math.random() * member.length)]
    }
    
    let text = ` Anjayy ${command}\n\n@${jodoh.split('@')[0]}\n\n`
    
    satanic.sendMessage(m.chat, {
        text: text,
        mentions: [jodoh]
    }, { quoted: fkontak })
}
break
case 'cekyatim':
case 'cekjelek':
case 'cekjodoh':
case 'cekmiskin':
case 'cektolol':
case 'cekkaya':
case 'cekwibu': {

    if (!text && (!m.mentionedJid || m.mentionedJid.length === 0)) {
        return reply(`*CARA PAKAI:*\n\n${prefix}${command} @user\n${prefix}${command} nama orang\n\n*Contoh:*\n${prefix}${command} @${m.sender.split('@')[0]}\n${prefix}${command} budi`)
    }
    
    let target = 'kamu'
    let persen = Math.floor(Math.random()  * 100) + 1
    
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        return satanic.sendMessage(m.chat, {
            text: `*${persen}%*`,
            mentions: [m.mentionedJid[0]]
        }, { quoted: fkontak })
    }
    
    if (text) {
        target = text
    }
    
    reply(`${target} *${persen}%*`)
}
break
case 'ceknamabapak':
case 'namabapak':
case 'cekbapak': {
    if (!text && (!m.mentionedJid || m.mentionedJid.length === 0)) {
        return reply(`*CARA PAKAI:*\n\n${prefix}${command} @user\n${prefix}${command} nama orang\n\n*Contoh:*\n${prefix}${command} @${m.sender.split('@')[0]}\n${prefix}${command} Budi`)
    }
    
    let target = ''
    let isMention = false
    let mentionId = ''
    
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = `@${m.mentionedJid[0].split('@')[0]}`
        isMention = true
        mentionId = m.mentionedJid[0]
    } else if (text) {
        target = text.trim()
    }
    
    let namaBapak = [
        'Paijo', 'Tukul', 'Ucup', 'Bambang', 'Sule', 'Komeng', 'udin', 'yatno', 'ucok', 'agus', 'bahlil',
        'Somad', 'Jarwo', 'Bejo', 'Kasino', 'Dono', 'Indro',
        'Rambo', 'Joni', 'Agus', 'Budi', 'Joko', 'Mamat'
    ]
    
    let namaRandom = namaBapak[Math.floor(Math.random() * namaBapak.length)]
    
    let hasil = `Bapaknya *${target}* namanya *${namaRandom}* 🤣`
    
    if (isMention) {
        satanic.sendMessage(m.chat, {
            text: hasil,
            mentions: [mentionId]
        }, { quoted: fkontak })
    } else {
        reply(hasil)
    }
}
break
case "cekkontol": {

if (!text) return reply("nama nya mana pea")

let who = m.mentionedJid[0] 
? m.mentionedJid[0] 
: m.quoted 
? m.quoted.sender 
: m.sender;

// data random
let warnaList = ["hitam", "coklat", "pink", "abu-abu", "merah", "orange,", "kuning", "biru", "titanium", "silver"]
let ukuranList = ["kecil", "sedang", "besar", "sangat kecil", " sangat besar", "oversize"]
let kondisiList = ["belom sunat", "sudah sunat"," hitam berdaki", "miring kesamping", " biji nya ga simetris ", "ga bisa ngaceng"]

let pickRandom = (list) => list[Math.floor(Math.random() * list.length)]

let warna = pickRandom(warnaList)
let ukuran = pickRandom(ukuranList)
let kondisi = pickRandom(kondisiList)

reply(
`*Hasil Pengecekan Kontol*
-------------------------------------------
- *Warna*   : ${warna}
- *Ukuran*  : ${ukuran}
- *Kondisi* : ${kondisi}

> © Lumakara`,
{ mentions: [who] }
)
}
break
case "cekiqotak": {
  if (!text) return reply("namanya mana pea");

  let who = m.mentionedJid[0] 
    ? m.mentionedJid[0] 
    : m.quoted 
      ? m.quoted.sender 
      : m.sender;

  who = String(who || m.sender || '');

  let username = 'Tidak diketahui';
  try {
    const sender = m.sender;
    const targetJid = m.quoted ? m.quoted.sender : sender;
    if (targetJid && typeof targetJid === 'string') {
      username = await satanic.getName(targetJid) || username;
    }
  } catch (err) {
    console.error('Error getting username:', err);
  }

  let iq = Math.floor(Math.random() * (140 - 50 + 1) + 50);
  
  let kategori;
  if (iq >= 130) kategori = "Genius / Jenius";
  else if (iq >= 115) kategori = "Cerdas Sekali";
  else if (iq >= 100) kategori = "Cerdas";
  else if (iq >= 85) kategori = "Normal";
  else if (iq >= 70) kategori = "Batas Rendah";
  else kategori = "Rendah";

  let saran;
  if (iq >= 115) saran = "Pertahankan dan asah terus kemampuannya!";
  else if (iq >= 85) saran = "Masih normal, rajin belajar ya!";
  else saran = "Perlu banyak latihan dan belajar lebih giat!";

 reply(
    `HASIL TEST IQ
===========================================

IQ Score : ${iq}
Kategori : ${kategori}
Saran    : ${saran}
===========================================
> Lumakara`,
    { mentions: [who].filter(Boolean) }
  );
}
break;
case "cektete": {
  if (!text) return reply("namanya mana pea");

  let who = m.mentionedJid[0] 
    ? m.mentionedJid[0] 
    : m.quoted 
      ? m.quoted.sender 
      : m.sender;

  let ukuranBHList = ["30A", "30B", "30C", "30D", "32A", "32B", "32C", "32D", "32DD", "34A", "34B", "34C", "34D", "34DD", "36B", "36C", "36D", "36DD", "38C", "38D", "40D"];
  let ukuranList = ["Sangat Kecil (AAA)", "Kecil (AA)", "Sedang (A)", "Agak Besar (B)", "Besar (C)", "Cukup Besar (D)", "Besar Sekali (DD/E)", "Montok (F)", "Super Besar (G)"];
  let bentukList = ["Bulat Sempurna", "Lonjong", "Air Terjun (Ptosis)", "Timur Barat (East-West)", "Berjauhan (Wide Set)", "Berdekatan (Close Set)", "Asimetris", "Kendur", "Tegak Muda"];
  let kondisiList = ["Kencang & Kenyal", "Mulai Kendur", "Lembut", "Padat Berisi", "Longgar", "Firm", "Perky", "Sagging Ringan", "Sagging Berat"];
  let putingList = ["Kecil Mungil", "Sedang", "Besar", "Menonjol", "Rata", "Terbalik (Inverted)", "Kehitaman", "Merah Muda", "Coklat", "Berbulu Halus"];
  let teksturList = ["Mulus", "Berurat", "Berbintik", "Kasar", "Halus Seperti Sutra"];
  let elastisitasList = ["Sangat Elastis", "Elastis", "Kurang Elastis", "Tidak Elastis"];

  let pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

  let ukuranBH = pickRandom(ukuranBHList);
  let ukuran = pickRandom(ukuranList);
  let bentuk = pickRandom(bentukList);
  let kondisi = pickRandom(kondisiList);
  let puting = pickRandom(putingList);
  let tekstur = pickRandom(teksturList);
  let elastisitas = pickRandom(elastisitasList);

  // Random score
  let score = Math.floor(Math.random() * (100 - 50 + 1) + 50);
  let rating = score >= 85 ? "Premium" : score >= 70 ? "Good" : score >= 55 ? "Standard" : "Kurang";

  reply(
    `HASIL PENGECEKAN TETE
===========================================

Ukuran BH : ${ukuranBH}
Ukuran    : ${ukuran}
Bentuk    : ${bentuk}
Kondisi   : ${kondisi}
Puting    : ${puting}
Tekstur   : ${tekstur}
Elastisitas : ${elastisitas}
===========================================
Score     : ${score}/100
Rating    : ${rating}
===========================================
> Lumakara `,
    { mentions: [who] }
  );
}
break;
        
case "cekmemek": {

if (!text) return reply("namanya mana pea")

let who = m.mentionedJid[0] 
? m.mentionedJid[0] 
: m.quoted 
? m.quoted.sender 
: m.sender;

// data random
let warnaList = ["pink", "merah muda", "kehitaman", "putih", "kuning", "hijau muda"," biru muda"]
let ukuranList = ["sempit", "sedang", "lebar", "oversize", "sangat lebar", "sangat sempit"]
let kondisiList = ["masih fresh", "sudah berpengalaman", "perawan", "butuh perhatian", "udah longgar", "berkurap", "berjamur"]

let pickRandom = (list) => list[Math.floor(Math.random() * list.length)]

let warna = pickRandom(warnaList)
let ukuran = pickRandom(ukuranList)
let kondisi = pickRandom(kondisiList)

reply(
`*Hasil Pengecekan Meki*
-------------------------------------------
- *Warna*   : ${warna}
- *Ukuran*  : ${ukuran}
- *Kondisi* : ${kondisi}

> © Lumakara`,
{ mentions: [who] }
)
}
break

case 'cekkodam':
case 'kodam':
case 'cekkodamku': {
    let target = ''
    let isMention = false
    let mentionId = ''
    let persen = Math.floor(Math.random() * 100) + 1
    
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = `@${m.mentionedJid[0].split('@')[0]}`
        isMention = true
        mentionId = m.mentionedJid[0]
    } else if (text) {
        target = text.trim()
    } else {
        target = `@${m.sender.split('@')[0]}`
        isMention = true
        mentionId = m.sender
    }
    
    let kodam = [
        'Kodam Tuyul Ngamen', 'Kodam Tuyul London', 'Kodam Tuyul Dubai', 'Kodam Tuyul Jepang',
        'Kodam Genderuwo Baper', 'Kodam Genderuwo Galau', 'Kodam Genderuwo Mikir', 'Kodam Genderuwo Ngoding',
        'Kodam Pocong Kece', 'Kodam Pocong Badung', 'Kodam Pocong Gaul', 'Kodam Pocong Mewing',
        'Kodam Kuntilanak Cantik', 'Kodam Kuntilanak Modus', 'Kodam Kuntilanak Baper', 'Kodam Kuntilanak Jomblo',
        'Kodam Sundel Bolong Lari', 'Kodam Sundel Bolong Ngamen', 'Kodam Sundel Bolong Opo', 'Kodam Sundel Bolong Joget',
        'Kodam Leak Bali', 'Kodam Leak Sakti', 'Kodam Leak Ngamuk', 'Kodam Leak Nangis',
        'Kodam Wewe Gombel Jomblo', 'Kodam Wewe Gombel Galau', 'Kodam Wewe Gombel Baper', 'Kodam Wewe Gombel Mikir',
        'Kodam Jerangkong Ngegas', 'Kodam Jerangkong Baper', 'Kodam Jerangkong Ngopi', 'Kodam Jerangkong Nonton',
        'Kodam Hantu Boneka', 'Kodam Hantu TV', 'Kodam Hantu Kulkas', 'Kodam Hantu AC',
        'Kodam Pocong Merah', 'Kodam Pocong Hijau', 'Kodam Pocong Biru', 'Kodam Pocong Pink',
        'Kodam Kuyang Joget', 'Kodam Kuyang Ngamen', 'Kodam Kuyang Baper', 'Kodam Kuyang Nangis',
        'Kodam Sundel Galau', 'Kodam Sundel Baper', 'Kodam Sundel Mikir', 'Kodam Sundel Joget',
        'Kodam Genderuwo Opo', 'Kodam Genderuwo Wes', 'Kodam Genderuwo Kok', 'Kodam Genderuwo Lah',
        'Kodam Banaspati Ngamuk', 'Kodam Banaspati Galau', 'Kodam Banaspati Baper', 'Kodam Banaspati Mikir',
        'Kodam Tongkat Mbah', 'Kodam Tongkat Sakti', 'Kodam Tongkat Maut', 'Kodam Tongkat Petir',
        'Kodam Sapu Terbang', 'Kodam Sapu Lidi', 'Kodam Sapu Jagad', 'Kodam Sapu Tua',
        'Kodam Karpet Terbang', 'Kodam Karpet Sakti', 'Kodam Karpet Rusak', 'Kodam Karpet Basah',
        'Kodam Jubah Hitam', 'Kodam Jubah Putih', 'Kodam Jubah Sakti', 'Kodam Jubah Kotor',
        'Kodam Keris Pusaka', 'Kodam Keris Sakti', 'Kodam Keris Maut', 'Kodam Keris Tua',
        'Kodam Mustika Kecubung', 'Kodam Mustika Merah', 'Kodam Mustika Hitam', 'Kodam Mustika Putih',
        'Kodam Jimat Sakti', 'Kodam Jimat Maut', 'Kodam Jimat Tua', 'Kodam Jimat Pusaka',
        'Kodam Pelet Jawa', 'Kodam Pelet Sakti', 'Kodam Pelet Maut', 'Kodam Pelet Ampuh',
        'Kodam Susuk', 'Kodam Susuk Sakti', 'Kodam Susuk Maut', 'Kodam Susuk Emas',
        'Kodam Sendal Jepit', 'Kodam Sendal Swal', 'Kodam Sendal Hotel', 'Kodam Sendal Bolong',
        'Kodam Ember Bocor', 'Kodam Ember Plastik', 'Kodam Ember Besi', 'Kodam Ember Tua',
        'Kodam Gayung Nyleneh', 'Kodam Gayung Plastik', 'Kodam Gayung Besi', 'Kodam Gayung Tua',
        'Kodam Sapu Lidi', 'Kodam Sapu Ijuk', 'Kodam Sapu Tua', 'Kodam Sapu Baru',
        'Kodam Keset Muka', 'Kodam Keset Kaki', 'Kodam Keset Basah', 'Kodam Keset Kering',
        'Kodam Kipas Angin', 'Kodam Kipas Tangan', 'Kodam Kipas Rusak', 'Kodam Kipas Baru',
        'Kodam Lampu Bohlam', 'Kodam Lampu LED', 'Kodam Lampu Minyak', 'Kodam Lampu Petromak',
        'Kodam Kasur Busa', 'Kodam Kasur Kapuk', 'Kodam Kasur Bocor', 'Kodam Kasur Baru',
        'Kodam Bantal Guling', 'Kodam Bantal Busa', 'Kodam Bantal Kapuk', 'Kodam Bantal Bau',
        'Kodam Selimut', 'Kodam Selimut Basah', 'Kodam Selimut Kering', 'Kodam Selimut Baru',
        'Kodam Karpet', 'Kodam Karpet Basah', 'Kodam Karpet Kering', 'Kodam Karpet Baru',
        'Kodam Hape Jadul', 'Kodam Hape Batrey', 'Kodam Hape Error', 'Kodam Hape Lemot',
        'Kodam TV Tabung', 'Kodam TV Digital', 'Kodam TV Rusak', 'Kodam TV Butut'
    ]
    
    let randomKodam = kodam[Math.floor(Math.random() * kodam.length)]
    
    let hasil = `🔮 *CEK KODAM* 🔮\n\n👤 ${target}\n🎲 Kodam: ${randomKodam}\n📊 Level: ${persen}%\n\n🤣🤣🤣`
    
    if (isMention) {
        satanic.sendMessage(m.chat, {
            text: hasil,
            mentions: [mentionId]
        }, { quoted: fkontak })
    } else {
        reply(hasil)
    }
}
break
case 'ulartangga': {
    if (!m.isGroup) return reply('❌ Hanya bisa digunakan di grup!')

class GameSession {
    constructor(id, sMsg) {
        this.id = id
        this.players = []
        this.game = new SnakeAndLadderGame(sMsg)
    }
}
class SnakeAndLadderGame {
    constructor(sMsg) {
        this.sendMsg = sMsg
        this.players = []
        this.boardSize = 100
        this.snakesAndLadders = [
            { start: 29, end: 7 }, { start: 24, end: 12 }, { start: 15, end: 37 },
            { start: 23, end: 41 }, { start: 72, end: 36 }, { start: 49, end: 86 },
            { start: 90, end: 56 }, { start: 75, end: 64 }, { start: 74, end: 95 },
            { start: 91, end: 72 }, { start: 97, end: 78 }
        ]
        this.currentPositions = {}
        this.currentPlayerIndex = 0
        this.bgImageUrl = 'https://i.pinimg.com/originals/2f/68/a7/2f68a7e1eee18556b055418f7305b3c0.jpg'
        this.player1ImageUrl = 'https://i.pinimg.com/originals/75/33/22/7533227c53f6c270a96d364b595d6dd5.jpg'
        this.player2ImageUrl = 'https://i.pinimg.com/originals/be/68/13/be6813a6086681070b0f886d33ca4df9.jpg'
        this.bgImage = null
        this.player1Image = null
        this.player2Image = null
        this.cellWidth = 40
        this.cellHeight = 40
        this.keyId = null
        this.started = false
    }

    initializeGame() {
        for (const player of this.players) {
            this.currentPositions[player] = 1
        }
        this.currentPlayerIndex = 0
        this.started = true
    }

    rollDice() {
        return Math.floor(Math.random() * 6) + 1
    }

    async movePlayer(player, steps) {
        if (this.players.length === 0) return
        const currentPosition = this.currentPositions[player]
        let newPosition = currentPosition + steps
        for (const otherPlayer of this.players) {
            if (otherPlayer !== player && this.currentPositions[otherPlayer] === newPosition) {
                const message = `😱 *Oh tidak!* ${player.split('@')[0]} *diinjak oleh* ${otherPlayer.split('@')[0]}.* Kembali ke awal cell.*`
                await reply(message)
                newPosition = 1
            }
        }
        const snakeOrLadder = this.snakesAndLadders.find(s => s.start === newPosition)
        if (snakeOrLadder) newPosition = snakeOrLadder.end
        newPosition = Math.min(newPosition, this.boardSize)
        this.currentPositions[player] = newPosition
    }

    async fetchImage(url) {
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' })
            return await jimp.read(Buffer.from(response.data, 'binary'))
        } catch (error) {
            console.error(`Error fetching image from ${url}:`, error)
            throw error
        }
    }

    async getBoardBuffer() {
        const board = new jimp(420, 420)
        this.bgImage.resize(420, 420)
        board.composite(this.bgImage, 0, 0)
        for (const player of this.players) {
            const playerPosition = this.currentPositions[player]
            const playerImage = player === this.players[0] ? this.player1Image : this.player2Image
            const playerX = ((playerPosition - 1) % 10) * this.cellWidth + 10
            const playerY = (9 - Math.floor((playerPosition - 1) / 10)) * this.cellHeight + 10
            board.composite(playerImage.clone().resize(this.cellWidth, this.cellHeight), playerX, playerY)
        }
        return board.getBufferAsync(jimp.MIME_PNG)
    }

    async startGame(m, player1Name, player2Name) {
        await reply(`🐍🎲 *Selamat datang di Permainan Ular Tangga!* 🎲🐍 \n\n${player1Name.split('@')[0]} vs ${player2Name.split('@')[0]}`)
        this.players = [player1Name, player2Name]
        this.initializeGame()
        if (!this.bgImage) this.bgImage = await this.fetchImage(this.bgImageUrl)
        if (!this.player1Image) this.player1Image = await this.fetchImage(this.player1ImageUrl)
        if (!this.player2Image) this.player2Image = await this.fetchImage(this.player2ImageUrl)
        const boardBuffer = await this.getBoardBuffer()
        const { key } = await satanic.sendMessage(m.chat, { image: boardBuffer }, { quoted: fkontak })
        this.keyId = key
    }

    async playTurn(m, player) {
        if (!this.players.length) {
            await reply('🛑 *Tidak ada permainan aktif.* Gunakan ".ulartangga start" untuk memulai permainan baru.')
            return
        }
        if (player !== this.players[this.currentPlayerIndex]) {
            await reply(`🕒 *Bukan giliranmu.* \n\nSekarang giliran ${this.players[this.currentPlayerIndex].split('@')[0]}`)
            return
        }
        const diceRoll = this.rollDice()
        await reply(`🎲 ${player.split('@')[0]} *melempar dadu.*\n\n  - Dadu: *${diceRoll}*\n  - Dari kotak: *${this.currentPositions[player]}*\n  - Ke kotak: *${this.currentPositions[player] + diceRoll}*`)
        if (diceRoll !== 6) {
            this.movePlayer(player, diceRoll)
            const snakeOrLadder = this.snakesAndLadders.find(s => s.start === this.currentPositions[player])
            if (snakeOrLadder) {
                const action = snakeOrLadder.end < snakeOrLadder.start ? 'Mundur' : 'Maju'
                await reply(`🐍 ${player.split('@')[0]} menemukan ${action === 'Mundur' ? 'ular' : 'tangga'}! ${action} *ke kotak ${snakeOrLadder.end}.*`)
                this.currentPositions[player] = snakeOrLadder.end
            }
        }
        if (diceRoll !== 6) {
            this.switchPlayer()
        } else {
            await reply('🎲 Anda mendapat 6, jadi giliran Anda masih berlanjut.')
            this.movePlayer(player, diceRoll)
        }
        if (this.currentPositions[player] === this.boardSize) {
            await reply(`🎉 ${player.split('@')[0]} menang! Selamat!`)
            this.resetSession()
        }
        const boardBuffer = await this.getBoardBuffer()
        const sendMsg = this.sendMsg
        await sendMsg.sendMessage(m.chat, { delete: this.keyId })
        const { key } = await satanic.sendMessage(m.chat, { image: boardBuffer }, { quoted: fkontak })
        this.keyId = key
        return
    }

    addPlayer(player) {
        if (this.players.length < 2 && !this.players.includes(player) && player !== '') {
            this.players.push(player)
            return true
        } else {
            return false
        }
    }

    switchPlayer() {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex
    }

    resetSession() {
        this.players = []
        this.currentPositions = {}
        this.currentPlayerIndex = 0
        this.started = false
    }

    isGameStarted() {
        return this.started
    }
}
    // Inisialisasi objek game jika belum ada
    satanic.ulartangga = satanic.ulartangga || {}
    const sessions = satanic.ulartangga_ = satanic.ulartangga_ || {}
    const sessionId = m.chat
    const session = sessions[sessionId] || (sessions[sessionId] = new GameSession(sessionId, satanic))
    const game = session.game
    const { state } = satanic.ulartangga[m.chat] || { state: false }

    switch (args[0]) {
        case 'join':
            if (state) return reply('🛑 *Permainan sudah dimulai.* Tidak dapat bergabung.')
            const playerName = m.sender
            const joinSuccess = game.addPlayer(playerName)
            joinSuccess
                ? reply(`👋 ${playerName.split('@')[0]} *bergabung ke dalam permainan.*`)
                : reply('*Anda sudah bergabung atau permainan sudah penuh.* Tidak dapat bergabung.')
            break

        case 'start':
            if (state) return reply('🛑 *Permainan sudah dimulai.* Tidak dapat memulai ulang.')
            satanic.ulartangga[m.chat] = { ...satanic.ulartangga[m.chat], state: true }
            if (game.players.length === 2) {
                await game.startGame(m, game.players[0], game.players[1])
            } else {
                reply('👥 *Tidak cukup pemain untuk memulai permainan.* Diperlukan minimal 2 pemain.')
            }
            break

        case 'roll':
            if (!state) return reply('🛑 *Permainan belum dimulai.* Ketik ".ulartangga start" untuk memulai.')
            if (game.isGameStarted()) {
                const currentPlayer = game.players[game.currentPlayerIndex]
                if (m.sender !== currentPlayer) {
                    reply(`🕒 *Bukan giliranmu.* \n\nSekarang giliran ${currentPlayer.split('@')[0]}`)
                } else {
                    await game.playTurn(m, currentPlayer)
                }
            } else {
                reply('🛑 *Permainan belum dimulai.* Ketik ".ulartangga start" untuk memulai.')
            }
            break

        case 'reset':
            satanic.ulartangga[m.chat] = { ...satanic.ulartangga[m.chat], state: false }
            session.game.resetSession()
            delete sessions[sessionId]
            reply('🔄 *Sesi permainan direset.*')
            break

        case 'help':
            reply(`🎲🐍 *Permainan Ular Tangga* 🐍🎲\n\n*Commands:*\n- ${prefix + command} join : Bergabung ke dalam permainan.\n- ${prefix + command} start : Memulai permainan.\n- ${prefix + command} roll : Melempar dadu untuk bergerak.\n- ${prefix + command} reset : Mereset sesi permainan.`)
            break

        default:
            reply(`❓ *Perintah tidak valid.* Gunakan ${prefix + command} help untuk melihat daftar perintah.`)
    }
}
break;
case 'ttc': case 'ttt': case 'tictactoe': {
            let TicTacToe = require("./lib/tictactoe")
            this.game = this.game ? this.game : {}
            if (Object.values(this.game).find(room13 => room13.id.startsWith('tictactoe') && [room13.game.playerX, room13.game.playerO].includes(m.sender))) return reply(`You Are Still In The Game`)
            let room13 = Object.values(this.game).find(room13 => room13.state === 'WAITING' && (text ? room13.name === text : true))
            if (room13) {
            room13.o = m.chat
            room13.game.playerO = m.sender
            room13.state = 'PLAYING'
            let arr = room13.game.render().map(v => {
            return {
            X: '❌',
            O: '⭕',
            1: '1️⃣',
            2: '2️⃣',
            3: '3️⃣',
            4: '4️⃣',
            5: '5️⃣',
            6: '6️⃣',
            7: '7️⃣',
            8: '8️⃣',
            9: '9️⃣',
            }[v]
            })
            let str = `room13 ID: ${room13.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

Waiting @${room13.game.currentTurn.split('@')[0]}

Type *surrender* to surrender and admit defeat`
            if (room13.x !== room13.o) await satanic.sendText(room13.x, str, m, { mentions: parseMention(str) } )
            await satanic.sendText(room13.o, str, m, { mentions: parseMention(str) } )
            } else {
            room13 = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
            }
            if (text) room13.name = text
            reply('Waiting For Partner' + (text ? ` Type The Command Below ${prefix}${command} ${text}` : ''))
            this.game[room13.id] = room13
            }
            }
            break
            case 'delttc': case 'delttt': {
            this.game = this.game ? this.game : {}
            try {
            if (this.game) {
            delete this.game
            satanic.sendText(m.chat, `Successfully deleted TicTacToe session`, m)
            } else if (!this.game) {
            reply(`Session TicTacToe🎮 does not exist`)
            } else throw '?'
            } catch (e) {
            reply('damaged')
            }
            }
            break
         
            case 'tebakbom': {
    if (!m.isGroup) return reply('❌ Hanya bisa digunakan di grup!')

    satanic.bomb = satanic.bomb || {}
    let id = m.chat
    let timeout = 180000

    // Cek apakah user kirim angka langsung atau nyerah saat game aktif
    if (id in satanic.bomb) {
        let body = args[0]
        let sender = m.sender.split('@')[0]
        
        // Cek nyerah
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(body)
        if (isSurrender) {
            reply(`🚩 ${sender} menyerah!`)
            clearTimeout(satanic.bomb[id][2])
            delete satanic.bomb[id]
            return
        }

        // Cek angka
        if (!isNaN(body)) {
            let pick = satanic.bomb[id][1].find(v => v.pos == Number(body))
            if (!pick) return reply('Kirim angka 1 - 9')

            if (pick.open)
                return reply(`Kotak ${pick.number} sudah dibuka`)

            pick.open = true
            let grids = satanic.bomb[id][1]

            let render = () => {
                let t = `乂  *B O M B*\n\n`
                for (let i = 0; i < grids.length; i += 3)
                    t += grids.slice(i, i + 3).map(v => v.open ? v.emot : v.number).join('') + '\n'
                return t
            }

            if (pick.emot === '💥') {
                let teks2 = render()
                teks2 += `\n\n💥 BOM MELEDAK!\n${sender} kalah!`

                reply(teks2)
                clearTimeout(satanic.bomb[id][2])
                delete satanic.bomb[id]
                return
            }

            let safeOpen = grids.filter(v => v.open && v.emot !== '💥').length
            if (safeOpen >= 8) {
                let teks2 = render()
                teks2 += `\n\n🎉 MENANG!\nSemua kotak aman terbuka!`

                reply(teks2)
                clearTimeout(satanic.bomb[id][2])
                delete satanic.bomb[id]
                return
            }

            let teks2 = render()
            teks2 += `\n\n✨ Aman! Lanjutkan!`

            reply(teks2)
            return
        }
    }

    // Command untuk start game
    if (id in satanic.bomb)
        return reply('*^ sesi ini belum selesai!*')

    const bom = ['💥','✅','✅','✅','✅','✅','✅','✅','✅']
        .sort(() => Math.random() - 0.5)

    const number = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']

    const grid = bom.map((v, i) => ({
        emot: v,
        number: number[i],
        pos: i + 1,
        open: false
    }))

    let teks = `乂  *B O M B*\n\nKirim angka *1 - 9* untuk membuka kotak:\n\n`
    for (let i = 0; i < grid.length; i += 3)
        teks += grid.slice(i, i + 3).map(v => v.open ? v.emot : v.number).join('') + '\n'

    teks += `\n⏳ Timeout : ${timeout/60000} menit`
    teks += `\n💣 Jika kena bom, kamu kalah!`
    teks += `\n\nKetik .tebakbom nyerah untuk menyerah\n\n untuk membuka kotak bom ketik .tebakbom 1`

    let msg = await reply(teks)

    satanic.bomb[id] = [
        msg,
        grid,
        setTimeout(() => {
            let b = grid.find(v => v.emot === '💥')
            if (satanic.bomb[id])
                reply(`⏰ Waktu habis!\nBom di kotak ${b.pos}`, msg)
            delete satanic.bomb[id]
        }, timeout)
    ]
}
break
case 'apakah': {
              if (!text) return reply(`Contoh: ${command} saya ganteng?`)
              const jawaban = ['Iya', 'Mungkin iya', 'Mungkin', 'Gak', 'Mungkin gak', 'Gak tau']
              const coli = jawaban[Math.floor(Math.random() * jawaban.length)]
              reply(`*Pertanyaan:* Apakah ${text}\n*Jawaban:* ${coli}`)
            }
            break

            case 'bisakah': {
              if (!text) return reply(`Contoh: ${command} saya jadi kaya?`)
              const jawaban = ['Bisa banget', 'Bisa', 'Mungkin bisa', 'Mungkin', 'Gak bisa', 'Mungkin gak bisa', 'Gak bisa lah', 'Gak tau']
              const coli = jawaban[Math.floor(Math.random() * jawaban.length)]
              reply(`*Pertanyaan:* Bisakah ${text}\n*Jawaban:* ${coli}`)
            }
            break

            case 'kapankah': {
              if (!text) return reply(`Contoh: ${command} saya kaya?`)
              const jawabanWaktu = [
                'Bentar lagi',
                'Nunggu kiamat dulu',
                'Kapan-kapan',
                'Besok',
                'yo ndak tau',
                'Pas lu tidur',
                'Gw juga gak tau kapan'
              ]
              const waktuRandom = Math.floor(Math.random() * 10) + 1
              const unitWaktu = ['minggu', 'bulan', 'tahun']
              const unitWaktuRandom = unitWaktu[Math.floor(Math.random() * unitWaktu.length)]
              const jawaban = [...jawabanWaktu, `${waktuRandom} ${unitWaktuRandom} lagi`]
              const hasilJawaban = jawaban[Math.floor(Math.random() * jawaban.length)]
              reply(`*Pertanyaan:* Kapankah ${text}\n*Jawaban:* ${hasilJawaban}`)
            }
            break

case "randomchina":
case "china": {

    const data = "https://api.siputzx.my.id/api/r/cecan/china";
    await satanic.sendMessage(m.chat, {
        image: { url: data },
        caption: ""
    }, { quoted: fkontak });
}
break;
case "randomindo":
case "indo": {

    const data = "https://api.siputzx.my.id/api/r/cecan/indonesia";
    await satanic.sendMessage(m.chat, {
        image: { url: data },
        caption: ""
    }, { quoted: fkontak });
}
break;
case "waifu": {
    const data = "https://api.siputzx.my.id/api/r/waifu";
    await satanic.sendMessage(m.chat, {
        image: { url: data },
        caption: ""
    }, { quoted: fkontak });
}
break;
case "randomneko":
case "neko": {

    const data = "https://api.siputzx.my.id/api/r/neko";
    await satanic.sendMessage(m.chat, {
        image: { url: data },
        caption: ""
    }, { quoted: fkontak });
}
break;
case "randomvietnam":
case "vietnam": {

    const data = "https://api.siputzx.my.id/api/r/cecan/vietnam";
    await satanic.sendMessage(m.chat, {
        image: { url: data },
        caption: ""
    }, { quoted: fkontak });
}
break;
case "randomthailand":
case "thailand": {

    const data = "https://api.siputzx.my.id/api/r/cecan/thailand";
    await satanic.sendMessage(m.chat, {
        image: { url: data },
        caption: ""
    }, { quoted: fkontak });
}
break;
case "randomkorea":
case "korea": {

    const data = "https://api.siputzx.my.id/api/r/cecan/korea";
    await satanic.sendMessage(m.chat, {
        image: { url: data },
        caption: ""
    }, { quoted: fkontak });
}
break;
case "randomjapan":
case "japan": {

    const data = "https://api.siputzx.my.id/api/r/cecan/japan";
    await satanic.sendMessage(m.chat, {
        image: { url: data },
        caption: ""
    }, { quoted: fkontak });
}
break;
case 'artimimpi': case 'tafsirmimpi': {

if (!text) return reply(`Contoh : ${cmd} belanja`)
let anu = await primbon.tafsir_mimpi(text)
if (anu.status == false) return reply(anu.message)
reply(`• *Mimpi :* ${anu.message.mimpi}\n• *Arti :* ${anu.message.arti}\n• *Solusi :* ${anu.message.solusi}`)
}
break
case 'ramalanjodoh': case 'ramaljodoh': {

if (!text) return reply(`Contoh : ${cmd} Dika, 7, 7, 2005, Novia, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
let anu = await primbon.ramalan_jodoh(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`• *Nama Anda :* ${anu.message.nama_anda.nama}\n• *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n• *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n• *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'ramalanjodohbali': case 'ramaljodohbali': {

if (!text) return reply(`Contoh : ${cmd} Dika, 7, 7, 2005, Novia, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
let anu = await primbon.ramalan_jodoh_bali(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`• *Nama Anda :* ${anu.message.nama_anda.nama}\n• *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n• *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n• *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'suamiistri': {

if (!text) return reply(`Contoh : ${cmd} Dika, 7, 7, 2005, Novia, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
let anu = await primbon.suami_istri(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`• *Nama Suami :* ${anu.message.suami.nama}\n• *Lahir Suami :* ${anu.message.suami.tgl_lahir}\n• *Nama Istri :* ${anu.message.istri.nama}\n• *Lahir Istri :* ${anu.message.istri.tgl_lahir}\n• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'ramalancinta': case 'ramalcinta': {

if (!text) return reply(`Contoh : ${cmd} Dika, 7, 7, 2005, Novia, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
let anu = await primbon.ramalan_cinta(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`• *Nama Anda :* ${anu.message.nama_anda.nama}\n• *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n• *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n• *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n• *Sisi Positif :* ${anu.message.sisi_positif}\n• *Sisi Negatif :* ${anu.message.sisi_negatif}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'artinama': {

if (!text) return reply(`Contoh : ${cmd} Dika Ardianta`)
let anu = await primbon.arti_nama(text)
if (anu.status == false) return reply(anu.message)
reply(`• *Nama :* ${anu.message.nama}\n• *Arti :* ${anu.message.arti}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'kecocokannama': case 'cocoknama': {

if (!text) return reply(`Contoh : ${cmd} Dika, 7, 7, 2005`)
let [nama, tgl, bln, thn] = text.split`,`
let anu = await primbon.kecocokan_nama(nama, tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Nama :* ${anu.message.nama}\n• *Lahir :* ${anu.message.tgl_lahir}\n• *Life Path :* ${anu.message.life_path}\n• *Destiny :* ${anu.message.destiny}\n• *Destiny Desire :* ${anu.message.destiny_desire}\n• *Personality :* ${anu.message.personality}\n• *Persentase :* ${anu.message.persentase_kecocokan}`)
}
break
case 'kecocokanpasangan': case 'cocokpasangan': case 'pasangan': {

if (!text) return reply(`Contoh : ${cmd} Dika|Novia`)
let [nama1, nama2] = text.split`|`
let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2)
if (anu.status == false) return reply(anu.message)
sock.sendImage(m.chat,  anu.message.gambar, `• *Nama Anda :* ${anu.message.nama_anda}\n• *Nama Pasangan :* ${anu.message.nama_pasangan}\n• *Sisi Positif :* ${anu.message.sisi_positif}\n• *Sisi Negatif :* ${anu.message.sisi_negatif}`)
}
break
case 'jadianpernikahan': case 'jadiannikah': {

if (!text) return reply(`Contoh : ${cmd} 6, 12, 2020`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.tanggal_jadian_pernikahan(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Tanggal Pernikahan :* ${anu.message.tanggal}\n• *karakteristik :* ${anu.message.karakteristik}`)
}
break
case 'sifatusaha': {

if (!ext)return reply(`Contoh : ${prefix+ command} 28, 12, 2021`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Lahir :* ${anu.message.hari_lahir}\n• *Usaha :* ${anu.message.usaha}`)
}
break
case  ' rejeki': case 'rezeki': {

if (!text) return reply(`Contoh : ${cmd} 7, 7, 2005`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.rejeki_hoki_weton(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Lahir :* ${anu.message.hari_lahir}\n• *Rezeki :* ${anu.message.rejeki}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'pekerjaan': {

if (!text) return reply(`Contoh : ${cmd} 7, 7, 2005`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.pekerjaan_weton_lahir(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Lahir :* ${anu.message.hari_lahir}\n• *Pekerjaan :* ${anu.message.pekerjaan}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'ramalannasib': case 'ramalnasib': case 'nasib': {

if (!text) return reply(`Contoh : 7, 7, 2005`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.ramalan_nasib(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Analisa :* ${anu.message.analisa}\n• *Angka Akar :* ${anu.message.angka_akar}\n• *Sifat :* ${anu.message.sifat}\n• *Elemen :* ${anu.message.elemen}\n• *Angka Keberuntungan :* ${anu.message.angka_keberuntungan}`)
}
break
case 'potensipenyakit': case 'penyakit': {

if (!text) return reply(`Contoh : ${cmd} 7, 7, 2005`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.cek_potensi_penyakit(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Analisa :* ${anu.message.analisa}\n• *Sektor :* ${anu.message.sektor}\n• *Elemen :* ${anu.message.elemen}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'artitarot': case 'tarot': {

if (!text) return reply(`Contoh : ${cmd} 7, 7, 2005`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.arti_kartu_tarot(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
sock.sendImage(m.chat, anu.message.image, `• *Lahir :* ${anu.message.tgl_lahir}\n• *Simbol Tarot :* ${anu.message.simbol_tarot}\n• *Arti :* ${anu.message.arti}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'fengshui': {

if (!text) return `Contoh : ${cmd} Dika, 1, 2005\n\nNote : ${cmd} Nama, gender, tahun lahir\nGender : 1 untuk laki-laki & 2 untuk perempuan`
let [nama, gender, tahun] = text.split`,`
let anu = await primbon.perhitungan_feng_shui(nama, gender, tahun)
if (anu.status == false) return reply(anu.message)
reply(`• *Nama :* ${anu.message.nama}\n• *Lahir :* ${anu.message.tahun_lahir}\n• *Gender :* ${anu.message.jenis_kelamin}\n• *Angka Kua :* ${anu.message.angka_kua}\n• *Kelompok :* ${anu.message.kelompok}\n• *Karakter :* ${anu.message.karakter}\n• *Sektor Baik :* ${anu.message.sektor_baik}\n• *Sektor Buruk :* ${anu.message.sektor_buruk}`)
}
break
case 'haribaik': {

if (!text) return reply(`Contoh : ${cmd} 7, 7, 2005`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.petung_hari_baik(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Lahir :* ${anu.message.tgl_lahir}\n• *Kala Tinantang :* ${anu.message.kala_tinantang}\n• *Info :* ${anu.message.info}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'harisangar': case 'taliwangke': {

if (!text) return reply(`Contoh : ${cmd} 7, 7, 2005`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.hari_sangar_taliwangke(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Lahir :* ${anu.message.tgl_lahir}\n• *Hasil :* ${anu.message.result}\n• *Info :* ${anu.message.info}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'harinaas': case 'harisial': {

if (!text) return reply(`Contoh : ${cmd} 7, 7, 2005`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.primbon_hari_naas(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Hari Lahir :* ${anu.message.hari_lahir}\n• *Tanggal Lahir :* ${anu.message.tgl_lahir}\n• *Hari Naas :* ${anu.message.hari_naas}\n• *Info :* ${anu.message.catatan}\n• *Catatan :* ${anu.message.info}`)
}
break
case 'nagahari': case 'harinaga': {

if (!text) return reply(`Contoh : ${cmd} 7, 7, 2005`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.rahasia_naga_hari(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Hari Lahir :* ${anu.message.hari_lahir}\n• *Tanggal Lahir :* ${anu.message.tgl_lahir}\n• *Arah Naga Hari :* ${anu.message.arah_naga_hari}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'arahrejeki': case 'arahrezeki': {

if (!text) return reply(`Contoh : ${cmd} 7, 7, 2005`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.primbon_arah_rejeki(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Hari Lahir :* ${anu.message.hari_lahir}\n• *tanggal Lahir :* ${anu.message.tgl_lahir}\n• *Arah Rezeki :* ${anu.message.arah_rejeki}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'peruntungan': {

if (!text) return reply(`Contoh : ${cmd} DIka, 7, 7, 2005, 2022\n\nNote : ${cmd} Nama, tanggal lahir, bulan lahir, tahun lahir, untuk tahun`)
let [nama, tgl, bln, thn, untuk] = text.split`,`
let anu = await primbon.ramalan_peruntungan(nama, tgl, bln, thn, untuk)
if (anu.status == false) return reply(anu.message)
reply(`• *Nama :* ${anu.message.nama}\n• *Lahir :* ${anu.message.tgl_lahir}\n• *Peruntungan Tahun :* ${anu.message.peruntungan_tahun}\n• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'weton': case 'wetonjawa': {

if (!text) return reply(`Contoh : ${cmd} 7, 7, 2005`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.weton_jawa(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Tanggal :* ${anu.message.tanggal}\n• *Jumlah Neptu :* ${anu.message.jumlah_neptu}\n• *Watak Hari :* ${anu.message.watak_hari}\n• *Naga Hari :* ${anu.message.naga_hari}\n• *Jam Baik :* ${anu.message.jam_baik}\n• *Watak Kelahiran :* ${anu.message.watak_kelahiran}`)
}
break
case 'sifat': case 'karakter': {

if (!text) return reply(`Contoh : ${cmd} Dika, 7, 7, 2005`)
let [nama, tgl, bln, thn] = text.split`,`
let anu = await primbon.sifat_karakter_tanggal_lahir(nama, tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Nama :* ${anu.message.nama}\n• *Lahir :* ${anu.message.tgl_lahir}\n• *Garis Hidup :* ${anu.message.garis_hidup}`)
}
break
case 'keberuntungan': {

if (!text) return reply(`Contoh : ${cmd} Dika, 7, 7, 2005`)
let [nama, tgl, bln, thn] = text.split`,`
let anu = await primbon.potensi_keberuntungan(nama, tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Nama :* ${anu.message.nama}\n• *Lahir :* ${anu.message.tgl_lahir}\n• *Hasil :* ${anu.message.result}`)
}
break
case 'memancing': {

if (!text) return reply(`Contoh : ${cmd} 12, 1, 2022`)
let [tgl, bln, thn] = text.split`,`
let anu = await primbon.primbon_memancing_ikan(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`• *Tanggal :* ${anu.message.tgl_memancing}\n• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`)
}
break

case 'masasubur': {

if (!text) return reply(`Contoh : ${cmd} 12, 1, 2022, 28\n\nNote : ${cmd} hari pertama menstruasi, siklus`)
let [tgl, bln, thn, siklus] = text.split`,`
let anu = await primbon.masa_subur(tgl, bln, thn, siklus)
if (anu.status == false) return reply(anu.message)
reply(`• *Hasil :* ${anu.message.result}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'zodiak': case 'zodiac': {

if (!text) return reply(`Contoh : ${prefix+ command} 7 7 2005`)
let zodiak = [
["capricorn", new Date(1970, 0, 1)],
["aquarius", new Date(1970, 0, 20)],
["pisces", new Date(1970, 1, 19)],
["aries", new Date(1970, 2, 21)],
["taurus", new Date(1970, 3, 21)],
["gemini", new Date(1970, 4, 21)],
["cancer", new Date(1970, 5, 22)],
["leo", new Date(1970, 6, 23)],
["virgo", new Date(1970, 7, 23)],
["libra", new Date(1970, 8, 23)],
["scorpio", new Date(1970, 9, 23)],
["sagittarius", new Date(1970, 10, 22)],
["capricorn", new Date(1970, 11, 22)]
].reverse()

function getZodiac(month, day) {
let d = new Date(1970, month - 1, day)
return zodiak.find(([_,_d]) => d >= _d)[0]
}
let date = new Date(text)
if (date == 'Invalid Date') return date
let d = new Date()
let [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
let birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]

let zodiac = await getZodiac(birth[1], birth[2])

let anu = await primbon.zodiak(zodiac)
if (anu.status == false) return reply(anu.message)
reply(`• *Zodiak :* ${anu.message.zodiak}\n• *Nomor :* ${anu.message.nomor_keberuntungan}\n• *Aroma :* ${anu.message.aroma_keberuntungan}\n• *Planet :* ${anu.message.planet_yang_mengitari}\n• *Bunga :* ${anu.message.bunga_keberuntungan}\n• *Warna :* ${anu.message.warna_keberuntungan}\n• *Batu :* ${anu.message.batu_keberuntungan}\n• *Elemen :* ${anu.message.elemen_keberuntungan}\n• *Pasangan Zodiak :* ${anu.message.pasangan_zodiak}\n• *Catatan :* ${anu.message.catatan}`)
}
break
case 'shio': {

if (!text) return reply(`Contoh : ${cmd} tikus\n\nNote : For Detail https://primbon.com/shio.htm`)
let anu = await primbon.shio(text)
if (anu.status == false) return reply(anu.message)
reply(`• *Hasil :* ${anu.message}`)
}
break

/////// BATAS AKHIR IMAGE EDITOR ////////
default:
// Tambahkan method ini di class utama bot
if (m.chat.endsWith('@s.whatsapp.net') && !m.fromMe) {
    const isCommand = m.text && m.text.startsWith(prefix);
    if (!isCommand) {
        satanic.menfes = satanic.menfes ?? {};
        const session = Object.values(satanic.menfes).find(room => room.state === 'CHATTING' && [room.a, room.b].includes(m.sender));
        if (session) {
            const target = session.a === m.sender ? session.b : session.a;
            await m.copyNForward(target, true, m.quoted && m.quoted.fromMe ? {
                contextInfo: {
                    ...m.msg.contextInfo,
                    forwardingScore: 0,
                    isForwarded: true,
                    participant: target
                }
            } : {});
            return;
        }
    }
}	    
    
if (budy.startsWith('vv')) {
if (!isCreator) return
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
}
                
if (budy.startsWith('>/')) {
if (!isCreator) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = util.inspect(evaled);
await reply(evaled);
} catch (err) {
reply(String(err));
}
}
                
if (budy.startsWith('=>')) {
if (!isCreator) return;
let teks;
try {
teks = await eval(`(async () => { ${budy.slice(2)}})()`);
} catch (e) {
teks = e;
} finally {
await reply(util.format(teks));
}
}
break;
}
} catch (err) {
console.error("Error:", err);
console.log(util.format(err));
}
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
