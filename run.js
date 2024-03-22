  /**
       Thank for
       • allah swt
       • ortu
       • YanzBotz ( creator )
       • Febzabotz ( my team )
       • Aprilia ( my team )
       • Aldi Fauzi  ( my team )
       • Dika Ardnt
       • Rifza.p.p
       • IqbalzzX
    All creator bot, maaf kalau salah satu ga kesebut nama nya mohon maaf

/**
     Base By Aypa Team
       • Febzabotz 
       • YanzBotz 
       •  Aprilia 
       • Aldi Fauzi
  */
  const SETTING = require('./lib/validator/config')
  const pino = SETTING['modul']['pino']
  const chalk = SETTING['modul']['chalk']
  const fs = SETTING['modul']['fs']
  const jimp = SETTING['modul']['jimp']
  const path = SETTING['modul']['path']
  const { Boom } = SETTING['modul']['boom']
const PhoneNumber = require('awesome-phonenumber')
  const NodeCache = SETTING['modul']['nodecache']
  const readline = SETTING['modul']['readline']
  const { move } = require(SETTING['file']['move'])
  const { smsg } = require(SETTING['file']['yanz'])
 const { default: makeWASocket, getContentType,  MessageRetryMap, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, getAggregateVotesInPollMessage, proto } = require("@whiskeysockets/baileys")
  const { color, bgcolor, ConsoleLog, biocolor } = require(SETTING['file']['color'])
 const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif, writeExifStc } = require('./lib/exif.js')
 
//pairingCode
  const pairingCode = process.argv.includes("code")
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const question = (text) => new Promise((resolve) => rl.question(text, resolve))
//store
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })


     //=======================================================//
                               /* { function } */
     //=======================================================//
     const sleep = async (ms) => {
       return new Promise(resolve => setTimeout(resolve, ms))
     }   
             
         try {
         async function operate() {         
              let { state, saveCreds } = await useMultiFileAuthState('./storage/session')
              let { version } = fetchLatestBaileysVersion()
	      const msgRetryCounterCache = new NodeCache()
              const fuzzy = makeWASocket({ 
		      logger: pino({ level: 'silent' }), 
		      printQRInTerminal: !pairingCode,
              auth: state,
              browser: ['Linux', 'Chrome', '', ''],
                     getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg.message || undefined
            }
            return {
                conversation: "Hai Im HolyHelper"
	   }
	},
		      msgRetryCounterCache
     })
      // pairing by @whiskeysockets/baileys
        if(pairingCode && !fuzzy.authState.creds.registered) {
		const nomornya = await question('Silahkan masukin nomor whatsapp :');
		const code = await fuzzy.requestPairingCode(nomornya)
		console.log(`︎Kode Pairing Bot Whatsapp kamu : ${code} `)
     	}
               //save session 
                 fuzzy.ev.on('creds.update', saveCreds);   
                 store.bind(fuzzy.ev) 

                /** plugins **/
            let pluginFolder = path.join(__dirname, './plugins/')
              let pluginFilter = filename => /\.js$/.test(filename)
              global.plugins = {}
              for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
               try {
                     global.plugins[filename] = require(path.join(pluginFolder, filename))
                } catch (e) {
                     console.log(e)
                     delete global.plugins[filename]
               }
             }
             console.log(Object.keys(global.plugins))
     
               //=======================================================//
                                        /* { fuzzy.ev.on } */
               //=======================================================//
                
                 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*// 
               fuzzy.decodeJid = (jid) => {
                           if (!jid) return jid
                                if (/:\d+@/gi.test(jid)) {
                                let decode = jidDecode(jid) || {}
                            return decode.user && decode.server && decode.user + '@' + decode.server || jid
                     } else return jid
                 }    
                //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
               fuzzy.getName = (jid, withoutContact  = false) => {
                id = fuzzy.decodeJid(jid)
                withoutContact = fuzzy.withoutContact || withoutContact 
                 let v
                   if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
                    v = store.contacts[id] || {}
                    if (!(v.name || v.subject)) v = fuzzy.groupMetadata(id) || {}
                    resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
                    })
                    else v = id === '0@s.whatsapp.net' ? {
                     id,
                     name: 'WhatsApp'
                     } : id === fuzzy.decodeJid(fuzzy.user.id) ?
                      fuzzy.user :
                      (store.contacts[id] || {})
                      return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
                 }
           //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//        
                 fuzzy.sendContact = async (jid, kon, quoted = '', opts = {}) => {
                	let list = []
                 	for (let i of kon) {
     	               list.push({
     	            	displayName: await fuzzy.getName(i),
     	             	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await fuzzy.getName(i)}\nFN:${await fuzzy.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:"faldi8495@gmail.com@gmail.com"\nitem2.X-ABLabel:Email\nitem3.URL:"https://instagram.com/xziyy__"\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;pluto;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
            	       })                	}
                	
              	fuzzy.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
               }
               
              

           //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                       }
                
               fuzzy.ev.on('connection.update', async (update) => {
                   let { Connecting } = require("./connect/systemConnext.js")        
                         Connecting({update, fuzzy, Boom, DisconnectReason, sleep, operate}) 
                })      

               
                 fuzzy.ev.on('messages.upsert', async ({ messages }) => {
                      const msg = messages[0]; 
                       if (!msg.message) return
                           if (msg.key.remoteJid === 'status@broadcast' && SETTING['autoreadsw'] == true) {
			                	setTimeout(() => {
			    	             fuzzy.readMessages([msg.key])
					             let typ = getContentType(msg.message)
				    	         console.log((/protocolMessage/i.test(typ)) ? `${msg.key.participant.split('@')[0]} Deleted story❗` : 'View user stories : ' + msg.key.participant.split('@')[0]);
				                }, 500);
	                          }
                           const from = msg.key.remoteJid  
                           const type = getContentType(msg.message)
                           const textMessage = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
                          move(fuzzy, msg, store) 
                          smsg(fuzzy, msg, store) 
                     require('./connect/msg.js')(msg, fuzzy, from, store) //fuzzy.sendPresenceUpdate('recording', from) 
                  })
                  
                  
//*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                       
                // respon polling
                
async function getMessage(key) {
  	if (store) {
  		const msg = await store.loadMessage(key.remoteJid, key.id)
  		return msg?.message
      }  
      return {
      	conversation: "Hai Im sain"
      }  
  }
  
  fuzzy.ev.on('messages.update', async chatUpdate => {
  	for (const { key, update } of chatUpdate) {
  		if (update.pollUpdates && key.fromMe) {
  			const pollCreation = await getMessage(key)
  			if(pollCreation) {
  				const pollUpdate = await getAggregateVotesInPollMessage({
  					message: pollCreation,
  					pollUpdates: update.pollUpdates,
  			    })		
  		        var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name	    
  		        if (toCmd == undefined) return
  		        var prefCmd = prefix+toCmd
  		        fuzzy.appenTextMessage(prefCmd, chatUpdate)
  		    }
  		 }
  	}
  })	           
                  
fuzzy.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return fuzzy.sendMessage(jid, { poll: { name, values, selectableCount }}) }               

//*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                       
                // sendText
fuzzy.sendText = (jid, text, quoted = "", options) =>
fuzzy.sendMessage(jid, { text: text, ...options }, { quoted });       
fuzzy.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
 await fuzzy.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}              
return fuzzy               
         }
       //=======================================================//
                                 /* { starting } */
       //=======================================================//
        operate()
  } catch (e) { console.log(chalk.red(e)) }  
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.yellow(`New ${__filename}`))
	delete require.cache[file]
	require(file)
})
process.on('uncaughtException', console.error)