export type DiscordMember = {
    guildId: string,
    joinedTimestamp: number,
    premiumSinceTimestamp: string,
    nickname: string,
    pending: boolean,
    communicationDisabledUntilTimestamp: string,
    userId: string,
    avatar: string,
    displayName: string,
    roles: string[],
    avatarURL: string,
    displayAvatarURL: string,
}


export const convertUser = (e: any): DiscordMember => {
    return {
        ...e,
        roles: e.roles.toString()
    }
}