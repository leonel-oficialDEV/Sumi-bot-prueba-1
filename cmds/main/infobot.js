import os from 'os';
import { prepareWAMessageMedia } from '@whiskeysockets/baileys';

function rTime(seconds) {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const dDisplay = d > 0 ? d + (d === 1 ? " día, " : " días, ") : ""
  const hDisplay = h > 0 ? h + (h === 1 ? " hora, " : " horas, ") : ""
  const mDisplay = m > 0 ? m + (m === 1 ? " minuto, " : " minutos, ") : ""
  const sDisplay = s > 0 ? s + (s === 1 ? " segundo" : " segundos") : ""
  return dDisplay + hDisplay + mDisplay + sDisplay
}

export default {
  command: ['infobot', 'infosocket'],
  category: 'info',
  run: async (client, m, args, usedPrefix, command) => {
    const botId = client.user.id.split(':')[0] + "@s.whatsapp.net"
    const botSettings = global.db.data.settings[botId] || {}
    const botname = botSettings.botname
    const namebot = botSettings.namebot
    const monedas = botSettings.currency
    const banner = botSettings.banner
    const prefijo = botSettings.prefix
    const owner = botSettings.owner
    const canalId = botSettings.id
    const canalName = botSettings.nameid
    const link = botSettings.link
    let desar = 'Oculto'
    if (owner && !isNaN(owner.replace(/@s\.whatsapp\.net$/, ''))) {
      const userData = global.db.data.users[owner]
      desar = userData?.genre || 'Oculto'
    }
    const platform = os.type()
    const now = new Date()
    const colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }))
    const nodeVersion = process.version
    const sistemaUptime = rTime(os.uptime())
    const uptime = process.uptime()
    const uptimeDate = new Date(colombianTime.getTime() - uptime * 1000)
    const formattedUptimeDate = uptimeDate.toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/^./, m => m.toUpperCase())
    const isOficialBot = botId === global.client.user.id.split(':')[0] + "@s.whatsapp.net"
    const botType = isOficialBot ? '*Principal🅥*' : '*Sub Bot🅑*'
    try {
    const message = `✐ Información del bot *${botname}!*

✿ *Nombre Corto ›* ${namebot}
✿ *Nombre Largo ›* ${botname}
✦ *Moneda ›* ${monedas}
✦ *Prefijo${Array.isArray(prefijo) && prefijo.length > 1 ? 's' : ''} ›* ${prefijo === true ? '`sin prefijos`' : (Array.isArray(prefijo) ? prefijo : [prefijo || '/']).map(p => `\`${p}\``).join(', ')}

❒ *Tipo ›* ${botType}
❒ *Plataforma ›* ${platform}
❒ *NodeJS ›* ${nodeVersion}
❒ *Activo desde ›* ${formattedUptimeDate}
❒ *Sistema Activo ›* ${sistemaUptime}
❒ *${desar === 'Hombre' ? 'Dueño' : desar === 'Mujer' ? 'Dueña' : 'Dueño(a)'} ›* ${owner ? (!isNaN(owner.replace(/@s\.whatsapp\.net$/, '')) ? `@${owner.split('@')[0]}` : owner) : "Oculto por privacidad"}

> \`Enlace:\` ${link}`.trim()

      const menu = message
      const contextBase = {
        mentionedJid: null,
        isForwarded: false
      };

      if (isVideo) {
        await client.sendMessage(
          m.chat,
          { video: { url: banner }, caption: menu.trim(), contextInfo: contextBase },
          { quoted: m }
        );
      } else {
        await client.sendMessage(m.chat, { 
          text: menu.trim(), 
          linkPreview: link && banner ? (await prepareWAMessageMedia({ image: { url: banner } }, { upload: client.waUploadToServer, mediaTypeOverride: 'thumbnail-link' }).then(({ imageMessage }) => ({ 'canonical-url': link, 'matched-text': link, title: botname, description: dev, jpegThumbnail: imageMessage?.jpegThumbnail ? Buffer.from(imageMessage.jpegThumbnail) : undefined, highQualityThumbnail: imageMessage || undefined }))) : undefined, 
          contextInfo: contextBase
        }, { quoted: m });
      }
   } catch (e) {
     return m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
   }
  }
};
