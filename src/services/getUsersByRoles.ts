import type { GuildMember, Guild } from 'discord.js'
import { normalize } from '../adapters/toUser'
import type { DiscordMember } from '../adapters/toUser'

export const getUsersByRoles = async (guild: Guild) => {
    const fetchMembers = await guild.members.fetch()
    const members = fetchMembers?.map((member: GuildMember) => member.toJSON()).map((e: any) => normalize(e)).filter((member: DiscordMember) => member.roles.includes('955209655829815379'))
    return members
}