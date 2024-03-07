import { sequelize } from "@src/lib/database/database.js"

export const deleteFlag = async (flagID: string) => {
    return (await sequelize.models.Flags.destroy({where: {FlagID: flagID}}))
}

export const deleteFlags = async (lobbyID: string) => {
    return (await sequelize.models.Flags.destroy({where: {LobbyID: lobbyID}}))
}