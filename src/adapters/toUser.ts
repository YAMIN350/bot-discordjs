export const normalize = (e: any) => {
    return {
        ...e,
        roles: e.roles.toString()
    }
}