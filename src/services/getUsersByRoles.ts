import type { GuildMember, Guild } from 'discord.js'
import type { DiscordMember } from '../adapters/convertUser'
import { convertUser } from '../adapters/convertUser'

export const getUsersByRoles = async (guild: Guild) => {
    const fetchMembers = await guild.members.fetch()
    return fetchMembers?.map((member: GuildMember) => convertMemberToJson(member)).map((e: any) => convertUser(e)).filter((member: DiscordMember) => filterByRoles(member))
}

const convertMemberToJson = (member: GuildMember) => {
    return member.toJSON()
}
const filterByRoles = (member: DiscordMember) => {
    return member.roles.includes(`${process.env.ROLE_ID}`)
}