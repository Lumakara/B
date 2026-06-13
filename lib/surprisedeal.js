// lib/surprisedeal.js

class SurpriseDealGame {
constructor(userId) {
this.userId = userId;
this.level = 1;
this.maxLevel = 10;
this.lastPrize = null;
this.currentBoxes = [];
this.generateLevel();
}

generateLevel() {
let totalBoxes = this.level * 3;
let zonkCount = Math.floor(totalBoxes / 3);
if (zonkCount < 1) zonkCount = 1;
this.currentBoxes = [];
let indices = Array.from({ length: totalBoxes }, (_, i) => i);
for (let i = indices.length - 1; i > 0; i--) {
let j = Math.floor(Math.random() * (i + 1));
[indices[i], indices[j]] = [indices[j], indices[i]];
}
let zonkIndices = indices.slice(0, zonkCount);
const prizeItems = [
{ name: "Mobil 🚗", min: 2000000, max: 5000000 },
{ name: "Motor 🏍️", min: 2000000, max: 5000000 },
{ name: "Laptop 💻", min: 1000000, max: 3000000 },
{ name: "HP 📱", min: 3000000, max: 15000000 },
{ name: "Kulkas ❄️", min: 5000000, max: 15000000 },
{ name: "TV 📺", min: 5000000, max: 2000000 },
{ name: "Sepeda 🚲", min: 2000000, max: 1000000 },
{ name: "Mesin Cuci 🧺", min: 3000000, max: 1000000 },
{ name: "Smartwatch ⌚", min: 1000000, max: 5000000 },
{ name: "Kamera 📷", min: 2000000, max: 1000000 },
{ name: "AC 🌬️", min: 3000000, max: 8000000 },
{ name: "Console Game 🎮", min: 3000000, max: 8000000 },
{ name: "Tablet 📝", min: 2000000, max: 6000000 }
];
for (let i = 0; i < totalBoxes; i++) {
if (zonkIndices.includes(i)) {
this.currentBoxes.push({ type: 'zonk', prize: null });
} else {
let prizeItem = prizeItems[Math.floor(Math.random() * prizeItems.length)];
let basePrice = Math.floor(Math.random() * (prizeItem.max - prizeItem.min + 1)) + prizeItem.min;
let price = basePrice * this.level;
this.currentBoxes.push({ type: 'prize', prize: { name: prizeItem.name, price: price } });
}
}
}

getLevelInfo() {
let totalBoxes = this.currentBoxes.length;
return `✨ *Level ${this.level}* ✨\n\n` +
`📦 Terdapat *${totalBoxes}* box, di antaranya sekitar *${Math.floor(totalBoxes / 3)}* box berisi _ZONK_ 😱\n` +
`Silakan pilih salah satu box dengan mengetik nomor (1-${totalBoxes})\n` +
`atau ketik *surrender* untuk menyerah dan mendapatkan hadiah uang tunai 💸.`;
}

chooseBox(index) {
const fs = require('fs');
if (index < 1 || index > this.currentBoxes.length) {
return { status: 'error', message: '❌ Nomor box tidak valid. Silakan coba lagi.' };
}
let box = this.currentBoxes[index - 1];
if (box.type === 'zonk') {
return { status: 'lose', message: `💥 Oh tidak! Box nomor ${index} adalah _ZONK_. Kamu kalah!` };
} else {
let bonus = Math.random() < 0.3;
this.lastPrize = Object.assign({}, box.prize);
if (bonus) this.lastPrize.price *= 2;
let bonusMsg = bonus ? "🎉 *Bonus!* Nilai hadiah digandakan!\n" : "";
if (this.level === this.maxLevel) {
// Perbaikan: global.db.users bukan global.db.data.users
if (global.db.users[this.userId]) {
global.db.users[this.userId].money = (global.db.users[this.userId].money || 0) + this.lastPrize.price;
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
}
return { status: 'win', prize: this.lastPrize.price, message: `🏆 Selamat! Kamu mencapai level tertinggi dan memenangkan hadiah grand:\n${bonusMsg}${this.lastPrize.name} seharga Rp${this.lastPrize.price.toLocaleString('id-ID')}!\n\n💰 Saldo kamu bertambah Rp${this.lastPrize.price.toLocaleString('id-ID')}` };
} else {
return { status: 'decision', prize: this.lastPrize.price, message: `${bonusMsg}Box nomor ${index} berisi ${this.lastPrize.name} seharga Rp${this.lastPrize.price.toLocaleString('id-ID')}.\n\n` +
`Ketik *collect* untuk mengambil hadiah ini dan mengakhiri game, atau *next* untuk naik ke level berikutnya dengan hadiah yang lebih besar 🚀.` };
}
}
}

collectPrize() {
const fs = require('fs');
// Perbaikan: global.db.users bukan global.db.data.users
if (global.db.users[this.userId]) {
global.db.users[this.userId].money = (global.db.users[this.userId].money || 0) + this.lastPrize.price;
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
}
return { status: 'collect', prize: this.lastPrize.price, message: `🎊 Kamu telah mengambil hadiah:\n${this.lastPrize.name} seharga Rp${this.lastPrize.price.toLocaleString('id-ID')}\n\n💰 Saldo kamu bertambah Rp${this.lastPrize.price.toLocaleString('id-ID')}\nSelamat!` };
}

nextLevel() {
const fs = require('fs');
// Perbaikan: global.db.users bukan global.db.data.users
if (global.db.users[this.userId]) {
global.db.users[this.userId].money = (global.db.users[this.userId].money || 0) + this.lastPrize.price;
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
}
this.level++;
this.generateLevel();
return { status: 'continue', message: `🔥 Selamat, kamu naik ke *Level ${this.level}*!\n💰 +Rp${this.lastPrize.price.toLocaleString('id-ID')}\n\n` + this.getLevelInfo() };
}

surrender() {
const fs = require('fs');
let prize = Math.floor(Math.random() * (50000 * this.level + 1)) + (50000 * this.level);
// Perbaikan: global.db.users bukan global.db.data.users
if (global.db.users[this.userId]) {
global.db.users[this.userId].money = (global.db.users[this.userId].money || 0) + prize;
fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
}
return { status: 'surrender', prize: prize, message: `😢 Kamu memilih untuk menyerah dan mendapatkan hadiah uang tunai:\nRp${prize.toLocaleString('id-ID')}\n\n💰 Saldo kamu bertambah Rp${prize.toLocaleString('id-ID')}` };
}
}

module.exports = SurpriseDealGame;