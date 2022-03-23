import 'dotenv/config'
import Discord from 'discord.js'
import type { GuildMember, Guild } from 'discord.js'
import xlsx from 'xlsx'
import type { WorkSheet } from 'xlsx'
import { normalize } from './adapters/toUser'
import { getUsersByRoles } from './services/getUsersByRoles'

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

const convertJsonToExcel = (data: unknown[]): WorkSheet => {
    return xlsx.utils.json_to_sheet(data);
}

const writeExcel = (worksheet: WorkSheet) => {
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'dataTest')
    xlsx.write(workbook, {bookType: 'xlsx', type: 'buffer'})
    xlsx.write(workbook, {bookType: 'xlsx', type: 'binary'})
    xlsx.writeFile(workbook, `${process.env.FILENAME_EXCEL}.xlsx`)
    console.log('file generated !')
}

client.login(process.env.TOKEN_LOGIN)
