import 'dotenv/config'
import Discord from 'discord.js'
import { getUsersByRoles } from './services/getUsersByRoles'
import { convertJsonToExcel, writeExcel } from './lib/excel';

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
    ]
});

client.on("ready", async(bot) => {
    console.log("Bot online!");
    const guild = bot.guilds.cache.get(`${process.env.BOT_ID}`);
    if(guild) {
        const members = await getUsersByRoles(guild)
        const data = convertJsonToExcel(members)
        writeExcel(data)
    } else {
        console.log('Guild is not defined !');
    }
})


client.login(process.env.TOKEN_LOGIN)
