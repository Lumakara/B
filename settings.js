require("./satanic")
const fs = require('fs')

global.owner = "6285183518016", "6285183518016"
global.nobot = "6285183518016"
global.namaowner = "Kulll"
global.namaBot = "Lumakara"
global.title = "satan"
global.wlcm = false
global.welcomeBg = 'https://i.ibb.co/4YBNyvP/mountain-sunset.jpg';
global.goodbyeBg = 'https://i.ibb.co/4YBNyvP/images-76.jpg';
global.domain = "https://free-restapi.biz.id/"
global.thumbnail = "https://c.termai.cc/i191/zZjmX.png" //// ganti thumbnail sesuaikan kalian
// Jangan Di ubah
global.creator = `${owner}@s.whatsapp.net` 
global.foother = `© ${namaBot}`
global.versi = "New"
global.pairing = "SATAGANZ" //PAIRING TIDAK BISA DI UBAH////
//////NOTE TIDAK BERUBAH KODE PAIRING YANG ADA EROR///////////
global.idch = "120363422340494910@newsletter"
global.linkSaluran = "https://whatsapp.com/channel/0029VbBOXZ6AojZ23z5ieI3z"
global.onlygrup = false
global.autoshalat = false
global.onlygroup = true 
global.onlypc = false
global.audio = "https://c.termai.cc/a159/zMBsdQ.mp3"
global.sakey = "SK-BF2D065E6E429CC4427417E6" //jika apikey habis silahkan register 
//// https://free-restapi.biz.id// ///
///ambil apikey di website itu//////

global.fgsi = "fgsiapi-166c8cb9-6d"
///// https://fgsi.dpdns.org //// Ambil Apikey di situ///))/
global.neoxr = "oggwWy"
/// https://api.neoxr.eu/ /////Ambil apikey di website itu////
global.allowedGroupIds = global.allowedGroupIds || [""];

/* ========== GLOBAL PAYMENT (SEMUA PAKAI URL) ========== */

// IMAGE URL - E-WALLET
global.danaImage = 'https://c.termai.cc/i108/58xw.jpg';
global.gopayImage = 'https://c.termai.cc/i108/58xw.jpg';
global.shopeePayImage = 'https://c.termai.cc/i108/58xw.jpg';
global.qris = 'https://c.termai.cc/i108/58xw.jpg';

// IMAGE URL - BANK
global.bcaImage = 'https://c.termai.cc/i108/58xw.jpg';
global.briImage = 'https://c.termai.cc/i108/58xw.jpg';
global.mandiriImage = 'https://c.termai.cc/i108/58xw.jpg';

// E-WALLET - DANA
global.nodana = "085183518016";
global.andana = "Nama Pemilik DANA";

// E-WALLET - GOPAY
global.nogopay = "085183518016";
global.angopay = "Nama Pemilik GOPAY";

// E-WALLET - SHOPEEPAY
global.noshopeepay = "085183518016";
global.anshoppepay = "Nama Pemilik ShopeePay";

// BANK BCA
global.nobca = "1234567890";
global.anbca = "Nama Pemilik BCA";

// BANK BRI
global.nobri = "1234567891";
global.anbri = "Nama Pemilik BRI";

// BANK MANDIRI
global.nomandiri = "1234567892";
global.anmandiri = "Nama Pemilik Mandiri";


/* ========== END GLOBAL PAYMENT ========== */

global.domainpanel = "ht" // Domain panel (tanpa slash di akhir)
global.apikey = 'ptl' // API Key Application (harus Read & Write)
global.capikey = 'ptlc' // Client API Key
//=========================================================//
global.apiDigitalOcean = "-"
//=========================================================//
//Server create panel egg pm2
global.apikey2 = '-' // API Key kedua (isi jika punya)
global.capikey2 = '-' // Client API Key kedua
global.domain2 = '-' // Domain kedua
global.docker2 = "ghcr.io/cekilpedia/vip:sanzubycekil" // Docker image (jangan diubah)
//=========================================================//
global.eggsnya2 = '5' // Egg ID kedua
global.location2 = '1' // Location ID kedua
//=========================================================//
global.eggsnya = '1' // Egg ID utama (dari nest 5, coba 1)
global.nodes = '1' // Node ID (dari location 1)
global.location3 = '1' // Location ID utama
//=========================================================//
global.nests = '5' // Nest ID (egg_botwhatsapp)
global.memory = '7050' // Memory 7GB
global.disk = '7050' // Disk 7GB
global.cpu = '210' // CPU 210%


global.banned = []
global.nama = namaBot 
global.namach = nama 
global.namafile = foother 
global.author = namaowner
global.welcome = false
global.leave = false
global.antitags = false
global.welcomeMsg = "awkawkwwk"
global.leaveMsg = "awkww yatim oit"
global.autoreadsw = false
global.autoreactsw = false
global.autoreactemoji = '😂'
global.tekspushkon = ""
global.tekspushkonv2 = ""
global.tekspushkonv3 = ""
global.tekspushkonv4 = ""

global.prefix = ".", "/", "#", "!", "?"


// Settings reply ~~~~~~~~~//
global.mess = {
    owner: "Khusus Owner",
    prem: "Khusus Premium",
    group: "Khusus di Group Chat",
    wait: "wait be processed",
    admin: "Khusus Admin",
    botadmin: "Bot Harus Jadi Admin",
    private: "Khusus di Private Chat",
    done: "Sukses"
}

global.packname = nama
global.author = namaBot

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})